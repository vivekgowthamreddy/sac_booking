import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Film, Calendar, Clock, Users, Ticket, AlertCircle } from 'lucide-react';
import { useAuth, Show } from '../contexts/AuthContext';

interface ShowsListProps {
  onBack: () => void;
  onShowSelect: (showId: string) => void;
}

export const ShowsList: React.FC<ShowsListProps> = ({ onBack, onShowSelect }) => {
  const { user, shows, bookings } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'available'>('all');

  if (!user) return null;

  const userShows = shows.filter(show => show.gender === user.gender);
  const filteredShows = selectedFilter === 'available'
    ? userShows.filter(show => show.availableSeats > 0)
    : userShows;

  const hasBooked = (showId: string) => {
    return bookings.some(b => b.userId === user.id && b.showId === showId);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Content */}
      <div className="relative z-10 min-h-screen px-4 py-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <motion.button
              onClick={onBack}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -5 }}
              className="flex items-center gap-2 text-white/60 hover:text-white smooth-transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </motion.button>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="px-4 py-2 glass-light border border-white/10 rounded-xl"
            >
              <span className="text-white/60 text-sm">Showing{' '}</span>
              <span className="text-purple-400">
                {user.gender === 'male' ? 'Male' : 'Female'}
              </span>
              <span className="text-white/60 text-sm">{' '}Shows</span>
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl text-white mb-4"
          >
            Browse Shows
          </motion.h1>

          {/* Filters */}
          <div className="flex gap-3">
            <motion.button
              onClick={() => setSelectedFilter('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-xl smooth-transition ${
                selectedFilter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'glass-light border border-white/10 text-white/60 hover:text-white'
              }`}
            >
              All Shows
            </motion.button>
            <motion.button
              onClick={() => setSelectedFilter('available')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-xl smooth-transition ${
                selectedFilter === 'available'
                  ? 'bg-purple-600 text-white'
                  : 'glass-light border border-white/10 text-white/60 hover:text-white'
              }`}
            >
              Available Only
            </motion.button>
          </div>
        </div>

        {/* Shows Grid */}
        <div className="max-w-7xl mx-auto">
          {filteredShows.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-medium border border-white/10 rounded-2xl p-12 text-center"
            >
              <Film className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <p className="text-white/60">No shows available at the moment.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredShows.map((show, index) => {
                  const isBooked = hasBooked(show.id);
                  const isFullyBooked = show.availableSeats === 0;

                  return (
                    <motion.div
                      key={show.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      className="group glass-medium border border-white/10 rounded-2xl overflow-hidden smooth-transition"
                    >
                      {/* Poster */}
                      <div className="aspect-[3/4] relative overflow-hidden">
                        <img
                          src={show.posterUrl}
                          alt={show.movieName}
                          className="w-full h-full object-cover group-hover:scale-110 smooth-transition"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                        
                        {/* Status Badge */}
                        {isBooked && (
                          <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/80 backdrop-blur-sm rounded-lg">
                            <span className="text-white text-sm">Booked</span>
                          </div>
                        )}
                        {isFullyBooked && !isBooked && (
                          <div className="absolute top-4 right-4 px-3 py-1 bg-red-500/80 backdrop-blur-sm rounded-lg">
                            <span className="text-white text-sm">Full</span>
                          </div>
                        )}

                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-2xl text-white mb-2">{show.movieName}</h3>
                          <p className="text-white/80 text-sm">{show.genre}</p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-6 space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-white/70">
                            <Calendar className="w-4 h-4 text-purple-400" />
                            <span className="text-sm">
                              {new Date(show.showDate).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-white/70">
                            <Clock className="w-4 h-4 text-purple-400" />
                            <span className="text-sm">{show.showTime} • {show.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/70">
                            <Users className="w-4 h-4 text-purple-400" />
                            <span className="text-sm capitalize">{show.gender} Only</span>
                          </div>
                        </div>

                        {/* Availability */}
                        <div className="pt-4 border-t border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white/60 text-sm">Seats Available</span>
                            <span className={`${
                              show.availableSeats > 20
                                ? 'text-green-400'
                                : show.availableSeats > 0
                                ? 'text-yellow-400'
                                : 'text-red-400'
                            }`}>
                              {show.availableSeats} / {show.totalSeats}
                            </span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(show.availableSeats / show.totalSeats) * 100}%` }}
                              transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                              className={`h-full ${
                                show.availableSeats > 20
                                  ? 'bg-green-500'
                                  : show.availableSeats > 0
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                              }`}
                            />
                          </div>
                        </div>

                        {/* Action Button */}
                        {isBooked ? (
                          <div className="pt-4 flex items-center gap-2 text-green-400 justify-center">
                            <Ticket className="w-4 h-4" />
                            <span className="text-sm">Already Booked</span>
                          </div>
                        ) : isFullyBooked ? (
                          <div className="pt-4 flex items-center gap-2 text-red-400 justify-center">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-sm">Fully Booked</span>
                          </div>
                        ) : (
                          <motion.button
                            onClick={() => onShowSelect(show.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white relative overflow-hidden group/btn"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover/btn:opacity-100 smooth-transition" />
                            <span className="relative flex items-center justify-center gap-2">
                              <Ticket className="w-4 h-4" />
                              Book Seats
                            </span>
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
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
