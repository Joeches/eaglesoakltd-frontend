import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import SignupForm from './SignUpForm.jsx';
import { useAuth } from '../context/AuthContext'; // Import useAuth to pass the login function

// UI/UX ENHANCEMENT 1: An advanced, data-driven structure with numeric prices for conversion.
// We'll use a fixed exchange rate for UI stability. This can be updated periodically.
const NGN_PER_USD = 1500; 

const plans = [
  { 
    name: 'Essential', 
    priceUSD: 29,
    features: ['NexusScout™ AI Assistant', 'Basic Analytics Dashboard', 'Standard Email Support'] 
  },
  { 
    name: 'Pro', 
    priceUSD: 99,
    features: ['All Essential Features', 'Automaton™ Workflow Automation', 'Advanced Predictive Analytics', 'Priority Chat & Email Support'],
    highlighted: true 
  },
  { 
    name: 'Enterprise', 
    priceUSD: null, // Custom price
    features: ['All Pro Features', 'White-labeling & Custom Branding', 'Dedicated AI Model Tuning', '24/7 Dedicated Account Manager'] 
  },
];

// ARCHITECTURAL ENHANCEMENT 2: A dedicated, reusable component for each pricing card.
const PricingCard = ({ plan, currency, onChoose }) => {
  const displayPrice = () => {
    if (plan.priceUSD === null) return "Contact Us";
    if (currency === 'NGN') {
      const priceNGN = plan.priceUSD * NGN_PER_USD;
      return `₦${new Intl.NumberFormat('en-NG').format(priceNGN)}`;
    }
    return `$${plan.priceUSD}`;
  };

  return (
    <div className={`relative bg-neutral-800/40 backdrop-blur-xl p-8 rounded-2xl border flex flex-col group ${plan.highlighted ? 'border-secondary-500/80' : 'border-neutral-700/80'}`}>
      {plan.highlighted && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary-500 text-neutral-900 font-bold text-xs uppercase px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-semibold text-white mb-4">{plan.name}</h3>
      <div className="flex items-baseline mb-6">
        <span className="text-4xl font-bold text-white font-poppins">{displayPrice()}</span>
        {plan.priceUSD !== null && <span className="text-gray-400 ml-2">/ month</span>}
      </div>
      <ul className="text-gray-300 mb-8 space-y-4 flex-grow">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <CheckCircle2 size={18} className="text-secondary-400 mr-3 mt-1 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => onChoose(plan)}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 transform group-hover:scale-105 ${plan.highlighted ? 'bg-secondary-500 text-neutral-900 hover:bg-secondary-600' : 'bg-neutral-700/50 text-white hover:bg-neutral-700'}`}
      >
        Choose Plan
      </button>
    </div>
  );
};


const PricingTable = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [currency, setCurrency] = useState('USD'); // 'USD' or 'NGN'
  const { login } = useAuth(); // Get the global login function

  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan);
    setIsSignupOpen(true);
  };

  const handleSignupSuccess = (signupResponse) => {
    login(signupResponse); // Automatically log user in after signup
    setIsSignupOpen(false);
  };

  return (
    <section id="pricing" className="py-20 sm:py-24 bg-neutral-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-neutral-800/[0.2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-poppins">Flexible Plans for Every Agent</h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">Choose the right plan to unlock the power of AI and elevate your business.</p>
        </motion.div>

        {/* UI/UX ENHANCEMENT 3: The futuristic, animated currency toggle */}
        <motion.div 
          className="flex justify-center mb-10"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }}
        >
          <div className="flex items-center p-1 bg-neutral-800/50 rounded-full border border-neutral-700">
            <button onClick={() => setCurrency('USD')} className={`relative px-6 py-2 text-sm font-semibold rounded-full ${currency === 'USD' ? 'text-white' : 'text-gray-400'}`}>
              USD ($)
              {currency === 'USD' && <motion.div className="absolute inset-0 bg-primary-500 rounded-full" layoutId="currency-pill" />}
            </button>
            <button onClick={() => setCurrency('NGN')} className={`relative px-6 py-2 text-sm font-semibold rounded-full ${currency === 'NGN' ? 'text-white' : 'text-gray-400'}`}>
              NGN (₦)
              {currency === 'NGN' && <motion.div className="absolute inset-0 bg-primary-500 rounded-full" layoutId="currency-pill" />}
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
              className="flex"
            >
              <PricingCard plan={plan} currency={currency} onChoose={handleChoosePlan} />
            </motion.div>
          ))}
        </div>
      </div>
      <SignupForm 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
        plan={selectedPlan}
        onSignup={handleSignupSuccess}
        onLogin={() => { setIsSignupOpen(false); /* Logic to open login modal if needed */ }}
      />
    </section>
  );
};

export default PricingTable;
