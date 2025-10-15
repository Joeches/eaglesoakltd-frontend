import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { X, Loader2, Mail, Lock, Briefcase } from 'lucide-react';
import { post } from '../api/api';
import { Link } from 'react-router-dom';

// The validation schema is already professional and requires no changes.
const signupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  role: z.enum(['buyer', 'realtor'], { errorMap: () => ({ message: "Please select a role" }) }),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// UI/UX ENHANCEMENT 1: A world-class, reusable Password Strength Meter component.
const PasswordStrengthMeter = ({ password }) => {
  const getStrength = () => {
    let score = 0;
    if (password.length > 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };
  const strength = getStrength();
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];

  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="w-full bg-neutral-700 rounded-full h-1.5">
        <motion.div 
          className={`h-1.5 rounded-full ${colors[strength - 1] || ''}`}
          initial={{ width: 0 }}
          animate={{ width: `${(strength / 4) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <span className="text-xs text-gray-400 w-16 text-right">{labels[strength - 1] || ''}</span>
    </div>
  );
};

const SignupForm = ({ isOpen, onClose, onSignup, onLogin }) => {
  const [shake, setShake] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm({
    resolver: zodResolver(signupSchema),
    mode: 'onChange' // Important for the password meter to be live
  });

  const passwordValue = watch('password', ''); // Watch the password field for changes

  const onSubmit = async (formData) => {
    try {
      const response = await post('/auth/register', {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      toast.success('Signup successful! You are now logged in.');
      onSignup(response);
      onClose();
    } catch (error) {
      toast.error(error.message || 'An error occurred. This email may already be in use.');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          aria-labelledby="signup-modal-title" role="dialog" aria-modal="true"
        >
          <motion.div 
            className="bg-neutral-800/50 backdrop-blur-xl p-6 sm:p-8 rounded-2xl w-full max-w-md border border-neutral-700/80 shadow-2xl max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: shake ? [0, -10, 10, -10, 10, 0] : 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ x: { duration: 0.5 }, default: { duration: 0.3 } }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 id="signup-modal-title" className="text-white text-2xl font-semibold font-poppins">Create Your Account</h3>
              <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close modal"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="relative">
                <Mail size={20} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
                <input id="email-signup" type="email" placeholder="you@example.com" {...register('email')} className={`w-full p-3 pl-11 bg-neutral-700/50 rounded-md border ${errors.email ? 'border-red-500' : 'border-neutral-600'}`} />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
              
              <div>
                <div className="relative">
                  <Lock size={20} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
                  <input id="password-signup" type="password" placeholder="Create a strong password" {...register('password')} className={`w-full p-3 pl-11 bg-neutral-700/50 rounded-md border ${errors.password ? 'border-red-500' : 'border-neutral-600'}`} />
                </div>
                {passwordValue && <PasswordStrengthMeter password={passwordValue} />}
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>

              <div className="relative">
                <Lock size={20} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
                <input id="confirmPassword-signup" type="password" placeholder="Confirm your password" {...register('confirmPassword')} className={`w-full p-3 pl-11 bg-neutral-700/50 rounded-md border ${errors.confirmPassword ? 'border-red-500' : 'border-neutral-600'}`} />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}

              <div className="relative">
                <Briefcase size={20} className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none" />
                <select id="role-signup" {...register('role')} className={`w-full p-3 pl-11 bg-neutral-700/50 rounded-md border appearance-none ${errors.role ? 'border-red-500' : 'border-neutral-600'}`}>
                  <option value="">Select your role...</option>
                  <option value="buyer">Prospective Buyer</option>
                  <option value="realtor">Real Estate Agent</option>
                </select>
              </div>
              {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}

              <div className="flex items-start space-x-3 pt-2">
                <input type="checkbox" id="agreeToTerms" {...register('agreeToTerms')} className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <div className="text-sm">
                  <label htmlFor="agreeToTerms" className="font-medium text-gray-300">
                    I agree to the <Link to="/terms" target="_blank" className="text-primary-400 hover:underline">Terms of Service</Link> and <Link to="/privacy" target="_blank" className="text-primary-400 hover:underline">Privacy Policy</Link>.
                  </label>
                  {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms.message}</p>}
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-secondary-500 text-white py-3 rounded-md hover:bg-secondary-600 transition-colors mt-6 disabled:opacity-50 font-bold flex items-center justify-center">
                {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : 'Create Account'}
              </button>
            </form>

            <p className="text-gray-400 text-center mt-6 text-sm">
              Already have an account? <button className="text-primary-400 hover:underline font-semibold" onClick={() => { onClose(); onLogin(); }}>Log in</button>
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SignupForm;

