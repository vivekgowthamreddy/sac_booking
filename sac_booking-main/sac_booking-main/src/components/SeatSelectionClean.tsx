import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SeatSelectionCleanProps {
  showId: string;
  onBack: () => void;
  onBookingComplete: (bookingId: string) => void;
}

export const SeatSelectionClean: React.FC<SeatSelectionCleanProps> = ({
  showId,
  onBack,
  onBookingComplete,
}) => {
  const { shows, seats, getShowSeats, createBooking, user } = useAuth();
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState('');

  React.useEffect(() => {
    if (showId) {
      getShowSeats(showId);
    }
  }, [showId]);

  const show = shows.find(s => s.id === showId);

  if (!show || !user) return null;

  const rows = Array.from({ length: show.rows }, (_, i) => String.fromCharCode(65 + i));
  const seatsPerRow = show.cols;

  const getSeatStatus = (row: string, seatNum: number) => {
    const seatNumber = `${row}-${seatNum}`;
    // Check if seat is in the damagedSeats array of the show
    if (show.damagedSeats && show.damagedSeats.includes(seatNumber)) {
      return 'damaged';
    }

    const seat = seats.find(s => s.seatNumber === seatNumber);
    return seat?.status || 'available';
  };

  const getSeatId = (row: string, seatNum: number) => {
    const seatNumber = `${row}-${seatNum}`;
    const seat = seats.find(s => s.seatNumber === seatNumber);
    // If seat doesn't exist in backend list yet (because it's dynamic), return a generated ID
    return seat?.id || `${showId}-${seatNumber}`;
  };

  const handleSeatClick = (row: string, seatNum: number) => {
    const status = getSeatStatus(row, seatNum);
    const seatNumber = `${row}-${seatNum}`;
    const seatId = getSeatId(row, seatNum);

    if (status !== 'available' || !seatId) return;

    setSelectedSeat(selectedSeat === seatNumber ? null : seatNumber);
    setError('');
  };

  const handleConfirmBooking = async () => {
    if (!selectedSeat) return;

    const seatId = getSeatId(
      selectedSeat.charAt(0),
      parseInt(selectedSeat.substring(2))
    );

    if (!seatId) return;

    setIsConfirming(true);
    setError('');

    const result = await createBooking(showId, selectedSeat);

    if (result.success && result.booking) {
      onBookingComplete(result.booking.id);
    } else {
      setError(result.error || 'Failed to create booking. Please try again.');
      setIsConfirming(false);
    }
  };

  const getSeatColor = (status: string, seatNumber: string) => {
    if (seatNumber === selectedSeat) {
      return 'bg-[#0066ff] border-[#0066ff] text-white shadow-[0_0_0_4px_rgba(0,102,255,0.1)]';
    }
    switch (status) {
      case 'available':
        return 'bg-[#f0fff4] border-[#28a745] text-[#28a745] hover:bg-[#28a745] hover:text-white hover:scale-110 cursor-pointer';
      case 'booked':
        return 'bg-[#fff9e6] border-[#ffc107] text-[#856404] cursor-not-allowed';
      case 'damaged':
        return 'bg-[#fff5f5] border-[#dc3545] text-[#dc3545] cursor-not-allowed';
      default:
        return 'bg-[#f5f5f5] border-[#e5e5e5]';
    }
  };

  return (
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
            Back to Shows
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#e5e5e5] rounded-2xl p-6 mb-6 shadow-card"
          >
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl text-[#1a1a1a] mb-2">{show.movieName}</h1>
                <div className="flex flex-wrap gap-4 text-[#666666] text-sm">
                  <span>{new Date(show.showDate).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{show.showTime}</span>
                  <span>•</span>
                  <span>{show.duration}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#666666] text-sm mb-1">Available Seats</p>
                <p className="text-2xl text-[#28a745]">{show.availableSeats}</p>
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
              className="mb-6"
            >
              <div className="bg-white border border-[#dc3545] rounded-2xl p-4 flex items-start gap-3 shadow-card">
                <AlertCircle className="w-5 h-5 text-[#dc3545] flex-shrink-0 mt-0.5" />
                <p className="text-[#dc3545] text-sm">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend */}
        <div className="mb-8">
          <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-card">
            <p className="text-[#666666] text-sm mb-4">Seat Status</p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#f0fff4] border-2 border-[#28a745] rounded" />
                <span className="text-[#666666] text-sm">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#fff9e6] border-2 border-[#ffc107] rounded" />
                <span className="text-[#666666] text-sm">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#fff5f5] border-2 border-[#dc3545] rounded" />
                <span className="text-[#666666] text-sm">Damaged</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#0066ff] border-2 border-[#0066ff] rounded" />
                <span className="text-[#666666] text-sm">Selected</span>
              </div>
            </div>
          </div>
        </div>

        {/* Screen */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="h-2 bg-gradient-to-r from-transparent via-[#d9d9d9] to-transparent rounded-full mb-2" />
            <p className="text-center text-[#999999] text-sm">SCREEN</p>
          </motion.div>
        </div>

        {/* Seats Grid */}
        <div className="mb-8">
          <div className="bg-white border border-[#e5e5e5] rounded-2xl p-8 overflow-x-auto clean-scroll shadow-card">
            <div className="min-w-[800px] flex flex-col items-center">
              {/* Rows A to L (38 seats: 19 - Steps - 19) */}
              {Array.from({ length: 12 }, (_, i) => String.fromCharCode(65 + i)).map((row, rowIndex) => (
                <motion.div
                  key={row}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: rowIndex * 0.02 }}
                  className="flex items-center gap-2 mb-3"
                >
                  {/* Row Label */}
                  <div className="w-8 text-center font-medium text-[#666666]">{row}</div>

                  {/* Left Side (1-19) */}
                  <div className="flex gap-1">
                    {Array.from({ length: 19 }, (_, i) => i + 1).map((seatNum) => {
                      const seatNumber = `${row}-${seatNum}`;
                      const status = getSeatStatus(row, seatNum); // Note: getSeatStatus needs to handle the new format if it relies on exact string match from backend
                      // Actually, let's update getSeatStatus to just take the full seatNumber string if possible, or keep it as is.
                      // The current getSeatStatus takes (row, seatNum). Let's check how it constructs the string.
                      // It constructs `${row}${seatNum}`. We need to change that to `${row}-${seatNum}` to match user request.
                      // But wait, the backend might still be sending `${row}${seatNum}` if we didn't update the seed/backend logic.
                      // However, for a new layout, we should probably stick to the requested format.
                      // Let's assume the backend just stores the string it receives.

                      const isClickable = status === 'available';

                      return (
                        <motion.button
                          key={seatNum}
                          onClick={() => handleSeatClick(row, seatNum)}
                          disabled={!isClickable}
                          whileHover={isClickable ? { y: -3, scale: 1.1 } : {}}
                          whileTap={isClickable ? { scale: 0.95 } : {}}
                          className={`w-8 h-8 rounded-md smooth relative flex items-center justify-center text-[10px] ${getSeatColor(
                            status,
                            seatNumber
                          )}`}
                          title={seatNumber}
                        >
                          {seatNum}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Steps Gap */}
                  <div className="w-16 flex items-center justify-center text-xs text-[#999999] font-medium tracking-widest">
                    STEPS
                  </div>

                  {/* Right Side (20-38) */}
                  <div className="flex gap-1">
                    {Array.from({ length: 19 }, (_, i) => i + 20).map((seatNum) => {
                      const seatNumber = `${row}-${seatNum}`;
                      const status = getSeatStatus(row, seatNum);
                      const isClickable = status === 'available';

                      return (
                        <motion.button
                          key={seatNum}
                          onClick={() => handleSeatClick(row, seatNum)}
                          disabled={!isClickable}
                          whileHover={isClickable ? { y: -3, scale: 1.1 } : {}}
                          whileTap={isClickable ? { scale: 0.95 } : {}}
                          className={`w-8 h-8 rounded-md smooth relative flex items-center justify-center text-[10px] ${getSeatColor(
                            status,
                            seatNumber
                          )}`}
                          title={seatNumber}
                        >
                          {seatNum}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Row Label (Right) */}
                  <div className="w-8 text-center font-medium text-[#666666]">{row}</div>
                </motion.div>
              ))}

              {/* Spacer */}
              <div className="h-8" />

              {/* Rows M to R (34 seats: 17 - Cabin - 17) */}
              {Array.from({ length: 6 }, (_, i) => String.fromCharCode(77 + i)).map((row, rowIndex) => (
                <motion.div
                  key={row}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (rowIndex + 12) * 0.02 }}
                  className="flex items-center gap-2 mb-3"
                >
                  {/* Row Label */}
                  <div className="w-8 text-center font-medium text-[#666666]">{row}</div>

                  {/* Left Side (1-17) */}
                  <div className="flex gap-1">
                    {Array.from({ length: 17 }, (_, i) => i + 1).map((seatNum) => {
                      const seatNumber = `${row}-${seatNum}`;
                      const status = getSeatStatus(row, seatNum);
                      const isClickable = status === 'available';

                      return (
                        <motion.button
                          key={seatNum}
                          onClick={() => handleSeatClick(row, seatNum)}
                          disabled={!isClickable}
                          whileHover={isClickable ? { y: -3, scale: 1.1 } : {}}
                          whileTap={isClickable ? { scale: 0.95 } : {}}
                          className={`w-8 h-8 rounded-md smooth relative flex items-center justify-center text-[10px] ${getSeatColor(
                            status,
                            seatNumber
                          )}`}
                          title={seatNumber}
                        >
                          {seatNum}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Cabin Gap */}
                  <div className="w-[calc(2rem+4px+32px)] flex items-center justify-center text-xs text-[#999999] font-medium tracking-widest bg-[#f0f0f0] rounded mx-2">
                    CABIN
                  </div>

                  {/* Right Side (18-34) */}
                  <div className="flex gap-1">
                    {Array.from({ length: 17 }, (_, i) => i + 18).map((seatNum) => {
                      const seatNumber = `${row}-${seatNum}`;
                      const status = getSeatStatus(row, seatNum);
                      const isClickable = status === 'available';

                      return (
                        <motion.button
                          key={seatNum}
                          onClick={() => handleSeatClick(row, seatNum)}
                          disabled={!isClickable}
                          whileHover={isClickable ? { y: -3, scale: 1.1 } : {}}
                          whileTap={isClickable ? { scale: 0.95 } : {}}
                          className={`w-8 h-8 rounded-md smooth relative flex items-center justify-center text-[10px] ${getSeatColor(
                            status,
                            seatNumber
                          )}`}
                          title={seatNumber}
                        >
                          {seatNum}
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Row Label (Right) */}
                  <div className="w-8 text-center font-medium text-[#666666]">{row}</div>
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
            >
              <div className="bg-white border border-[#0066ff] rounded-2xl p-6 shadow-elevated">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[#666666] text-sm mb-1">Selected Seat</p>
                    <p className="text-2xl text-[#1a1a1a]">{selectedSeat}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#666666] text-sm mb-1">Movie</p>
                    <p className="text-[#1a1a1a]">{show.movieName}</p>
                  </div>
                </div>

                <motion.button
                  onClick={handleConfirmBooking}
                  disabled={isConfirming}
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-4 bg-[#0066ff] rounded-xl text-white hover:bg-[#0052cc] smooth shadow-card disabled:opacity-50"
                >
                  <span className="flex items-center justify-center gap-2">
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
    </div>
  );
};
