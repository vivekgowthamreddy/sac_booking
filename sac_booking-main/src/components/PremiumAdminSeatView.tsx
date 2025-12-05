import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, X, AlertCircle, Camera, Save, User, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Show, Booking, Seat } from '../App';

interface PremiumAdminSeatViewProps {
  show: Show;
  bookings: Booking[];
  onBack: () => void;
}

interface SeatInfo {
  seat: Seat;
  currentStudent?: Booking;
  previousStudent?: string;
}

export function PremiumAdminSeatView({ show, bookings, onBack }: PremiumAdminSeatViewProps) {
  const [selectedSeatInfo, setSelectedSeatInfo] = useState<SeatInfo | null>(null);
  const [showDamageForm, setShowDamageForm] = useState(false);
  const [damageComments, setDamageComments] = useState('');

  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 10;

  const getSeatStatus = (seatId: string): 'available' | 'booked' | 'damaged' => {
    const damagedSeats = ['C-7', 'E-3'];
    if (damagedSeats.includes(seatId)) return 'damaged';
    
    const booking = bookings.find(b => b.showId === show.id && b.seatId === seatId);
    if (booking) return 'booked';
    
    return 'available';
  };

  const handleSeatClick = (seatId: string) => {
    const status = getSeatStatus(seatId);
    const seat: Seat = {
      id: seatId,
      row: seatId.split('-')[0],
      number: parseInt(seatId.split('-')[1]),
      status
    };
    
    const currentStudent = bookings.find(b => b.showId === show.id && b.seatId === seatId);
    
    setSelectedSeatInfo({
      seat,
      currentStudent,
      previousStudent: 'CS20045'
    });
  };

  return (
    <div className="min-h-screen bg-[#0D0D0F]">
      {/* Background */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-white mb-2">Seat Inspection</h2>
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
          className="glass-medium rounded-2xl border border-white/10 p-6 mb-8"
        >
          <div className="flex flex-wrap gap-6 justify-center">
            {[
              { color: 'from-green-500 to-emerald-500', label: 'Available' },
              { color: 'from-yellow-500 to-orange-500', label: 'Booked' },
              { color: 'from-red-500 to-pink-500', label: 'Damaged' }
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color}`} />
                <span className="text-white/80">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Screen */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="max-w-5xl mx-auto">
            <div className="h-3 bg-gradient-to-r from-transparent via-[#6C63FF] to-transparent rounded-full mb-3 glow-primary" />
            <p className="text-center text-[#999BA3] uppercase tracking-widest text-sm">Screen</p>
          </div>
        </motion.div>

        {/* Seats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-medium rounded-3xl border border-white/10 p-8 mb-8 overflow-x-auto premium-scroll"
        >
          <div className="min-w-[800px]">
            {rows.map((row, rowIndex) => (
              <motion.div
                key={row}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + rowIndex * 0.05 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-12 text-center">
                  <span className="text-white/60 font-mono">{row}</span>
                </div>
                <div className="flex gap-3 flex-1 justify-center">
                  {Array.from({ length: seatsPerRow }, (_, i) => {
                    const seatNumber = i + 1;
                    const seatId = `${row}-${seatNumber}`;
                    const status = getSeatStatus(seatId);

                    return (
                      <motion.button
                        key={seatId}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: 0.5 + rowIndex * 0.05 + i * 0.01,
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ scale: 1.15, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSeatClick(seatId)}
                        className={`
                          relative w-14 h-14 rounded-xl flex items-center justify-center text-white transition-all group
                          ${status === 'available' ? 'bg-gradient-to-br from-green-500 to-emerald-500 hover:shadow-lg hover:shadow-green-500/50' : ''}
                          ${status === 'booked' ? 'bg-gradient-to-br from-yellow-500 to-orange-500 hover:shadow-lg hover:shadow-yellow-500/50' : ''}
                          ${status === 'damaged' ? 'bg-gradient-to-br from-red-500 to-pink-500 hover:shadow-lg hover:shadow-red-500/50' : ''}
                        `}
                      >
                        <span className="text-sm">{seatNumber}</span>
                        {status === 'damaged' && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>
                <div className="w-12 text-center">
                  <span className="text-white/60 font-mono">{row}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="glass-light rounded-2xl border border-[#6C63FF]/20 p-6"
        >
          <p className="text-[#6C63FF] mb-2">💡 Pro Tip</p>
          <p className="text-white/70 text-sm">
            Click any seat to view detailed information, booking history, and accountability records.
            Report damage with photo evidence to maintain transparency.
          </p>
        </motion.div>
      </div>

      {/* Seat Info Modal */}
      <AnimatePresence>
        {selectedSeatInfo && !showDamageForm && (
          <Dialog open={true} onOpenChange={() => setSelectedSeatInfo(null)}>
            <DialogContent className="bg-[#0D0D0F] border-white/10 max-w-md">
              <DialogTitle className="text-white">Seat {selectedSeatInfo.seat.id}</DialogTitle>
              <DialogDescription className="sr-only">
                View seat information including current booking and previous occupant
              </DialogDescription>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="mb-6">
                  <div className="flex items-center justify-end mb-4">
                    <div className={`
                      px-3 py-1 rounded-lg text-sm
                      ${selectedSeatInfo.seat.status === 'available' ? 'bg-green-500/20 text-green-400' : ''}
                      ${selectedSeatInfo.seat.status === 'booked' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                      ${selectedSeatInfo.seat.status === 'damaged' ? 'bg-red-500/20 text-red-400' : ''}
                    `}>
                      {selectedSeatInfo.seat.status}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {selectedSeatInfo.currentStudent && (
                    <div className="glass-light rounded-2xl p-4 border border-white/10">
                      <div className="flex items-center gap-3 mb-3">
                        <User className="w-5 h-5 text-[#6C63FF]" />
                        <p className="text-white/60 text-sm">Current Booking</p>
                      </div>
                      <p className="text-white mb-1">{selectedSeatInfo.currentStudent.studentName}</p>
                      <p className="text-white/60 text-sm mb-2">{selectedSeatInfo.currentStudent.studentId}</p>
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <Clock className="w-3 h-3" />
                        {new Date(selectedSeatInfo.currentStudent.timestamp).toLocaleString()}
                      </div>
                    </div>
                  )}

                  {selectedSeatInfo.previousStudent && (
                    <div className="glass-light rounded-2xl p-4 border border-white/10">
                      <p className="text-white/60 text-sm mb-2">Previous Occupant</p>
                      <p className="text-white">{selectedSeatInfo.previousStudent}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    {selectedSeatInfo.seat.status !== 'damaged' && (
                      <Button
                        onClick={() => setShowDamageForm(true)}
                        className="flex-1 h-12 bg-gradient-to-r from-red-500 to-pink-500 hover:shadow-lg hover:shadow-red-500/50 text-white rounded-xl transition-all border-0"
                      >
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Report Damage
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}

        {showDamageForm && (
          <Dialog open={true} onOpenChange={() => setShowDamageForm(false)}>
            <DialogContent className="bg-[#0D0D0F] border-white/10 max-w-md">
              <DialogTitle className="text-white">Report Seat Damage</DialogTitle>
              <DialogDescription className="text-white/60 text-sm">
                Upload photo evidence and describe the damage for accountability records
              </DialogDescription>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                
                <div className="space-y-6">
                  <div>
                    <p className="text-white/60 text-sm mb-2">Seat Number</p>
                    <p className="text-white text-lg">{selectedSeatInfo?.seat.id}</p>
                  </div>

                  <div>
                    <p className="text-white/60 text-sm mb-3">Upload Evidence</p>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="glass-light border-2 border-dashed border-white/20 hover:border-[#6C63FF]/50 rounded-2xl p-8 text-center cursor-pointer transition-all"
                    >
                      <Camera className="w-10 h-10 text-white/40 mx-auto mb-3" />
                      <p className="text-white/60 text-sm mb-1">Click to upload photo</p>
                      <p className="text-white/40 text-xs">PNG, JPG up to 5MB</p>
                    </motion.div>
                  </div>

                  <div>
                    <p className="text-white/60 text-sm mb-3">Description</p>
                    <Textarea
                      placeholder="Describe the damage in detail..."
                      value={damageComments}
                      onChange={(e) => setDamageComments(e.target.value)}
                      className="min-h-[120px] bg-white/5 border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:border-[#6C63FF] resize-none"
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setShowDamageForm(false)}
                      className="flex-1 h-12 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-all border border-white/10"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        setShowDamageForm(false);
                        setSelectedSeatInfo(null);
                      }}
                      className="flex-1 h-12 bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] hover:shadow-lg hover:shadow-[#6C63FF]/50 text-white rounded-xl transition-all border-0"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Report
                    </Button>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
