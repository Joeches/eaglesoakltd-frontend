import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import '@radix-ui/themes/styles.css';
import 'react-toastify/dist/ReactToastify.css';

// Global Layout
import Layout from './components/Layout.jsx';

// Page Imports
import Home from './pages/Home.jsx';
import Listings from './pages/Listings.jsx';
import Realtors from './pages/Realtors.jsx';
import ForBuyers from './pages/ForBuyers.jsx';
import Contact from './pages/Contact.jsx';
import OurTeam from './pages/OurTeam.jsx';
import Terms from './pages/Terms.jsx';
import Privacy from './pages/Privacy.jsx'; 
import Career from './pages/Career.jsx';
import Training from './pages/Training.jsx';
import NexusScout from './pages/NexusScout.jsx';
import LeadStream from './pages/LeadStream.jsx';
import NotFound from './pages/NotFound.jsx';
import AboutUs from './pages/AboutUs.jsx'; // NEW: Import the new About Us page

// Protected Route Imports
import RealtorDashboard from './pages/RealtorDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PropertyDetailsPage from './pages/PropertyDetailsPage.jsx';

export default function App() {
  return (
    <Theme appearance="inherit" radius="large" scaling="100%">
      <Router>
        <Routes>
          {/* All public pages are now wrapped in the consistent, responsive Layout component. */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="listings" element={<Listings />} />
            <Route path="listings/:propertyId" element={<PropertyDetailsPage />} />
            <Route path="realtors" element={<Realtors />} />
            <Route path="for-buyers" element={<ForBuyers />} />
            <Route path="contact" element={<Contact />} />
            <Route path="our-team" element={<OurTeam />} />
            <Route path="about-us" element={<AboutUs />} /> {/* NEW: Add the route for the new page */}
            <Route path="terms" element={<Terms />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="career" element={<Career />} />
            <Route path="training" element={<Training />} />
            <Route path="nexus-scout" element={<NexusScout />} />
            <Route path="lead-stream" element={<LeadStream />} />
          </Route>

          {/* Protected route for the Realtor Dashboard */}
          <Route element={<ProtectedRoute allowedRoles={['realtor']} />}>
            <Route path="/dashboard/realtor" element={<RealtorDashboard />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer 
          position="bottom-right" 
          theme="dark" 
        />
      </Router>
    </Theme>
  );
}

