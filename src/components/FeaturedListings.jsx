import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { get } from '../api/api';
// We now import the world-class PropertyCard you have open in your Canvas.
import PropertyCard from './PropertyCard'; 
import { ArrowRight } from 'lucide-react';

const FeaturedListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFeaturedListings() {
      try {
        const response = await get('/properties?limit=3');
        if (response && Array.isArray(response.data)) {
          setListings(response.data);
        } else {
          setListings([]);
        }
      } catch (err) {
        console.error("Failed to load featured listings:", err);
        setError('Could not connect to the listings service.');
      } finally {
        setLoading(false);
      }
    }
    fetchFeaturedListings();
  }, []);

  if (loading) {
    return (
      <section className="py-20 sm:py-24 bg-neutral-800">
        <div className="text-center text-gray-400">Fetching premier properties...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 sm:py-24 bg-neutral-800">
        <div className="text-center text-red-500">{error}</div>
      </section>
    );
  }

  return (
    <section className="py-20 sm:py-24 bg-neutral-800 relative overflow-hidden">
      {/* UI/UX ENHANCEMENT 1: Decorative background gradient for a futuristic feel */}
      <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-neutral-900 to-neutral-800"></div>
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-poppins">
            Featured Listings
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            A curated selection of our finest properties, available for a limited time.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.length > 0 ? (
            listings.map((listing, index) => (
              // The section now renders the world-class PropertyCard from your Canvas
              <PropertyCard key={listing.id} listing={listing} index={index} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400 py-12">No featured listings available at the moment.</p>
          )}
        </div>

        {/* UI/UX ENHANCEMENT 2: A more prominent and engaging "View All" button */}
        {listings.length > 0 && (
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/listings" 
              className="inline-flex items-center bg-primary-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-600 transition-colors text-lg shadow-lg hover:shadow-primary-500/40 transform hover:scale-105"
            >
              View All Properties
              <ArrowRight className="ml-2" size={22} />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default FeaturedListings;

