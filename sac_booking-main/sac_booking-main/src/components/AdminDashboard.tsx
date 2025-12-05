import { motion } from 'motion/react';
import { LogOut, Users, Armchair, AlertTriangle, Film, Eye, List, FileWarning } from 'lucide-react';
import { Button } from './ui/button';
import { Show, Booking } from '../App';

interface AdminDashboardProps {
  shows: Show[];
  bookings: Booking[];
  onViewSeats: (show: Show) => void;
  onViewBookings: () => void;
  onViewDamageLog: () => void;
  onLogout: () => void;
}

export function AdminDashboard({ 
  shows, 
  bookings, 
  onViewSeats, 
  onViewBookings,
  onViewDamageLog,
  onLogout 
}: AdminDashboardProps) {
  const totalSeats = shows.reduce((acc, show) => acc + show.total, 0);
  const bookedSeats = bookings.length;
  const damagedSeats = 2; // Mock data

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white p-6 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-white mb-1">Admin Dashboard</h1>
              <p className="text-blue-200">SAC Management Portal</p>
            </div>
            <button
              onClick={onLogout}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 -mt-24">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                <Armchair className="w-7 h-7 text-blue-900" />
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Seats</p>
                <p className="text-gray-900">{totalSeats}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Users className="w-7 h-7 text-yellow-700" />
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Booked Seats</p>
                <p className="text-gray-900">{bookedSeats}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-7 h-7 text-red-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Damaged Seats</p>
                <p className="text-gray-900">{damagedSeats}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h3 className="text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={onViewBookings}
              className="h-auto p-4 bg-blue-50 hover:bg-blue-100 text-blue-900 rounded-xl transition-colors justify-start"
            >
              <div className="flex items-center gap-3">
                <List className="w-5 h-5" />
                <span>View All Bookings</span>
              </div>
            </Button>
            
            <Button
              onClick={onViewDamageLog}
              className="h-auto p-4 bg-red-50 hover:bg-red-100 text-red-900 rounded-xl transition-colors justify-start"
            >
              <div className="flex items-center gap-3">
                <FileWarning className="w-5 h-5" />
                <span>Damage Reports</span>
              </div>
            </Button>
          </div>
        </motion.div>

        {/* Upcoming Shows */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Film className="w-6 h-6 text-blue-900" />
            <h3 className="text-gray-900">Upcoming Shows</h3>
          </div>

          <div className="space-y-4">
            {shows.map((show, index) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="text-gray-900 mb-2">{show.movieName}</h4>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>{new Date(show.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{show.time}</span>
                      <span>•</span>
                      <span className="capitalize">{show.showType} Show</span>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-600">Occupancy</span>
                        <span className="text-gray-900">
                          {show.total - show.available} / {show.total}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-900 rounded-full transition-all"
                          style={{ width: `${((show.total - show.available) / show.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => onViewSeats(show)}
                    className="h-10 px-6 bg-blue-900 hover:bg-blue-800 text-white rounded-xl transition-colors flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Seats
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
