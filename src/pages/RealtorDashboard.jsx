import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UploadPropertyForm from '../components/UploadPropertyForm';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { UploadCloud, LayoutGrid, BarChart3 } from 'lucide-react';
import PropertyCard from '../components/PropertyCard'; // We'll reuse our world-class card

// --- Sub-Components for Dashboard Panels ---


// UI/UX ENHANCEMENT 1: A dynamic, data-driven "My Listings" panel fetching from backend.
import { get } from '../api/api';

const MyListingsPanel = () => {
  const { user, token } = useAuth();
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);
      try {
        // /my-listings returns only the current user's listings (auth required)
        const listings = await get('/my-listings');
        setMyListings(listings);
      } catch (err) {
        setError(err.message || 'Failed to fetch listings');
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [token]);

  if (loading) {
    return <div className="text-gray-400">Loading your listings...</div>;
  }
  if (error) {
    return <div className="text-red-400">Error: {error}</div>;
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-6">My Listings</h3>
      {myListings.length === 0 ? (
        <div className="text-gray-400">You have not uploaded any properties yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {myListings.map((listing, index) => (
            <PropertyCard key={listing.id} listing={listing} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

const AnalyticsPanel = () => (
  <div className="text-center p-10 bg-neutral-800/50 rounded-xl border border-neutral-700">
    <BarChart3 size={48} className="mx-auto text-primary-400 mb-4" />
    <h3 className="text-xl font-bold text-white">Performance Analytics</h3>
    <p className="text-gray-400 mt-2">This is where you will find AI-driven insights on your listings' performance, market trends, and lead engagement. Feature coming soon!</p>
  </div>
);

const dashboardTabs = [
  { id: 'upload', label: 'Upload Property', icon: UploadCloud, component: UploadPropertyForm },
  { id: 'listings', label: 'My Listings', icon: LayoutGrid, component: MyListingsPanel },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, component: AnalyticsPanel },
];

const RealtorDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upload');

  const handleUploadSuccess = () => {
    toast.info("Property uploaded! You can view it in 'My Listings'.");
    // This UX improvement automatically switches the user to their listings after a successful upload.
    setActiveTab('listings');
  };
  
  const ActiveComponent = dashboardTabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="flex flex-col min-h-screen bg-neutral-900">
      <Header />
      <main className="flex-grow">
        <div className="relative overflow-hidden bg-neutral-800 py-16 text-center">
          <div className="absolute inset-0 bg-grid-neutral-700/[0.2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.h1 
              className="text-4xl sm:text-5xl font-bold text-white font-poppins"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            >
              Realtor Command Center
            </motion.h1>
            <motion.p 
              className="mt-4 text-lg text-gray-300"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            >
              Welcome, {user?.name || user?.email}! This is your dedicated workspace.
            </motion.p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* UI/UX ENHANCEMENT 2: The definitive futuristic tabbed interface */}
          <div className="mb-8 flex justify-center border-b border-neutral-800">
            {dashboardTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative py-4 px-4 sm:px-6 text-sm sm:text-base font-medium transition-colors duration-300 ${
                  activeTab === tab.id ? 'text-primary-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-3">
                  <tab.icon size={18} />
                  {tab.label}
                </span>
                {activeTab === tab.id && (
                  <motion.div 
                    className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary-400" 
                    layoutId="underline"
                  />
                )}
              </button>
            ))}
          </div>

          {/* UI/UX ENHANCEMENT 3: The animated content panel */}
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                {ActiveComponent && <ActiveComponent onUploadSuccess={handleUploadSuccess} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RealtorDashboard;

