import React from 'react';
import { motion } from 'framer-motion';
import { Bot, BarChart3, Clock, ArrowRight } from 'lucide-react';

// UI/UX ENHANCEMENT 1: Enriched data with more persuasive descriptions.
const features = [
  { 
    icon: Bot, 
    title: 'NexusScout™ AI', 
    desc: 'Our flagship AI qualifies leads in real-time with natural, human-like conversations, ensuring you only spend time on high-intent buyers.',
    span: 'md:col-span-2' // This feature is the star and will take up more space.
  },
  { 
    icon: Clock, 
    title: 'Automaton™ Workflow', 
    desc: 'Automate your follow-ups, schedule appointments, and nurture prospects 24/7 without lifting a finger.',
    span: 'md:col-span-1'
  },
  { 
    icon: BarChart3, 
    title: 'Predictive Analytics', 
    desc: 'Leverage our AI-driven dashboard to get real-time market insights and track your performance with unparalleled accuracy.',
    span: 'md:col-span-1'
  },
];

// ARCHITECTURAL ENHANCEMENT 2: A dedicated, reusable component for each feature card.
const FeatureCard = ({ feature, index }) => (
  <motion.div
    className={`bg-neutral-800/40 backdrop-blur-xl rounded-2xl border border-neutral-700/80 p-8 group relative overflow-hidden ${feature.span}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true, amount: 0.5 }}
  >
    {/* UI/UX ENHANCEMENT 3: The futuristic glowing edge effect */}
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
    
    <div className="flex items-center justify-center w-16 h-16 mb-6 bg-primary-500/10 rounded-2xl border border-primary-500/30">
      <feature.icon className="w-8 h-8 text-primary-400" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-3 font-poppins">{feature.title}</h3>
    <p className="text-gray-400 mb-6">{feature.desc}</p>
    <a href="#" className="flex items-center text-primary-400 font-semibold group/link">
      Learn More
      <ArrowRight size={18} className="ml-2 transform transition-transform duration-300 group-hover/link:translate-x-1" />
    </a>
  </motion.div>
);

const FeaturesGrid = () => {
  return (
    <section id="features" className="py-20 sm:py-24 bg-neutral-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-neutral-700/[0.2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-poppins">
            An Unfair Advantage, Powered by AI
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            Our suite of intelligent tools is engineered to automate your workflow, amplify your reach, and accelerate your success.
          </p>
        </motion.div>
        
        {/* UI/UX ENHANCEMENT 4: The world-class Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
