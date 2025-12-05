import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, ArrowLeft, AlertCircle, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AdminLoginNewProps {
  onBack: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginNew: React.FC<AdminLoginNewProps> = ({ onBack, onLoginSuccess }) => {
  const { adminLogin } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const success = adminLogin(username, password);
      if (success) {
        onLoginSuccess();
      } else {
        setError('Invalid admin credentials.');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Back Button */}
      <motion.button
        onClick={onBack}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -5 }}
        className="absolute top-8 left-8 flex items-center gap-2 text-white/60 hover:text-white smooth-transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </motion.button>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-medium border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-4"
            >
              <div className="relative">
                <div className="absolute inset-0 blur-2xl bg-red-600/30 rounded-full" />
                <Shield className="relative w-12 h-12 text-red-400" />
              </div>
            </motion.div>
            <h2 className="text-3xl text-white mb-2">Admin Access</h2>
            <p className="text-white/60">Secure authentication required</p>
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

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div>
              <label className="block text-white/80 mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 smooth-transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white/80 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20 smooth-transition"
                />
              </div>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl text-white relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 opacity-0 group-hover:opacity-100 smooth-transition" />
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield className="w-5 h-5" />
                    Login as Admin
                  </>
                )}
              </span>
            </motion.button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 glass-light border border-white/10 rounded-xl">
            <p className="text-white/60 text-xs mb-2">Demo Credentials:</p>
            <div className="space-y-1 text-white/80 text-xs">
              <p>Username: <span className="text-purple-400">admin</span></p>
              <p>Password: <span className="text-purple-400">admin123</span></p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Orbs */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-orange-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};
