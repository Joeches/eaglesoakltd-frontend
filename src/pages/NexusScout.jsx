import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MessageCircle } from 'lucide-react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import ChatModal from "../components/ChatModal.jsx";

const NexusScout = () => {
  const [criteria, setCriteria] = useState({ location: '', propertyType: '', budget: '' });
  const [potentialBuyers, setPotentialBuyers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate API call to NexusScout backend for public signals (no personal data collection)
    setTimeout(() => {
      const simulatedBuyers = [
        { id: 1, intent: 'Looking for a 3-bed home in downtown', location: criteria.location || 'Downtown', propertyType: criteria.propertyType || 'House', budget: criteria.budget || '$500k' },
        { id: 2, intent: 'Interested in condos near parks', location: criteria.location || 'Near Parks', propertyType: criteria.propertyType || 'Condo', budget: criteria.budget || '$400k' },
        { id: 3, intent: 'Seeking family home with yard', location: criteria.location || 'Suburb', propertyType: criteria.propertyType || 'House', budget: criteria.budget || '$600k' },
      ].filter(buyer =>
        (!criteria.location || buyer.location.toLowerCase().includes(criteria.location.toLowerCase())) &&
        (!criteria.propertyType || buyer.propertyType.toLowerCase().includes(criteria.propertyType.toLowerCase())) &&
        (!criteria.budget || buyer.budget.includes(criteria.budget))
      );
      setPotentialBuyers(simulatedBuyers);
      setIsSearching(false);
    }, 2000);
  };

  const handleChatClick = (buyer) => {
    setSelectedBuyer(buyer);
    setIsChatOpen(true);
  };

  return (
    <div>
      <Header />
      <main className="py-20 bg-neutral-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-4xl font-bold text-white text-center mb-12 font-poppins"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            NexusScout: Discover Potential Buyers
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 text-center mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Identify public signals of intent for real estate purchases. Initiate compliant, value-added conversations via Omni-Chat™. No personal data collected.
          </motion.p>

          {/* Defined & Compliant Data Sources */}
          <motion.div
            className="bg-neutral-800/50 backdrop-blur-md p-8 rounded-lg border border-gray-700 mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Defined & Compliant Data Sources</h2>
            <p className="text-gray-300 mb-4">NexusScout will be configured to monitor only the following sources for specific keywords:</p>
            <ul className="text-gray-300 list-disc list-inside space-y-2">
              <li><strong>Real Estate Forum Threads:</strong> (e.g., specific subreddits like /r/FirstTimeHomeBuyer, city-specific real estate forums). Target users asking questions like "How to buy in [City]?" or "Is [Neighborhood] a good place to live?"</li>
              <li><strong>Public Social Media Posts:</strong> Focus on public Twitter/X or Facebook group posts with clear intent, e.g., "Can anyone recommend a good realtor in [City]? We're looking to buy next year!"</li>
              <li><strong>Public Business Review Sites:</strong> Monitor sites like Google Business Profile or Yelp for users who have reviewed other realtors or mortgage brokers. This indicates active engagement in the market.</li>
              <li><strong>Public Event Websites:</strong> Scrape attendee lists (if public) for first-time homebuyer seminars or real estate investment workshops.</li>
            </ul>
            <p className="text-gray-300 mt-4"><strong>NOTE ON SOCIAL MEDIA:</strong> This often requires official API access (e.g., Twitter API v2, Facebook Graph API) for compliant, scalable data access. NexusScout must be designed to integrate with these APIs. Raw, unauthorized scraping of social platforms violates their Terms of Service and will lead to legal and technical blocks.</p>
          </motion.div>

          {/* Search Criteria */}
          <motion.div
            className="bg-neutral-800/50 backdrop-blur-md p-8 rounded-lg border border-gray-700 mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Search Criteria</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <input
                type="text"
                placeholder="Location (e.g., Downtown)"
                value={criteria.location}
                onChange={(e) => setCriteria({ ...criteria, location: e.target.value })}
                className="p-3 bg-neutral-700 text-white rounded border border-gray-600"
              />
              <input
                type="text"
                placeholder="Property Type (e.g., House)"
                value={criteria.propertyType}
                onChange={(e) => setCriteria({ ...criteria, propertyType: e.target.value })}
                className="p-3 bg-neutral-700 text-white rounded border border-gray-600"
              />
              <input
                type="text"
                placeholder="Budget (e.g., $500k)"
                value={criteria.budget}
                onChange={(e) => setCriteria({ ...criteria, budget: e.target.value })}
                className="p-3 bg-neutral-700 text-white rounded border border-gray-600"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-primary-500 text-white px-8 py-3 rounded-full hover:bg-primary-600 transition-colors disabled:opacity-50"
            >
              {isSearching ? 'Searching...' : 'Discover Buyers'} <Search className="inline ml-2" size={16} />
            </button>
          </motion.div>

          {/* Potential Buyers List */}
          {potentialBuyers.length > 0 && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {potentialBuyers.map((buyer, index) => (
                <motion.div
                  key={buyer.id}
                  className="bg-neutral-800/50 backdrop-blur-md p-6 rounded-lg border border-gray-600"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <p className="text-gray-300 mb-4">{buyer.intent}</p>
                  <p className="text-white font-semibold">Location: {buyer.location}</p>
                  <p className="text-white font-semibold">Type: {buyer.propertyType}</p>
                  <p className="text-white font-semibold">Budget: {buyer.budget}</p>
                  <button
                    onClick={() => handleChatClick(buyer)}
                    className="mt-4 w-full bg-secondary-500 text-white py-2 rounded hover:bg-secondary-600 transition-colors"
                  >
                    Initiate Omni-Chat™ <MessageCircle className="inline ml-2" size={16} />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {potentialBuyers.length === 0 && !isSearching && (
            <p className="text-gray-300 text-center">No potential buyers found. Adjust criteria and try again.</p>
          )}
        </div>
      </main>
      <Footer />
  <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} listing={selectedBuyer} />
    </div>
  );
};

export default NexusScout;