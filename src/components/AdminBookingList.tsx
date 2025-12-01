import { motion } from 'motion/react';
import { ArrowLeft, Search, Download } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Booking, Show } from '../App';

interface AdminBookingListProps {
  bookings: Booking[];
  shows: Show[];
  onBack: () => void;
}

export function AdminBookingList({ bookings, shows, onBack }: AdminBookingListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const getShowName = (showId: string) => {
    return shows.find(s => s.id === showId)?.movieName || 'Unknown';
  };

  const getShowDetails = (showId: string) => {
    const show = shows.find(s => s.id === showId);
    if (!show) return '';
    return `${new Date(show.date).toLocaleDateString()} • ${show.time}`;
  };

  const filteredBookings = bookings.filter(booking => 
    booking.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.seatId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white mb-4 hover:text-blue-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          <h2 className="text-white mb-2">All Bookings</h2>
          <p className="text-blue-200">Complete booking history</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Search & Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by student ID, name, or seat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 rounded-xl"
              />
            </div>
            <Button className="h-12 px-6 bg-blue-900 hover:bg-blue-800 text-white rounded-xl transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-600 text-sm mb-2">Total Bookings</p>
            <p className="text-gray-900">{bookings.length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-600 text-sm mb-2">Search Results</p>
            <p className="text-gray-900">{filteredBookings.length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-600 text-sm mb-2">Unique Students</p>
            <p className="text-gray-900">{new Set(bookings.map(b => b.studentId)).size}</p>
          </div>
        </motion.div>

        {/* Bookings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left p-4 text-gray-700 text-sm">Student ID</th>
                  <th className="text-left p-4 text-gray-700 text-sm">Name</th>
                  <th className="text-left p-4 text-gray-700 text-sm">Seat</th>
                  <th className="text-left p-4 text-gray-700 text-sm">Movie</th>
                  <th className="text-left p-4 text-gray-700 text-sm">Show Details</th>
                  <th className="text-left p-4 text-gray-700 text-sm">Booked At</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, index) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4">
                      <span className="text-gray-900">{booking.studentId}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-900">{booking.studentName}</span>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center justify-center px-3 py-1 bg-blue-100 text-blue-900 rounded-lg">
                        {booking.seatId}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-700">{getShowName(booking.showId)}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-600 text-sm">{getShowDetails(booking.showId)}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-600 text-sm">
                        {new Date(booking.timestamp).toLocaleString()}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden p-4 space-y-4">
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="border border-gray-200 rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-gray-900 mb-1">{booking.studentName}</p>
                    <p className="text-gray-600 text-sm">{booking.studentId}</p>
                  </div>
                  <span className="inline-flex items-center justify-center px-3 py-1 bg-blue-100 text-blue-900 rounded-lg text-sm">
                    {booking.seatId}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Movie:</span>
                    <span className="text-gray-900">{getShowName(booking.showId)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Show:</span>
                    <span className="text-gray-900">{getShowDetails(booking.showId)}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-gray-500 text-xs">
                      Booked: {new Date(booking.timestamp).toLocaleString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredBookings.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-gray-500 mb-2">No bookings found</p>
              <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
