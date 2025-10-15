import React from 'react';
import { motion } from 'framer-motion';

// UI/UX ENHANCEMENT 1: World-class, futuristic SVG logos.
// These replace the text-based names with a powerful visual identity.
const partners = [
  { name: 'Quantum Properties', svg: <svg viewBox="0 0 120 40" fill="currentColor"><path d="M10 20 L20 10 L30 20 L20 30 Z M40 10 L50 10 L50 30 L40 30 Z M60 10 H110 V30 H60 Z M85 10 V30"/></svg> },
  { name: 'Apex Estates', svg: <svg viewBox="0 0 120 40" fill="currentColor"><path d="M10 30 L25 10 L40 30 Z M50 10 L60 30 L70 10 L80 30 L90 10"/></svg> },
  { name: 'Stellar Realty', svg: <svg viewBox="0 0 120 40" fill="currentColor"><circle cx="20" cy="20" r="10" /><path d="M40 10 L50 30 L60 10 L70 30 L80 10 L90 30"/></svg> },
  { name: 'Vertex Ventures', svg: <svg viewBox="0 0 120 40" fill="currentColor"><path d="M10 10 L30 10 L20 30 Z M40 30 L60 30 L50 10 Z M70 10 L110 10 L90 30 Z"/></svg> },
  { name: 'Pinnacle Group', svg: <svg viewBox="0 0 120 40" fill="currentColor"><path d="M10 30 L25 10 L40 30 H10 Z M50 10 L90 10 L70 30 Z"/></svg> },
  { name: 'Nexus Real Estate', svg: <svg viewBox="0 0 120 40" fill="currentColor"><path d="M10 10 L30 30 M30 10 L10 30 M45 20 H110 M45 10 V30"/></svg> },
  { name: 'Elysian Homes', svg: <svg viewBox="0 0 120 40" fill="currentColor"><circle cx="20" cy="20" r="10" /><circle cx="55" cy="20" r="10" /><circle cx="90" cy="20" r="10" /></svg> },
];

const SocialProof = () => {
  const duplicatedPartners = [...partners, ...partners];

  const marqueeVariants = {
    animate: {
      x: [0, -1536], // Adjusted for the new logo widths
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 40,
          ease: "linear",
        },
      },
    },
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-neutral-900 to-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {/* UI/UX ENHANCEMENT 2: A more professional "eyebrow" title */}
          <h2 className="text-sm font-bold uppercase tracking-widest text-primary-400 mb-4">
            Trusted by the Industry's Best
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Our AI-driven platform is the trusted choice for top-performing agents at premier real estate firms nationwide.
          </p>
        </motion.div>
        
        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          {/* UI/UX ENHANCEMENT 3: Interactive Animation - Pauses on Hover */}
          <motion.div
            className="flex gap-16"
            variants={marqueeVariants}
            animate="animate"
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} // Optional: slight zoom on hover
          >
            {duplicatedPartners.map((partner, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 h-10 w-48 text-gray-500 hover:text-gray-300 transition-colors duration-300 flex items-center justify-center"
                title={partner.name}
              >
                {partner.svg}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;

