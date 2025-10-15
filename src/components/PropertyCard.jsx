import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, ArrowRight, Bot, Maximize } from 'lucide-react';

// UI/UX ENHANCEMENT 1: A reusable icon component for a consistent look.
const InfoChip = ({ icon: Icon, text }) => (
  <div className="flex items-center text-sm bg-neutral-700/50 px-2 py-1 rounded-full">
    <Icon size={14} className="mr-2 text-primary-400 flex-shrink-0"/>
    <span className="text-gray-300">{text}</span>
  </div>
);

const PropertyCard = ({ listing, index, onChatClick }) => {
  // Use the first image from the array, or a high-quality placeholder.
  const imageUrl = listing.image_urls?.[0] || `https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop&q=80`;

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
      // UI/UX ENHANCEMENT 2: The definitive "glassmorphism" design with a futuristic hover effect.
      className="bg-neutral-800/40 backdrop-blur-lg rounded-2xl overflow-hidden border border-neutral-700/80 shadow-lg group flex flex-col transition-all duration-300 hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/10"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="relative overflow-hidden">
        <Link to={`/listings/${listing.id}`}>
          <img
            src={imageUrl}
            alt={`View of ${listing.title}`}
            className="w-full h-56 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        </Link>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 truncate">{listing.title}</h3>
        <div className="flex items-center text-gray-400 text-sm mb-4">
          <MapPin size={16} className="mr-2 flex-shrink-0" />
          <span>{listing.location}</span>
        </div>
        
        {/* UI/UX ENHANCEMENT 3: Enhanced information hierarchy with more data. */}
        <div className="flex flex-wrap gap-2 text-gray-300 mb-4">
          <InfoChip icon={Bed} text={`${listing.beds || 'N/A'} Beds`} />
          <InfoChip icon={Bath} text={`${listing.baths || 'N/A'} Baths`} />
          <InfoChip icon={Maximize} text={`${listing.sqft || 'N/A'} sqft`} />
        </div>
        
        <div className="flex-grow" />
        
        <div className="flex justify-between items-center mt-4">
          <p className="text-2xl font-semibold text-secondary-400">
            ${new Intl.NumberFormat().format(listing.price)}
          </p>
          
          {/* UI/UX ENHANCEMENT 4: World-class dual-action button layout. */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onChatClick(listing)}
              className="bg-primary-500/20 text-primary-300 border border-primary-500/30 p-2 rounded-full hover:bg-primary-500/40 hover:text-white transition-all"
              aria-label="Chat with AI about this property"
            >
              <Bot size={20} />
            </button>
            <Link to={`/listings/${listing.id}`} className="bg-primary-500 text-white p-2 rounded-full hover:bg-primary-600 transition-colors">
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;

