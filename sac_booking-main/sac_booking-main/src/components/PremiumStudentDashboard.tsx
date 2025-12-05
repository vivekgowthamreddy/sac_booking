import { motion, useMotionValue, useTransform } from 'motion/react';
import { LogOut, Calendar, Clock, Users, Ticket, Sparkles, ChevronRight, TrendingUp } from 'lucide-react';
import { Show } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface PremiumStudentDashboardProps {
  shows: Show[];
  currentUser: any;
  onShowSelect: (show: Show) => void;
  onLogout: () => void;
}

export function PremiumStudentDashboard({ shows, currentUser, onShowSelect, onLogout }: PremiumStudentDashboardProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'tickets' | 'history'>('upcoming');

  return (
    <div className="min-h-screen bg-[#0D0D0F] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 gradient-mesh" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#6C63FF] opacity-10 rounded-full blur-3xl" />

      {/* Header */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <p className="text-[#999BA3] text-sm mb-1">Welcome back</p>
              <h1 className="text-white mb-1">{currentUser?.name || 'Student'}</h1>
              <p className="text-[#6C63FF]">{currentUser?.collegeId}</p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="w-12 h-12 glass-light rounded-2xl flex items-center justify-center border border-white/10 hover:border-white/20 transition-all group"
            >
              <LogOut className="w-5 h-5 text-[#999BA3] group-hover:text-white transition-colors" strokeWidth={1.5} />
            </motion.button>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            {[
              { label: 'Upcoming Shows', value: shows.length, icon: Ticket, color: '#6C63FF' },
              { label: 'Your Bookings', value: '2', icon: Calendar, color: '#4EA8E9' },
              { label: 'This Month', value: '5', icon: TrendingUp, color: '#10B981' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity" style={{ background: stat.color }} />
                <div className="relative glass-light p-6 rounded-2xl border border-white/10 group-hover:border-white/20 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}20` }}>
                      <stat.icon className="w-6 h-6" style={{ color: stat.color }} strokeWidth={1.5} />
                    </div>
                    <motion.div
                      className="text-white/50"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Sparkles className="w-5 h-5" />
                    </motion.div>
                  </div>
                  <p className="text-[#999BA3] text-sm mb-2">{stat.label}</p>
                  <p className="text-white">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-2 mb-8"
          >
            {(['upcoming', 'tickets', 'history'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-6 py-3 rounded-xl transition-all capitalize"
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] rounded-xl"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${activeTab === tab ? 'text-white' : 'text-[#999BA3]'}`}>
                  {tab}
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Movie Shows - Horizontal Scroll */}
      <div className="relative z-10 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <h2 className="text-white mb-2">Featured Shows</h2>
            <p className="text-[#999BA3]">Select a movie to book your seat</p>
          </motion.div>

          <div className="relative">
            <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-4">
              {shows.map((show, index) => (
                <MovieCard
                  key={show.id}
                  show={show}
                  index={index}
                  onSelect={() => onShowSelect(show)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Guidelines */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="relative z-10 max-w-7xl mx-auto px-6 pb-12"
      >
        <div className="glass-light p-8 rounded-3xl border border-white/10">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-[#4EA8E9]/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-[#4EA8E9]" />
            </div>
            <div>
              <h3 className="text-white mb-2">Booking Guidelines</h3>
              <p className="text-[#999BA3]">Please review before booking</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              'One seat per show per student',
              'Check seat condition before use',
              'Report damage immediately',
              'Show digital ticket at entrance'
            ].map((guideline, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="flex items-center gap-3 text-[#999BA3]"
              >
                <div className="w-2 h-2 rounded-full bg-[#6C63FF]" />
                <span>{guideline}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function MovieCard({ show, index, onSelect }: { show: Show; index: number; onSelect: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6 + index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex-shrink-0 w-80 cursor-pointer"
    >
      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        className="relative group"
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity"
          animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <div className="relative glass-light rounded-3xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all">
          {/* Movie Poster */}
          <div className="relative h-64 overflow-hidden">
            <ImageWithFallback
              src={show.poster}
              alt={show.movieName}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0F] via-transparent to-transparent" />
            
            {/* Availability Badge */}
            <div className="absolute top-4 right-4">
              <div className="glass-light px-3 py-1 rounded-full border border-white/20 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-white text-sm">{show.available} left</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-white mb-3 line-clamp-1">{show.movieName}</h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-[#999BA3] text-sm">
                <Calendar className="w-4 h-4" />
                <span>{new Date(show.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2 text-[#999BA3] text-sm">
                <Clock className="w-4 h-4" />
                <span>{show.time}</span>
              </div>
              <div className="flex items-center gap-2 text-[#999BA3] text-sm">
                <Users className="w-4 h-4" />
                <span className="capitalize">{show.showType} Only</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(show.available / show.total) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] rounded-full"
                />
              </div>
              <p className="text-[#999BA3] text-xs mt-2">
                {show.available} / {show.total} seats available
              </p>
            </div>

            {/* Book Button */}
            <motion.button
              onClick={onSelect}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full h-12 bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] text-white rounded-xl overflow-hidden group/button"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Book Seat
                <ChevronRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
