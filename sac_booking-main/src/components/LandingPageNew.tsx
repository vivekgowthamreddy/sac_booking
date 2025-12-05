import React from 'react';
import { motion } from 'motion/react';
import { Film, Shield, Ticket, Users } from 'lucide-react';

interface LandingPageNewProps {
  onStudentLogin: () => void;
  onAdminLogin: () => void;
}

export const LandingPageNew: React.FC<LandingPageNewProps> = ({ onStudentLogin, onAdminLogin }) => {
  const features = [
    {
      icon: Film,
      title: 'Movie Shows',
      description: 'Book your favorite movies with ease',
    },
    {
      icon: Shield,
      title: 'Seat Protection',
      description: 'Track and prevent seat damage',
    },
    {
      icon: Ticket,
      title: 'Digital Tickets',
      description: 'QR-enabled tickets for quick entry',
    },
    {
      icon: Users,
      title: 'Gender-Based Shows',
      description: 'Separate shows for boys and girls',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 inline-block"
          >
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-600 to-blue-500 opacity-30 rounded-full" />
              <Film className="relative w-20 h-20 text-purple-400 mx-auto" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            College SAC
          </h1>
          <h2 className="text-3xl md:text-5xl mb-6 text-white/90">
            Seat-Booking System
          </h2>
          <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
            Smart seat management with accountability tracking. Book your seats, protect the infrastructure.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              onClick={onStudentLogin}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl overflow-hidden smooth-transition min-w-[200px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 smooth-transition" />
              <span className="relative text-white flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Student Login
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 smooth-transition">
                <div className="absolute inset-0 blur-xl bg-purple-500/50" />
              </div>
            </motion.button>

            <motion.button
              onClick={onAdminLogin}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 glass-medium border border-white/10 rounded-2xl smooth-transition min-w-[200px]"
            >
              <span className="relative text-white flex items-center justify-center gap-2">
                <Shield className="w-5 h-5" />
                Admin Login
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass-light rounded-2xl p-6 border border-white/10 smooth-transition group"
            >
              <div className="mb-4">
                <div className="relative inline-block">
                  <div className="absolute inset-0 blur-xl bg-purple-500/30 group-hover:bg-purple-500/50 smooth-transition rounded-full" />
                  <feature.icon className="relative w-10 h-10 text-purple-400" />
                </div>
              </div>
              <h3 className="text-white mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-white/40 text-sm">
            RGUKT Nuzvid | Secure & Accountable Seat Management
          </p>
        </motion.div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};
