import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Ticket, Calendar, Clock, MapPin, Film } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface BookingHistoryCleanProps {
  onBack: () => void;
}

export const BookingHistoryClean: React.FC<BookingHistoryCleanProps> = ({ onBack }) => {
  const { user, bookings, shows, getUserBookings, cancelBooking } = useAuth();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  if (!user) return null;

  useEffect(() => {
    getUserBookings();
  }, []);
  const userBookings = bookings;

  return (
    <>
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="max-w-5xl mx-auto px-4 py-8">
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

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl text-[#1a1a1a] mb-2"
          >
            My Bookings
          </motion.h1>
          <p className="text-[#666666]">View all your ticket bookings</p>
        </div>

        {/* Bookings List */}
        {userBookings.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#e5e5e5] rounded-2xl p-12 text-center shadow-card"
          >
            <Ticket className="w-16 h-16 text-[#d9d9d9] mx-auto mb-4" />
            <p className="text-[#666666] mb-4">No bookings yet</p>
            <button
              onClick={onBack}
              className="px-6 py-3 bg-[#0066ff] text-white rounded-xl hover:bg-[#0052cc] smooth"
            >
              Browse Shows
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {userBookings.map((booking, index) => {
              const show = shows.find(s => s.id === booking.showId);
              if (!show) return null;

              const showDate = new Date(show.showDate);
              const isPastShow = showDate < new Date();

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-[#e5e5e5] rounded-2xl overflow-hidden shadow-card hover-lift"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Poster */}
                    <div className="md:w-48 h-48 md:h-auto overflow-hidden flex-shrink-0">
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
                          <h3 className="text-2xl text-[#1a1a1a] mb-1">{show.movieName}</h3>
                          <p className="text-[#666666] text-sm">{show.genre}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-lg text-xs ${
                          isPastShow
                            ? 'bg-[#f5f5f5] text-[#999999]'
                            : 'bg-[#f0fff4] text-[#28a745] border border-[#28a745]'
                        }`}>
                          {isPastShow ? 'Completed' : 'Upcoming'}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#f0f9ff] rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-[#0066ff]" />
                          </div>
                          <div>
                            <p className="text-[#999999] text-xs">Date</p>
                            <p className="text-[#1a1a1a]">
                              {showDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#f0f9ff] rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-[#0066ff]" />
                          </div>
                          <div>
                            <p className="text-[#999999] text-xs">Time</p>
                            <p className="text-[#1a1a1a]">{show.showTime}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#f0f9ff] rounded-lg flex items-center justify-center">
                            <Ticket className="w-5 h-5 text-[#0066ff]" />
                          </div>
                          <div>
                            <p className="text-[#999999] text-xs">Seat</p>
                            <p className="text-[#1a1a1a] text-xl">{booking.seatNumber}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#f0f9ff] rounded-lg flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-[#0066ff]" />
                          </div>
                          <div>
                            <p className="text-[#999999] text-xs">Venue</p>
                            <p className="text-[#1a1a1a]">SAC Hall</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#e5e5e5]">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[#999999] text-xs mb-1">Ticket Number</p>
                            <p className="text-[#1a1a1a] tracking-wider">{booking.ticketNumber}</p>
                          </div>
                          <div className="w-20 h-20 bg-white border border-[#e5e5e5] rounded-lg p-1">
                            <img
                              src={booking.qrCode}
                              alt="QR Code"
                              className="w-full h-full"
                            />
                          </div>
                          <button
                            onClick={() => setConfirmId(booking.id)}
                            className="ml-4 px-3 py-2 bg-[#dc3545] text-white rounded-lg hover:bg-[#b52a39] smooth"
                          >
                            Cancel
                          </button>
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
    {confirmId && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-sm">
          <h3 className="text-[#1a1a1a] text-lg mb-2">Cancel booking?</h3>
          <p className="text-[#666666] mb-4">This will free your seat and remove the ticket.</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setConfirmId(null)}
              className="px-4 py-2 bg-[#f5f5f5] rounded-lg text-[#1a1a1a]"
            >
              Keep
            </button>
            <button
              onClick={async () => {
                const id = confirmId;
                setConfirmId(null);
                if (id) await cancelBooking(id);
              }}
              className="px-4 py-2 bg-[#dc3545] text-white rounded-lg"
            >
              Cancel booking
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};
