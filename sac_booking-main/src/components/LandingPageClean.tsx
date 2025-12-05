import React from 'react';
import { motion } from 'motion/react';
import { Film, Shield, Ticket, Users } from 'lucide-react';

interface LandingPageCleanProps {
  onStudentLogin: () => void;
  onAdminLogin: () => void;
}

export const LandingPageClean: React.FC<LandingPageCleanProps> = ({ onStudentLogin, onAdminLogin }) => {
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
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20 pt-20"
        >
          <div className="mb-6 inline-block">
            <Film className="w-16 h-16 text-[#0066ff]" />
          </div>

          <h1 className="text-5xl md:text-6xl mb-4 text-[#1a1a1a]">
            College SAC
          </h1>
          <h2 className="text-3xl md:text-4xl mb-6 text-[#666666]">
            Seat-Booking System
          </h2>
          <p className="text-xl text-[#666666] mb-12 max-w-2xl mx-auto">
            Smart seat management with accountability tracking. Book your seats, protect the infrastructure.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              onClick={onStudentLogin}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-[#0066ff] text-white rounded-xl smooth hover:bg-[#0052cc] shadow-card min-w-[200px]"
            >
              <span className="flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Student Login
              </span>
            </motion.button>

            <motion.button
              onClick={onAdminLogin}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white border border-[#e5e5e5] text-[#1a1a1a] rounded-xl smooth hover:border-[#0066ff] hover:text-[#0066ff] shadow-card min-w-[200px]"
            >
              <span className="flex items-center justify-center gap-2">
                <Shield className="w-5 h-5" />
                Admin Login
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-white border border-[#e5e5e5] rounded-2xl p-6 hover-lift"
            >
              <div className="mb-4">
                <feature.icon className="w-10 h-10 text-[#0066ff]" />
              </div>
              <h3 className="text-[#1a1a1a] mb-2">{feature.title}</h3>
              <p className="text-[#666666] text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-[#999999] text-sm">
            RGUKT Nuzvid | Secure & Accountable Seat Management
          </p>
        </motion.div>
      </div>
    </div>
  );
};
