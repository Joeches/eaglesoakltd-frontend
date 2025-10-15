import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { motion } from 'framer-motion';

const Terms = () => {
  const lastUpdated = "September 12, 2025"; // PROFESSIONAL FIX 1: Add a "Last Updated" date.

  return (
    // PROFESSIONAL FIX 2: Correct page structure with flexbox for proper footer alignment.
    <div className="flex flex-col min-h-screen bg-neutral-900">
      <Header />
      <main className="flex-grow">
        {/* RESPONSIVENESS FIX 3: Responsive Page Header */}
        <div className="bg-neutral-800 py-12 sm:py-16 text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-poppins"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Terms & Conditions
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

        {/* RESPONSIVENESS FIX 4: Responsive content container with improved padding */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* PROFESSIONAL FIX 5: Enhanced typography for readability using "prose" styling. */}
          {/* This is a common pattern for styling blocks of text content. */}
          <motion.div
            className="prose prose-invert prose-lg max-w-none bg-neutral-800/50 p-8 sm:p-10 rounded-lg border border-neutral-700"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p>
              By using the Eagles Oak LTD website and platform ("Service"), you agree to be bound by the following terms and conditions ("Terms"). Please read them carefully before using any of our services.
            </p>
            
            <h2>1. Use of Service</h2>
            <p>
              All property data, market analysis, and AI-generated insights provided by the Service are for informational purposes only. They do not constitute legal, financial, or investment advice. You are responsible for conducting your own due diligence.
            </p>
            
            <h2>2. Account Responsibility</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials (username and password). Any activity that occurs under your account is your responsibility.
            </p>

            <h2>3. Prohibited Conduct</h2>
            <p>
              The unauthorized use, data scraping, copying, or reproduction of any content, data, or intellectual property from this Service is strictly prohibited. You agree not to use the Service for any unlawful purpose.
            </p>
            
            <h2>4. Updates to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of any significant changes. Your continued use of the Service after such changes constitutes your acceptance of the new Terms.
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>
              Eagles Oak LTD is not liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the Service.
            </p>
            
            <p className="mt-8">
              For any questions regarding these terms, please <Link to="/contact" className="text-primary-400 hover:underline">contact our support team</Link>.
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
