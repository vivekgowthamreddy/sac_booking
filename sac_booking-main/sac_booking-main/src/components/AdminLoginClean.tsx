import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, User, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AdminLoginCleanProps {
  onBack: () => void;
  onLoginSuccess: () => void;
}

export const AdminLoginClean: React.FC<AdminLoginCleanProps> = ({ onBack, onLoginSuccess }) => {
  const { adminLogin } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password.');
      return;
    }

    setIsLoading(true);
    const success = await adminLogin(username, password);
    if (success) {
      onLoginSuccess();
    } else {
      setError('Invalid admin credentials.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -5 }}
        className="absolute top-8 left-8 flex items-center gap-2 text-[#666666] hover:text-[#1a1a1a] smooth"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </motion.button>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white border border-[#e5e5e5] rounded-2xl p-8 shadow-card">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-[#f0f9ff] rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-[#0066ff]" />
            </div>
            <h2 className="text-3xl text-[#1a1a1a] mb-2">Admin Login</h2>
            <p className="text-[#666666]">Access the admin dashboard</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-[#fff5f5] border border-[#dc3545] rounded-xl flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-[#dc3545] flex-shrink-0 mt-0.5" />
              <p className="text-[#dc3545] text-sm">{error}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[#1a1a1a] mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter admin username"
                  className="w-full bg-white border border-[#e5e5e5] rounded-xl pl-12 pr-4 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#1a1a1a] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-white border border-[#e5e5e5] rounded-xl pl-12 pr-4 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading || !username || !password}
              whileHover={{ scale: !isLoading && username && password ? 1.01 : 1, y: !isLoading && username && password ? -1 : 0 }}
              whileTap={{ scale: !isLoading && username && password ? 0.99 : 1 }}
              className="w-full py-3 bg-[#0066ff] rounded-xl text-white hover:bg-[#0052cc] smooth shadow-card disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0066ff]"
            >
              {isLoading ? 'Logging in...' : 'Login as Admin'}
            </motion.button>
          </form>

          {/* Info */}
          <div className="mt-6 p-4 bg-[#f5f5f5] rounded-xl">
            <p className="text-[#666666] text-xs text-center">
              Demo: username: <span className="text-[#0066ff]">admin</span> / password: <span className="text-[#0066ff]">admin123</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
