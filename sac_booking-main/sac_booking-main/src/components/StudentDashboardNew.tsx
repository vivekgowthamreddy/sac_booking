import React from 'react';
import { motion } from 'motion/react';
import { Film, LogOut, User, Ticket, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface StudentDashboardNewProps {
  onShowsClick: () => void;
  onBookingsClick: () => void;
}

export const StudentDashboardNew: React.FC<StudentDashboardNewProps> = ({
  onShowsClick,
  onBookingsClick,
}) => {
  const { user, logout, shows, getUserBookings } = useAuth();

  if (!user) return null;

  const userShows = shows.filter(show => show.gender === user.gender);
  const userBookings = getUserBookings(user.id);
  const upcomingShows = userShows.slice(0, 3);

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
              <h1 className="text-4xl text-white mb-2">Welcome back!</h1>
              <div className="flex items-center gap-2 text-white/60">
                <User className="w-4 h-4" />
                <p>{user.email}</p>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-xs ml-2">
                  {user.gender === 'male' ? 'Male' : 'Female'}
                </span>
              </div>
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

        {/* Stats Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-medium border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Film className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Available Shows</p>
                <p className="text-2xl text-white">{userShows.length}</p>
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
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Ticket className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">My Bookings</p>
                <p className="text-2xl text-white">{userBookings.length}</p>
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
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Upcoming</p>
                <p className="text-2xl text-white">{upcomingShows.length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="max-w-7xl mx-auto mb-12">
          <h2 className="text-2xl text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.button
              onClick={onShowsClick}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative p-8 glass-medium border border-white/10 rounded-2xl text-left smooth-transition overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 smooth-transition" />
              <div className="relative">
                <div className="mb-4 inline-block">
                  <div className="relative">
                    <div className="absolute inset-0 blur-xl bg-purple-500/30 group-hover:bg-purple-500/50 smooth-transition rounded-full" />
                    <Film className="relative w-12 h-12 text-purple-400" />
                  </div>
                </div>
                <h3 className="text-xl text-white mb-2">Browse Shows</h3>
                <p className="text-white/60">Explore available movies and book seats</p>
              </div>
            </motion.button>

            <motion.button
              onClick={onBookingsClick}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -5, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative p-8 glass-medium border border-white/10 rounded-2xl text-left smooth-transition overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 smooth-transition" />
              <div className="relative">
                <div className="mb-4 inline-block">
                  <div className="relative">
                    <div className="absolute inset-0 blur-xl bg-blue-500/30 group-hover:bg-blue-500/50 smooth-transition rounded-full" />
                    <Ticket className="relative w-12 h-12 text-blue-400" />
                  </div>
                </div>
                <h3 className="text-xl text-white mb-2">My Bookings</h3>
                <p className="text-white/60">View your tickets and booking history</p>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Upcoming Shows */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl text-white mb-6">Upcoming Shows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingShows.map((show, index) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
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
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white mb-1">{show.movieName}</h3>
                    <p className="text-white/60 text-sm">{show.genre}</p>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(show.showDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/60 text-sm">
                    <Film className="w-4 h-4" />
                    <span>{show.showTime} • {show.duration}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-green-400 text-sm">{show.availableSeats} seats left</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};
