import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, AlertTriangle, Upload, Camera, User, Clock, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SeatDamagePanelProps {
  onBack: () => void;
}

export const SeatDamagePanel: React.FC<SeatDamagePanelProps> = ({ onBack }) => {
  const { seats, shows, bookings, reportDamage } = useAuth();
  const [selectedShow, setSelectedShow] = useState<string>('');
  const [selectedSeat, setSelectedSeat] = useState<string>('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<string>('');
  const [beforeUser, setBeforeUser] = useState('');
  const [afterUser, setAfterUser] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const damagedSeats = seats.filter(s => s.status === 'damaged');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSeat || !description) return;

    setIsSubmitting(true);

    setTimeout(() => {
      reportDamage(selectedSeat, photo, description, beforeUser, afterUser);
      setShowSuccess(true);
      setIsSubmitting(false);

      setTimeout(() => {
        setShowSuccess(false);
        setSelectedShow('');
        setSelectedSeat('');
        setDescription('');
        setPhoto('');
        setBeforeUser('');
        setAfterUser('');
      }, 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Content */}
      <div className="relative z-10 min-h-screen px-4 py-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <motion.button
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-white/60 hover:text-white smooth-transition mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-2"
          >
            <div className="relative">
              <div className="absolute inset-0 blur-xl bg-red-500/30 rounded-full" />
              <AlertTriangle className="relative w-10 h-10 text-red-400" />
            </div>
            <h1 className="text-4xl text-white">Seat Damage Management</h1>
          </motion.div>
          <p className="text-white/60">Report and track seat damage with accountability</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Report Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-medium border border-white/10 rounded-2xl p-8"
          >
            <h2 className="text-2xl text-white mb-6">Report Damage</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Show Selection */}
              <div>
                <label className="block text-white/80 mb-2">Select Show</label>
                <select
                  value={selectedShow}
                  onChange={(e) => {
                    setSelectedShow(e.target.value);
                    setSelectedSeat('');
                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 smooth-transition"
                >
                  <option value="" className="bg-[#0a0a0f]">Choose a show...</option>
                  {shows.map(show => (
                    <option key={show.id} value={show.id} className="bg-[#0a0a0f]">
                      {show.movieName} - {new Date(show.showDate).toLocaleDateString()} {show.showTime}
                    </option>
                  ))}
                </select>
              </div>

              {/* Seat Selection */}
              {selectedShow && (
                <div>
                  <label className="block text-white/80 mb-2">Select Seat</label>
                  <select
                    value={selectedSeat}
                    onChange={(e) => setSelectedSeat(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 smooth-transition"
                  >
                    <option value="" className="bg-[#0a0a0f]">Choose a seat...</option>
                    {seats
                      .filter(s => s.showId === selectedShow)
                      .map(seat => (
                        <option key={seat.id} value={seat.id} className="bg-[#0a0a0f]">
                          {seat.seatNumber} - {seat.status === 'damaged' ? '(Already Damaged)' : seat.status}
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {/* Before User */}
              <div>
                <label className="block text-white/80 mb-2">Student Before (Optional)</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    value={beforeUser}
                    onChange={(e) => setBeforeUser(e.target.value)}
                    placeholder="Roll number or email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 smooth-transition"
                  />
                </div>
              </div>

              {/* After User */}
              <div>
                <label className="block text-white/80 mb-2">Student After (Optional)</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    value={afterUser}
                    onChange={(e) => setAfterUser(e.target.value)}
                    placeholder="Roll number or email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 smooth-transition"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-white/80 mb-2">Damage Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the damage in detail..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 smooth-transition resize-none"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-white/80 mb-2">Upload Photo (Optional)</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="flex items-center justify-center gap-3 w-full bg-white/5 border-2 border-dashed border-white/20 hover:border-red-500/50 rounded-xl p-6 cursor-pointer smooth-transition group"
                  >
                    {photo ? (
                      <div className="text-center">
                        <Camera className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <p className="text-green-400 text-sm">Photo uploaded</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-white/40 group-hover:text-red-400 mx-auto mb-2 smooth-transition" />
                        <p className="text-white/60 text-sm">Click to upload damage photo</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={!selectedSeat || !description || isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl text-white relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 opacity-0 group-hover:opacity-100 smooth-transition" />
                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Reporting Damage...
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5" />
                      Report Damage
                    </>
                  )}
                </span>
              </motion.button>
            </form>
          </motion.div>

          {/* Damaged Seats List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-medium border border-white/10 rounded-2xl p-8"
          >
            <h2 className="text-2xl text-white mb-6">Damaged Seats Log</h2>

            {damagedSeats.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <p className="text-white/60">No damaged seats reported</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto premium-scroll">
                {damagedSeats.map((seat, index) => {
                  const show = shows.find(s => s.id === seat.showId);
                  return (
                    <motion.div
                      key={seat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass-light border border-red-500/20 rounded-xl p-4"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-white mb-1">Seat {seat.seatNumber}</p>
                          <p className="text-white/60 text-sm">{show?.movieName}</p>
                        </div>
                        <div className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-lg">
                          <span className="text-red-400 text-xs">Damaged</span>
                        </div>
                      </div>

                      {seat.damageReport && (
                        <div className="space-y-2 text-sm">
                          <p className="text-white/80">{seat.damageReport.description}</p>
                          
                          {seat.damageReport.beforeUser && (
                            <div className="flex items-center gap-2 text-white/60">
                              <User className="w-3 h-3" />
                              <span className="text-xs">Before: {seat.damageReport.beforeUser}</span>
                            </div>
                          )}
                          
                          {seat.damageReport.afterUser && (
                            <div className="flex items-center gap-2 text-white/60">
                              <User className="w-3 h-3" />
                              <span className="text-xs">After: {seat.damageReport.afterUser}</span>
                            </div>
                          )}

                          <div className="flex items-center gap-2 text-white/40 pt-2 border-t border-white/10">
                            <Clock className="w-3 h-3" />
                            <span className="text-xs">
                              {new Date(seat.damageReport.reportedAt).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Success Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="glass-strong border border-green-500/30 rounded-3xl p-12 text-center"
            >
              <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl text-white mb-2">Damage Reported</h3>
              <p className="text-white/60">The seat damage has been logged successfully</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};
