import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Download, Home, Calendar, Clock, MapPin, Ticket, QrCode } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface TicketConfirmationNewProps {
  bookingId: string;
  onBackToDashboard: () => void;
}

export const TicketConfirmationNew: React.FC<TicketConfirmationNewProps> = ({
  bookingId,
  onBackToDashboard,
}) => {
  const { bookings, shows, seats, user } = useAuth();

  const booking = bookings.find(b => b.id === bookingId);
  const show = booking ? shows.find(s => s.id === booking.showId) : null;
  const seat = booking ? seats.find(s => s.id === booking.seatId) : null;

  if (!booking || !show || !seat || !user) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden flex items-center justify-center px-4 py-12">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Success Animation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5 }}
          className="w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 blur-2xl bg-green-500/30 rounded-full"
            />
            <CheckCircle className="relative w-20 h-20 text-green-400" />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl text-white mb-2">Booking Confirmed!</h1>
          <p className="text-white/60">Your seat has been successfully reserved</p>
        </motion.div>

        {/* Ticket Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-medium border border-white/10 rounded-3xl overflow-hidden shadow-2xl mb-6"
        >
          {/* Ticket Header */}
          <div className="relative p-8 bg-gradient-to-br from-purple-600/20 to-blue-600/20">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-white/60 text-sm mb-1">Ticket Number</p>
                <p className="text-2xl text-white tracking-wider">{booking.ticketNumber}</p>
              </div>
              <div className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-lg">
                <span className="text-green-400 text-sm">Confirmed</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-white/60 text-sm mb-1">Movie</p>
                <p className="text-white">{show.movieName}</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Seat</p>
                <p className="text-white text-xl">{seat.seatNumber}</p>
              </div>
            </div>
          </div>

          {/* Perforation */}
          <div className="relative h-8 bg-[#0a0a0f]">
            <div className="absolute top-0 left-0 right-0 flex justify-between">
              <div className="w-4 h-4 -mt-2 bg-[#0a0a0f] rounded-full" />
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className="w-2 h-2 -mt-1 bg-white/10 rounded-full" />
              ))}
              <div className="w-4 h-4 -mt-2 bg-[#0a0a0f] rounded-full" />
            </div>
          </div>

          {/* Ticket Details */}
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <p className="text-white/60 text-sm mb-1">Date</p>
                  <p className="text-white">
                    {new Date(show.showDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <p className="text-white/60 text-sm mb-1">Time</p>
                  <p className="text-white">{show.showTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <p className="text-white/60 text-sm mb-1">Venue</p>
                  <p className="text-white">SAC Hall, RGUKT Nuzvid</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Ticket className="w-5 h-5 text-purple-400 mt-1" />
                <div>
                  <p className="text-white/60 text-sm mb-1">Student ID</p>
                  <p className="text-white">{user.rollNumber}</p>
                </div>
              </div>
            </div>

            {/* QR Code */}
            <div className="pt-6 border-t border-white/10">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="absolute inset-0 blur-xl bg-purple-500/30 rounded-2xl" />
                  <div className="relative p-4 bg-white rounded-2xl">
                    <img
                      src={booking.qrCode}
                      alt="QR Code"
                      className="w-48 h-48"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <QrCode className="w-4 h-4" />
                  <span>Scan at entry</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 px-6 py-3 glass-medium border border-white/10 rounded-xl text-white hover:border-purple-500/50 smooth-transition"
          >
            <Download className="w-5 h-5" />
            Download Ticket
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBackToDashboard}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 smooth-transition" />
            <span className="relative flex items-center gap-2">
              <Home className="w-5 h-5" />
              Back to Dashboard
            </span>
          </motion.button>
        </div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 glass-light border border-white/10 rounded-2xl p-6"
        >
          <p className="text-white/80 mb-2">Important Information:</p>
          <ul className="space-y-2 text-white/60 text-sm">
            <li>• Please arrive 15 minutes before the show time</li>
            <li>• Carry your college ID for verification</li>
            <li>• You are responsible for any damage to seat {seat.seatNumber}</li>
            <li>• Report any existing damage before the show starts</li>
          </ul>
        </motion.div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-green-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};
