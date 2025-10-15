import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const trainingOptions = [
  { key: 'team', label: 'Team Training' },
  { key: 'organization', label: 'Organization Training' },
  { key: 'individual', label: 'Individual Training' },
];

const courses = {
  team: [
    { name: 'Full Stack Web Development', duration: '8 weeks', price: '$1200' },
    { name: 'DevOps Bootcamp', duration: '6 weeks', price: '$1000' },
  ],
  organization: [
    { name: 'Cloud Infrastructure', duration: '4 weeks', price: '$3000' },
    { name: 'Enterprise Security', duration: '3 weeks', price: '$2500' },
  ],
  individual: [
    { name: 'Frontend Development', duration: '5 weeks', price: '$600' },
    { name: 'Python for Beginners', duration: '4 weeks', price: '$500' },
  ],
};

export default function Training() {
  const [selected, setSelected] = useState('team');

  return (
    <div>
      <Header />
      <main className="py-20 bg-neutral-900 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-8">Tech Training</h1>
          <div className="flex gap-4 mb-8">
            {trainingOptions.map(opt => (
              <button
                key={opt.key}
                className={`px-4 py-2 rounded ${selected === opt.key ? 'bg-primary-500 text-white' : 'bg-neutral-700 text-gray-200'}`}
                onClick={() => setSelected(opt.key)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {courses[selected].map(course => (
              <div key={course.name} className="bg-neutral-800 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-white mb-2">{course.name}</h2>
                <p className="text-gray-300 mb-1">Duration: {course.duration}</p>
                <p className="text-gray-300 mb-3">Payment: {course.price}</p>
                <button className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600">Enroll</button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
