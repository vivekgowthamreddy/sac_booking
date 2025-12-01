import { motion } from 'motion/react';
import { CheckCircle, Download, Calendar, Clock, Armchair, User, QrCode } from 'lucide-react';
import { Button } from './ui/button';
import { Show, Booking } from '../App';

interface TicketConfirmationProps {
  booking: Booking;
  show: Show;
  onBackToDashboard: () => void;
}

export function TicketConfirmation({ booking, show, onBackToDashboard }: TicketConfirmationProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="text-center mb-6"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-white mb-2">Booking Confirmed!</h2>
          <p className="text-blue-200">Your seat has been reserved</p>
        </motion.div>

        {/* Ticket Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6"
        >
          {/* Ticket Header */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-6 text-white">
            <h3 className="text-white mb-2">{show.movieName}</h3>
            <p className="text-blue-200 capitalize">{show.showType} Show</p>
          </div>

          {/* Ticket Details */}
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Date</p>
                <p className="text-gray-900">
                  {new Date(show.date).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Show Time</p>
                <p className="text-gray-900">{show.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Armchair className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Seat Number</p>
                <p className="text-gray-900">{booking.seatId}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6 text-blue-900" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Student ID</p>
                <p className="text-gray-900">{booking.studentId}</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="pt-4">
              <div className="bg-gray-50 rounded-2xl p-6 text-center">
                <div className="w-40 h-40 bg-white border-4 border-gray-200 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-gray-400" />
                </div>
                <p className="text-gray-600 text-sm">Scan at entrance</p>
                <p className="text-gray-900 text-sm">Booking ID: {booking.id}</p>
              </div>
            </div>
          </div>

          {/* Dashed Line */}
          <div className="relative h-8 mx-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-dashed border-gray-300" />
            </div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-10 w-8 h-8 bg-gray-50 rounded-full" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-10 w-8 h-8 bg-gray-50 rounded-full" />
          </div>

          {/* Important Notice */}
          <div className="p-6 pt-0">
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
              <p className="text-amber-900 text-sm mb-2">⚠️ Important</p>
              <ul className="text-amber-800 text-sm space-y-1">
                <li>• Check your seat condition before sitting</li>
                <li>• Report any existing damage immediately</li>
                <li>• You are responsible for your assigned seat</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <Button
            className="w-full h-12 bg-white hover:bg-gray-100 text-blue-900 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Ticket
          </Button>
          
          <Button
            onClick={onBackToDashboard}
            className="w-full h-12 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 rounded-xl backdrop-blur-sm transition-colors"
          >
            Back to Dashboard
          </Button>
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-center"
        >
          <p className="text-blue-200 text-sm">
            Please arrive 15 minutes before showtime
          </p>
        </motion.div>
      </div>
    </div>
  );
}
