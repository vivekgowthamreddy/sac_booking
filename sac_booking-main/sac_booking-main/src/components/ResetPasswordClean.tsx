import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, ArrowLeft, AlertCircle, CheckCircle, Key } from 'lucide-react';

interface ResetPasswordCleanProps {
    onBack: () => void;
    onResetSuccess: () => void;
    prefillEmail?: string;
    prefillToken?: string;
}

export const ResetPasswordClean: React.FC<ResetPasswordCleanProps> = ({
    onBack,
    onResetSuccess,
    prefillEmail = '',
    prefillToken = '',
}) => {
    const [email, setEmail] = useState(prefillEmail);
    const [token, setToken] = useState(prefillToken);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email: string): boolean => {
        const regex = /^[a-zA-Z0-9._-]+@rguktn\.ac\.in$/;
        return regex.test(email);
    };

    const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;
    const passwordValid = newPassword.length >= 6;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateEmail(email)) {
            setError('Email must end with @rguktn.ac.in');
            return;
        }

        if (!token || token.length !== 6) {
            setError('Please enter a valid 6-digit reset code');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, token, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setTimeout(() => {
                    onResetSuccess();
                }, 1500);
            } else {
                setError(data.message || 'Failed to reset password');
            }
        } catch (err) {
            setError('Unable to connect to server. Please try again later.');
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

            {/* Reset Password Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md"
            >
                <div className="bg-white border border-[#e5e5e5] rounded-2xl p-8 shadow-card">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="w-16 h-16 bg-[#e6f2ff] rounded-2xl mx-auto mb-4 flex items-center justify-center">
                            <Key className="w-8 h-8 text-[#0066ff]" />
                        </div>
                        <h2 className="text-3xl text-[#1a1a1a] mb-2 text-center">Reset Password</h2>
                        <p className="text-[#666666] text-center">
                            Enter the code sent to your email and create a new password
                        </p>
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
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="block text-[#1a1a1a] mb-2">College Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                placeholder="n123456@rguktn.ac.in"
                                className="w-full bg-white border border-[#e5e5e5] rounded-xl px-4 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth"
                            />
                        </div>

                        {/* Reset Code Field */}
                        <div>
                            <label className="block text-[#1a1a1a] mb-2">Reset Code</label>
                            <input
                                type="text"
                                value={token}
                                onChange={(e) => { setToken(e.target.value.replace(/\D/g, '').slice(0, 6)); setError(''); }}
                                placeholder="Enter 6-digit code"
                                maxLength={6}
                                className="w-full bg-white border border-[#e5e5e5] rounded-xl px-4 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth text-center text-2xl tracking-widest font-mono"
                            />
                            <p className="mt-2 text-xs text-[#666666]">
                                Check your email for the reset code
                            </p>
                        </div>

                        {/* New Password Field */}
                        <div>
                            <label className="block text-[#1a1a1a] mb-2">New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => { setNewPassword(e.target.value); setError(''); }}
                                    placeholder="At least 6 characters"
                                    className={`w-full bg-white border rounded-xl pl-12 pr-12 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth ${newPassword.length > 0 ? (passwordValid ? 'border-[#28a745]' : 'border-[#dc3545]') : 'border-[#e5e5e5]'
                                        }`}
                                />
                                {newPassword.length > 0 && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        {passwordValid ? (
                                            <CheckCircle className="w-5 h-5 text-[#28a745]" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 text-[#dc3545]" />
                                        )}
                                    </div>
                                )}
                            </div>
                            {newPassword.length > 0 && (
                                <p className={`mt-2 text-xs ${passwordValid ? 'text-[#28a745]' : 'text-[#dc3545]'}`}>
                                    {passwordValid ? '✔ Password meets requirements' : 'Must be at least 6 characters'}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label className="block text-[#1a1a1a] mb-2">Confirm New Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
                                    placeholder="Re-enter password"
                                    className={`w-full bg-white border rounded-xl pl-12 pr-12 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth ${confirmPassword.length > 0 ? (passwordsMatch ? 'border-[#28a745]' : 'border-[#dc3545]') : 'border-[#e5e5e5]'
                                        }`}
                                />
                                {confirmPassword.length > 0 && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                        {passwordsMatch ? (
                                            <CheckCircle className="w-5 h-5 text-[#28a745]" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 text-[#dc3545]" />
                                        )}
                                    </div>
                                )}
                            </div>
                            {confirmPassword.length > 0 && (
                                <p className={`mt-2 text-xs ${passwordsMatch ? 'text-[#28a745]' : 'text-[#dc3545]'}`}>
                                    {passwordsMatch ? '✔ Passwords match' : 'Passwords do not match'}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: !isLoading ? 1.01 : 1, y: !isLoading ? -1 : 0 }}
                            whileTap={{ scale: !isLoading ? 0.99 : 1 }}
                            className="w-full py-3 bg-[#0066ff] rounded-xl text-white hover:bg-[#0052cc] smooth shadow-card disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0066ff]"
                        >
                            {isLoading ? 'Resetting Password...' : 'Reset Password'}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};
