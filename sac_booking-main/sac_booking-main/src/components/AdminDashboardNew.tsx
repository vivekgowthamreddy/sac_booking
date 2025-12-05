import React from 'react';
import { motion } from 'motion/react';
import { Shield, LogOut, AlertTriangle, Users, Ticket, Film } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AdminDashboardNewProps {
  onSeatDamageClick: () => void;
  onBookingListClick: () => void;
}

export const AdminDashboardNew: React.FC<AdminDashboardNewProps> = ({
  onSeatDamageClick,
  onBookingListClick,
}) => {
  const { logout, shows, seats, bookings } = useAuth();

  const totalSeats = seats.length;
  const damagedSeats = seats.filter(s => s.status === 'damaged').length;
  const bookedSeats = seats.filter(s => s.status === 'booked').length;
  const totalBookings = bookings.length;
  const totalShows = shows.length;

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Content */}
      <div className="relative z-10 min-h-screen px-4 py-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="relative">
                  <div className="absolute inset-0 blur-xl bg-red-500/30 rounded-full" />
                  <Shield className="relative w-8 h-8 text-red-400" />
                </div>
                <h1 className="text-4xl text-white">Admin Dashboard</h1>
              </div>
              <p className="text-white/60">Manage shows, seats, and monitor bookings</p>
            </motion.div>

            <motion.button
              onClick={logout}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 glass-light border border-white/10 rounded-xl text-white/80 hover:text-white smooth-transition"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-medium border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Film className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Total Shows</p>
                <p className="text-2xl text-white">{totalShows}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-medium border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Ticket className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Total Bookings</p>
                <p className="text-2xl text-white">{totalBookings}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-medium border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Occupied Seats</p>
                <p className="text-2xl text-white">{bookedSeats}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-medium border border-red-500/20 rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Damaged Seats</p>
                <p className="text-2xl text-white">{damagedSeats}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="max-w-7xl mx-auto mb-12">
          <h2 className="text-2xl text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.button
              onClick={onSeatDamageClick}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative p-8 glass-medium border border-white/10 rounded-2xl text-left smooth-transition overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-orange-600/20 opacity-0 group-hover:opacity-100 smooth-transition" />
              <div className="relative">
                <div className="mb-4 inline-block">
                  <div className="relative">
                    <div className="absolute inset-0 blur-xl bg-red-500/30 group-hover:bg-red-500/50 smooth-transition rounded-full" />
                    <AlertTriangle className="relative w-12 h-12 text-red-400" />
                  </div>
                </div>
                <h3 className="text-xl text-white mb-2">Seat Damage Management</h3>
                <p className="text-white/60">Report and track damaged seats with accountability</p>
                {damagedSeats > 0 && (
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-lg">
                    <span className="text-red-400 text-sm">{damagedSeats} damaged seats</span>
                  </div>
                )}
              </div>
            </motion.button>

            <motion.button
              onClick={onBookingListClick}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative p-8 glass-medium border border-white/10 rounded-2xl text-left smooth-transition overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 smooth-transition" />
              <div className="relative">
                <div className="mb-4 inline-block">
                  <div className="relative">
                    <div className="absolute inset-0 blur-xl bg-purple-500/30 group-hover:bg-purple-500/50 smooth-transition rounded-full" />
                    <Ticket className="relative w-12 h-12 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-xl text-white mb-2">View All Bookings</h3>
                <p className="text-white/60">Monitor all student bookings and seat assignments</p>
                {totalBookings > 0 && (
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-lg">
                    <span className="text-purple-400 text-sm">{totalBookings} total bookings</span>
                  </div>
                )}
              </div>
            </motion.button>
          </div>
        </div>

        {/* Show Overview */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl text-white mb-6">Shows Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shows.map((show, index) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group glass-medium border border-white/10 rounded-2xl overflow-hidden smooth-transition"
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={show.posterUrl}
                    alt={show.movieName}
                    className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-4 right-4 px-3 py-1 glass-strong rounded-lg">
                    <span className="text-white text-sm capitalize">{show.gender}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white mb-1">{show.movieName}</h3>
                    <p className="text-white/60 text-sm">{show.genre}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">Bookings</span>
                    <span className="text-white">{show.totalSeats - show.availableSeats}</span>
                  </div>
                  <div className="mt-2 w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                      style={{ width: `${((show.totalSeats - show.availableSeats) / show.totalSeats) * 100}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};
