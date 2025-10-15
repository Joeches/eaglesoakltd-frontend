import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SignupForm from './SignUpForm.jsx';
import VideoModal from './VideoModal';

const RealtorHero = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Images representing lead generation services and benefits: automation, analytics, deal closing
  const images = [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop', // Business automation and analytics
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop', // Data-driven lead generation
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop', // Successful deal closing
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background with Service/Benefit Images */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        key={currentImageIndex} // Key to trigger re-animation on image change
      />
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white font-poppins mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Automate Your Lead Generation. Close More Deals.
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Eagles Oak LTD is the AI-powered platform built by a top-producing realtor for realtors. Stop chasing leads. Start closing.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSignupOpen(true)}
          >
            Start Your 14-Day Free Trial
          </motion.button>
          <button
            className="text-gray-300 hover:text-white underline text-lg"
            onClick={() => setIsVideoOpen(true)}
          >
            Watch Demo Video
          </button>
        </motion.div>
      </div>
      <SignupForm isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} />
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </section>
  );
};

export default RealtorHero;