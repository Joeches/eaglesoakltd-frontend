import React, { useEffect } from 'react';
import { motion, useInView, useAnimate } from 'framer-motion';
import { TrendingUp, Zap, Clock, Target } from 'lucide-react';

// ADVANCED TECHNIQUE 1: A powerful, reusable animated number component.
const AnimatedCounter = ({ to, suffix = '' }) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      animate(0, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          scope.current.textContent = `${Math.round(latest)}${suffix}`;
        },
      });
    }
  }, [isInView, animate, to, suffix]);

  return <span ref={scope}>{`0${suffix}`}</span>;
};

// Data-driven approach for scalability and clean code.
const stats = [
  { icon: TrendingUp, value: 60, suffix: '%', label: 'Increase in Qualified Leads' },
  { icon: Zap, value: 90, suffix: '%', label: 'Faster Deal Closing Rate' },
  { icon: Clock, value: 10, suffix: '+', label: 'Hours Saved Per Week' },
  { icon: Target, value: 98, suffix: '%', label: 'Client Satisfaction Rate' },
];

const SocialProofRealtor = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.section 
      className="relative overflow-hidden py-20 sm:py-24 bg-neutral-800"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="absolute inset-0 bg-grid-neutral-700/[0.2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-poppins">
            Results That Speak for Themselves
          </h2>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
            Our AI-driven platform isn't just a tool—it's a quantifiable advantage for your business.
          </p>
        </div>
        
        {/* UI/UX ENHANCEMENT 2: A world-class, responsive grid of animated stats */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-neutral-800/40 backdrop-blur-lg p-8 rounded-2xl border border-neutral-700/80 text-center group"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-primary-500/10 rounded-2xl border border-primary-500/30 transform transition-transform duration-300 group-hover:scale-110">
                <stat.icon className="w-8 h-8 text-primary-400" />
              </div>
              <p className="text-5xl font-bold text-white font-poppins">
                {/* UI/UX ENHANCEMENT 3: The animated number counter */}
                <AnimatedCounter to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SocialProofRealtor;
