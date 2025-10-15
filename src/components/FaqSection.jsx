import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqData = [
  { question: "How does the 14-day free trial work?", answer: "Sign up and get full access to all features for 14 days. No credit card is required to start, so you can explore everything our platform has to offer risk-free." },
  { question: "Can I cancel my subscription at any time?", answer: "Yes, absolutely. You can cancel your subscription at any time directly from your account dashboard with no penalties or hidden fees." },
  { question: "Is my client and property data secure?", answer: "We take security seriously. We use industry-standard encryption for all data and comply with all major data protection regulations to keep your information safe." }
];

const FaqItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-neutral-800/50 backdrop-blur-md rounded-lg border border-gray-600 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left p-6"
      >
        <h3 className="text-lg font-semibold text-white">{item.question}</h3>
        <ChevronDown 
          className={`transform transition-transform duration-300 text-white ${isOpen ? 'rotate-180' : ''}`} 
          size={24} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-gray-300 p-6 pt-0">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FaqSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-neutral-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12 font-poppins">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((item, index) => <FaqItem key={index} item={item} />)}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;

