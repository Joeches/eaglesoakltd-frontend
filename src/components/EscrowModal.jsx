/* Preconfigured App.jsx — modify only routes */

import React from 'react';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home.jsx';
import Listings from '../pages/Listings.jsx';
import Realtors from '../pages/Realtors.jsx';
import ForBuyers from '../pages/ForBuyers.jsx';
import Contact from '../pages/Contact.jsx';
import OurTeam from '../pages/OurTeam.jsx';
import Terms from '../pages/Terms.jsx';
import Privacy from '../pages/Privacy.jsx';
import NotFound from '../pages/NotFound.jsx';
import NexusScout from '../pages/NexusScout.jsx';
import LeadStream from '../pages/LeadStream.jsx';
import FloatingWhatsApp from './FloatingWhatsApp.jsx';

export default function App() {
  return (
    <Theme appearance="inherit" radius="large" scaling="100%">
      <Router>
        <main className="min-h-screen bg-neutral-900 text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/realtors" element={<Realtors />} />
            <Route path="/for-buyers" element={<ForBuyers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/our-team" element={<OurTeam />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/nexus-scout" element={<NexusScout />} />
            <Route path="/lead-stream" element={<LeadStream />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop
            closeOnClick
            pauseOnHover
          />
          <FloatingWhatsApp />
        </main>
      </Router>
    </Theme>
  );
}