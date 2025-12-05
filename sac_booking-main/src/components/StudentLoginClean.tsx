import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface StudentLoginCleanProps {
  onBack: () => void;
  onLoginSuccess: () => void;
  onSignupClick: () => void;
  onForgotPasswordClick: () => void;
}

export const StudentLoginClean: React.FC<StudentLoginCleanProps> = ({
  onBack,
  onLoginSuccess,
  onSignupClick,
  onForgotPasswordClick,
}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const validateEmail = (email: string): boolean => {
    // Strict validation - only accept @rguktn.ac.in emails
    const regex = /^[a-zA-Z0-9._-]+@rguktn\.ac\.in$/;
    return regex.test(email);
  };

  const emailVerified = email.length > 0 && validateEmail(email);
  // Only show validation icon when email is complete (contains @) or when touched
  const shouldShowEmailValidation = email.length > 0 && (email.includes('@') || emailTouched);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setError('');
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!validateEmail(email)) {
      setError('Email must end with @rguktn.ac.in');
      return;
    }

    if (!password) {
      setError('Password is required.');
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        setTimeout(() => {
          onLoginSuccess();
        }, 300);
      } else {
        setError('Invalid email or password.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
          <div className="mb-8">
            <h2 className="text-3xl text-[#1a1a1a] mb-2">Student Login</h2>
            <p className="text-[#666666]">Enter your college credentials</p>
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
            {/* Email Field */}
            <div>
              <label className="block text-[#1a1a1a] mb-2">College Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  placeholder="n123456@rguktn.ac.in"
                  className={`w-full bg-white border rounded-xl pl-12 pr-12 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth ${emailVerified ? 'border-[#28a745]' : shouldShowEmailValidation && !emailVerified ? 'border-[#dc3545]' : 'border-[#e5e5e5]'
                    }`}
                />
                {shouldShowEmailValidation && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {emailVerified ? (
                      <CheckCircle className="w-5 h-5 text-[#28a745]" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-[#dc3545]" />
                    )}
                  </div>
                )}
              </div>
              {shouldShowEmailValidation && (
                <p className={`mt-2 text-xs ${emailVerified ? 'text-[#28a745]' : 'text-[#dc3545]'}`}>
                  {emailVerified ? '✔ RGUKTN email verified' : 'Format: your-email@rguktn.ac.in'}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[#1a1a1a] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handlePasswordBlur}
                  placeholder="Enter your password"
                  className="w-full bg-white border border-[#e5e5e5] rounded-xl pl-12 pr-4 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth"
                />
              </div>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: !isLoading ? 1.01 : 1, y: !isLoading ? -1 : 0 }}
              whileTap={{ scale: !isLoading ? 0.99 : 1 }}
              className="w-full py-3 bg-[#0066ff] rounded-xl text-white hover:bg-[#0052cc] smooth shadow-card disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0066ff]"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>

          {/* Forgot Password Link */}
          <div className="mt-4 text-center">
            <button
              onClick={onForgotPasswordClick}
              type="button"
              className="text-[#0066ff] text-sm hover:text-[#0052cc] smooth hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-[#e5e5e5]" />
            <span className="text-[#999999] text-sm">or</span>
            <div className="flex-1 h-px bg-[#e5e5e5]" />
          </div>

          {/* Signup Link */}
          <button
            onClick={onSignupClick}
            type="button"
            className="w-full text-center text-[#666666] hover:text-[#1a1a1a] smooth"
          >
            Don't have an account?{' '}
            <span className="text-[#0066ff]">Sign up</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
