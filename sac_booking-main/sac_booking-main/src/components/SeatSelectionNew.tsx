import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SeatSelectionNewProps {
  showId: string;
  onBack: () => void;
  onBookingComplete: (bookingId: string) => void;
}

export const SeatSelectionNew: React.FC<SeatSelectionNewProps> = ({
  showId,
  onBack,
  onBookingComplete,
}) => {
  const { shows, getShowSeats, createBooking, user } = useAuth();
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState('');

  const show = shows.find(s => s.id === showId);
  const seats = getShowSeats(showId);

  if (!show || !user) return null;

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const seatsPerRow = 10;

  const getSeatStatus = (row: string, seatNum: number) => {
    const seatNumber = `${row}${seatNum}`;
    const seat = seats.find(s => s.seatNumber === seatNumber);
    return seat?.status || 'available';
  };

  const getSeatId = (row: string, seatNum: number) => {
    const seatNumber = `${row}${seatNum}`;
    const seat = seats.find(s => s.seatNumber === seatNumber);
    return seat?.id;
  };

  const handleSeatClick = (row: string, seatNum: number) => {
    const status = getSeatStatus(row, seatNum);
    const seatNumber = `${row}${seatNum}`;
    const seatId = getSeatId(row, seatNum);

    if (status !== 'available' || !seatId) return;

    setSelectedSeat(selectedSeat === seatNumber ? null : seatNumber);
    setError('');
  };

  const handleConfirmBooking = () => {
    if (!selectedSeat) return;

    const seatId = getSeatId(
      selectedSeat.charAt(0),
      parseInt(selectedSeat.substring(1))
    );

    if (!seatId) return;

    setIsConfirming(true);

    const booking = createBooking(showId, seatId);
    
    setTimeout(() => {
      if (booking) {
        onBookingComplete(booking.id);
      } else {
        setError('Failed to create booking. You may have already booked a seat for this show.');
        setIsConfirming(false);
      }
    }, 1500);
  };

  const getSeatColor = (status: string, seatNumber: string) => {
    if (seatNumber === selectedSeat) {
      return 'bg-purple-500 border-purple-400 shadow-lg shadow-purple-500/50';
    }
    switch (status) {
      case 'available':
        return 'bg-green-500/20 border-green-500/50 hover:bg-green-500/40 hover:scale-110 hover:shadow-lg hover:shadow-green-500/30';
      case 'booked':
        return 'bg-yellow-500/20 border-yellow-500/50 cursor-not-allowed';
      case 'damaged':
        return 'bg-red-500/20 border-red-500/50 cursor-not-allowed';
      default:
        return 'bg-white/5 border-white/10';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Content */}
      <div className="relative z-10 min-h-screen px-4 py-8">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-8">
          <motion.button
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-white/60 hover:text-white smooth-transition mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Shows
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-medium border border-white/10 rounded-2xl p-6 mb-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl text-white mb-2">{show.movieName}</h1>
                <div className="flex flex-wrap gap-4 text-white/60 text-sm">
                  <span>{new Date(show.showDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{show.showTime}</span>
                  <span>•</span>
                  <span>{show.duration}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-sm mb-1">Available Seats</p>
                <p className="text-2xl text-green-400">{show.availableSeats}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-5xl mx-auto mb-6"
            >
              <div className="glass-medium border border-red-500/30 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="glass-light border border-white/10 rounded-2xl p-6">
            <p className="text-white/60 text-sm mb-4">Seat Status</p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500/20 border border-green-500/50 rounded" />
                <span className="text-white/80 text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-yellow-500/20 border border-yellow-500/50 rounded" />
                <span className="text-white/80 text-sm">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-red-500/20 border border-red-500/50 rounded" />
                <span className="text-white/80 text-sm">Damaged</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-500 border border-purple-400 rounded" />
                <span className="text-white/80 text-sm">Selected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Screen */}
        <div className="max-w-5xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full mb-2" />
            <p className="text-center text-white/40 text-sm">SCREEN</p>
          </motion.div>
        </div>

        {/* Seats Grid */}
        <div className="max-w-5xl mx-auto mb-8">
          <div className="glass-medium border border-white/10 rounded-2xl p-8 overflow-x-auto premium-scroll">
            <div className="min-w-[600px]">
              {rows.map((row, rowIndex) => (
                <motion.div
                  key={row}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: rowIndex * 0.05 }}
                  className="flex items-center gap-2 mb-3"
                >
                  {/* Row Label */}
                  <div className="w-8 text-center">
                    <span className="text-white/60">{row}</span>
                  </div>

                  {/* Seats */}
                  <div className="flex-1 flex justify-center gap-2">
                    {Array.from({ length: seatsPerRow }, (_, i) => i + 1).map((seatNum) => {
                      const status = getSeatStatus(row, seatNum);
                      const seatNumber = `${row}${seatNum}`;
                      const isClickable = status === 'available';

                      return (
                        <motion.button
                          key={seatNum}
                          onClick={() => handleSeatClick(row, seatNum)}
                          disabled={!isClickable}
                          whileHover={isClickable ? { y: -4, scale: 1.1 } : {}}
                          whileTap={isClickable ? { scale: 0.95 } : {}}
                          className={`w-10 h-10 border-2 rounded-lg smooth-transition relative group ${getSeatColor(
                            status,
                            seatNumber
                          )}`}
                        >
                          <span className="text-xs text-white/80">{seatNum}</span>
                          
                          {/* Selected Indicator */}
                          {seatNumber === selectedSeat && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center"
                            >
                              <Check className="w-3 h-3 text-white" />
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Row Label (Right) */}
                  <div className="w-8 text-center">
                    <span className="text-white/60">{row}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <AnimatePresence>
          {selectedSeat && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="max-w-5xl mx-auto"
            >
              <div className="glass-medium border border-purple-500/30 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white/60 text-sm mb-1">Selected Seat</p>
                    <p className="text-2xl text-white">{selectedSeat}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 text-sm mb-1">Movie</p>
                    <p className="text-white">{show.movieName}</p>
                  </div>
                </div>

                <motion.button
                  onClick={handleConfirmBooking}
                  disabled={isConfirming}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white relative overflow-hidden group disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 smooth-transition" />
                  <span className="relative flex items-center justify-center gap-2">
                    {isConfirming ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Confirming Booking...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        Confirm Booking
                      </>
                    )}
                  </span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};
