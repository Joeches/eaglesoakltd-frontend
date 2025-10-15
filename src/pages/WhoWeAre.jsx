import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function WhoWeAre() {
  return (
    <div>
      <Header />
      <main className="py-20 bg-neutral-900 min-h-screen">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-8">Who We Are</h1>
          <p className="text-gray-300 mb-6">
            Eagle’s Oak Investment Ltd is a cosmopolitan company made up of energetic, value-driven young professionals committed to changing the narrative of business. We bring innovation, integrity, and excellence into every service we provide, with a focus on creating lasting value for our clients.
          </p>
          <h2 className="text-2xl font-semibold text-white mb-4">Our Core Services</h2>
          <ul className="list-disc pl-6 text-gray-200 mb-6">
            <li>Real Estate Services – Sales, management of residential and commercial properties, and construction.</li>
            <li>Portfolio Management – Helping clients grow and secure their wealth.</li>
            <li>Trades & Investment – Providing safe and profitable investment opportunities.</li>
            <li>Logistics – Ensuring seamless and reliable delivery solutions.</li>
            <li>Agro-Allied Ventures – Promoting sustainable agricultural projects and businesses.</li>
          </ul>
          <p className="text-gray-300 mb-6">
            At Eagle’s Oak, we are passionate about delivering top-notch real estate solutions tailored to meet the needs of our esteemed clients. With us, you can be confident in the genuineness of every transaction and assured of receiving unmatched value for your investment.
          </p>
          <p className="text-gray-300 mb-6">
            Our mission is to simplify the process of acquiring genuine properties, reduce the burden of property ownership, and make essential real estate services accessible to everyone through quality service and continuous enlightenment.
          </p>
          <p className="text-gray-300 mb-6">
            At Eagle’s Oak Investment Ltd, we don’t just sell properties—we build trust, secure futures, and create wealth.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
