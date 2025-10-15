import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export default function Career() {
  return (
    <div>
      <Header />
      <main className="py-20 bg-neutral-900 min-h-screen">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-8">Careers</h1>
          <p className="text-gray-300 mb-6">Explore tech career opportunities with us. We’re always looking for talented individuals passionate about technology and innovation.</p>
          <ul className="list-disc pl-6 text-gray-200">
            <li>Software Engineering</li>
            <li>UI/UX Design</li>
            <li>Product Management</li>
            <li>DevOps & Cloud</li>
            <li>Data Science</li>
          </ul>
          <div className="mt-8">
            <a href="mailto:careers@eaglesoakltd.com" className="bg-primary-500 text-white px-6 py-2 rounded hover:bg-primary-600">Apply Now</a>
          </div>
          <h2 className="text-2xl font-semibold text-white mt-12 mb-4">Career & Event</h2>
          <ul className="list-disc pl-6 text-gray-200 mb-6">
            <li>BBC</li>
            <li>BTC</li>
            <li>COMMUNITY</li>
            <li>IDEA ROOM</li>
            <li>THINKERS & INVENTORS CLUB</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}
