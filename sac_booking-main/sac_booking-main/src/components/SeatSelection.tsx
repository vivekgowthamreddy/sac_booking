import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Show, Seat, Booking } from '../App';

interface SeatSelectionProps {
  show: Show;
  bookings: Booking[];
  onConfirm: (seat: Seat) => void;
  onBack: () => void;
}

export function SeatSelection({ show, bookings, onConfirm, onBack }: SeatSelectionProps) {
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  // Generate seats grid (6 rows x 10 seats)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 10;

  // Mock seat statuses - in real app, this would come from database
  const getSeatStatus = (seatId: string): 'available' | 'booked' | 'damaged' => {
    const bookedSeats = bookings
      .filter(b => b.showId === show.id)
      .map(b => b.seatId);
    
    // Mock some damaged seats
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

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-blue-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white mb-4 hover:text-blue-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h2 className="text-white mb-2">Select Your Seat</h2>
          <p className="text-blue-200">{show.movieName} • {show.time}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-md p-4 mb-6"
        >
          <div className="flex flex-wrap gap-6 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg" />
              <span className="text-gray-700 text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg" />
              <span className="text-gray-700 text-sm">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-500 rounded-lg" />
              <span className="text-gray-700 text-sm">Damaged</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-900 rounded-lg" />
              <span className="text-gray-700 text-sm">Selected</span>
            </div>
          </div>
        </motion.div>

        {/* Screen */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="max-w-2xl mx-auto">
            <div className="h-2 bg-gradient-to-r from-transparent via-blue-900 to-transparent rounded-full mb-2" />
            <p className="text-center text-gray-500 text-sm">Screen</p>
          </div>
        </motion.div>

        {/* Seats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6 overflow-x-auto"
        >
          <div className="min-w-[600px]">
            {rows.map((row, rowIndex) => (
              <div key={row} className="flex items-center gap-2 mb-3">
                <div className="w-8 text-center text-gray-600">{row}</div>
                <div className="flex gap-2 flex-1 justify-center">
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

                    return (
                      <motion.button
                        key={seatId}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: rowIndex * 0.05 + i * 0.01 }}
                        onClick={() => handleSeatClick(seat)}
                        disabled={status !== 'available'}
                        className={`
                          w-10 h-10 rounded-lg transition-all duration-200 flex items-center justify-center
                          ${isSelected ? 'bg-blue-900 text-white scale-110 shadow-lg' : ''}
                          ${!isSelected && status === 'available' ? 'bg-green-500 hover:bg-green-600 hover:scale-110 text-white' : ''}
                          ${status === 'booked' ? 'bg-yellow-500 cursor-not-allowed text-white' : ''}
                          ${status === 'damaged' ? 'bg-red-500 cursor-not-allowed text-white' : ''}
                        `}
                      >
                        {isSelected && <CheckCircle2 className="w-5 h-5" />}
                      </motion.button>
                    );
                  })}
                </div>
                <div className="w-8 text-center text-gray-600">{row}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Selected Seat Info */}
        {selectedSeat && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 rounded-2xl p-6 mb-6 border border-blue-100"
          >
            <h4 className="text-blue-900 mb-3">Selected Seat</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900 mb-1">Seat Number</p>
                <p className="text-gray-600">{selectedSeat.id}</p>
              </div>
              <div className="w-16 h-16 bg-blue-900 rounded-xl flex items-center justify-center">
                <span className="text-white">{selectedSeat.id}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Fixed Bottom Bar */}
      {selectedSeat && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl"
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <div>
              <p className="text-gray-600 text-sm">Selected Seat</p>
              <p className="text-gray-900">{selectedSeat.id}</p>
            </div>
            <Button
              onClick={() => onConfirm(selectedSeat)}
              className="h-12 px-8 bg-blue-900 hover:bg-blue-800 text-white rounded-xl transition-colors"
            >
              Confirm Booking
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
