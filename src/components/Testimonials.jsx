import React from 'react';
import { motion } from 'framer-motion';

const testimonialsData = [
  { 
    quote: "The NexusScout AI has fundamentally changed my prospecting. I'm now connecting with qualified, high-intent buyers in a fraction of the time. My closing rate has increased by over 40% in just one quarter.",
    author: "Samantha Alice",
    title: "Luxury Property Specialist, Prestige Realty",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=80"
  },
  { 
    quote: "As a broker, efficiency is everything. The automation features for market analysis and lead follow-up save my team countless hours every week, allowing us to focus on what we do best: closing deals.",
    author: "David Oden",
    title: "Managing Broker, Chen & Associates",
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80"
  },
  { 
    quote: "I was skeptical about AI in real estate, but the Lead Stream tool is a game-changer. The quality of leads is consistently higher than any other platform I've used. It's an essential part of my toolkit now.",
    author: "Maria costa",
    title: "Top 1% Producer, Coastal Homes",
    imageUrl: "https://images.unsplash.com/photo-1542345812-d98b5cd6cf98?w=400&h=400&fit=crop&q=80"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 sm:py-20 bg-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12 font-poppins">Proven Results from Top Professionals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-neutral-700/50 backdrop-blur-md p-8 rounded-lg border border-gray-600 flex flex-col text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <img src={testimonial.imageUrl} alt={`Profile of ${testimonial.author}`} className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-neutral-600" />
              <p className="text-gray-300 italic mb-6 flex-grow">"{testimonial.quote}"</p>
              <div className="mt-auto">
                <p className="text-white font-semibold text-lg">{testimonial.author}</p>
                <p className="text-primary-400 text-sm">{testimonial.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;

