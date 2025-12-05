import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowLeft, AlertCircle, CheckCircle, UserCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface StudentSignupCleanProps {
  onBack: () => void;
  onSignupSuccess: () => void;
  onLoginClick?: () => void;
}

export const StudentSignupClean: React.FC<StudentSignupCleanProps> = ({ onBack, onSignupSuccess, onLoginClick }) => {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [nameTouched, setNameTouched] = useState(false);
  const [rollNumberTouched, setRollNumberTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [genderTouched, setGenderTouched] = useState(false);
  const [showLoginSuggestion, setShowLoginSuggestion] = useState(false);

  const validateEmail = (email: string): boolean => {
    const regex = /^[a-zA-Z0-9._-]+@rguktn\.ac\.in$/;
    return regex.test(email);
  };

  const emailVerified = email.length > 0 && validateEmail(email);
  const shouldShowEmailValidation = email.length > 0 && (email.includes('@') || emailTouched);
  const passwordsMatch = password === confirmPassword && password.length > 0 && confirmPassword.length > 0;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNameTouched(true);
    setRollNumberTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    setConfirmPasswordTouched(true);
    setGenderTouched(true);

    if (!name.trim()) {
      setError('Name is required.');
      return;
    }

    if (!rollNumber.trim()) {
      setError('Roll number is required.');
      return;
    }

    if (!validateEmail(email.trim())) {
      setError('Email must end with @rguktn.ac.in');
      setShowLoginSuggestion(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setShowLoginSuggestion(false);
      return;
    }

    if (!gender) {
      setError('Please select your gender.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signup(name, rollNumber, email.trim(), password, gender);
      if (result.success) {
        setTimeout(() => {
          onSignupSuccess();
        }, 300);
      } else {
        // Check if the error suggests the user should login
        if (result.suggestion === 'login' || result.error?.includes('already exists') || result.error?.includes('already registered')) {
          setShowLoginSuggestion(true);
        } else {
          setShowLoginSuggestion(false);
        }
        // Show the actual error message from the server
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setShowLoginSuggestion(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4 py-8">
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

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="bg-white border border-[#e5e5e5] rounded-2xl p-8 shadow-card">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl text-[#1a1a1a] mb-2">Create Account</h2>
            <p className="text-[#666666]">Enter your details to get started</p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-[#fff5f5] border border-[#dc3545] rounded-xl flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-[#dc3545] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-[#dc3545] text-sm">{error}</p>
                {showLoginSuggestion && onLoginClick && (
                  <button
                    type="button"
                    onClick={onLoginClick}
                    className="mt-3 text-sm text-[#0066ff] hover:text-[#0052cc] font-medium hover:underline"
                  >
                    Go to Login →
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-5">
            {/* Name Field */}
            <div>
              <label className="block text-[#1a1a1a] mb-2 text-sm font-medium">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(''); }}
                onBlur={() => setNameTouched(true)}
                placeholder="Enter your full name"
                className={`w-full bg-white border rounded-xl px-4 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth ${nameTouched && !name.trim() ? 'border-[#dc3545]' : name.trim() ? 'border-[#28a745]' : 'border-[#e5e5e5]'
                  }`}
              />
            </div>

            {/* Roll Number Field */}
            <div>
              <label className="block text-[#1a1a1a] mb-2 text-sm font-medium">Roll Number</label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => { setRollNumber(e.target.value); setError(''); }}
                onBlur={() => setRollNumberTouched(true)}
                placeholder="e.g., N220866"
                className={`w-full bg-white border rounded-xl px-4 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth ${rollNumberTouched && !rollNumber.trim() ? 'border-[#dc3545]' : rollNumber.trim() ? 'border-[#28a745]' : 'border-[#e5e5e5]'
                  }`}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-[#1a1a1a] mb-2 text-sm font-medium">College Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => setEmailTouched(true)}
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
              {shouldShowEmailValidation && !emailVerified && (
                <p className="mt-1 text-xs text-[#dc3545]">Format: your-email@rguktn.ac.in</p>
              )}
            </div>

            {/* Gender Selection */}
            <div>
              <label className="block text-[#1a1a1a] mb-2 text-sm font-medium">Gender</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => { setGender('male'); setError(''); }}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 smooth ${gender === 'male'
                    ? 'bg-[#e6f2ff] border-[#0066ff] text-[#0066ff]'
                    : 'bg-white border-[#e5e5e5] text-[#666666] hover:border-[#0066ff]'
                    } ${genderTouched && !gender ? 'border-[#dc3545]' : ''}`}
                >
                  <UserCircle className="w-5 h-5" />
                  <span>Male</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setGender('female'); setError(''); }}
                  className={`p-3 rounded-xl border flex items-center justify-center gap-2 smooth ${gender === 'female'
                    ? 'bg-[#e6f2ff] border-[#0066ff] text-[#0066ff]'
                    : 'bg-white border-[#e5e5e5] text-[#666666] hover:border-[#0066ff]'
                    } ${genderTouched && !gender ? 'border-[#dc3545]' : ''}`}
                >
                  <UserCircle className="w-5 h-5" />
                  <span>Female</span>
                </button>
              </div>
              {genderTouched && !gender && (
                <p className="mt-1 text-xs text-[#dc3545]">Please select your gender</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[#1a1a1a] mb-2 text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPasswordTouched(true)}
                  placeholder="Minimum 6 characters"
                  className={`w-full bg-white border rounded-xl pl-12 pr-4 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth ${passwordTouched && password.length > 0 && password.length < 6 ? 'border-[#dc3545]' : password.length >= 6 ? 'border-[#28a745]' : 'border-[#e5e5e5]'
                    }`}
                />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-[#1a1a1a] mb-2 text-sm font-medium">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => setConfirmPasswordTouched(true)}
                  placeholder="Re-enter password"
                  className={`w-full bg-white border rounded-xl pl-12 pr-4 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth ${confirmPasswordTouched && confirmPassword.length > 0 && passwordsMatch ? 'border-[#28a745]' : confirmPasswordTouched && confirmPassword.length > 0 && !passwordsMatch ? 'border-[#dc3545]' : 'border-[#e5e5e5]'
                    }`}
                />
              </div>
              {confirmPasswordTouched && confirmPassword.length > 0 && !passwordsMatch && (
                <p className="mt-1 text-xs text-[#dc3545]">Passwords do not match</p>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: !isLoading ? 1.01 : 1, y: !isLoading ? -1 : 0 }}
              whileTap={{ scale: !isLoading ? 0.99 : 1 }}
              className="w-full py-3 bg-[#0066ff] rounded-xl text-white hover:bg-[#0052cc] smooth shadow-card disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0066ff] mt-4"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
