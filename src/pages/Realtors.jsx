import React from 'react';
import { motion } from 'framer-motion';

// ARCHITECTURAL CONFIRMATION: This page is a pure "layout" component.
// It correctly renders only its own content, to be placed inside the global Layout.
import RealtorHero from '../components/RealtorHero.jsx';
import SocialProofRealtor from '../components/SocialProofRealtor.jsx';
import FeaturesGrid from '../components/FeaturesGrid.jsx';
import PricingTable from '../components/PricingTable.jsx';
import Testimonials from '../components/Testimonials.jsx';
import FaqSection from '../components/FaqSection.jsx';
import CtaSection from '../components/CtaSection.jsx';

const Realtors = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // This will make each direct child section animate in one after the other.
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* This is a classic and effective "sales funnel" structure. */}
      <RealtorHero />
      <SocialProofRealtor />
      <FeaturesGrid />
      <PricingTable />
      <Testimonials />
      <FaqSection />
      <CtaSection />
    </motion.main>
  );
};

export default Realtors;

