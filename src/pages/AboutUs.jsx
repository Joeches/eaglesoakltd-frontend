import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import TestimonialCard from '../components/TestimonialCard.jsx'; // Our new reusable card
import { motion } from 'framer-motion';
import { Target, ShieldCheck, Building, LineChart, Truck, Leaf } from 'lucide-react';

// Data for our core services, making the component clean and scalable
const coreServices = [
  { icon: Building, title: "AI Automated Real Estate Services", description: "Sales, management, and construction of residential & commercial properties." },
  { icon: LineChart, title: "Portfolio Management", description: "Helping you grow and secure your wealth with expert guidance." },
  { icon: ShieldCheck, title: "Trades & Investment", description: "Providing safe, vetted, and profitable investment opportunities." },
  { icon: Truck, title: "Logistics", description: "Ensuring seamless and reliable delivery solutions for all our ventures." },
  { icon: Leaf, title: "Agro-Allied Ventures", description: "Promoting sustainable and profitable agricultural projects and businesses." },
  { icon: Target, title: "AI-Powered Realtor Suite", description: "Automated lead generation and market analysis for the modern agent." }
];

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-900">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-neutral-800 py-20 text-center">
          <div className="absolute inset-0 bg-grid-neutral-700/[0.2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-poppins"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            >
              Who We Are
            </motion.h1>
            <motion.p 
              className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            >
              A cosmopolitan company of energetic, value-driven young professionals committed to changing the narrative of business.
            </motion.p>
          </div>
        </div>
        
        {/* Core Services Section */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-poppins">Our Core Services</h2>
              <p className="mt-3 text-gray-400">Bringing innovation, integrity, and excellence into every service we provide.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreServices.map((service, index) => (
                <motion.div 
                  key={index}
                  className="bg-neutral-800/50 p-8 rounded-2xl border border-neutral-700/80 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <div className="inline-block bg-primary-500/10 p-4 rounded-full mb-4">
                    <service.icon className="w-8 h-8 text-primary-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision Section with CEO Testimonial */}
        <section className="bg-neutral-800 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white font-poppins mb-6">Our Mission</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                To simplify acquiring genuine properties, reduce the burden of ownership, and make essential real estate services accessible to everyone through quality service and continuous enlightenment.
              </p>
            </motion.div>
            
            {/* Using our new TestimonialCard for the CEO's statement */}
            <TestimonialCard 
              quote="At Eaggles Oak Investment Ltd, we don’t just sell properties—we build trust, secure futures, and create wealth."
              author="Rosemary Osagiemen Osagie"
              title="CEO, Eaggles Oak Investment Ltd"
              index={0}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
