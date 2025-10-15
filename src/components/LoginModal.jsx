import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, Mail, Lock } from 'lucide-react';
import { toast } from 'react-toastify';
import { post } from '../api/api'; 
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const LoginModal = ({ isOpen, onClose, onLogin, onSignup }) => {
  const [shake, setShake] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (formData) => {
    try {
      const body = new URLSearchParams();
      body.append('username', formData.email);
      body.append('password', formData.password);
      
      const response = await post('/auth/login', body, 'application/x-www-form-urlencoded');
      
      onLogin(response); 
      toast.success('Login successful! Welcome back.');
      onClose();
    } catch (error) {
      toast.error(error.message || 'Login failed. Please check your credentials.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          aria-labelledby="login-modal-title"
          role="dialog"
          aria-modal="true"
        >
          <motion.div 
            className="bg-neutral-800/50 backdrop-blur-xl p-6 sm:p-8 rounded-2xl w-full max-w-md border border-neutral-700/80 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            // CORRECTED: The duplicate 'animate' props have been merged into one.
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              x: shake ? [0, -10, 10, -10, 10, 0] : 0,
            }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            // CORRECTED: The transition is now more specific for a better feel.
            transition={{
              x: { duration: 0.5, ease: "easeInOut" },
              default: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 id="login-modal-title" className="text-white text-2xl font-semibold font-poppins">Welcome Back</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close modal">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
              <div className="relative">
                <Mail size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  id="email-login"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className={`w-full p-3 pl-11 bg-neutral-700/50 text-white rounded-md border ${errors.email ? 'border-red-500' : 'border-neutral-600'} focus:ring-2 focus:ring-primary-500 focus:outline-none transition`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm -mt-4">{errors.email.message}</p>}
              
              <div className="relative">
                <Lock size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <input
                  id="password-login"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                  className={`w-full p-3 pl-11 bg-neutral-700/50 text-white rounded-md border ${errors.password ? 'border-red-500' : 'border-neutral-600'} focus:ring-2 focus:ring-primary-500 focus:outline-none transition`}
                />
              </div>
              {errors.password && <p className="text-red-500 text-sm -mt-4">{errors.password.message}</p>}

              <div className="text-right text-sm">
                <a href="#" className="text-primary-400 hover:underline">Forgot Password?</a>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-500 text-white py-3 rounded-md hover:bg-primary-600 transition-colors mt-6 disabled:opacity-50 font-bold flex items-center justify-center"
              >
                {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : 'Login'}
              </button>
            </form>
            
            <p className="text-gray-400 text-center mt-6 text-sm">
              Don't have an account? <button className="text-primary-400 hover:underline font-semibold" onClick={() => { onClose(); onSignup(); }}>Sign up for free</button>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;

