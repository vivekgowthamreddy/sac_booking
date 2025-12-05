import { motion } from 'motion/react';
import { Ticket, Users, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';

interface LandingPageProps {
  onStudentLogin: () => void;
  onAdminLogin: () => void;
}

export function LandingPage({ onStudentLogin, onAdminLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo & Branding */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 bg-white rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl"
          >
            <Ticket className="w-12 h-12 text-blue-900" />
          </motion.div>
          <h1 className="text-white mb-2">College SAC</h1>
          <h2 className="text-white/90 mb-3">Seat Booking System</h2>
          <p className="text-blue-200">Secure your seat, protect our space</p>
        </div>

        {/* Login Cards */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={onStudentLogin}
              className="w-full h-auto p-6 bg-white hover:bg-gray-50 text-blue-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center gap-4 w-full">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-blue-900" />
                </div>
                <div className="text-left flex-1">
                  <div className="text-blue-900 mb-1">Student Login</div>
                  <div className="text-blue-600 text-sm">Book your seat</div>
                </div>
              </div>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={onAdminLogin}
              className="w-full h-auto p-6 bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 rounded-2xl backdrop-blur-sm transition-all duration-300"
            >
              <div className="flex items-center gap-4 w-full">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div className="text-left flex-1">
                  <div className="text-white mb-1">Admin Access</div>
                  <div className="text-blue-200 text-sm">SRC & Staff</div>
                </div>
              </div>
            </Button>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center text-blue-200 space-y-2"
        >
          <p className="text-sm">✓ Real-time seat availability</p>
          <p className="text-sm">✓ Digital tickets with QR codes</p>
          <p className="text-sm">✓ Seat damage tracking & accountability</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
