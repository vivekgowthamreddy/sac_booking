import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, Ticket, Calendar, Clock, MapPin, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AdminBookingsListCleanProps {
  onBack: () => void;
}

export const AdminBookingsListClean: React.FC<AdminBookingsListCleanProps> = ({ onBack }) => {
  const { bookings, shows, getShowSeats } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = bookings.filter((booking) => {
    const show = shows.find(s => s.id === booking.showId);
    const seat = getShowSeats(booking.showId).find(s => s.id === booking.seatId);
    
    return (
      booking.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      show?.movieName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seat?.seatNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.button
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-[#666666] hover:text-[#1a1a1a] smooth mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-4xl text-[#1a1a1a] mb-2">All Bookings</h1>
              <p className="text-[#666666]">Complete booking history ({bookings.length} total)</p>
            </div>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-card">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by ticket number, movie, or seat..."
                className="w-full bg-[#f5f5f5] border-0 rounded-xl pl-12 pr-4 py-3 text-[#1a1a1a] placeholder:text-[#999999] focus:outline-none focus:ring-2 focus:ring-[#0066ff]"
              />
            </div>
          </div>
        </motion.div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#e5e5e5] rounded-2xl p-12 text-center shadow-card"
          >
            <Ticket className="w-16 h-16 text-[#d9d9d9] mx-auto mb-4" />
            <p className="text-[#666666]">
              {searchTerm ? 'No bookings found matching your search' : 'No bookings yet'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking, index) => {
              const show = shows.find(s => s.id === booking.showId);
              const seat = getShowSeats(booking.showId).find(s => s.id === booking.seatId);

              if (!show || !seat) return null;

              const showDate = new Date(show.showDate);
              const isPastShow = showDate < new Date();

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-[#e5e5e5] rounded-2xl overflow-hidden shadow-card hover-lift"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Poster */}
                    <div className="md:w-32 h-32 md:h-auto overflow-hidden flex-shrink-0">
                      <img
                        src={show.posterUrl}
                        alt={show.movieName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl text-[#1a1a1a] mb-1">{show.movieName}</h3>
                          <p className="text-[#666666] text-sm mb-2">{show.genre}</p>
                          <div className="flex items-center gap-2">
                            <div className="px-2 py-1 bg-[#f0f9ff] text-[#0066ff] rounded-lg text-xs">
                              {booking.ticketNumber}
                            </div>
                            <div className={`px-2 py-1 rounded-lg text-xs ${
                              isPastShow
                                ? 'bg-[#f5f5f5] text-[#999999]'
                                : 'bg-[#f0fff4] text-[#28a745]'
                            }`}>
                              {isPastShow ? 'Completed' : 'Upcoming'}
                            </div>
                          </div>
                        </div>
                        <div className="w-16 h-16 bg-white border border-[#e5e5e5] rounded-lg p-1">
                          <img
                            src={booking.qrCode}
                            alt="QR Code"
                            className="w-full h-full"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-[#f0f9ff] rounded-lg flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-[#0066ff]" />
                          </div>
                          <div>
                            <p className="text-[#999999] text-xs">Date</p>
                            <p className="text-[#1a1a1a] text-sm">
                              {showDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-[#f0f9ff] rounded-lg flex items-center justify-center">
                            <Clock className="w-4 h-4 text-[#0066ff]" />
                          </div>
                          <div>
                            <p className="text-[#999999] text-xs">Time</p>
                            <p className="text-[#1a1a1a] text-sm">{show.showTime}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-[#f0f9ff] rounded-lg flex items-center justify-center">
                            <Ticket className="w-4 h-4 text-[#0066ff]" />
                          </div>
                          <div>
                            <p className="text-[#999999] text-xs">Seat</p>
                            <p className="text-[#1a1a1a]">{seat.seatNumber}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-[#f0f9ff] rounded-lg flex items-center justify-center">
                            <User className="w-4 h-4 text-[#0066ff]" />
                          </div>
                          <div>
                            <p className="text-[#999999] text-xs">User ID</p>
                            <p className="text-[#1a1a1a] text-sm truncate">{booking.userId.substring(0, 8)}...</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-[#e5e5e5]">
                        <p className="text-[#999999] text-xs">
                          Booked: {new Date(booking.bookingDate).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
