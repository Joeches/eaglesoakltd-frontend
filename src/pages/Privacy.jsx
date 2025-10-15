import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Privacy = () => {
  const lastUpdated = "September 12, 2025";

  return (
    // Correct page structure with flexbox for proper footer alignment.
    <div className="flex flex-col min-h-screen bg-neutral-900">
      <Header />
      <main className="flex-grow">
        {/* Responsive Page Header */}
        <div className="bg-neutral-800 py-12 sm:py-16 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-poppins"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Privacy Policy
            </motion.h1>
            <motion.p
              className="mt-4 text-gray-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Last Updated: {lastUpdated}
            </motion.p>
          </div>
        </div>

        {/* Responsive content container with improved padding */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Enhanced typography for readability using "prose" styling. */}
          <motion.div
            className="prose prose-invert prose-lg max-w-none bg-neutral-800/50 p-8 sm:p-10 rounded-lg border border-neutral-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p>
              Your privacy is critically important to us. This Privacy Policy outlines the types of information we collect from you while you are using the Eagles Oak LTD website and platform ("Service"), and how we use and protect that information.
            </p>
            
            <h2>1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, fill out a form, or communicate with us. This may include your name, email address, phone number, and any other information you choose to provide. We also collect anonymous data related to your site usage to improve our services.
            </p>
            
            <h2>2. How We Use Your Information</h2>
            <p>
              The information we collect is used to:
            </p>
            <ul>
                <li>Provide, maintain, and improve our Service.</li>
                <li>Process transactions and send you related information.</li>
                <li>Communicate with you about products, services, offers, and events.</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our Service.</li>
            </ul>

            <h2>3. Data Security</h2>
            <p>
              We implement a variety of security measures to maintain the safety of your personal information. All sensitive information is transmitted via Secure Socket Layer (SSL) technology and encrypted in our database.
            </p>
            
            <h2>4. Third-Party Services</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website or servicing you, so long as those parties agree to keep this information confidential.
            </p>

            <h2>5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information at any time. You can do this by logging into your account or by contacting our support team directly.
            </p>
            
            <p className="mt-8">
              If you have any questions about this Privacy Policy, please <Link to="/contact" className="text-primary-400 hover:underline">contact us</Link>.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;

