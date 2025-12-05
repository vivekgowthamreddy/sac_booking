import React from 'react';
import { motion } from 'motion/react';
import { LogOut, AlertTriangle, Ticket, Users, Film, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AdminDashboardCleanProps {
  onSeatDamageClick: () => void;
  onBookingListClick: () => void;
}

export const AdminDashboardClean: React.FC<AdminDashboardCleanProps> = ({
  onSeatDamageClick,
  onBookingListClick,
}) => {
  const { logout, shows, seats, bookings } = useAuth();

  const totalShows = shows.length;
  const totalBookings = bookings.length;
  const damagedSeats = seats.filter(s => s.status === 'damaged').length;
  const totalSeats = seats.length;

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl text-[#1a1a1a] mb-2">Admin Dashboard</h1>
              <p className="text-[#666666]">Manage shows, bookings, and seat damage reports</p>
            </motion.div>

            <motion.button
              onClick={logout}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e5e5e5] rounded-xl text-[#666666] hover:text-[#1a1a1a] smooth"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </motion.button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-card"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#f0f9ff] rounded-xl flex items-center justify-center">
                <Film className="w-6 h-6 text-[#0066ff]" />
              </div>
              <div>
                <p className="text-[#666666] text-sm">Total Shows</p>
                <p className="text-3xl text-[#1a1a1a]">{totalShows}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-card"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#f0f9ff] rounded-xl flex items-center justify-center">
                <Ticket className="w-6 h-6 text-[#0066ff]" />
              </div>
              <div>
                <p className="text-[#666666] text-sm">Total Bookings</p>
                <p className="text-3xl text-[#1a1a1a]">{totalBookings}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-card"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#fff5f5] rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-[#dc3545]" />
              </div>
              <div>
                <p className="text-[#666666] text-sm">Damaged Seats</p>
                <p className="text-3xl text-[#dc3545]">{damagedSeats}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-card"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-[#f0fff4] rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-[#28a745]" />
              </div>
              <div>
                <p className="text-[#666666] text-sm">Total Seats</p>
                <p className="text-3xl text-[#1a1a1a]">{totalSeats}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl text-[#1a1a1a] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.button
              onClick={onSeatDamageClick}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-8 bg-white border border-[#e5e5e5] rounded-2xl text-left hover-lift"
            >
              <div className="mb-4 inline-block">
                <AlertTriangle className="w-12 h-12 text-[#dc3545]" />
              </div>
              <h3 className="text-xl text-[#1a1a1a] mb-2">Seat Damage Reports</h3>
              <p className="text-[#666666]">View and manage seat damage reports with accountability tracking</p>
            </motion.button>

            <motion.button
              onClick={onBookingListClick}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="p-8 bg-white border border-[#e5e5e5] rounded-2xl text-left hover-lift"
            >
              <div className="mb-4 inline-block">
                <Ticket className="w-12 h-12 text-[#0066ff]" />
              </div>
              <h3 className="text-xl text-[#1a1a1a] mb-2">All Bookings</h3>
              <p className="text-[#666666]">View complete booking history and user information</p>
            </motion.button>
          </div>
        </div>

        {/* Shows Overview */}
        <div>
          <h2 className="text-2xl text-[#1a1a1a] mb-6">Shows Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shows.map((show, index) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-white border border-[#e5e5e5] rounded-2xl overflow-hidden shadow-card"
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={show.posterUrl}
                    alt={show.movieName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white mb-1">{show.movieName}</h3>
                    <p className="text-white/80 text-sm">{show.genre}</p>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-[#666666] text-sm">
                    <Calendar className="w-4 h-4 text-[#0066ff]" />
                    <span>{new Date(show.showDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#666666] text-sm">
                    <Film className="w-4 h-4 text-[#0066ff]" />
                    <span>{show.showTime} • {show.duration}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#e5e5e5]">
                    <span className="text-[#666666] text-sm capitalize">{show.gender} Show</span>
                    <span className="text-[#28a745] text-sm">{show.availableSeats}/{show.totalSeats} available</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
