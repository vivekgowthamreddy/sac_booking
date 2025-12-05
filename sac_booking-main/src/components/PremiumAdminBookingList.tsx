import { motion } from 'motion/react';
import { ArrowLeft, Search, Download, Filter } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Booking, Show } from '../App';

interface PremiumAdminBookingListProps {
  bookings: Booking[];
  shows: Show[];
  onBack: () => void;
}

export function PremiumAdminBookingList({ bookings, shows, onBack }: PremiumAdminBookingListProps) {
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
    <div className="min-h-screen bg-[#0D0D0F]">
      {/* Background */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-white mb-2">All Bookings</h2>
            <p className="text-[#999BA3]">Complete reservation history</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-medium rounded-2xl border border-white/10 p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-[#6C63FF] transition-colors" />
              <Input
                type="text"
                placeholder="Search by student ID, name, or seat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:border-[#6C63FF] focus:bg-white/10 transition-all"
              />
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-light px-6 h-14 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex items-center gap-2 text-white/80"
              >
                <Filter className="w-4 h-4" />
                Filter
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 h-14 bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] hover:shadow-lg hover:shadow-[#6C63FF]/50 text-white rounded-2xl transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          {[
            { label: 'Total Bookings', value: bookings.length, gradient: 'from-[#6C63FF] to-[#4EA8E9]' },
            { label: 'Search Results', value: filteredBookings.length, gradient: 'from-[#4EA8E9] to-[#22C55E]' },
            { label: 'Unique Students', value: new Set(bookings.map(b => b.studentId)).size, gradient: 'from-[#22C55E] to-[#6C63FF]' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="glass-medium rounded-2xl border border-white/10 p-6"
            >
              <p className="text-[#999BA3] text-sm mb-2">{stat.label}</p>
              <p className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent text-2xl`}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bookings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-medium rounded-3xl border border-white/10 overflow-hidden"
        >
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto premium-scroll">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left p-6 text-white/60 text-sm uppercase tracking-wider">Student</th>
                  <th className="text-left p-6 text-white/60 text-sm uppercase tracking-wider">Seat</th>
                  <th className="text-left p-6 text-white/60 text-sm uppercase tracking-wider">Movie</th>
                  <th className="text-left p-6 text-white/60 text-sm uppercase tracking-wider">Show Time</th>
                  <th className="text-left p-6 text-white/60 text-sm uppercase tracking-wider">Booked At</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, index) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                  >
                    <td className="p-6">
                      <p className="text-white mb-1">{booking.studentName}</p>
                      <p className="text-white/40 text-sm">{booking.studentId}</p>
                    </td>
                    <td className="p-6">
                      <div className="inline-flex items-center justify-center px-3 py-1 bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] rounded-lg text-white">
                        {booking.seatId}
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="text-white">{getShowName(booking.showId)}</span>
                    </td>
                    <td className="p-6">
                      <span className="text-white/60 text-sm">{getShowDetails(booking.showId)}</span>
                    </td>
                    <td className="p-6">
                      <span className="text-white/40 text-sm">
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
                transition={{ delay: 0.4 + index * 0.05 }}
                className="glass-light border border-white/10 rounded-2xl p-4"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-white mb-1">{booking.studentName}</p>
                    <p className="text-white/40 text-sm">{booking.studentId}</p>
                  </div>
                  <div className="px-3 py-1 bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] rounded-lg text-white text-sm">
                    {booking.seatId}
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/40">Movie:</span>
                    <span className="text-white">{getShowName(booking.showId)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Show:</span>
                    <span className="text-white">{getShowDetails(booking.showId)}</span>
                  </div>
                  <div className="pt-2 border-t border-white/5">
                    <span className="text-white/30 text-xs">
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
              <p className="text-white/60 mb-2">No bookings found</p>
              <p className="text-white/40 text-sm">Try adjusting your search</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
