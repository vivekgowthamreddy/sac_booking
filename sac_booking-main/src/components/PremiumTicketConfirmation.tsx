import { motion } from 'motion/react';
import { CheckCircle, Download, Calendar, Clock, Armchair, User, QrCode, Sparkles, Share2 } from 'lucide-react';
import { Show, Booking } from '../App';

interface PremiumTicketConfirmationProps {
  booking: Booking;
  show: Show;
  onBackToDashboard: () => void;
}

export function PremiumTicketConfirmation({ booking, show, onBackToDashboard }: PremiumTicketConfirmationProps) {
  return (
    <div className="min-h-screen bg-[#0D0D0F] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-mesh" />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#6C63FF] opacity-10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#4EA8E9] opacity-10 rounded-full blur-3xl"
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-lg">
          {/* Success Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2
            }}
            className="text-center mb-8"
          >
            <div className="relative inline-block mb-6">
              {/* Pulsing Rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-2 border-[#10B981]"
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ 
                    scale: [1, 2, 2.5],
                    opacity: [0.5, 0.2, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4
                  }}
                />
              ))}
              
              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.3,
                  type: "spring",
                  stiffness: 200
                }}
                className="relative w-24 h-24 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center shadow-2xl"
              >
                <CheckCircle className="w-12 h-12 text-white" strokeWidth={2} />
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white mb-3"
            >
              Booking Confirmed!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-[#999BA3]"
            >
              Your seat has been successfully reserved
            </motion.p>
          </motion.div>

          {/* Ticket Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="relative mb-8"
            style={{ perspective: '1000px' }}
          >
            {/* Holographic Glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#6C63FF] via-[#4EA8E9] to-[#10B981] rounded-3xl blur-2xl"
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="relative glass-light rounded-3xl border border-white/20 overflow-hidden">
              {/* Holographic Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
              />

              {/* Header */}
              <div className="relative p-8 pb-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-white mb-2">{show.movieName}</h2>
                    <p className="text-[#999BA3] capitalize">{show.showType} Show</p>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-6 h-6 text-[#6C63FF]" />
                  </motion.div>
                </div>

                {/* Details Grid */}
                <div className="space-y-4">
                  <TicketDetail
                    icon={Calendar}
                    label="Date"
                    value={new Date(show.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                    color="#6C63FF"
                  />

                  <TicketDetail
                    icon={Clock}
                    label="Show Time"
                    value={show.time}
                    color="#4EA8E9"
                  />

                  <TicketDetail
                    icon={Armchair}
                    label="Seat Number"
                    value={booking.seatId}
                    color="#10B981"
                    highlight
                  />

                  <TicketDetail
                    icon={User}
                    label="Student ID"
                    value={booking.studentId}
                    color="#F59E0B"
                  />
                </div>
              </div>

              {/* Dashed Divider */}
              <div className="relative px-8">
                <div className="border-t-2 border-dashed border-white/10" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 bg-[#0D0D0F] rounded-full" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 bg-[#0D0D0F] rounded-full" />
              </div>

              {/* QR Code Section */}
              <div className="p-8 pt-6">
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] rounded-2xl blur-xl opacity-30"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  
                  <div className="relative glass-light p-6 rounded-2xl border border-white/10 text-center">
                    <div className="w-40 h-40 mx-auto mb-4 bg-white rounded-xl flex items-center justify-center">
                      <QrCode className="w-32 h-32 text-[#0D0D0F]" />
                    </div>
                    <p className="text-[#999BA3] text-sm mb-1">Scan at entrance</p>
                    <p className="text-white text-sm">Booking ID: {booking.id}</p>
                  </div>
                </div>
              </div>

              {/* Warning Banner */}
              <div className="mx-8 mb-8">
                <div className="bg-gradient-to-r from-[#F59E0B]/20 to-[#EF4444]/20 border border-[#F59E0B]/30 rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-[#F59E0B] mt-0.5">⚠️</div>
                    <div>
                      <p className="text-white text-sm mb-2">Important Guidelines</p>
                      <ul className="text-[#999BA3] text-xs space-y-1">
                        <li>• Check seat condition before sitting</li>
                        <li>• Report any existing damage immediately</li>
                        <li>• You are responsible for your assigned seat</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="grid grid-cols-2 gap-4 mb-6"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative p-4 glass-light rounded-2xl border border-white/10 hover:border-white/20 transition-all group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="relative flex items-center justify-center gap-2 text-white">
                <Download className="w-5 h-5" />
                <span>Download</span>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative p-4 glass-light rounded-2xl border border-white/10 hover:border-white/20 transition-all group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#4EA8E9] to-[#10B981] opacity-0 group-hover:opacity-10 transition-opacity" />
              <div className="relative flex items-center justify-center gap-2 text-white">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </div>
            </motion.button>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBackToDashboard}
            className="relative w-full p-4 bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] text-white rounded-2xl overflow-hidden group"
          >
            <span className="relative z-10">Back to Dashboard</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-center text-[#666A73] text-sm mt-6"
          >
            Please arrive 15 minutes before showtime
          </motion.p>
        </div>
      </div>
    </div>
  );
}

function TicketDetail({ 
  icon: Icon, 
  label, 
  value, 
  color,
  highlight = false
}: { 
  icon: any; 
  label: string; 
  value: string; 
  color: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-4"
    >
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}20` }}
      >
        <Icon className="w-6 h-6" style={{ color }} strokeWidth={1.5} />
      </div>
      <div className="flex-1">
        <p className="text-[#999BA3] text-sm mb-1">{label}</p>
        <p className={`${highlight ? 'text-[#10B981]' : 'text-white'}`}>
          {value}
        </p>
      </div>
    </motion.div>
  );
}
