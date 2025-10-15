import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom'; // Outlet is the placeholder for page content

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-900 text-white">
      <Header />
      
      {/* This is the main content area. 
        - `flex-grow` ensures it takes up all available space, pushing the footer down.
        - `Outlet` is the special component from react-router-dom where your
          page components (like Home, Listings, etc.) will be rendered.
      */}
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;

