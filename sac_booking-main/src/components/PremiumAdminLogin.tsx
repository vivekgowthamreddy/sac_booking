import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck, Mail, Lock, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface PremiumAdminLoginProps {
  onLogin: (user: any) => void;
  onBack: () => void;
}

export function PremiumAdminLogin({ onLogin, onBack }: PremiumAdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (email && password) {
      onLogin({
        email,
        name: 'Admin User',
        type: 'admin'
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0F] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-mesh" />
      
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4EA8E9] opacity-20 rounded-full blur-3xl"
      />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back</span>
          </motion.button>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-[#4EA8E9] to-[#6C63FF] rounded-3xl opacity-20 blur-xl" />
            
            {/* Card Content */}
            <div className="relative glass-medium rounded-3xl border border-white/10 p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  className="inline-block mb-6"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4EA8E9] to-[#6C63FF] rounded-2xl blur-xl opacity-50" />
                    <div className="relative glass-light p-4 rounded-2xl border border-white/20">
                      <ShieldCheck className="w-12 h-12 text-white" strokeWidth={1.5} />
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-[#4EA8E9]" />
                    <span className="text-[#999BA3] uppercase tracking-wider text-xs">Restricted Access</span>
                  </div>
                  <h2 className="text-white mb-2">Admin Portal</h2>
                  <p className="text-[#999BA3]">SRC & Staff Only</p>
                </motion.div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label htmlFor="email" className="text-white/80 mb-3 block">
                    Email Address
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-[#4EA8E9] transition-colors" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@college.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:border-[#4EA8E9] focus:bg-white/10 transition-all"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Label htmlFor="password" className="text-white/80 mb-3 block">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-[#4EA8E9] transition-colors" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 h-14 bg-white/5 border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:border-[#4EA8E9] focus:bg-white/10 transition-all"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full h-14 bg-gradient-to-r from-[#4EA8E9] to-[#6C63FF] hover:shadow-lg hover:shadow-[#4EA8E9]/50 text-white rounded-2xl transition-all overflow-hidden group border-0"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        <span className="relative z-10">Access Portal</span>
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 text-center"
              >
                <button className="text-[#4EA8E9] text-sm hover:text-white transition-colors">
                  Need help accessing?
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 glass-light p-4 rounded-2xl border border-red-500/20"
          >
            <p className="text-red-400/80 text-sm text-center flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              This portal is monitored. Unauthorized access is prohibited.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </div>
  );
}
