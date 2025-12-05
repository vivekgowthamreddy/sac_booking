import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Download, Share2, Home, Calendar, Clock, MapPin, Ticket } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface TicketConfirmationCleanProps {
  bookingId: string;
  onBackToDashboard: () => void;
}

export const TicketConfirmationClean: React.FC<TicketConfirmationCleanProps> = ({
  bookingId,
  onBackToDashboard,
}) => {
  const { bookings, shows } = useAuth();

  const booking = bookings.find(b => b.id === bookingId);
  const show = booking ? shows.find(s => s.id === booking.showId) : null;
  const seatNumber = booking ? booking.seatNumber : null;

  if (!booking || !show || !seatNumber) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#666666] mb-4">Booking not found</p>
          <button
            onClick={onBackToDashboard}
            className="px-6 py-3 bg-[#0066ff] text-white rounded-xl hover:bg-[#0052cc] smooth"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 bg-[#28a745] rounded-full flex items-center justify-center shadow-elevated">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl text-[#1a1a1a] mb-3">Booking Confirmed!</h1>
          <p className="text-[#666666]">Your seat has been successfully reserved</p>
        </motion.div>

        {/* Ticket Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-[#e5e5e5] rounded-3xl overflow-hidden shadow-card mb-8"
        >
          {/* Movie Header */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={show.posterUrl}
              alt={show.movieName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-3xl text-white mb-2">{show.movieName}</h2>
              <p className="text-white/90">{show.genre}</p>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="p-8 space-y-6">
            {/* Ticket Number */}
            <div className="text-center pb-6 border-b border-[#e5e5e5]">
              <p className="text-[#666666] text-sm mb-2">Ticket Number</p>
              <p className="text-2xl text-[#1a1a1a] tracking-wider">{booking.ticketNumber}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#666666] text-sm mb-1">
                  <Calendar className="w-4 h-4 text-[#0066ff]" />
                  <span>Date</span>
                </div>
                <p className="text-[#1a1a1a]">
                  {new Date(show.showDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#666666] text-sm mb-1">
                  <Clock className="w-4 h-4 text-[#0066ff]" />
                  <span>Time</span>
                </div>
                <p className="text-[#1a1a1a]">{show.showTime}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#666666] text-sm mb-1">
                  <Ticket className="w-4 h-4 text-[#0066ff]" />
                  <span>Seat</span>
                </div>
                <p className="text-[#1a1a1a] text-xl">{seatNumber}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#666666] text-sm mb-1">
                  <MapPin className="w-4 h-4 text-[#0066ff]" />
                  <span>Venue</span>
                </div>
                <p className="text-[#1a1a1a]">SAC Hall</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="pt-6 border-t border-[#e5e5e5]">
              <div className="bg-[#f5f5f5] rounded-2xl p-6 text-center">
                <p className="text-[#666666] text-sm mb-4">Scan at Entry</p>
                <div className="inline-block bg-white p-4 rounded-xl">
                  <img
                    src={booking.qrCode}
                    alt="QR Code"
                    className="w-48 h-48"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-[#e5e5e5] rounded-xl text-[#1a1a1a] hover:border-[#0066ff] hover:text-[#0066ff] smooth shadow-card"
            >
              <Download className="w-5 h-5" />
              Download
            </motion.button>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-[#e5e5e5] rounded-xl text-[#1a1a1a] hover:border-[#0066ff] hover:text-[#0066ff] smooth shadow-card"
            >
              <Share2 className="w-5 h-5" />
              Share
            </motion.button>
          </div>

          <motion.button
            onClick={onBackToDashboard}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#0066ff] rounded-xl text-white hover:bg-[#0052cc] smooth shadow-card"
          >
            <Home className="w-5 h-5" />
            Back to Dashboard
          </motion.button>
        </motion.div>

        {/* Important Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 bg-[#fff9e6] border border-[#ffc107] rounded-xl"
        >
          <p className="text-[#856404] text-sm text-center">
            Please arrive 15 minutes before showtime. Keep your QR code ready for scanning.
          </p>
        </motion.div>
      </div>
    </div>
  );
};
