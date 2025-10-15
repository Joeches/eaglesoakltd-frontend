import React, { useState } from 'react';
import { X, Shield } from 'lucide-react';
import EscrowModal from './EscrowModal';

const TransactionModal = ({ isOpen, onClose, listing, user }) => {
  const [offerAmount, setOfferAmount] = useState('');
  const [isEscrowOpen, setIsEscrowOpen] = useState(false);

  const handleSubmitOffer = () => {
    if (offerAmount) {
      // Simulate offer submission
      alert(`Offer of ${offerAmount} submitted for ${listing.title}. Proceeding to escrow.`);
      setIsEscrowOpen(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-neutral-800 p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-lg">Make an Offer</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <p className="text-gray-300 mb-4">Secure transaction for {listing.title} - Funds held in escrow until satisfaction.</p>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Offer Amount (e.g., $500,000)"
            value={offerAmount}
            onChange={(e) => setOfferAmount(e.target.value)}
            className="w-full p-2 bg-neutral-700 text-white rounded"
          />
        </div>
        <button onClick={handleSubmitOffer} className="w-full bg-primary-500 text-white py-2 rounded hover:bg-primary-600">
          Submit Offer & Initiate Escrow <Shield className="inline ml-2" size={16} />
        </button>
      </div>
      <EscrowModal isOpen={isEscrowOpen} onClose={() => { setIsEscrowOpen(false); onClose(); }} listing={listing} offerAmount={offerAmount} user={user} />
    </div>
  );
};

export default TransactionModal;