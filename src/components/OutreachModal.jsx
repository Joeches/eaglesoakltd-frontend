import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

const OutreachModal = ({ isOpen, onClose, signal, onSubmit }) => {
  const [draftedMessage, setDraftedMessage] = useState('');

  const handleSubmit = () => {
    onSubmit(draftedMessage);
    setDraftedMessage('');
  };

  // Pre-fill with compliant template
  const templateMessage = signal ? `Hi ${signal.username}, congrats on starting your search! ${signal.extracted_location} is a great area. I've helped several buyers there. If you have specific questions about the process, my AI assistant can provide instant answers 24/7 here: [Link to your Omni-Chat].` : '';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-neutral-800 p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-lg">Draft Outreach Message</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <p className="text-gray-300 mb-4">Craft a compliant, public response for {signal?.source_platform}. This will simulate posting via API and set up automation for Omni-Chat.</p>
        <textarea
          value={draftedMessage || templateMessage}
          onChange={(e) => setDraftedMessage(e.target.value)}
          className="w-full p-3 bg-neutral-700 text-white rounded border border-gray-600 mb-4"
          rows={6}
          placeholder="Draft your message..."
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-secondary-500 text-white py-2 rounded hover:bg-secondary-600 transition-colors"
        >
          Send Outreach & Create Automation <Send className="inline ml-2" size={16} />
        </button>
      </div>
    </div>
  );
};

export default OutreachModal;