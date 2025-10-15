import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { Search, Zap, Calendar, Shield, Users, Award } from 'lucide-react';

const ForBuyers = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Images for the animated mansion: exterior with compound, flowers, car, pet; interior futuristic view
  const images = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop', // Futuristic exterior with compound, flowers, car, pet
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop', // Futuristic interior
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const benefits = [
    { icon: Search, title: 'AI-Powered Search', desc: 'Describe your dream home and let AI find perfect matches instantly.' },
    { icon: Zap, title: 'Instant Recommendations', desc: 'Get personalized property suggestions tailored to your needs.' },
    { icon: Calendar, title: 'Seamless Scheduling', desc: 'Book viewings and tours with ease through our platform.' },
    { icon: Shield, title: 'Secure & Trusted', desc: 'Your data is protected with top-tier security measures.' },
    { icon: Users, title: 'Expert Support', desc: 'Access to real estate professionals whenever you need.' },
    { icon: Award, title: 'Award-Winning Platform', desc: 'Recognized for innovation in real estate technology.' },
  ];

  const testimonials = [
    { quote: "Eagles Oak LTD made finding my home so easy. The AI understood exactly what I wanted!", name: "Alex Rivera" },
    { quote: "I saved weeks of searching. Highly recommend to anyone buying a home.", name: "Jordan Lee" },
    { quote: "The platform is intuitive and the support is fantastic.", name: "Taylor Morgan" },
  ];

  return (
    <div>
      <Header />

      {/* Hero Section with Animated Mansion */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background with Mansion Images */}
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
            Your Dream Home Awaits
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover properties with AI assistance. Find, compare, and buy your perfect home effortlessly.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/listings"
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Browse Listings
            </Link>
            <button className="text-gray-300 hover:text-white underline text-lg">
              Learn How It Works
            </button>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12 font-poppins">Why Choose Eagles Oak LTD?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-neutral-800/50 backdrop-blur-md p-8 rounded-lg border border-gray-700 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <benefit.icon className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-4">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12 font-poppins">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-neutral-700/50 backdrop-blur-md p-8 rounded-lg border border-gray-600 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Search className="w-16 h-16 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-4">1. Describe Your Needs</h3>
              <p className="text-gray-300">Tell our AI about your preferences, budget, and location.</p>
            </motion.div>
            <motion.div
              className="bg-neutral-700/50 backdrop-blur-md p-8 rounded-lg border border-gray-600 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Zap className="w-16 h-16 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-4">2. Get Matches</h3>
              <p className="text-gray-300">Receive instant, personalized property recommendations.</p>
            </motion.div>
            <motion.div
              className="bg-neutral-700/50 backdrop-blur-md p-8 rounded-lg border border-gray-600 text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Calendar className="w-16 h-16 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-4">3. Schedule & Buy</h3>
              <p className="text-gray-300">Book tours and proceed with your purchase seamlessly.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white text-center mb-12 font-poppins">What Buyers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-neutral-800/50 backdrop-blur-md p-6 rounded-lg border border-gray-600"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                <p className="text-white font-semibold">- {testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="py-20 bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6 font-poppins">Start Your Home Search Today</h2>
          <p className="text-xl text-gray-300 mb-8">Join thousands of satisfied buyers who found their dream homes with Eagles Oak LTD.</p>
          <Link
            to="/listings"
            className="bg-primary-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-600 transition-colors inline-block"
          >
            Explore Properties
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForBuyers;