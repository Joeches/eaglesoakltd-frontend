import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { get } from '../api/api';
import { ArrowRight } from 'lucide-react';

// This is a new, reusable "glassmorphism" card for the hero section
const HeroPropertyCard = ({ listing, index }) => (
  <motion.div
    className="bg-neutral-800/40 backdrop-blur-lg rounded-xl overflow-hidden border border-neutral-700/80 shadow-lg group"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
  >
    <div className="relative overflow-hidden">
      <img
        src={listing.image || `https://placehold.co/600x400/0a0a0f/FFF?text=Property`}
        alt={listing.title}
        className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-2 truncate">{listing.title}</h3>
      <p className="text-lg font-semibold text-primary-400 mb-4">${new Intl.NumberFormat().format(listing.price)}</p>
      <button className="w-full bg-primary-500/20 text-primary-300 border border-primary-500/50 py-3 rounded-lg hover:bg-primary-500/40 hover:text-white transition-all font-semibold flex items-center justify-center group/button">
        Explore Property <ArrowRight size={20} className="ml-2 transform transition-transform duration-300 group-hover/button:translate-x-1" />
      </button>
    </div>
  </motion.div>
);

const Hero = () => {
  const [listings, setListings] = useState([]);
  // We don't need loading/error states here, as we have a robust fallback
  useEffect(() => {
    const fetchHeroListings = async () => {
      try {
        const response = await get('/properties?limit=3');
        if (response && Array.isArray(response.data) && response.data.length > 0) {
          setListings(response.data);
        } else {
          throw new Error('No listings found');
        }
      } catch (err) {
        // Fallback to beautiful default data if the API fails
        setListings([
          { id: 1, image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop', title: 'Opulent Waterfront Mansion', price: 5500000 },
          { id: 2, image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop', title: 'Modern Hillside Estate', price: 4200000 },
          { id: 3, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop', title: 'Luxury Suburban Villa', price: 3800000 },
        ]);
      }
    };
    fetchHeroListings();
  }, []);

  return (
    <section className="relative overflow-hidden bg-neutral-900 py-20 md:py-32">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-gradient-to-br from-primary-500/10 to-transparent rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[50rem] h-[50rem] bg-gradient-to-tl from-secondary-500/10 to-transparent rounded-full blur-3xl opacity-40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-poppins mb-6 leading-tight">
            The Future of Real Estate,
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">Powered by AI</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Leverage cutting-edge artificial intelligence to find, analyze, and close on world-class properties faster than ever before.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing, index) => (
            <HeroPropertyCard key={listing.id || index} listing={listing} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;

