import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Ticket, Calendar, Clock, MapPin, Film, QrCode } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface BookingHistoryProps {
  onBack: () => void;
}

export const BookingHistory: React.FC<BookingHistoryProps> = ({ onBack }) => {
  const { user, getUserBookings, shows, seats } = useAuth();

  if (!user) return null;

  const userBookings = getUserBookings(user.id);

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Content */}
      <div className="relative z-10 min-h-screen px-4 py-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
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
            My Bookings
          </motion.h1>
          <p className="text-white/60">View your ticket history and details</p>
        </div>

        {/* Bookings List */}
        <div className="max-w-4xl mx-auto">
          {userBookings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-medium border border-white/10 rounded-2xl p-12 text-center"
            >
              <Ticket className="w-16 h-16 text-white/40 mx-auto mb-4" />
              <p className="text-white/60">No bookings found</p>
              <p className="text-white/40 text-sm mt-2">Book your first show to see tickets here</p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {userBookings.map((booking, index) => {
                const show = shows.find(s => s.id === booking.showId);
                const seat = seats.find(s => s.id === booking.seatId);

                if (!show || !seat) return null;

                const showDate = new Date(show.showDate);
                const isPast = showDate < new Date();

                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="glass-medium border border-white/10 rounded-2xl overflow-hidden smooth-transition"
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Poster */}
                      <div className="md:w-48 aspect-[3/4] md:aspect-auto relative overflow-hidden">
                        <img
                          src={show.posterUrl}
                          alt={show.movieName}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/80 to-transparent" />
                      </div>

                      {/* Details */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl text-white mb-1">{show.movieName}</h3>
                            <p className="text-white/60 text-sm">{show.genre}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-lg ${
                            isPast
                              ? 'bg-white/10 text-white/60'
                              : 'bg-green-500/20 border border-green-500/30 text-green-400'
                          }`}>
                            <span className="text-sm">{isPast ? 'Past' : 'Upcoming'}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="flex items-start gap-2">
                            <Calendar className="w-4 h-4 text-purple-400 mt-1" />
                            <div>
                              <p className="text-white/60 text-xs mb-1">Date</p>
                              <p className="text-white text-sm">
                                {showDate.toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <Clock className="w-4 h-4 text-purple-400 mt-1" />
                            <div>
                              <p className="text-white/60 text-xs mb-1">Time</p>
                              <p className="text-white text-sm">{show.showTime}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-purple-400 mt-1" />
                            <div>
                              <p className="text-white/60 text-xs mb-1">Seat</p>
                              <p className="text-white text-sm">{seat.seatNumber}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <Ticket className="w-4 h-4 text-purple-400 mt-1" />
                            <div>
                              <p className="text-white/60 text-xs mb-1">Ticket</p>
                              <p className="text-white text-sm">{booking.ticketNumber}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.open(booking.qrCode, '_blank')}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-600/30 smooth-transition"
                          >
                            <QrCode className="w-4 h-4" />
                            View QR
                          </motion.button>

                          <div className="flex-1 text-right">
                            <p className="text-white/40 text-xs">
                              Booked on {new Date(booking.bookingDate).toLocaleDateString()}
                            </p>
                          </div>
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

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};
