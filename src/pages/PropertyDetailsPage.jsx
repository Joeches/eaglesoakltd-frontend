import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { get } from '../api/api';
import ChatModal from '../components/ChatModal.jsx';
import { MapPin, DollarSign, Bed, Bath, MessageSquare, Download, Maximize, User, Building2 } from 'lucide-react';

// ARCHITECTURAL ENHANCEMENT 1: A world-class skeleton loader for this specific page.
const PropertyDetailsSkeleton = () => (
  <main className="py-12 sm:py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 animate-pulse">
        <div className="lg:col-span-3 space-y-4">
          <div className="aspect-w-16 aspect-h-10 bg-neutral-800 rounded-xl"></div>
          <div className="grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, i) => <div key={i} className="aspect-w-1 aspect-h-1 bg-neutral-800 rounded-md"></div>)}
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="sticky top-28 bg-neutral-800 p-8 rounded-2xl space-y-6">
            <div className="h-10 w-3/4 bg-neutral-700 rounded-md"></div>
            <div className="h-6 w-1/2 bg-neutral-700 rounded-md"></div>
            <div className="h-24 w-full bg-neutral-700 rounded-md"></div>
            <div className="h-16 w-full bg-neutral-700 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  </main>
);

// A reusable, animated image gallery
const ImageGallery = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  // Helper to resolve image URL
  const resolveImageUrl = (img) => {
    if (!img) return '';
    // If already absolute (http/https/data), return as is
    if (/^(https?:\/\/|data:)/.test(img)) return img;
    // Otherwise, treat as uploaded file
    return `/uploads/${img.replace(/^uploads[\\/]/, '')}`;
  };
  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedImage}
          className="aspect-w-16 aspect-h-10 bg-neutral-800 rounded-xl overflow-hidden"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
        >
          <img src={resolveImageUrl(images?.[selectedImage]) || `https://placehold.co/800x600/0a0a0f/FFF?text=Property`} alt={`${title} - view ${selectedImage + 1}`} className="w-full h-full object-cover" />
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-5 gap-2">
        {images?.slice(0, 5).map((img, index) => (
          <button key={index} onClick={() => setSelectedImage(index)} className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden transition-all duration-300 ${selectedImage === index ? 'ring-2 ring-primary-500 opacity-100' : 'opacity-60 hover:opacity-100'}`}>
            <img src={resolveImageUrl(img)} alt={`${title} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};

// The main page component
const PropertyDetailsPage = () => {
  const { propertyId } = useParams(); 
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchListingDetails = async () => {
      try {
        const response = await get(`/properties/${propertyId}`);
        setListing(response);
      } catch (err) {
        setError("Could not find the requested property.");
      } finally {
        setLoading(false);
      }
    };
    fetchListingDetails();
  }, [propertyId]);

  if (loading) {
    return <PropertyDetailsSkeleton />;
  }

  if (error || !listing) {
    return <div className="flex h-screen items-center justify-center bg-neutral-900 text-red-500">{error || "Property data is unavailable."}</div>;
  }

  return (
    <>
      <main className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12"
            initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.div className="lg:col-span-3 space-y-12" variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}>
              <ImageGallery images={listing.image_urls} title={listing.title} />
              {listing.youtube_url && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Video Tour</h2>
                  <div className="aspect-w-16 aspect-h-9"><iframe className="w-full h-full rounded-lg shadow-lg" src={`https://www.youtube.com/embed/${listing.youtube_url.match(/v=([\w-]+)/)?.[1]}`} title="YouTube video player" allowFullScreen></iframe></div>
                </div>
              )}
            </motion.div>
            
            <motion.div className="lg:col-span-2" variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}>
              <div className="sticky top-28 space-y-6">
                <div className="bg-neutral-800/40 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-neutral-700/80">
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 font-poppins">{listing.title}</h1>
                  <div className="flex items-center text-gray-400 mb-6"><MapPin size={16} className="mr-2" /><span>{listing.location}</span></div>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <div className="flex items-center text-sm bg-neutral-700/50 px-3 py-1.5 rounded-full"><Bed size={16} className="mr-2 text-primary-400"/> {listing.beds || 'N/A'} Beds</div>
                    <div className="flex items-center text-sm bg-neutral-700/50 px-3 py-1.5 rounded-full"><Bath size={16} className="mr-2 text-primary-400"/> {listing.baths || 'N/A'} Baths</div>
                    <div className="flex items-center text-sm bg-neutral-700/50 px-3 py-1.5 rounded-full"><Maximize size={16} className="mr-2 text-primary-400"/> {listing.sqft || 'N/A'} sqft</div>
                  </div>
                  <p className="text-gray-300 mb-8 leading-relaxed">{listing.description}</p>
                  <div className="border-t border-neutral-700 pt-6 space-y-4">
                    <div className="flex items-baseline text-4xl font-bold text-secondary-400"><DollarSign size={32} className="mr-1" /><span>{new Intl.NumberFormat().format(listing.price)}</span></div>
                    <button onClick={() => setIsChatOpen(true)} className="w-full bg-primary-500 text-white font-bold py-4 px-6 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center text-lg shadow-lg hover:shadow-primary-500/30">
                      <MessageSquare size={22} className="mr-3" />Chat with AI About This Property
                    </button>
                  </div>
                </div>
                
                <div className="bg-neutral-800/40 backdrop-blur-xl p-6 rounded-2xl border border-neutral-700/80">
                  <h3 className="font-semibold text-white mb-4">Listed By</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neutral-700 rounded-full flex items-center justify-center"><User size={24} /></div>
                    <div>
                      <p className="font-bold text-white">{listing.realtor_name}</p>
                      <p className="text-sm text-gray-400">{listing.realtor_contact}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} propertyId={listing.id} propertyTitle={listing.title} />
    </>
  );
};

export default PropertyDetailsPage;

