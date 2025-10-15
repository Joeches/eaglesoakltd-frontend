import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function Terms() {
  return (
    <div>
      <Header />
      <main className="py-20 bg-neutral-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white text-center mb-12 font-poppins">Terms of Service</h1>
          {/* Company Info Card - directly under hero section */}
          <div className="bg-neutral-800/50 backdrop-blur-md p-6 rounded-lg border border-gray-700 mb-8 flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-white mb-2">Contact & Office</h2>
            <p className="text-primary-500 font-bold text-lg mb-2">0706 149 4444</p>
            <p className="text-gray-300 text-center">Suite B23, saham plaza<br />10 Alexandria Crescent, Wuse,<br />Federal Capital Territory, Abuja, Nigeria</p>
          </div>
          <div className="text-gray-300">
            <p>These are the terms of service...</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}