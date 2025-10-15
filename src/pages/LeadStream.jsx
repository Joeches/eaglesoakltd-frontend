import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, MessageCircle } from 'lucide-react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import OutreachModal from "../components/OutreachModal.jsx";

const LeadStream = () => {
  const [signals, setSignals] = useState([]);
  const [selectedSignal, setSelectedSignal] = useState(null);
  const [isOutreachOpen, setIsOutreachOpen] = useState(false);

  // Simulate fetching signals from backend (replace with actual API call)
  useEffect(() => {
    const mockSignals = [
      {
        id: 1,
        source_platform: 'reddit',
        post_url: 'https://reddit.com/r/FirstTimeHomeBuyer/post123',
        username: 'u/buyer123',
        content_text: 'Looking for a 3-bed home in downtown area, budget around $500k.',
        intent_score: 85,
        extracted_location: 'Downtown',
        processed_status: 'NEW',
        created_at: '2023-10-01T10:00:00Z',
      },
      {
        id: 2,
        source_platform: 'twitter',
        post_url: 'https://twitter.com/user/status/123',
        username: '@homebuyer',
        content_text: 'Can anyone recommend a good realtor in suburb area? We\'re looking to buy next year!',
        intent_score: 78,
        extracted_location: 'Suburb',
        processed_status: 'NEW',
        created_at: '2023-10-02T12:00:00Z',
      },
      {
        id: 3,
        source_platform: 'facebook',
        post_url: 'https://facebook.com/groups/realestate/post456',
        username: 'John Doe',
        content_text: 'Interested in condos near parks, budget $400k.',
        intent_score: 92,
        extracted_location: 'Near Parks',
        processed_status: 'NEW',
        created_at: '2023-10-03T14:00:00Z',
      },
    ];
    setSignals(mockSignals);
  }, []);

  const handleInitiateOutreach = (signal) => {
    setSelectedSignal(signal);
    setIsOutreachOpen(true);
  };

  const handleOutreachSubmit = (draftedMessage) => {
    // Simulate posting to platform API or creating automation (replace with actual backend call)
    console.log('Drafted message:', draftedMessage);
    console.log('Signal:', selectedSignal);
    // Update signal status to 'ENGAGED' (simulate)
    setSignals(signals.map(s => s.id === selectedSignal.id ? { ...s, processed_status: 'ENGAGED' } : s));
    setIsOutreachOpen(false);
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
            Lead Stream: High-Intent Signals
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 text-center mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover new, high-intent opportunities from public sources. Initiate compliant outreach to engage potential buyers.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {signals.filter(signal => signal.intent_score > 70 && signal.processed_status === 'NEW').map((signal, index) => (
              <motion.div
                key={signal.id}
                className="bg-neutral-800/50 backdrop-blur-md p-6 rounded-lg border border-gray-600"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm text-gray-400">{signal.source_platform}</span>
                  <a
                    href={signal.post_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:text-primary-400"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
                <p className="text-gray-300 mb-4">{signal.content_text}</p>
                <p className="text-white font-semibold">Intent Score: {signal.intent_score}/100</p>
                <p className="text-white font-semibold">Location: {signal.extracted_location}</p>
                <button
                  onClick={() => handleInitiateOutreach(signal)}
                  className="mt-4 w-full bg-secondary-500 text-white py-2 rounded hover:bg-secondary-600 transition-colors"
                >
                  Initiate Outreach <MessageCircle className="inline ml-2" size={16} />
                </button>
              </motion.div>
            ))}
          </div>

          {signals.filter(signal => signal.intent_score > 70 && signal.processed_status === 'NEW').length === 0 && (
            <p className="text-gray-300 text-center">No new high-intent signals available. Check back later.</p>
          )}
        </div>
      </main>
      <Footer />
      <OutreachModal
        isOpen={isOutreachOpen}
        onClose={() => setIsOutreachOpen(false)}
        signal={selectedSignal}
        onSubmit={handleOutreachSubmit}
      />
    </div>
  );
};

export default LeadStream;