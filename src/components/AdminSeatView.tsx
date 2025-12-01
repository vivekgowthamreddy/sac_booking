import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, X, AlertCircle, Camera, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Show, Booking, Seat } from '../App';

interface AdminSeatViewProps {
  show: Show;
  bookings: Booking[];
  onBack: () => void;
}

interface SeatInfo {
  seat: Seat;
  currentStudent?: Booking;
  previousStudent?: string;
}

export function AdminSeatView({ show, bookings, onBack }: AdminSeatViewProps) {
  const [selectedSeatInfo, setSelectedSeatInfo] = useState<SeatInfo | null>(null);
  const [showDamageForm, setShowDamageForm] = useState(false);
  const [damageComments, setDamageComments] = useState('');

  // Generate seats grid
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
      previousStudent: 'CS20045' // Mock previous student
    });
  };

  const handleMarkDamaged = () => {
    setShowDamageForm(true);
  };

  const handleSaveDamage = () => {
    // In real app, save damage report to database
    console.log('Damage reported:', damageComments);
    setShowDamageForm(false);
    setSelectedSeatInfo(null);
    setDamageComments('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-blue-900 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white mb-4 hover:text-blue-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          <h2 className="text-white mb-2">Seat Management</h2>
          <p className="text-blue-200">{show.movieName} • {show.time}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
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
          </div>
        </motion.div>

        {/* Screen */}
        <div className="mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="h-2 bg-gradient-to-r from-transparent via-blue-900 to-transparent rounded-full mb-2" />
            <p className="text-center text-gray-500 text-sm">Screen</p>
          </div>
        </div>

        {/* Seats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6 overflow-x-auto"
        >
          <div className="min-w-[700px]">
            {rows.map((row) => (
              <div key={row} className="flex items-center gap-2 mb-3">
                <div className="w-10 text-center text-gray-600">{row}</div>
                <div className="flex gap-2 flex-1 justify-center">
                  {Array.from({ length: seatsPerRow }, (_, i) => {
                    const seatNumber = i + 1;
                    const seatId = `${row}-${seatNumber}`;
                    const status = getSeatStatus(seatId);
                    const booking = bookings.find(b => b.showId === show.id && b.seatId === seatId);

                    return (
                      <button
                        key={seatId}
                        onClick={() => handleSeatClick(seatId)}
                        className={`
                          w-12 h-12 rounded-lg transition-all duration-200 hover:scale-110 flex items-center justify-center text-white text-sm
                          ${status === 'available' ? 'bg-green-500 hover:bg-green-600' : ''}
                          ${status === 'booked' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
                          ${status === 'damaged' ? 'bg-red-500 hover:bg-red-600' : ''}
                        `}
                        title={booking ? `${booking.studentName} (${booking.studentId})` : seatId}
                      >
                        {seatNumber}
                      </button>
                    );
                  })}
                </div>
                <div className="w-10 text-center text-gray-600">{row}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-50 rounded-2xl p-6 border border-blue-100"
        >
          <p className="text-blue-900 mb-2">💡 Tip</p>
          <p className="text-gray-700 text-sm">
            Click on any seat to view booking details, student information, and seat history.
            You can also mark seats as damaged and upload evidence photos.
          </p>
        </motion.div>
      </div>

      {/* Seat Info Dialog */}
      <Dialog open={!!selectedSeatInfo && !showDamageForm} onOpenChange={() => setSelectedSeatInfo(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Seat {selectedSeatInfo?.seat.id}</DialogTitle>
            <DialogDescription>
              View seat information including current booking and previous occupant
            </DialogDescription>
          </DialogHeader>
          
          {selectedSeatInfo && (
            <div className="space-y-6">
              {/* Status */}
              <div>
                <p className="text-gray-600 text-sm mb-2">Status</p>
                <div className={`
                  inline-flex items-center gap-2 px-4 py-2 rounded-lg
                  ${selectedSeatInfo.seat.status === 'available' ? 'bg-green-100 text-green-800' : ''}
                  ${selectedSeatInfo.seat.status === 'booked' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${selectedSeatInfo.seat.status === 'damaged' ? 'bg-red-100 text-red-800' : ''}
                `}>
                  <span className="capitalize">{selectedSeatInfo.seat.status}</span>
                </div>
              </div>

              {/* Current Student */}
              {selectedSeatInfo.currentStudent && (
                <div>
                  <p className="text-gray-600 text-sm mb-2">Current Booking</p>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-900 mb-1">{selectedSeatInfo.currentStudent.studentName}</p>
                    <p className="text-gray-600 text-sm">{selectedSeatInfo.currentStudent.studentId}</p>
                    <p className="text-gray-500 text-xs mt-2">
                      Booked: {new Date(selectedSeatInfo.currentStudent.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              )}

              {/* Previous Student */}
              {selectedSeatInfo.previousStudent && (
                <div>
                  <p className="text-gray-600 text-sm mb-2">Previous Occupant</p>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-900">{selectedSeatInfo.previousStudent}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-gray-200">
                {selectedSeatInfo.seat.status !== 'damaged' && (
                  <Button
                    onClick={handleMarkDamaged}
                    className="w-full h-10 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Mark as Damaged
                  </Button>
                )}
                <Button
                  onClick={() => setSelectedSeatInfo(null)}
                  className="w-full h-10 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl transition-colors"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Damage Report Form Dialog */}
      <Dialog open={showDamageForm} onOpenChange={() => setShowDamageForm(false)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Report Seat Damage</DialogTitle>
            <DialogDescription>
              Upload photo evidence and describe the damage for accountability records
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 text-sm mb-2">Seat Number</p>
              <p className="text-gray-900">{selectedSeatInfo?.seat.id}</p>
            </div>

            <div>
              <Label htmlFor="photo" className="text-gray-700 mb-2 block">
                Upload Photo Evidence
              </Label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 text-sm mb-1">Click to upload photo</p>
                <p className="text-gray-400 text-xs">PNG, JPG up to 5MB</p>
              </div>
            </div>

            <div>
              <Label htmlFor="comments" className="text-gray-700 mb-2 block">
                Comments / Description
              </Label>
              <Textarea
                id="comments"
                placeholder="Describe the damage..."
                value={damageComments}
                onChange={(e) => setDamageComments(e.target.value)}
                className="min-h-[100px] rounded-xl"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setShowDamageForm(false)}
                className="flex-1 h-10 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl transition-colors"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveDamage}
                className="flex-1 h-10 bg-blue-900 hover:bg-blue-800 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
