import { motion } from 'motion/react';
import { ArrowLeft, AlertTriangle, User, Calendar, Image as ImageIcon } from 'lucide-react';
import { Button } from './ui/button';

interface SeatDamageLogProps {
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
  photoUrl?: string;
  showName: string;
}

export function SeatDamageLog({ onBack }: SeatDamageLogProps) {
  // Mock damage reports
  const damageReports: DamageReport[] = [
    {
      id: 'd1',
      seatId: 'C-7',
      reportedBy: 'Admin Staff',
      date: '2025-11-26',
      studentBefore: 'CS21023',
      studentAfter: 'CS21045',
      description: 'Armrest broken, requires repair',
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
      showName: 'Inception'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-red-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white mb-4 hover:text-red-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6" />
            <h2 className="text-white">Seat Damage Log</h2>
          </div>
          <p className="text-red-100">All reported seat damages and accountability records</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-600 text-sm mb-2">Total Damaged Seats</p>
            <p className="text-gray-900">{damageReports.length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-600 text-sm mb-2">Pending Repair</p>
            <p className="text-gray-900">{damageReports.length}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-600 text-sm mb-2">This Month</p>
            <p className="text-gray-900">{damageReports.length}</p>
          </div>
        </motion.div>

        {/* Damage Reports */}
        <div className="space-y-4">
          {damageReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-7 h-7 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900 mb-1">Seat {report.seatId}</h3>
                      <p className="text-gray-600 text-sm">{report.showName}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 bg-red-100 text-red-800 rounded-lg text-sm">
                    Damaged
                  </span>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Reported By */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Reported By</p>
                      <p className="text-gray-900">{report.reportedBy}</p>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Report Date</p>
                      <p className="text-gray-900">
                        {new Date(report.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Accountability */}
                <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-200">
                  <p className="text-amber-900 mb-3">Seat Occupancy Records</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-800 text-sm">Student Before Show:</span>
                      <span className="text-amber-900 px-3 py-1 bg-white rounded-lg text-sm">
                        {report.studentBefore}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-amber-800 text-sm">Student During Show:</span>
                      <span className="text-amber-900 px-3 py-1 bg-white rounded-lg text-sm">
                        {report.studentAfter}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <p className="text-gray-600 text-sm mb-2">Damage Description</p>
                  <p className="text-gray-900">{report.description}</p>
                </div>

                {/* Photo Evidence */}
                {report.photoUrl && (
                  <div>
                    <p className="text-gray-600 text-sm mb-2">Photo Evidence</p>
                    <div className="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
                  <Button className="h-10 px-6 bg-blue-900 hover:bg-blue-800 text-white rounded-xl transition-colors">
                    Contact Student
                  </Button>
                  <Button className="h-10 px-6 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors">
                    Mark as Repaired
                  </Button>
                  <Button className="h-10 px-6 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-xl transition-colors">
                    View Full Report
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {damageReports.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-12 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-gray-900 mb-2">No Damage Reports</h3>
            <p className="text-gray-600">All seats are in good condition</p>
          </motion.div>
        )}

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-50 rounded-2xl p-6 mt-6 border border-blue-100"
        >
          <h4 className="text-blue-900 mb-3">How Accountability Works</h4>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="flex gap-2">
              <span className="text-blue-900">1.</span>
              <span>Each seat tracks the student who booked it before and during each show</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-900">2.</span>
              <span>When damage is reported, both students are notified</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-900">3.</span>
              <span>Photo evidence and timestamps help determine responsibility</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-900">4.</span>
              <span>Students can appeal or provide their own evidence within 48 hours</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
