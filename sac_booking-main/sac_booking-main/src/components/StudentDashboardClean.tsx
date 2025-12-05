import React from 'react';
import { motion } from 'motion/react';
import { Film, LogOut, User, Ticket, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface StudentDashboardCleanProps {
  onShowsClick: () => void;
  onBookingsClick: () => void;
}

export const StudentDashboardClean: React.FC<StudentDashboardCleanProps> = ({
  onShowsClick,
  onBookingsClick,
}) => {
  const { user, logout, shows, getUserBookings } = useAuth();

  if (!user) return null;

  const userShows = shows.filter(show => show.gender === user.gender);
  const userBookings = getUserBookings(user.id);
  const upcomingShows = userShows.slice(0, 3);

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
              <h1 className="text-4xl text-[#1a1a1a] mb-2">Welcome back!</h1>
              <div className="flex items-center gap-2 text-[#666666]">
                <User className="w-4 h-4" />
                <p>{user.email}</p>
                <span className="px-2 py-1 bg-[#f0f9ff] text-[#0066ff] rounded-lg text-xs ml-2 border border-[#e5e5e5]">
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
              className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e5e5e5] rounded-xl text-[#666666] hover:text-[#1a1a1a] smooth"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-card"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#f0f9ff] rounded-xl flex items-center justify-center">
                <Film className="w-6 h-6 text-[#0066ff]" />
              </div>
              <div>
                <p className="text-[#666666] text-sm">Available Shows</p>
                <p className="text-2xl text-[#1a1a1a]">{userShows.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-card"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#f0f9ff] rounded-xl flex items-center justify-center">
                <Ticket className="w-6 h-6 text-[#0066ff]" />
              </div>
              <div>
                <p className="text-[#666666] text-sm">My Bookings</p>
                <p className="text-2xl text-[#1a1a1a]">{userBookings.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-card"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#f0fff4] rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#28a745]" />
              </div>
              <div>
                <p className="text-[#666666] text-sm">Upcoming</p>
                <p className="text-2xl text-[#1a1a1a]">{upcomingShows.length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl text-[#1a1a1a] mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.button
              onClick={onShowsClick}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-8 bg-white border border-[#e5e5e5] rounded-2xl text-left hover-lift"
            >
              <div className="mb-4 inline-block">
                <Film className="w-12 h-12 text-[#0066ff]" />
              </div>
              <h3 className="text-xl text-[#1a1a1a] mb-2">Browse Shows</h3>
              <p className="text-[#666666]">Explore available movies and book seats</p>
            </motion.button>

            <motion.button
              onClick={onBookingsClick}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-8 bg-white border border-[#e5e5e5] rounded-2xl text-left hover-lift"
            >
              <div className="mb-4 inline-block">
                <Ticket className="w-12 h-12 text-[#0066ff]" />
              </div>
              <h3 className="text-xl text-[#1a1a1a] mb-2">My Bookings</h3>
              <p className="text-[#666666]">View your tickets and booking history</p>
            </motion.button>
          </div>
        </div>

        {/* Upcoming Shows */}
        <div>
          <h2 className="text-2xl text-[#1a1a1a] mb-6">Upcoming Shows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingShows.map((show, index) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white border border-[#e5e5e5] rounded-2xl overflow-hidden hover-lift"
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
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[#28a745] text-sm">{show.availableSeats} seats left</span>
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
