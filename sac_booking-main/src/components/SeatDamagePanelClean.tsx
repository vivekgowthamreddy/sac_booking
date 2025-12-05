import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, AlertTriangle, Upload, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SeatDamagePanelCleanProps {
  onBack: () => void;
}

export const SeatDamagePanelClean: React.FC<SeatDamagePanelCleanProps> = ({ onBack }) => {
  const { seats, shows, reportDamage } = useAuth();
  const [selectedSeat, setSelectedSeat] = useState('');
  const [description, setDescription] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [beforeUser, setBeforeUser] = useState('');
  const [afterUser, setAfterUser] = useState('');
  const [success, setSuccess] = useState(false);

  const damagedSeats = seats.filter(s => s.status === 'damaged');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSeat && description && photoPreview) {
      reportDamage(selectedSeat, photoPreview, description, beforeUser, afterUser);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSelectedSeat('');
        setDescription('');
        setPhotoPreview('');
        setBeforeUser('');
        setAfterUser('');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.button
            onClick={onBack}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-[#666666] hover:text-[#1a1a1a] smooth mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl text-[#1a1a1a] mb-2"
          >
            Seat Damage Management
          </motion.h1>
          <p className="text-[#666666]">Report and track seat damage with accountability</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Report Form */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-card"
            >
              <h2 className="text-2xl text-[#1a1a1a] mb-6">Report Damage</h2>

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-[#f0fff4] border border-[#28a745] rounded-xl flex items-center gap-3"
                >
                  <Check className="w-5 h-5 text-[#28a745]" />
                  <p className="text-[#28a745] text-sm">Damage report submitted successfully!</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[#1a1a1a] mb-2">Select Seat</label>
                  <select
                    value={selectedSeat}
                    onChange={(e) => setSelectedSeat(e.target.value)}
                    className="w-full bg-white border border-[#e5e5e5] rounded-xl px-4 py-3 text-[#1a1a1a] input-focus smooth"
                    required
                  >
                    <option value="">Choose a seat...</option>
                    {seats.filter(s => s.status === 'booked').map(seat => {
                      const show = shows.find(sh => sh.id === seat.showId);
                      return (
                        <option key={seat.id} value={seat.id}>
                          {seat.seatNumber} - {show?.movieName || 'Unknown Show'}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <label className="block text-[#1a1a1a] mb-2">Upload Photo</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                      id="photo-upload"
                      required
                    />
                    <label
                      htmlFor="photo-upload"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border-2 border-dashed border-[#e5e5e5] rounded-xl text-[#666666] hover:border-[#0066ff] hover:text-[#0066ff] smooth cursor-pointer"
                    >
                      <Upload className="w-5 h-5" />
                      <span>{photoPreview ? 'Change Photo' : 'Upload Photo'}</span>
                    </label>
                  </div>
                  {photoPreview && (
                    <div className="mt-4">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-xl border border-[#e5e5e5]"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[#1a1a1a] mb-2">Damage Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the damage..."
                    rows={4}
                    className="w-full bg-white border border-[#e5e5e5] rounded-xl px-4 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#1a1a1a] mb-2">User Before Show (Optional)</label>
                  <input
                    type="text"
                    value={beforeUser}
                    onChange={(e) => setBeforeUser(e.target.value)}
                    placeholder="e.g., n123456@rgutkn.ac.in"
                    className="w-full bg-white border border-[#e5e5e5] rounded-xl px-4 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth"
                  />
                </div>

                <div>
                  <label className="block text-[#1a1a1a] mb-2">User After Show (Optional)</label>
                  <input
                    type="text"
                    value={afterUser}
                    onChange={(e) => setAfterUser(e.target.value)}
                    placeholder="e.g., n654321@rgutkn.ac.in"
                    className="w-full bg-white border border-[#e5e5e5] rounded-xl px-4 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01, y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full py-3 bg-[#dc3545] rounded-xl text-white hover:bg-[#c82333] smooth shadow-card"
                >
                  <span className="flex items-center justify-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Submit Damage Report
                  </span>
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Damaged Seats List */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-[#e5e5e5] rounded-2xl p-6 shadow-card"
            >
              <h2 className="text-2xl text-[#1a1a1a] mb-6">
                Damaged Seats ({damagedSeats.length})
              </h2>

              <div className="space-y-4 max-h-[600px] overflow-y-auto clean-scroll">
                {damagedSeats.length === 0 ? (
                  <div className="text-center py-12">
                    <AlertTriangle className="w-12 h-12 text-[#d9d9d9] mx-auto mb-3" />
                    <p className="text-[#666666]">No damaged seats reported</p>
                  </div>
                ) : (
                  damagedSeats.map((seat) => {
                    const show = shows.find(s => s.id === seat.showId);
                    return (
                      <motion.div
                        key={seat.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="border border-[#dc3545] bg-[#fff5f5] rounded-xl p-4"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl text-[#1a1a1a] mb-1">Seat {seat.seatNumber}</h3>
                            <p className="text-[#666666] text-sm">{show?.movieName || 'Unknown Show'}</p>
                          </div>
                          <div className="px-3 py-1 bg-[#dc3545] text-white rounded-lg text-xs">
                            DAMAGED
                          </div>
                        </div>

                        {seat.damageReport && (
                          <div className="space-y-3">
                            {seat.damageReport.photo && (
                              <img
                                src={seat.damageReport.photo}
                                alt="Damage"
                                className="w-full h-32 object-cover rounded-lg border border-[#dc3545]"
                              />
                            )}
                            <p className="text-[#1a1a1a] text-sm">{seat.damageReport.description}</p>
                            
                            {(seat.damageReport.beforeUser || seat.damageReport.afterUser) && (
                              <div className="pt-3 border-t border-[#dc3545] space-y-2">
                                {seat.damageReport.beforeUser && (
                                  <div>
                                    <p className="text-[#999999] text-xs">User Before Show</p>
                                    <p className="text-[#1a1a1a] text-sm">{seat.damageReport.beforeUser}</p>
                                  </div>
                                )}
                                {seat.damageReport.afterUser && (
                                  <div>
                                    <p className="text-[#999999] text-xs">User After Show</p>
                                    <p className="text-[#1a1a1a] text-sm">{seat.damageReport.afterUser}</p>
                                  </div>
                                )}
                              </div>
                            )}
                            
                            <p className="text-[#999999] text-xs">
                              Reported: {new Date(seat.damageReport.reportedAt).toLocaleString()}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
