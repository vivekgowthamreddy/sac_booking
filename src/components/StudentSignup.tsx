import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowLeft, AlertCircle, Sparkles, UserCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface StudentSignupProps {
  onBack: () => void;
  onSignupSuccess: () => void;
}

export const StudentSignup: React.FC<StudentSignupProps> = ({ onBack, onSignupSuccess }) => {
  const { signup } = useAuth();
  const [step, setStep] = useState<'email' | 'gender'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const regex = /^n[0-9]{6}@rgutkn\.ac\.in$/;
    return regex.test(email);
  };

  const handleEmailStep = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Only official RGUTKN college emails are allowed.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setStep('gender');
  };

  const handleGenderSelection = async (selectedGender: 'male' | 'female') => {
    setGender(selectedGender);
    setIsLoading(true);
    setError('');

    try {
      const success = await signup(email, password, selectedGender);
      if (success) {
        onSignupSuccess();
      } else {
        setError('Email already exists. Please login instead.');
        setStep('email');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setStep('email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Back Button */}
      <motion.button
        onClick={() => step === 'gender' ? setStep('email') : onBack()}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -5 }}
        className="absolute top-8 left-8 flex items-center gap-2 text-white/60 hover:text-white smooth-transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </motion.button>

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-medium border border-white/10 rounded-3xl p-8 shadow-2xl">
          {step === 'email' ? (
            <>
              {/* Email Step Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block mb-4"
                >
                  <div className="relative">
                    <div className="absolute inset-0 blur-2xl bg-purple-600/30 rounded-full" />
                    <Sparkles className="relative w-12 h-12 text-purple-400" />
                  </div>
                </motion.div>
                <h2 className="text-3xl text-white mb-2">Create Account</h2>
                <p className="text-white/60">Sign up with your college email</p>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-400 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Email Form */}
              <form onSubmit={handleEmailStep} className="space-y-6">
                <div>
                  <label className="block text-white/80 mb-2">College Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="n123456@rgutkn.ac.in"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 smooth-transition"
                    />
                  </div>
                  <p className="mt-2 text-xs text-white/40">Format: n[6-digit-roll]@rgutkn.ac.in</p>
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 smooth-transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 smooth-transition"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-100 smooth-transition" />
                  <span className="relative">Continue</span>
                </motion.button>
              </form>
            </>
          ) : (
            <>
              {/* Gender Step Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block mb-4"
                >
                  <div className="relative">
                    <div className="absolute inset-0 blur-2xl bg-purple-600/30 rounded-full" />
                    <UserCircle className="relative w-12 h-12 text-purple-400" />
                  </div>
                </motion.div>
                <h2 className="text-3xl text-white mb-2">Select Gender</h2>
                <p className="text-white/60">This helps us show relevant shows</p>
              </div>

              {/* Gender Cards */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  onClick={() => handleGenderSelection('male')}
                  disabled={isLoading}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative p-6 glass-light border-2 border-white/10 hover:border-blue-500/50 rounded-2xl smooth-transition disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 smooth-transition rounded-2xl" />
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <UserCircle className="w-8 h-8 text-blue-400" />
                    </div>
                    <p className="text-white text-center">Male</p>
                  </div>
                </motion.button>

                <motion.button
                  onClick={() => handleGenderSelection('female')}
                  disabled={isLoading}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative p-6 glass-light border-2 border-white/10 hover:border-pink-500/50 rounded-2xl smooth-transition disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 smooth-transition rounded-2xl" />
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto mb-4 bg-pink-500/20 rounded-full flex items-center justify-center">
                      <UserCircle className="w-8 h-8 text-pink-400" />
                    </div>
                    <p className="text-white text-center">Female</p>
                  </div>
                </motion.button>
              </div>

              {isLoading && (
                <p className="text-center text-white/60 mt-4">Creating your account...</p>
              )}
            </>
          )}
        </div>
      </motion.div>

      {/* Floating Orbs */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};
