import { motion } from 'motion/react';
import { LogOut, Calendar, Clock, Users, Ticket } from 'lucide-react';
import { Button } from './ui/button';
import { Show } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface StudentDashboardProps {
  shows: Show[];
  currentUser: any;
  onShowSelect: (show: Show) => void;
  onLogout: () => void;
}

export function StudentDashboard({ shows, currentUser, onShowSelect, onLogout }: StudentDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-900 text-white p-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-blue-200 text-sm mb-1">Welcome back</p>
              <h1 className="text-white">{currentUser?.name || 'Student'}</h1>
              <p className="text-blue-200 text-sm">{currentUser?.collegeId}</p>
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
      <div className="max-w-4xl mx-auto px-4 -mt-16">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Ticket className="w-6 h-6 text-blue-900" />
            <h2 className="text-blue-900">Book Your Seat</h2>
          </div>
          <p className="text-gray-600">Select a show below to reserve your seat</p>
        </motion.div>

        {/* Upcoming Shows */}
        <div className="mb-6">
          <h3 className="text-gray-900 mb-4">Upcoming Shows</h3>
          <div className="space-y-4">
            {shows.map((show, index) => (
              <motion.div
                key={show.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="flex gap-4 p-4">
                  {/* Movie Poster */}
                  <div className="w-24 h-36 flex-shrink-0 rounded-xl overflow-hidden bg-gray-200">
                    <ImageWithFallback
                      src={show.poster}
                      alt={show.movieName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Show Details */}
                  <div className="flex-1 flex flex-col">
                    <h4 className="text-gray-900 mb-2">{show.movieName}</h4>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(show.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{show.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Users className="w-4 h-4" />
                        <span className="capitalize">{show.showType} Only</span>
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          {show.available} / {show.total} seats available
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                        <div 
                          className="h-full bg-green-500 rounded-full transition-all duration-300"
                          style={{ width: `${(show.available / show.total) * 100}%` }}
                        />
                      </div>
                      <Button
                        onClick={() => onShowSelect(show)}
                        className="w-full h-10 bg-blue-900 hover:bg-blue-800 text-white rounded-xl transition-colors"
                      >
                        Select Seats
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-50 rounded-2xl p-6 mb-6 border border-blue-100"
        >
          <h4 className="text-blue-900 mb-3">Important Guidelines</h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex gap-2">
              <span className="text-blue-900">•</span>
              <span>You can book only one seat per show</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-900">•</span>
              <span>Please check seat condition before and after the show</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-900">•</span>
              <span>Report any damage immediately to avoid accountability</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-900">•</span>
              <span>Show your digital ticket at the entrance</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
