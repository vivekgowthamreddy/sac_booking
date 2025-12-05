import { motion } from 'motion/react';
import { ArrowLeft, AlertTriangle, User, Calendar, Image as ImageIcon, CheckCircle } from 'lucide-react';

interface PremiumSeatDamageLogProps {
  onBack: () => void;
}

interface DamageReport {
  id: string;
  seatId: string;
  reportedBy: string;
  date: string;
  studentBefore: string;
  studentAfter: string;
  description: string;
  status: 'pending' | 'resolved';
  showName: string;
}

export function PremiumSeatDamageLog({ onBack }: PremiumSeatDamageLogProps) {
  const damageReports: DamageReport[] = [
    {
      id: 'd1',
      seatId: 'C-7',
      reportedBy: 'Admin Staff',
      date: '2025-11-26',
      studentBefore: 'CS21023',
      studentAfter: 'CS21045',
      description: 'Armrest broken, requires repair',
      status: 'pending',
      showName: 'The Dark Knight'
    },
    {
      id: 'd2',
      seatId: 'E-3',
      reportedBy: 'SRC Member',
      date: '2025-11-25',
      studentBefore: 'CS20087',
      studentAfter: 'CS21012',
      description: 'Cushion torn on the left side',
      status: 'pending',
      showName: 'Inception'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0F]">
      {/* Background */}
      <div className="fixed inset-0 gradient-mesh pointer-events-none" />
      
      <motion.div
        animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="fixed bottom-20 right-20 w-96 h-96 bg-red-500 opacity-10 rounded-full blur-3xl pointer-events-none"
      />

      {/* Header */}
      <div className="relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </motion.button>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-white mb-1">Damage Reports</h2>
              <p className="text-[#999BA3]">Seat accountability & tracking</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          {[
            { label: 'Total Reports', value: damageReports.length, gradient: 'from-red-500 to-pink-500' },
            { label: 'Pending Repair', value: damageReports.filter(r => r.status === 'pending').length, gradient: 'from-yellow-500 to-orange-500' },
            { label: 'This Month', value: damageReports.length, gradient: 'from-[#6C63FF] to-[#4EA8E9]' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-medium rounded-2xl border border-white/10 p-6"
            >
              <p className="text-[#999BA3] text-sm mb-2">{stat.label}</p>
              <p className={`bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent text-2xl`}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Reports */}
        <div className="space-y-6">
          {damageReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              
              {/* Report Card */}
              <div className="relative glass-medium rounded-3xl border border-white/10 group-hover:border-red-500/30 p-6 transition-all">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
                      <AlertTriangle className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white mb-1">Seat {report.seatId}</h3>
                      <p className="text-white/60 text-sm">{report.showName}</p>
                    </div>
                  </div>
                  <div className={`
                    px-3 py-1 rounded-lg text-sm
                    ${report.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}
                  `}>
                    {report.status === 'pending' ? 'Pending' : 'Resolved'}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="glass-light rounded-2xl p-4 border border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                      <User className="w-5 h-5 text-[#6C63FF]" />
                      <p className="text-white/60 text-sm">Reported By</p>
                    </div>
                    <p className="text-white">{report.reportedBy}</p>
                  </div>

                  <div className="glass-light rounded-2xl p-4 border border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                      <Calendar className="w-5 h-5 text-[#4EA8E9]" />
                      <p className="text-white/60 text-sm">Report Date</p>
                    </div>
                    <p className="text-white">
                      {new Date(report.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Accountability Section */}
                <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-6 mb-6 border border-amber-500/20">
                  <p className="text-amber-400 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Seat Occupancy Records
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Previous Show:</span>
                      <span className="px-3 py-1 glass-light rounded-lg text-white border border-white/10">
                        {report.studentBefore}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Current Show:</span>
                      <span className="px-3 py-1 glass-light rounded-lg text-white border border-white/10">
                        {report.studentAfter}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-white/60 text-sm mb-2">Damage Description</p>
                  <p className="text-white">{report.description}</p>
                </div>

                {/* Photo Evidence */}
                <div className="mb-6">
                  <p className="text-white/60 text-sm mb-3">Photo Evidence</p>
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="glass-light rounded-2xl h-48 flex items-center justify-center border border-white/10 cursor-pointer hover:border-white/20 transition-all"
                  >
                    <ImageIcon className="w-12 h-12 text-white/20" />
                  </motion.div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 h-12 bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] hover:shadow-lg hover:shadow-[#6C63FF]/50 text-white rounded-xl transition-all flex items-center gap-2"
                  >
                    Contact Student
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:shadow-lg hover:shadow-green-500/50 text-white rounded-xl transition-all flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark Repaired
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 h-12 glass-light border border-white/10 hover:border-white/20 text-white rounded-xl transition-all"
                  >
                    View Details
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 glass-light rounded-2xl border border-[#6C63FF]/20 p-6"
        >
          <h4 className="text-[#6C63FF] mb-4">How It Works</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-white/70">
            <div className="flex gap-3">
              <span className="text-[#6C63FF]">1.</span>
              <span>Each seat tracks occupancy before and after every show</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#6C63FF]">2.</span>
              <span>Photo evidence is required for all damage reports</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#6C63FF]">3.</span>
              <span>Students are notified and can appeal within 48 hours</span>
            </div>
            <div className="flex gap-3">
              <span className="text-[#6C63FF]">4.</span>
              <span>Transparency ensures fair accountability</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
