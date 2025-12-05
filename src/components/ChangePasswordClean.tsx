import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, AlertCircle, CheckCircle, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ChangePasswordCleanProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const ChangePasswordClean: React.FC<ChangePasswordCleanProps> = ({
    onSuccess,
    onCancel,
}) => {
    const { token } = useAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const passwordValid = newPassword.length >= 6;
    const passwordsMatch = newPassword.length > 0 && newPassword === confirmPassword;
    const passwordsDifferent = newPassword.length > 0 && currentPassword.length > 0 && newPassword !== currentPassword;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!currentPassword) {
            setError('Please enter your current password');
            return;
        }

        if (newPassword.length < 6) {
            setError('New password must be at least 6 characters');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        if (newPassword === currentPassword) {
            setError('New password must be different from current password');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/change-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');

                // Auto-close after success
                setTimeout(() => {
                    if (onSuccess) {
                        onSuccess();
                    }
                }, 2000);
            } else {
                setError(data.message || 'Failed to change password');
            }
        } catch (err) {
            setError('Unable to connect to server. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white border border-[#e5e5e5] rounded-2xl p-8 shadow-card">
                {/* Header */}
                <div className="mb-8">
                    <div className="w-16 h-16 bg-[#e6f2ff] rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <Shield className="w-8 h-8 text-[#0066ff]" />
                    </div>
                    <h2 className="text-2xl text-[#1a1a1a] mb-2 text-center">Change Password</h2>
                    <p className="text-[#666666] text-center text-sm">
                        Keep your account secure by updating your password regularly
                    </p>
                </div>

                {/* Success Message */}
                {success && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-6 p-4 bg-[#f0fff4] border border-[#28a745] rounded-xl flex items-start gap-3"
                    >
                        <CheckCircle className="w-5 h-5 text-[#28a745] flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-[#28a745] text-sm font-medium">Password changed successfully!</p>
                            <p className="text-[#666666] text-xs mt-1">Your password has been updated</p>
                        </div>
                    </motion.div>
                )}

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
                    {/* Current Password */}
                    <div>
                        <label className="block text-[#1a1a1a] mb-2 text-sm font-medium">Current Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                            <input
                                type="password"
                                value={currentPassword}
                                onChange={(e) => { setCurrentPassword(e.target.value); setError(''); setSuccess(false); }}
                                placeholder="Enter current password"
                                disabled={success}
                                className="w-full bg-white border border-[#e5e5e5] rounded-xl pl-12 pr-4 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth disabled:opacity-50"
                            />
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-[#1a1a1a] mb-2 text-sm font-medium">New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => { setNewPassword(e.target.value); setError(''); setSuccess(false); }}
                                placeholder="At least 6 characters"
                                disabled={success}
                                className={`w-full bg-white border rounded-xl pl-12 pr-12 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth disabled:opacity-50 ${newPassword.length > 0 ? (passwordValid && passwordsDifferent ? 'border-[#28a745]' : 'border-[#dc3545]') : 'border-[#e5e5e5]'
                                    }`}
                            />
                            {newPassword.length > 0 && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    {passwordValid && passwordsDifferent ? (
                                        <CheckCircle className="w-5 h-5 text-[#28a745]" />
                                    ) : (
                                        <AlertCircle className="w-5 h-5 text-[#dc3545]" />
                                    )}
                                </div>
                            )}
                        </div>
                        {newPassword.length > 0 && (
                            <div className="mt-2 space-y-1">
                                <p className={`text-xs ${passwordValid ? 'text-[#28a745]' : 'text-[#dc3545]'}`}>
                                    {passwordValid ? '✔' : '✗'} At least 6 characters
                                </p>
                                {currentPassword.length > 0 && (
                                    <p className={`text-xs ${passwordsDifferent ? 'text-[#28a745]' : 'text-[#dc3545]'}`}>
                                        {passwordsDifferent ? '✔' : '✗'} Different from current password
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-[#1a1a1a] mb-2 text-sm font-medium">Confirm New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value); setError(''); setSuccess(false); }}
                                placeholder="Re-enter new password"
                                disabled={success}
                                className={`w-full bg-white border rounded-xl pl-12 pr-12 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth disabled:opacity-50 ${confirmPassword.length > 0 ? (passwordsMatch ? 'border-[#28a745]' : 'border-[#dc3545]') : 'border-[#e5e5e5]'
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
                                {passwordsMatch ? '✔ Passwords match' : '✗ Passwords do not match'}
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        {onCancel && (
                            <motion.button
                                type="button"
                                onClick={onCancel}
                                whileHover={{ scale: 1.01, y: -1 }}
                                whileTap={{ scale: 0.99 }}
                                className="flex-1 py-3 bg-[#f5f5f5] rounded-xl text-[#666666] hover:bg-[#e5e5e5] smooth"
                            >
                                Cancel
                            </motion.button>
                        )}
                        <motion.button
                            type="submit"
                            disabled={isLoading || success}
                            whileHover={{ scale: !isLoading && !success ? 1.01 : 1, y: !isLoading && !success ? -1 : 0 }}
                            whileTap={{ scale: !isLoading && !success ? 0.99 : 1 }}
                            className={`${onCancel ? 'flex-1' : 'w-full'} py-3 bg-[#0066ff] rounded-xl text-white hover:bg-[#0052cc] smooth shadow-card disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0066ff]`}
                        >
                            {isLoading ? 'Changing...' : success ? 'Changed!' : 'Change Password'}
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    );
};
