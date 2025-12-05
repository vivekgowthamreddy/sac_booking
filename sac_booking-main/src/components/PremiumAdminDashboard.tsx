import { motion } from 'motion/react';
import { LogOut, Users, Armchair, AlertTriangle, Film, Eye, List, FileWarning, TrendingUp, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { Show, Booking } from '../App';

interface PremiumAdminDashboardProps {
  shows: Show[];
  bookings: Booking[];
  onViewSeats: (show: Show) => void;
  onViewBookings: () => void;
  onViewDamageLog: () => void;
  onLogout: () => void;
}

export function PremiumAdminDashboard({ 
  shows, 
  bookings, 
  onViewSeats, 
  onViewBookings,
  onViewDamageLog,
  onLogout 
}: PremiumAdminDashboardProps) {
  const totalSeats = shows.reduce((acc, show) => acc + show.total, 0);
  const bookedSeats = bookings.length;
  const damagedSeats = 2;
  const occupancyRate = ((bookedSeats / totalSeats) * 100).toFixed(1);

  const statCards = [
    {
      icon: Armchair,
      label: 'Total Seats',
      value: totalSeats,
      change: '+12%',
      gradient: 'from-[#6C63FF] to-[#4EA8E9]',
      delay: 0.1
    },
    {
      icon: Users,
      label: 'Active Bookings',
      value: bookedSeats,
      change: '+24%',
      gradient: 'from-[#4EA8E9] to-[#22C55E]',
      delay: 0.2
    },
    {
      icon: TrendingUp,
      label: 'Occupancy',
      value: `${occupancyRate}%`,
      change: '+8%',
      gradient: 'from-[#22C55E] to-[#6C63FF]',
      delay: 0.3
    },
    {
      icon: AlertTriangle,
      label: 'Damaged Seats',
      value: damagedSeats,
      change: '-3%',
      gradient: 'from-[#EF4444] to-[#F59E0B]',
      delay: 0.4
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0F]">
      {/* Animated Background */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />
      
      {/* Floating Orbs */}
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, -100, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="fixed top-20 right-20 w-96 h-96 bg-[#6C63FF] opacity-10 rounded-full blur-3xl pointer-events-none"
      />

      {/* Header */}
      <div className="relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-white mb-1">Admin Command Center</h1>
              <p className="text-[#999BA3]">SAC Management Portal</p>
            </motion.div>
            
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="glass-light p-3 rounded-xl border border-white/10 hover:border-white/20 transition-all group"
            >
              <LogOut className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: stat.delay }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative group"
            >
              {/* Gradient Glow */}
              <div className={`absolute -inset-[1px] bg-gradient-to-r ${stat.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity`} />
              
              {/* Card */}
              <div className="relative glass-medium rounded-2xl border border-white/10 p-6 group-hover:border-white/20 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                  </div>
                  <div className={`px-2 py-1 rounded-lg text-xs ${
                    stat.change.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                  }`}>
                    {stat.change}
                  </div>
                </div>
                <p className="text-[#999BA3] text-sm mb-2">{stat.label}</p>
                <motion.p 
                  className="text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: stat.delay + 0.2, type: "spring" }}
                >
                  {stat.value}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-medium rounded-3xl border border-white/10 p-6 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-[#6C63FF]" />
            <h3 className="text-white">Quick Actions</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={onViewBookings}
              className="glass-light p-6 rounded-2xl border border-white/10 hover:border-[#6C63FF]/30 transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#4EA8E9] flex items-center justify-center">
                  <List className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white mb-1">View Bookings</p>
                  <p className="text-[#999BA3] text-sm">See all seat reservations</p>
                </div>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-white/40 group-hover:text-white transition-colors"
                >
                  →
                </motion.div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={onViewDamageLog}
              className="glass-light p-6 rounded-2xl border border-white/10 hover:border-red-500/30 transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  <FileWarning className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white mb-1">Damage Reports</p>
                  <p className="text-[#999BA3] text-sm">Track seat conditions</p>
                </div>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-white/40 group-hover:text-white transition-colors"
                >
                  →
                </motion.div>
              </div>
            </motion.button>
          </div>
        </motion.div>

        {/* Shows List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-medium rounded-3xl border border-white/10 p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Film className="w-6 h-6 text-[#4EA8E9]" />
            <h3 className="text-white">Upcoming Shows</h3>
          </div>

          <div className="space-y-4">
            {shows.map((show, index) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ x: 5 }}
                className="glass-light rounded-2xl border border-white/10 hover:border-white/20 p-6 transition-all group"
              >
                <div className="flex items-center gap-6">
                  <div className="flex-1">
                    <h4 className="text-white mb-2">{show.movieName}</h4>
                    <div className="flex flex-wrap gap-4 text-sm text-[#999BA3] mb-4">
                      <span>{new Date(show.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{show.time}</span>
                      <span>•</span>
                      <span className="capitalize text-[#6C63FF]">{show.showType} Show</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-[#999BA3]">Occupancy</span>
                        <span className="text-white">
                          {show.total - show.available} / {show.total}
                        </span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${((show.total - show.available) / show.total) * 100}%` }}
                          transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                          className="h-full bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onViewSeats(show)}
                    className="px-6 h-12 bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] hover:shadow-lg hover:shadow-[#6C63FF]/50 text-white rounded-xl transition-all flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Seats</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
