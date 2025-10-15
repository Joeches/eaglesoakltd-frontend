import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TestimonialCard = ({ quote, author, title, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: index * 0.1 }
    }
  };

  return (
    <motion.div
      className="bg-neutral-800/40 backdrop-blur-lg rounded-2xl p-8 border border-neutral-700/80 flex flex-col h-full shadow-lg"
      variants={cardVariants}
      // These props are passed down from the parent motion component
    >
      <Quote className="w-10 h-10 text-primary-400/50 mb-4 flex-shrink-0" />
      <p className="text-gray-300 italic mb-6 flex-grow">"{quote}"</p>
      <div className="mt-auto pt-4 border-t border-neutral-700/50">
        <p className="text-white font-semibold text-lg">{author}</p>
        <p className="text-primary-400 text-sm">{title}</p>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;

