import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { post } from '../api/api';
import { MapPin, Mail, Phone, Send, Loader2, MessageCircle } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const ContactInfoItem = ({ icon: Icon, title, children }) => (
  <div className="flex items-start space-x-4">
    <Icon className="w-6 h-6 text-primary-400 mt-1 flex-shrink-0" />
    <div>
      <h3 className="font-semibold text-white">{title}</h3>
      <div className="text-gray-400">{children}</div>
    </div>
  </div>
);

const Contact = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    try {
      await post('/contact', data);
      toast.success('Thank you! Your message has been sent successfully.');
      reset();
    } catch (err) {
      toast.error('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-900">
      <Header />
      <main className="flex-grow">
        <div className="relative overflow-hidden bg-neutral-800 py-16 sm:py-20 text-center">
          <div className="absolute inset-0 bg-grid-neutral-700/[0.2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-poppins"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            >
              Get In Touch
            </motion.h1>
            <motion.p 
              className="mt-4 text-lg text-gray-300"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            >
              We'd love to hear from you. Let's build the future of real estate together.
            </motion.p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            
            <motion.div 
              className="lg:col-span-2 space-y-10"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.3 }}
            >
              <div>
                <h2 className="text-3xl font-semibold text-white font-poppins">Contact Information</h2>
                <p className="text-gray-400 mt-2">
                  Reach out to our team directly through any of the channels below.
                </p>
              </div>
              <div className="space-y-6">
                {/* UPDATED: New Office Address */}
                <ContactInfoItem icon={MapPin} title="Our Office">
                   <p>Suite B23, Saham Plaza, 10 Alexandria Crescent<br />Wuse, Abuja, FCT, Nigeria</p>
                </ContactInfoItem>
                <ContactInfoItem icon={Mail} title="General Inquiries">
                  <a href="mailto:contact@eaglesoakltd.com" className="hover:text-primary-400 transition">contact@eaglesoakltd.com</a>
                </ContactInfoItem>
                {/* UPDATED: New Phone Number */}
                <ContactInfoItem icon={Phone} title="Call Us">
                  <a href="tel:+2347061494444" className="hover:text-primary-400 transition">(+234) 706 149 4444</a>
                </ContactInfoItem>
              </div>
              <div className="bg-neutral-800/50 p-6 rounded-xl border border-neutral-700">
                <h3 className="font-semibold text-white flex items-center">
                  <MessageCircle size={20} className="mr-2 text-green-400"/>
                  Direct Line to the CEO
                </h3>
                <p className="text-gray-400 text-sm mt-2 mb-4">For partnerships or urgent inquiries, message our CEO directly on WhatsApp.</p>
                <a 
                  href="https://wa.me/2348062761369" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center bg-green-500/20 text-green-300 border border-green-500/50 font-bold py-3 px-6 rounded-lg hover:bg-green-500/40 hover:text-white transition-all"
                >
                  Message (+234) 806 276 1369
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="lg:col-span-3 bg-neutral-800/40 backdrop-blur-lg p-8 rounded-xl border border-neutral-700/80"
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true, amount: 0.3 }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label htmlFor="name-contact" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input id="name-contact" {...register('name')} className={`w-full p-3 bg-neutral-700/50 rounded-md border ${errors.name ? 'border-red-500' : 'border-neutral-600'} focus:ring-2 focus:ring-primary-500`} />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="email-contact" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <input id="email-contact" type="email" {...register('email')} className={`w-full p-3 bg-neutral-700/50 rounded-md border ${errors.email ? 'border-red-500' : 'border-neutral-600'} focus:ring-2 focus:ring-primary-500`} />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="message-contact" className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea id="message-contact" {...register('message')} rows={5} className={`w-full p-3 bg-neutral-700/50 rounded-md border ${errors.message ? 'border-red-500' : 'border-neutral-600'} focus:ring-2 focus:ring-primary-500`} />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>
                <div className="text-right">
                  <button type="submit" disabled={isSubmitting} className="inline-flex items-center bg-primary-500 text-white font-bold px-8 py-3 rounded-md hover:bg-primary-600 transition-colors disabled:opacity-50">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={20} />} <span className="ml-2">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;

