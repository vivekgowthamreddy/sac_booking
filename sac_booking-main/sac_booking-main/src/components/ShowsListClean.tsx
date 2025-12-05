import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Film, Calendar, Clock, Users, Ticket, AlertCircle } from 'lucide-react';
import { useAuth, Show } from '../contexts/AuthContext';

interface ShowsListCleanProps {
  onBack: () => void;
  onShowSelect: (showId: string) => void;
}

export const ShowsListClean: React.FC<ShowsListCleanProps> = ({ onBack, onShowSelect }) => {
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
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <motion.button
              onClick={onBack}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -5 }}
              className="flex items-center gap-2 text-[#666666] hover:text-[#1a1a1a] smooth"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </motion.button>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="px-4 py-2 bg-white border border-[#e5e5e5] rounded-xl shadow-subtle"
            >
              <span className="text-[#666666] text-sm">Showing{' '}</span>
              <span className="text-[#0066ff]">
                {user.gender === 'male' ? 'Male' : 'Female'}
              </span>
              <span className="text-[#666666] text-sm">{' '}Shows</span>
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl text-[#1a1a1a] mb-4"
          >
            Browse Shows
          </motion.h1>

          {/* Filters */}
          <div className="flex gap-3">
            <motion.button
              onClick={() => setSelectedFilter('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-xl smooth ${
                selectedFilter === 'all'
                  ? 'bg-[#0066ff] text-white shadow-card'
                  : 'bg-white border border-[#e5e5e5] text-[#666666] hover:text-[#1a1a1a]'
              }`}
            >
              All Shows
            </motion.button>
            <motion.button
              onClick={() => setSelectedFilter('available')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-xl smooth ${
                selectedFilter === 'available'
                  ? 'bg-[#0066ff] text-white shadow-card'
                  : 'bg-white border border-[#e5e5e5] text-[#666666] hover:text-[#1a1a1a]'
              }`}
            >
              Available Only
            </motion.button>
          </div>
        </div>

        {/* Shows Grid */}
        <div>
          {filteredShows.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-[#e5e5e5] rounded-2xl p-12 text-center shadow-card"
            >
              <Film className="w-16 h-16 text-[#d9d9d9] mx-auto mb-4" />
              <p className="text-[#666666]">No shows available at the moment.</p>
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
                      className="bg-white border border-[#e5e5e5] rounded-2xl overflow-hidden hover-lift"
                    >
                      {/* Poster */}
                      <div className="aspect-[3/4] relative overflow-hidden">
                        <img
                          src={show.posterUrl}
                          alt={show.movieName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        
                        {/* Status Badge */}
                        {isBooked && (
                          <div className="absolute top-4 right-4 px-3 py-1 bg-[#28a745] rounded-lg">
                            <span className="text-white text-sm">Booked</span>
                          </div>
                        )}
                        {isFullyBooked && !isBooked && (
                          <div className="absolute top-4 right-4 px-3 py-1 bg-[#dc3545] rounded-lg">
                            <span className="text-white text-sm">Full</span>
                          </div>
                        )}

                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-2xl text-white mb-2">{show.movieName}</h3>
                          <p className="text-white/90 text-sm">{show.genre}</p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-6 space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-[#666666]">
                            <Calendar className="w-4 h-4 text-[#0066ff]" />
                            <span className="text-sm">
                              {new Date(show.showDate).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[#666666]">
                            <Clock className="w-4 h-4 text-[#0066ff]" />
                            <span className="text-sm">{show.showTime} • {show.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[#666666]">
                            <Users className="w-4 h-4 text-[#0066ff]" />
                            <span className="text-sm capitalize">{show.gender} Only</span>
                          </div>
                        </div>

                        {/* Availability */}
                        <div className="pt-4 border-t border-[#e5e5e5]">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[#666666] text-sm">Seats Available</span>
                            <span className={`${
                              show.availableSeats > 20
                                ? 'text-[#28a745]'
                                : show.availableSeats > 0
                                ? 'text-[#ffc107]'
                                : 'text-[#dc3545]'
                            }`}>
                              {show.availableSeats} / {show.totalSeats}
                            </span>
                          </div>
                          <div className="w-full bg-[#f5f5f5] rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(show.availableSeats / show.totalSeats) * 100}%` }}
                              transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                              className={`h-full ${
                                show.availableSeats > 20
                                  ? 'bg-[#28a745]'
                                  : show.availableSeats > 0
                                  ? 'bg-[#ffc107]'
                                  : 'bg-[#dc3545]'
                              }`}
                            />
                          </div>
                        </div>

                        {/* Action Button */}
                        {isBooked ? (
                          <div className="pt-4 flex items-center gap-2 text-[#28a745] justify-center">
                            <Ticket className="w-4 h-4" />
                            <span className="text-sm">Already Booked</span>
                          </div>
                        ) : isFullyBooked ? (
                          <div className="pt-4 flex items-center gap-2 text-[#dc3545] justify-center">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-sm">Fully Booked</span>
                          </div>
                        ) : (
                          <motion.button
                            onClick={() => onShowSelect(show.id)}
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 bg-[#0066ff] rounded-xl text-white hover:bg-[#0052cc] smooth shadow-card"
                          >
                            <span className="flex items-center justify-center gap-2">
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
    </div>
  );
};
