import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowLeft, AlertCircle, CheckCircle, Send } from 'lucide-react';

interface ForgotPasswordCleanProps {
    onBack: () => void;
    onResetRequested: (email: string, token: string) => void;
}

export const ForgotPasswordClean: React.FC<ForgotPasswordCleanProps> = ({
    onBack,
    onResetRequested,
}) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [emailTouched, setEmailTouched] = useState(false);

    const validateEmail = (email: string): boolean => {
        const regex = /^[a-zA-Z0-9._-]+@rguktn\.ac\.in$/;
        return regex.test(email);
    };

    const emailVerified = email.length > 0 && validateEmail(email);
    const shouldShowEmailValidation = email.length > 0 && (email.includes('@') || emailTouched);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError('');
        setSuccess(false);
    };

    const handleEmailBlur = () => {
        setEmailTouched(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setEmailTouched(true);

        if (!validateEmail(email)) {
            setError('Email must end with @rguktn.ac.in');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                // In production, user would receive email. For development, we show the token
                if (data.resetToken) {
                    setTimeout(() => {
                        onResetRequested(email, data.resetToken);
                    }, 2000);
                } else {
                    // User not found or production mode
                    // Don't redirect, just show the success message
                }
            } else {
                setError(data.message || 'Failed to send reset email');
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

            {/* Forgot Password Card */}
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
                            <Mail className="w-8 h-8 text-[#0066ff]" />
                        </div>
                        <h2 className="text-3xl text-[#1a1a1a] mb-2 text-center">Forgot Password?</h2>
                        <p className="text-[#666666] text-center">
                            Enter your college email and we'll send you a reset code
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
                                <p className="text-[#28a745] text-sm font-medium">
                                    {emailVerified ? 'Request processed' : 'Reset code sent!'}
                                </p>
                                <p className="text-[#666666] text-xs mt-1">
                                    {/* We can't easily know if we have a token here without state, 
                                        but for now let's make it generic or check if we should show redirecting */}
                                    Check your email for instructions.
                                </p>
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
                                    disabled={success}
                                    className={`w-full bg-white border rounded-xl pl-12 pr-12 py-3 text-[#1a1a1a] placeholder:text-[#999999] input-focus smooth ${emailVerified ? 'border-[#28a745]' : shouldShowEmailValidation && !emailVerified ? 'border-[#dc3545]' : 'border-[#e5e5e5]'
                                        } disabled:opacity-50 disabled:cursor-not-allowed`}
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

                        {/* Submit Button */}
                        {/* Submit Button */}
                        {!success && (
                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                whileHover={{ scale: !isLoading ? 1.01 : 1, y: !isLoading ? -1 : 0 }}
                                whileTap={{ scale: !isLoading ? 0.99 : 1 }}
                                className="w-full py-3 bg-[#0066ff] rounded-xl text-white hover:bg-[#0052cc] smooth shadow-card disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0066ff] flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    'Sending...'
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Send Reset Link
                                    </>
                                )}
                            </motion.button>
                        )}

                        {/* Success State & Try Again */}
                        {success && (
                            <div className="space-y-3">
                                <div className="w-full py-3 bg-[#28a745] rounded-xl text-white flex items-center justify-center gap-2 shadow-card">
                                    <CheckCircle className="w-5 h-5" />
                                    Sent Successfully
                                </div>

                                <motion.button
                                    type="button"
                                    onClick={() => {
                                        setEmail('');
                                        setEmailTouched(false);
                                        setSuccess(false);
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    whileHover={{ scale: 1.01, y: -1 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="w-full py-3 bg-white border border-[#e5e5e5] rounded-xl text-[#666666] hover:text-[#1a1a1a] hover:border-[#999999] smooth"
                                >
                                    Try another email
                                </motion.button>
                            </div>
                        )}
                    </form>

                    {/* Info */}
                    <div className="mt-6 p-4 bg-[#f5f5f5] rounded-xl">
                        <p className="text-[#666666] text-sm text-center">
                            💡 You'll receive a 6-digit code that expires in 15 minutes
                        </p>
                    </div>
                </div>
            </motion.div >
        </div >
    );
};
