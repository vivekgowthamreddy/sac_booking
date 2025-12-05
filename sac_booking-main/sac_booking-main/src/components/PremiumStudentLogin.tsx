import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, User, Lock, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface PremiumStudentLoginProps {
  onLogin: (user: any) => void;
  onBack: () => void;
}

export function PremiumStudentLogin({ onLogin, onBack }: PremiumStudentLoginProps) {
  const [collegeId, setCollegeId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (collegeId && password) {
      setIsLoading(true);
      // Simulate loading
      setTimeout(() => {
        onLogin({
          collegeId,
          name: 'Student Name',
          type: 'student'
        });
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0F] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-mesh" />
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-0 right-0 w-96 h-96 bg-[#6C63FF] opacity-10 rounded-full blur-3xl"
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            onClick={onBack}
            className="flex items-center gap-2 text-[#999BA3] hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </motion.button>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] rounded-3xl blur-3xl opacity-20" />
              
              {/* Glass Card */}
              <div className="relative glass-light p-8 rounded-3xl border border-white/10">
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="inline-block mb-6"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#6C63FF] rounded-2xl blur-xl opacity-50" />
                      <div className="relative w-20 h-20 bg-gradient-to-br from-[#6C63FF] to-[#4EA8E9] rounded-2xl flex items-center justify-center">
                        <User className="w-10 h-10 text-white" strokeWidth={1.5} />
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white mb-2"
                  >
                    Student Portal
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-[#999BA3]"
                  >
                    Sign in with your college credentials
                  </motion.p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* College ID Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="text-white/90 mb-3 block text-sm">
                      College ID
                    </label>
                    <div className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] rounded-2xl blur-md opacity-0 group-hover:opacity-20 transition-opacity ${focusedField === 'collegeId' ? 'opacity-30' : ''}`} />
                      <div className="relative flex items-center">
                        <User className="absolute left-4 w-5 h-5 text-[#999BA3] z-10" strokeWidth={1.5} />
                        <Input
                          type="text"
                          placeholder="e.g., CS21001"
                          value={collegeId}
                          onChange={(e) => setCollegeId(e.target.value)}
                          onFocus={() => setFocusedField('collegeId')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full h-14 pl-12 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-[#666A73] focus:border-[#6C63FF] focus:bg-white/10 transition-all"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Password Input */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label className="text-white/90 mb-3 block text-sm">
                      Password
                    </label>
                    <div className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] rounded-2xl blur-md opacity-0 group-hover:opacity-20 transition-opacity ${focusedField === 'password' ? 'opacity-30' : ''}`} />
                      <div className="relative flex items-center">
                        <Lock className="absolute left-4 w-5 h-5 text-[#999BA3] z-10" strokeWidth={1.5} />
                        <Input
                          type="password"
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => setFocusedField('password')}
                          onBlur={() => setFocusedField(null)}
                          className="w-full h-14 pl-12 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-[#666A73] focus:border-[#6C63FF] focus:bg-white/10 transition-all"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="relative w-full h-14 bg-gradient-to-r from-[#6C63FF] to-[#4EA8E9] text-white rounded-2xl overflow-hidden group border-0 hover:shadow-lg hover:shadow-[#6C63FF]/50 transition-all"
                    >
                      <AnimatePresence mode="wait">
                        {isLoading ? (
                          <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center gap-2"
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Sparkles className="w-5 h-5" />
                            </motion.div>
                            <span>Signing in...</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="signin"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center gap-2"
                          >
                            <span>Sign In</span>
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              →
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* Shimmer Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      />
                    </Button>
                  </motion.div>
                </form>

                {/* Forgot Password */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-6 text-center"
                >
                  <a href="#" className="text-[#6C63FF] hover:text-[#4EA8E9] text-sm transition-colors">
                    Forgot Password?
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-6 glass-light p-4 rounded-2xl border border-white/10"
          >
            <p className="text-[#999BA3] text-sm text-center">
              <span className="text-[#6C63FF]">💡</span> First time? Use your college ID and default password
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
