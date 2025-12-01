import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowLeft, AlertCircle, CheckCircle, UserCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface StudentSignupCleanProps {
  onBack: () => void;
  onSignupSuccess: () => void;
}

export const StudentSignupClean: React.FC<StudentSignupCleanProps> = ({ onBack, onSignupSuccess }) => {
  const { signup } = useAuth();
  const [step, setStep] = useState<'personal' | 'gender'>('personal');
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [rollNumberTouched, setRollNumberTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const validateEmail = (email: string): boolean => {
    // Strict validation - only accept @rguktn.ac.in emails
    const regex = /^[a-zA-Z0-9._-]+@rguktn\.ac\.in$/;
    return regex.test(email);
  };

  const emailVerified = email.length > 0 && validateEmail(email);
  // Only show validation icon when email is complete (contains @) or when touched
  const shouldShowEmailValidation = email.length > 0 && (email.includes('@') || emailTouched);
  const passwordsMatch = password === confirmPassword && password.length > 0 && confirmPassword.length > 0;
  // Validate all required fields before allowing continue
  const canContinue = name.trim().length > 0 && rollNumber.trim().length > 0 && emailVerified && password.length >= 6 && passwordsMatch;

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

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordTouched(true);
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNameTouched(true);
    setRollNumberTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);
    setConfirmPasswordTouched(true);

    if (!name.trim()) {
      setError('Name is required.');
      return;
    }

    if (!rollNumber.trim()) {
      setError('Roll number is required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Email must end with @rguktn.ac.in');
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
    setIsLoading(true);
    setError('');

    try {
      const success = await signup(name, rollNumber, email, password, selectedGender);
      if (success) {
        setTimeout(() => {
          onSignupSuccess();
        }, 300);
      } else {
        setError('Email already exists. Please login instead.');
        setStep('personal');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setStep('personal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
      {/* Back Button */}
      <motion.button
        onClick={() => step === 'gender' ? setStep('personal') : onBack()}
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
          {step === 'personal' ? (
            <>
              {/* Personal Details Step Header */}
              <div className="mb-8">
                <h2 className="text-3xl text-[#1a1a1a] mb-2">Create Account</h2>
                <p className="text-[#666666]">Enter your personal details</p>
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

              {/* Personal Details Form */}
              <form onSubmit={handleContinue} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-[#1a1a1a] mb-2">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setError('');
                      }}
                      onBlur={() => setNameTouched(true)}
                      placeholder="Enter your full name"
                      className={`w-full bg-white border rounded-xl pl-4 pr-4 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth ${
                        nameTouched && !name.trim() ? 'border-[#dc3545]' : name.trim() ? 'border-[#28a745]' : 'border-[#e5e5e5]'
                      }`}
                    />
                  </div>
                </div>

                {/* Roll Number Field */}
                <div>
                  <label className="block text-[#1a1a1a] mb-2">Roll Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={rollNumber}
                      onChange={(e) => {
                        setRollNumber(e.target.value);
                        setError('');
                      }}
                      onBlur={() => setRollNumberTouched(true)}
                      placeholder="e.g., N220866"
                      className={`w-full bg-white border rounded-xl pl-4 pr-4 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth ${
                        rollNumberTouched && !rollNumber.trim() ? 'border-[#dc3545]' : rollNumber.trim() ? 'border-[#28a745]' : 'border-[#e5e5e5]'
                      }`}
                    />
                  </div>
                </div>

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
                      className={`w-full bg-white border rounded-xl pl-12 pr-12 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth ${
                        emailVerified ? 'border-[#28a745]' : shouldShowEmailValidation && !emailVerified ? 'border-[#dc3545]' : 'border-[#e5e5e5]'
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

                <div>
                  <label className="block text-[#1a1a1a] mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={handlePasswordBlur}
                      placeholder="Minimum 6 characters"
                      className={`w-full bg-white border rounded-xl pl-12 pr-4 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth ${
                        passwordTouched && password.length > 0 && password.length < 6 ? 'border-[#dc3545]' : password.length >= 6 ? 'border-[#28a745]' : 'border-[#e5e5e5]'
                      }`}
                    />
                  </div>
                  {passwordTouched && password.length > 0 && password.length < 6 && (
                    <p className="mt-2 text-xs text-[#dc3545]">
                      Password must be at least 6 characters
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-[#1a1a1a] mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onBlur={handleConfirmPasswordBlur}
                      placeholder="Re-enter password"
                      className={`w-full bg-white border rounded-xl pl-12 pr-4 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth ${
                        confirmPasswordTouched && confirmPassword.length > 0 && passwordsMatch ? 'border-[#28a745]' : confirmPasswordTouched && confirmPassword.length > 0 && !passwordsMatch ? 'border-[#dc3545]' : 'border-[#e5e5e5]'
                      }`}
                    />
                  </div>
                  {confirmPasswordTouched && confirmPassword.length > 0 && !passwordsMatch && (
                    <p className="mt-2 text-xs text-[#dc3545]">
                      Passwords do not match
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: !isLoading ? 1.01 : 1, y: !isLoading ? -1 : 0 }}
                  whileTap={{ scale: !isLoading ? 0.99 : 1 }}
                  className="w-full py-3 bg-[#0066ff] rounded-xl text-white hover:bg-[#0052cc] smooth shadow-card disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0066ff]"
                >
                  {isLoading ? 'Processing...' : 'Continue'}
                </motion.button>
              </form>
            </>
          ) : (
            <>
              {/* Gender Step Header */}
              <div className="mb-8">
                <h2 className="text-3xl text-[#1a1a1a] mb-2">Select Gender</h2>
                <p className="text-[#666666]">This helps us show relevant shows</p>
              </div>

              {/* Gender Cards */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  onClick={() => handleGenderSelection('male')}
                  disabled={isLoading}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-8 bg-white border-2 border-[#e5e5e5] hover:border-[#0066ff] rounded-2xl smooth disabled:opacity-50 shadow-subtle hover:shadow-card"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-[#f0f9ff] rounded-full flex items-center justify-center">
                    <UserCircle className="w-8 h-8 text-[#0066ff]" />
                  </div>
                  <p className="text-[#1a1a1a] text-center">Male</p>
                </motion.button>

                <motion.button
                  onClick={() => handleGenderSelection('female')}
                  disabled={isLoading}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-8 bg-white border-2 border-[#e5e5e5] hover:border-[#0066ff] rounded-2xl smooth disabled:opacity-50 shadow-subtle hover:shadow-card"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-[#f0f9ff] rounded-full flex items-center justify-center">
                    <UserCircle className="w-8 h-8 text-[#0066ff]" />
                  </div>
                  <p className="text-[#1a1a1a] text-center">Female</p>
                </motion.button>
              </div>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-[#666666] mt-4"
                >
                  <div className="inline-block w-5 h-5 border-2 border-[#0066ff]/30 border-t-[#0066ff] rounded-full animate-spin mr-2" />
                  Creating your account...
                </motion.div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
