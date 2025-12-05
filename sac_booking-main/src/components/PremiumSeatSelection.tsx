import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle2, Armchair, Sparkles, Zap } from 'lucide-react';
import { Show, Seat, Booking } from '../App';

interface PremiumSeatSelectionProps {
  show: Show;
  bookings: Booking[];
  onConfirm: (seat: Seat) => void;
  onBack: () => void;
}

export function PremiumSeatSelection({ show, bookings, onConfirm, onBack }: PremiumSeatSelectionProps) {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);

  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 10;

  const getSeatStatus = (seatId: string): 'available' | 'booked' | 'damaged' => {
    const bookedSeats = bookings
      .filter(b => b.showId === show.id)
      .map(b => b.seatId);
    
    const damagedSeats = ['C-7', 'E-3'];
    
    if (damagedSeats.includes(seatId)) return 'damaged';
    if (bookedSeats.includes(seatId)) return 'booked';
    return 'available';
  };

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'available') {
      setSelectedSeat(seat);
    }
  };

  const availableCount = rows.reduce((acc, row) => {
    return acc + Array.from({ length: seatsPerRow }).filter((_, i) => {
      const seatId = `${row}-${i + 1}`;
      return getSeatStatus(seatId) === 'available';
    }).length;
  }, 0);

  return (
    <div className="min-h-screen bg-[#0D0D0F] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-mesh" />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#6C63FF] rounded-full blur-3xl"
      />

      {/* Header */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -5 }}
              onClick={onBack}
              className="flex items-center gap-2 text-[#999BA3] hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back</span>
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-light px-6 py-3 rounded-2xl border border-white/10"
            >
              <div className="flex items-center gap-3">
                <Armchair className="w-5 h-5 text-[#6C63FF]" />
                <span className="text-white">{availableCount} seats available</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-white mb-2">Select Your Seat</h1>
            <p className="text-[#999BA3]">{show.movieName} • {show.time}</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-light p-6 rounded-2xl border border-white/10 mb-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { status: 'Available', color: 'from-[#10B981] to-[#059669]', icon: '●' },
              { status: 'Booked', color: 'from-[#F59E0B] to-[#D97706]', icon: '●' },
              { status: 'Damaged', color: 'from-[#EF4444] to-[#DC2626]', icon: '●' },
              { status: 'Selected', color: 'from-[#6C63FF] to-[#4EA8E9]', icon: '✓' },
            ].map((item, i) => (
              <motion.div
                key={item.status}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                className="flex items-center gap-3"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg`}>
                  {item.icon}
                </div>
                <span className="text-[#999BA3]">{item.status}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Screen */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <div className="relative max-w-4xl mx-auto">
            <motion.div
              className="h-3 rounded-full overflow-hidden mb-3"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="h-full bg-gradient-to-r from-transparent via-[#6C63FF] to-transparent relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
            <p className="text-center text-[#999BA3] text-sm tracking-wider uppercase">Screen</p>
          </div>
        </motion.div>

        {/* Seats Grid */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-light p-8 rounded-3xl border border-white/10 overflow-x-auto"
          >
            <div className="min-w-[700px]">
              {rows.map((row, rowIndex) => (
                <div key={row} className="flex items-center gap-3 mb-4 last:mb-0">
                  <div className="w-8 text-center text-[#999BA3] font-medium">{row}</div>
                  <div className="flex gap-3 flex-1 justify-center">
                    {Array.from({ length: seatsPerRow }, (_, i) => {
                      const seatNumber = i + 1;
                      const seatId = `${row}-${seatNumber}`;
                      const status = getSeatStatus(seatId);
                      const seat: Seat = {
                        id: seatId,
                        row,
                        number: seatNumber,
                        status
                      };
                      const isSelected = selectedSeat?.id === seatId;
                      const isHovered = hoveredSeat === seatId;

                      return (
                        <SeatButton
                          key={seatId}
                          seat={seat}
                          isSelected={isSelected}
                          isHovered={isHovered}
                          delay={rowIndex * 0.05 + i * 0.02}
                          onSelect={() => handleSeatClick(seat)}
                          onHoverStart={() => setHoveredSeat(seatId)}
                          onHoverEnd={() => setHoveredSeat(null)}
                        />
                      );
                    })}
                  </div>
                  <div className="w-8 text-center text-[#999BA3] font-medium">{row}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Selected Seat Info */}
        <AnimatePresence>
          {selectedSeat && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 max-w-5xl mx-auto"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] rounded-3xl blur-2xl opacity-30" />
                <div className="relative glass-light p-8 rounded-3xl border border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] rounded-2xl blur-xl"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <div className="relative w-20 h-20 bg-gradient-to-br from-[#6C63FF] to-[#4EA8E9] rounded-2xl flex items-center justify-center">
                          <span className="text-white text-2xl font-semibold">{selectedSeat.id}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-[#999BA3] mb-2">Selected Seat</p>
                        <h3 className="text-white">Seat {selectedSeat.id}</h3>
                        <p className="text-[#6C63FF] text-sm mt-1">Row {selectedSeat.row}, Position {selectedSeat.number}</p>
                      </div>
                    </div>

                    <motion.button
                      onClick={() => onConfirm(selectedSeat)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative px-8 py-4 bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] text-white rounded-2xl overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Confirm Booking
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                      />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SeatButton({ 
  seat, 
  isSelected, 
  isHovered, 
  delay, 
  onSelect, 
  onHoverStart, 
  onHoverEnd 
}: { 
  seat: Seat; 
  isSelected: boolean; 
  isHovered: boolean; 
  delay: number; 
  onSelect: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const getGradient = () => {
    if (isSelected) return 'from-[#6C63FF] to-[#4EA8E9]';
    switch (seat.status) {
      case 'available': return 'from-[#10B981] to-[#059669]';
      case 'booked': return 'from-[#F59E0B] to-[#D97706]';
      case 'damaged': return 'from-[#EF4444] to-[#DC2626]';
    }
  };

  return (
    <motion.button
      initial={{ scale: 0, rotateY: -180 }}
      animate={{ scale: 1, rotateY: 0 }}
      transition={{ 
        delay, 
        type: "spring", 
        stiffness: 200,
        damping: 15
      }}
      whileHover={seat.status === 'available' ? { 
        scale: 1.2,
        y: -5,
        rotateX: 10,
      } : {}}
      whileTap={seat.status === 'available' ? { scale: 0.9 } : {}}
      onClick={onSelect}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      disabled={seat.status !== 'available'}
      className={`
        relative w-12 h-12 rounded-xl transition-all duration-300
        ${seat.status !== 'available' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
      `}
      style={{ perspective: '1000px' }}
    >
      {/* Glow Effect */}
      {(isSelected || isHovered) && seat.status === 'available' && (
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${getGradient()} rounded-xl blur-lg`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
        />
      )}

      {/* Seat */}
      <div className={`
        relative w-full h-full rounded-xl bg-gradient-to-br ${getGradient()} 
        flex items-center justify-center text-white shadow-lg
        ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0D0D0F]' : ''}
      `}>
        {isSelected ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: "spring" }}
          >
            <CheckCircle2 className="w-6 h-6" />
          </motion.div>
        ) : (
          <span className="text-xs font-medium">{seat.number}</span>
        )}
      </div>

      {/* Shimmer Effect */}
      {seat.status === 'available' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-xl"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatDelay: 3,
            ease: "linear"
          }}
        />
      )}
    </motion.button>
  );
}
