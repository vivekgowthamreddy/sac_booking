import { motion } from 'motion/react';
import { Ticket } from 'lucide-react';

export function PremiumLoader() {
  return (
    <div className="fixed inset-0 bg-[#0D0D0F] z-50 flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 gradient-mesh" />
      
      {/* Animated Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6C63FF] opacity-20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4EA8E9] opacity-20 rounded-full blur-3xl"
      />
      
      {/* Logo */}
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            {/* Glow */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] rounded-3xl blur-2xl"
            />
            
            {/* Icon */}
            <div className="relative glass-light p-8 rounded-3xl border border-white/20">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Ticket className="w-16 h-16 text-white" strokeWidth={1.5} />
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-white mb-2">SAC Seat Booking</p>
          <div className="flex items-center justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-2 h-2 bg-[#6C63FF] rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
