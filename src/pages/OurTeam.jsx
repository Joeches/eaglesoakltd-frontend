import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

import { motion } from 'framer-motion';
import { Linkedin, Twitter } from 'lucide-react';
import ctoPhoto from '../assets/team/my profile image.jpg';
import ceoPhoto from '../assets/team/463598713_8627804903967909_5512666877540908210_n.jpg';

// UI/UX ENHANCEMENT 1: Enriched Data Structure with Bios
const teamMembers = [
  {
    name: 'ROSEMARY OSAGIEMEN OSAGIE',
    title: 'CEO & Chief Marketer',
    imageUrl: ceoPhoto,
    bio: 'A visionary leader with over 15 years in luxury real estate, Rosemary merges market intuition with data-driven strategies to redefine the future of property acquisition.',
    socials: { linkedin: '#', twitter: '#' }
  },
  {
    name: 'ENG. JOSEPH OCHELEBE',
    title: 'CTO & Quantum Design Architect',
    imageUrl: ctoPhoto,
    bio: 'Joseph is the architect of our AI core, leveraging deep learning and predictive analytics to create a truly intelligent and futuristic real estate platform.',
    socials: {
      linkedin: 'https://www.linkedin.com/in/joseph-ochelebe-15a09588',
      twitter: 'https://twitter.com/joeches'
    }
  },
  {
    name: 'JANE IDEARE',
    title: 'Lead Real Estate Analyst',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&q=80',
    bio: 'Specializing in market trend analysis, Jane translates complex data into actionable insights, empowering our agents and clients to make smarter decisions.',
    socials: { linkedin: '#', twitter: '#' }
  }
];

// UI/UX ENHANCEMENT 2: World-Class Team Member Card
const TeamMemberCard = ({ member }) => (
  <div className="bg-neutral-800/40 backdrop-blur-lg rounded-xl border border-neutral-700/80 p-6 text-center group relative overflow-hidden">
    <img
      src={member.imageUrl}
      alt={`Photo of ${member.name}`}
      className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-full mx-auto mb-6 border-4 border-neutral-700 transition-transform duration-500 group-hover:scale-105"
    />
    <h3 className="text-xl font-semibold text-white">{member.name}</h3>
    <p className="text-primary-400 mb-4">{member.title}</p>
    <p className="text-gray-400 text-sm mb-6 flex-grow">{member.bio}</p>
    <div className="flex justify-center space-x-4">
      {member.socials.linkedin && <a href={member.socials.linkedin} aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors"><Linkedin /></a>}
      {member.socials.twitter && <a href={member.socials.twitter} aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors"><Twitter /></a>}
    </div>
  </div>
);

export default function OurTeam() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Stagger the animation of each card
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-900">
      <Header />
      <main className="flex-grow">
        <div className="relative overflow-hidden">
          {/* UI/UX ENHANCEMENT 3: Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full bg-grid-neutral-800/[0.2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
            <motion.div 
              className="text-center mb-12 lg:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-poppins">Meet Our Visionaries</h1>
              <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">The dedicated team of experts building the future of real estate with passion and innovation.</p>
            </motion.div>
            
            {/* UI/UX ENHANCEMENT 4: Advanced Staggered Animation */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {teamMembers.map((member, index) => (
                <motion.div variants={itemVariants} key={index}>
                  <TeamMemberCard member={member} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

