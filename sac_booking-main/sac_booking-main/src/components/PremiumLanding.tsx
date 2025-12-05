import { motion } from 'motion/react';
import { Ticket, Users, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';

interface PremiumLandingProps {
  onStudentLogin: () => void;
  onAdminLogin: () => void;
}

export function PremiumLanding({ onStudentLogin, onAdminLogin }: PremiumLandingProps) {
  return (
    <div className="min-h-screen bg-[#0D0D0F] relative overflow-hidden">
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 gradient-mesh" />
      
      {/* Floating Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 left-20 w-96 h-96 bg-[#6C63FF] opacity-20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-[#4EA8E9] opacity-20 rounded-full blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-6xl w-full">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1,
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              className="inline-block mb-8"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] rounded-3xl blur-xl opacity-50" />
                <div className="relative glass-light p-6 rounded-3xl border border-white/20">
                  <Ticket className="w-16 h-16 text-white" strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-6"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#6C63FF]" />
                <span className="text-[#999BA3] uppercase tracking-wider text-sm">College SAC</span>
              </div>
              <h1 className="text-5xl md:text-7xl text-white mb-6 tracking-tight">
                Book Your SAC Seat
              </h1>
              <p className="text-xl text-[#999BA3] max-w-2xl mx-auto leading-relaxed">
                Experience cinema with accountability. Premium seat booking system 
                with damage tracking and digital tickets.
              </p>
            </motion.div>

            {/* Feature Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3 mb-12"
            >
              {['Real-time Availability', 'Digital QR Tickets', 'Damage Tracking'].map((feature, i) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="glass-light px-4 py-2 rounded-full text-white/80 text-sm border border-white/10"
                >
                  {feature}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* CTA Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Student Card */}
            <motion.button
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
              }}
              whileTap={{ scale: 0.98 }}
              onClick={onStudentLogin}
              className="group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#6C63FF] to-[#4EA8E9] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 glow-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative glass-light p-8 rounded-3xl border border-white/10 group-hover:border-white/20 transition-all duration-500">
                <div className="flex items-start gap-6">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6C63FF] to-[#4EA8E9] flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Users className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </motion.div>
                  
                  <div className="text-left flex-1">
                    <h3 className="text-white mb-2 flex items-center gap-2">
                      Student Access
                      <ChevronRight className="w-5 h-5 text-[#999BA3] group-hover:translate-x-1 transition-transform" />
                    </h3>
                    <p className="text-[#999BA3] mb-4">
                      Book your seat for upcoming movie shows
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[#6C63FF] group-hover:text-white transition-colors">
                      <span>Sign in with College ID</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.button>

            {/* Admin Card */}
            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              whileHover={{ 
                scale: 1.02,
                rotateY: -5,
              }}
              whileTap={{ scale: 0.98 }}
              onClick={onAdminLogin}
              className="group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#4EA8E9] to-[#6C63FF] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 glow-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative glass-light p-8 rounded-3xl border border-white/10 group-hover:border-white/20 transition-all duration-500">
                <div className="flex items-start gap-6">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4EA8E9] to-[#6C63FF] flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ShieldCheck className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </motion.div>
                  
                  <div className="text-left flex-1">
                    <h3 className="text-white mb-2 flex items-center gap-2">
                      Admin Portal
                      <ChevronRight className="w-5 h-5 text-[#999BA3] group-hover:translate-x-1 transition-transform" />
                    </h3>
                    <p className="text-[#999BA3] mb-4">
                      Manage shows, seats, and damage reports
                    </p>
                    <div className="flex items-center gap-2 text-sm text-[#4EA8E9] group-hover:text-white transition-colors">
                      <span>SRC & Staff Only</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.button>
          </div>

          {/* Footer Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center mt-16"
          >
            <p className="text-[#666A73] text-sm">
              Secure • Transparent • Accountable
            </p>
          </motion.div>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </div>
  );
}
