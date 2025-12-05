import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, User, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface StudentLoginProps {
  onLogin: (user: any) => void;
  onBack: () => void;
}

export function StudentLogin({ onLogin, onBack }: StudentLoginProps) {
  const [collegeId, setCollegeId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - in real app, this would validate against database
    if (collegeId && password) {
      onLogin({
        collegeId,
        name: 'Student Name',
        type: 'student'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-white mb-8 hover:text-blue-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </motion.button>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-2xl p-8"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <User className="w-8 h-8 text-blue-900" />
            </div>
            <h2 className="text-blue-900 mb-2">Student Login</h2>
            <p className="text-gray-600">Enter your college credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="collegeId" className="text-gray-700 mb-2 block">
                College ID
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="collegeId"
                  type="text"
                  placeholder="e.g., CS21001"
                  value={collegeId}
                  onChange={(e) => setCollegeId(e.target.value)}
                  className="pl-10 h-12 border-gray-300 rounded-xl"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-700 mb-2 block">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 border-gray-300 rounded-xl"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-white rounded-xl transition-colors"
            >
              Login
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a href="#" className="text-blue-900 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
        >
          <p className="text-blue-100 text-sm text-center">
            💡 First time? Use your college ID and default password to login
          </p>
        </motion.div>
      </div>
    </div>
  );
}
