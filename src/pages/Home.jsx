import React from 'react';
import Footer from '../components/Footer.jsx';
import Hero from '../components/Hero.jsx';
import SocialProof from '../components/SocialProof.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import FeaturedListings from '../components/FeaturedListings.jsx';

    export default function Home() {
      return (
        <div>
          <Hero />
          <SocialProof />
          <HowItWorks />
          <FeaturedListings />
        </div>
      );
    }