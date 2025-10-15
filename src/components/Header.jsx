import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Building, Bot, Users, User, LogOut, LayoutDashboard } from 'lucide-react';
import LoginModal from './LoginModal';
import SignupForm from './SignUpForm.jsx';
import { useAuth } from '../context/AuthContext';

// --- ARCHITECTURAL ENHANCEMENT 1: A professional SVG logo component. ---
const Logo = () => (
  <Link to="/" className="flex items-center gap-3 group">
    <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform transition-transform duration-500 group-hover:rotate-180">
      <path d="M24 4L44 24L24 44L4 24L24 4Z" stroke="url(#logo-gradient)" strokeWidth="4" strokeLinejoin="round"/>
      <path d="M24 4V44" stroke="url(#logo-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <defs>
        <linearGradient id="logo-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8"/>
          <stop offset="1" stopColor="#4ade80"/>
        </linearGradient>
      </defs>
    </svg>
    <span className="text-xl font-bold text-white font-poppins hidden sm:block">Eaggles Oak</span>
  </Link>
);

// --- UI/UX ENHANCEMENT 2: An advanced, reusable Dropdown Menu with icons. ---
const DropdownMenu = ({ title, icon: Icon, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center gap-2 py-2">
        {Icon && <Icon size={18} />} <span>{title}</span>
        <ChevronDown size={16} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-neutral-800/80 backdrop-blur-xl border border-neutral-700 rounded-lg shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- UI/UX ENHANCEMENT 3: A professional User Menu for logged-in users. ---
const UserMenu = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center border-2 border-transparent hover:border-primary-500 transition-colors">
        <User size={20} className="text-white" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute top-full right-0 mt-2 w-64 bg-neutral-800/80 backdrop-blur-xl border border-neutral-700 rounded-lg shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
          >
            <div className="p-4 border-b border-neutral-700">
              <p className="font-semibold text-white truncate">{user.name || 'User'}</p>
              <p className="text-sm text-gray-400 truncate">{user.email}</p>
            </div>
            <div className="py-2">
              {user.role === 'realtor' && (
                <NavLink to="/dashboard/realtor" className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-neutral-700/50 hover:text-white">
                  <LayoutDashboard size={18} /><span>Realtor Dashboard</span>
                </NavLink>
              )}
              <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-neutral-700/50 hover:text-red-400">
                <LogOut size={18} /><span>Logout</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Header Component ---
const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const { user, logout, loading, login } = useAuth();

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSignupSuccess = (signupResponse) => { login(signupResponse); setIsSignupOpen(false); };
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const renderAuthSection = (isMobile = false) => {
    if (loading) return <div className="h-10 w-32 bg-neutral-700/50 rounded-md animate-pulse"></div>;
    if (user) return <UserMenu user={user} logout={() => { logout(); closeMobileMenu(); }} />;
    return (
      <div className={`flex items-center gap-2 ${isMobile ? 'flex-col items-stretch w-full' : ''}`}>
        <button onClick={() => { setIsLoginOpen(true); closeMobileMenu(); }} className="text-gray-300 hover:text-white transition-colors font-medium py-2 px-4">Login</button>
        <button onClick={() => { setIsSignupOpen(true); closeMobileMenu(); }} className="bg-primary-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors duration-300">Sign Up</button>
      </div>
    );
  };

  return (
    <>
      <motion.header 
        className={`sticky top-0 z-50 transition-all duration-300 ${hasScrolled ? 'bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-700 shadow-lg' : 'bg-transparent border-b border-transparent'}`}
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Logo />
            <nav className="hidden md:flex items-center gap-6">
              <DropdownMenu title="Properties" icon={Building}>
                <NavLink to="/listings" className="block px-4 py-2 text-gray-300 hover:bg-neutral-700/50 hover:text-white">All Listings</NavLink>
                <NavLink to="/for-buyers" className="block px-4 py-2 text-gray-300 hover:bg-neutral-700/50 hover:text-white">For Buyers</NavLink>
              </DropdownMenu>
              <NavLink to="/realtors" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 py-2">For Realtors</NavLink>
              <DropdownMenu title="AI Tools" icon={Bot}>
                <NavLink to="/nexus-scout" className="block px-4 py-2 text-gray-300 hover:bg-neutral-700/50 hover:text-white">NexusScout</NavLink>
                <NavLink to="/lead-stream" className="block px-4 py-2 text-gray-300 hover:bg-neutral-700/50 hover:text-white">Lead Stream</NavLink>
              </DropdownMenu>
              <DropdownMenu title="Company" icon={Users}>
                <NavLink to="/our-team" className="block px-4 py-2 text-gray-300 hover:bg-neutral-700/50 hover:text-white">Our Team</NavLink>
                <NavLink to="/about-us" className="block px-4 py-2 text-gray-300 hover:bg-neutral-700/50 hover:text-white">About Us</NavLink>
                <NavLink to="/contact" className="block px-4 py-2 text-gray-300 hover:bg-neutral-700/50 hover:text-white">Contact</NavLink>
              </DropdownMenu>
            </nav>
            <div className="hidden md:flex items-center">{renderAuthSection()}</div>
            <div className="md:hidden">
              <button onClick={() => setIsMobileMenuOpen(true)} className="text-white" aria-label="Open menu"><Menu size={28} /></button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-neutral-900/90 backdrop-blur-xl z-50 p-6 flex flex-col"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-16">
              <Logo />
              <button onClick={closeMobileMenu} className="text-white" aria-label="Close menu"><X size={28} /></button>
            </div>
            <motion.nav 
              className="flex flex-col gap-2 text-center text-2xl font-medium"
              variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              initial="hidden"
              animate="visible"
            >
              {[
                { to: "/listings", label: "All Listings" },
                { to: "/for-buyers", label: "For Buyers" },
                { to: "/realtors", label: "For Realtors" },
                { to: "/contact", label: "Contact" }
              ].map(item => (
                <motion.div key={item.to} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                  <NavLink to={item.to} className="block text-gray-300 hover:text-white py-3" onClick={closeMobileMenu}>{item.label}</NavLink>
                </motion.div>
              ))}
            </motion.nav>
            <div className="mt-auto border-t border-neutral-700 pt-6">{renderAuthSection(true)}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={login} onSignup={() => { setIsLoginOpen(false); setIsSignupOpen(true); }} />
      <SignupForm isOpen={isSignupOpen} onClose={() => setIsSignupOpen(false)} onSignup={handleSignupSuccess} onLogin={() => { setIsSignupOpen(false); setIsLoginOpen(true); }} />
    </>
  );
};

export default Header;

