import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';

// ARCHITECTURAL ENHANCEMENT 1: A professional SVG logo component for brand consistency.
const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4L44 24L24 44L4 24L24 4Z" stroke="url(#logo-gradient-footer)" strokeWidth="4" strokeLinejoin="round"/>
    <path d="M24 4V44" stroke="url(#logo-gradient-footer)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="logo-gradient-footer" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38bdf8"/>
        <stop offset="1" stopColor="#4ade80"/>
      </linearGradient>
    </defs>
  </svg>
);

const FooterLinkColumn = ({ title, links }) => (
  <div>
    <h4 className="font-semibold text-gray-200 mb-4">{title}</h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link to={link.to} className="text-gray-400 hover:text-white transition-colors duration-300">{link.label}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const footerLinks = [
  { title: 'Properties', links: [{ label: 'All Listings', to: '/listings' }, { label: 'For Buyers', to: '/for-buyers' }, { label: 'AI Property Scout', to: '/nexus-scout' }] },
  { title: 'For Realtors', links: [{ label: 'Overview', to: '/realtors' }, { label: 'Features', to: '/realtors#features' }, { label: 'Pricing', to: '/realtors#pricing' }] },
  { title: 'Company', links: [{ label: 'About Us', to: '/about-us' }, { label: 'Careers', to: '/career' }, { label: 'Contact Us', to: '/contact' }] },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 text-white relative overflow-hidden">
      {/* UI/UX ENHANCEMENT 2: Futuristic aurora background effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[500px] bg-gradient-to-t from-primary-500/10 to-transparent rounded-full blur-3xl opacity-40 z-0"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div 
          className="py-12 border-b border-neutral-800 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.5 }}
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-poppins">Stay Ahead of the Market</h2>
            <p className="mt-2 text-gray-400">Subscribe for exclusive listings and AI-driven market insights.</p>
          </div>
          <form className="w-full flex">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-grow p-3 bg-neutral-800/50 text-white rounded-l-md border border-neutral-700 focus:ring-2 focus:ring-primary-500 focus:outline-none transition"
              aria-label="Email address"
            />
            <button type="submit" className="bg-primary-500 text-white p-3 rounded-r-md hover:bg-primary-600 transition-colors flex-shrink-0">
              <ArrowRight size={24} />
            </button>
          </form>
        </motion.div>

        <div className="py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* UI/UX ENHANCEMENT 3: Refined brand identity section */}
          <div className="col-span-2 md:col-span-2 pr-8">
             <div className="flex items-center gap-3 mb-3">
               <Logo />
               <h3 className="text-xl font-bold text-white font-poppins">Eaggles Oak Investment Ltd</h3>
             </div>
             <p className="text-gray-400 text-sm">The Future of Real Estate, Powered by AI.</p>
          </div>
          
          {footerLinks.map((section) => (
            <FooterLinkColumn key={section.title} title={section.title} links={section.links} />
          ))}
        </div>

        {/* UI/UX ENHANCEMENT 4: World-class developer attribution */}
        <div className="py-6 border-t border-neutral-800 flex flex-col-reverse md:flex-row md:justify-between items-center text-center md:text-left gap-6">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Eaggles Oak Investment Ltd. All rights reserved.
          </p>
          <div className="flex space-x-5">
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
          </div>
          <div className="text-gray-500 text-sm text-center md:text-right">
            <a 
              href="https://wa.me/2348163399026" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-gray-400 hover:text-primary-400 transition-colors"
            >
              Developed by NeuralBridge Technologies LTD.
            </a>
             <p className="text-xs text-gray-600">Abuja, Nigeria</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

