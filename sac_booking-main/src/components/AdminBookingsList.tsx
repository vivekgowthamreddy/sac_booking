import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Search, Filter, Calendar, User, Ticket as TicketIcon, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AdminBookingsListProps {
  onBack: () => void;
}

export const AdminBookingsList: React.FC<AdminBookingsListProps> = ({ onBack }) => {
  const { bookings, shows, seats } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterShow, setFilterShow] = useState<string>('all');

  const filteredBookings = bookings.filter(booking => {
    const show = shows.find(s => s.id === booking.showId);
    const seat = seats.find(s => s.id === booking.seatId);
    
    const matchesSearch = 
      booking.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      seat?.seatNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterShow === 'all' || booking.showId === filterShow;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Content */}
      <div className="relative z-10 min-h-screen px-4 py-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <motion.button
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-white/60 hover:text-white smooth-transition mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl text-white mb-2"
          >
            All Bookings
          </motion.h1>
          <p className="text-white/60">Monitor and manage all student bookings</p>
        </div>

        {/* Filters */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="glass-medium border border-white/10 rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div>
                <label className="block text-white/80 mb-2 text-sm">Search</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Ticket number or seat..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 smooth-transition"
                  />
                </div>
              </div>

              {/* Filter by Show */}
              <div>
                <label className="block text-white/80 mb-2 text-sm">Filter by Show</label>
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <select
                    value={filterShow}
                    onChange={(e) => setFilterShow(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 smooth-transition appearance-none"
                  >
                    <option value="all" className="bg-[#0a0a0f]">All Shows</option>
                    {shows.map(show => (
                      <option key={show.id} value={show.id} className="bg-[#0a0a0f]">
                        {show.movieName} - {new Date(show.showDate).toLocaleDateString()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-white/60">
              <span>Total Bookings: {filteredBookings.length}</span>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="max-w-7xl mx-auto">
          {filteredBookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-medium border border-white/10 rounded-2xl p-12 text-center"
            >
              <TicketIcon className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <p className="text-white/60">No bookings found</p>
            </motion.div>
          ) : (
            <div className="glass-medium border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto premium-scroll">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-white/80">Ticket Number</th>
                      <th className="text-left p-4 text-white/80">Movie</th>
                      <th className="text-left p-4 text-white/80">Show Date</th>
                      <th className="text-left p-4 text-white/80">Time</th>
                      <th className="text-left p-4 text-white/80">Seat</th>
                      <th className="text-left p-4 text-white/80">Booking Date</th>
                      <th className="text-left p-4 text-white/80">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking, index) => {
                      const show = shows.find(s => s.id === booking.showId);
                      const seat = seats.find(s => s.id === booking.seatId);

                      if (!show || !seat) return null;

                      const showDate = new Date(show.showDate);
                      const isPast = showDate < new Date();

                      return (
                        <motion.tr
                          key={booking.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-white/5 hover:bg-white/5 smooth-transition"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <TicketIcon className="w-4 h-4 text-purple-400" />
                              <span className="text-white">{booking.ticketNumber}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="text-white">{show.movieName}</p>
                              <p className="text-white/60 text-xs capitalize">{show.gender} Show</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2 text-white/80">
                              <Calendar className="w-4 h-4 text-purple-400" />
                              <span className="text-sm">
                                {showDate.toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-white/80 text-sm">{show.showTime}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-purple-400" />
                              <span className="text-white">{seat.seatNumber}</span>
                            </div>
                          </td>
                          <td className="p-4 text-white/60 text-sm">
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <div className={`inline-flex px-3 py-1 rounded-lg text-xs ${
                              isPast
                                ? 'bg-white/10 text-white/60'
                                : 'bg-green-500/20 border border-green-500/30 text-green-400'
                            }`}>
                              {isPast ? 'Completed' : 'Upcoming'}
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};
