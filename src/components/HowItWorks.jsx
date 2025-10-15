import React from 'react';
import { motion } from 'framer-motion';
import { Search, Zap, Calendar } from 'lucide-react';

const steps = [
  { icon: Search, title: 'Describe Your Dream Home', desc: 'Tell our AI your exact preferences, from architectural style to neighborhood amenities, and let it do the heavy lifting.' },
  { icon: Zap, title: 'Get Instant AI-Powered Matches', desc: 'Our system analyzes thousands of listings in real-time to provide you with a curated selection of properties that truly fit.' },
  { icon: Calendar, title: 'Schedule Viewings Seamlessly', desc: 'Instantly book tours for your matched properties and take the first step towards making your dream a reality.' },
];

// ARCHITECTURAL ENHANCEMENT 1: A dedicated, reusable component for each step.
const StepCard = ({ step, index }) => {
  const isEven = index % 2 === 0;

  const itemVariants = {
    hidden: { opacity: 0, x: isEven ? -50 : 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <div className={`flex items-center w-full ${isEven ? 'justify-start' : 'justify-end'}`}>
      <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
        <motion.div variants={itemVariants}>
          <div className="bg-neutral-800/40 backdrop-blur-xl p-8 rounded-2xl border border-neutral-700/80 relative overflow-hidden group">
            {/* UI/UX ENHANCEMENT 2: Futuristic glowing edge effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            <div className="flex flex-col md:flex-row items-center gap-6 text-left md:text-left">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-16 h-16 bg-primary-500/10 rounded-2xl border border-primary-500/30">
                  <step.icon className="w-8 h-8 text-primary-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } }
  };

  return (
    <section className="py-20 sm:py-24 lg:py-32 bg-neutral-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-poppins">
            Getting Started is Simple
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            Our AI-driven platform streamlines your property search in three intuitive steps, transforming complexity into clarity.
          </p>
        </motion.div>

        {/* UI/UX ENHANCEMENT 3: The animated vertical timeline */}
        <div className="relative">
          <motion.div 
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-neutral-800 origin-top hidden md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
          />
          
          <motion.div 
            className="space-y-16 md:space-y-24"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {steps.map((step, index) => (
              <StepCard key={index} step={step} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

