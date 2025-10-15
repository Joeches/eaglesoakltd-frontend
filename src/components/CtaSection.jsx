import React from 'react';
import { motion } from 'framer-motion';

const CtaSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-neutral-800">
      <motion.div 
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-poppins">Ready to Transform Your Business?</h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-8">Join thousands of realtors who are closing more deals with Eagles Oak LTD.</p>
        <button className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          Start Your Free Trial
        </button>
      </motion.div>
    </section>
  );
};

export default CtaSection;

