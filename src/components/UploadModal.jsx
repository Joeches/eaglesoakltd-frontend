import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

const UploadModal = ({ isOpen, onClose, onUpload }) => {
  const [images, setImages] = useState([]);
  const [youtubeLink, setYoutubeLink] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [destination, setDestination] = useState('regular'); // Default to regular listings
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfText, setPdfText] = useState(''); // Extracted text from PDF
  const [realtorContact, setRealtorContact] = useState(''); // Realtor contact info
  const [faq, setFaq] = useState(''); // Specific FAQs
  const [description, setDescription] = useState(''); // Full description
  const [biddingInfo, setBiddingInfo] = useState(''); // Bidding/prospecting info
  const [witnessInfo, setWitnessInfo] = useState(''); // Witness details for verification

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      // Simulate PDF text extraction (in real app, use pdf-parse or similar)
      const reader = new FileReader();
      reader.onload = () => {
        // Mock extraction: in production, parse PDF for text
        setPdfText(`Extracted from ${file.name}: [Simulated PDF content including FAQs, description, bidding info, and materials.]`);
      };
      reader.readAsText(file); // Simplified; real PDF parsing needed
    }
  };

  const handleSubmit = () => {
    onUpload({
      images,
      youtubeLink,
      title,
      price,
      destination,
      pdfFile,
      pdfText,
      realtorContact,
      faq,
      description,
      biddingInfo,
      witnessInfo
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-neutral-800 p-6 rounded-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-lg">Upload Property</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Property Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-neutral-700 text-white rounded mb-2"
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 bg-neutral-700 text-white rounded mb-2"
          />
          <input
            type="text"
            placeholder="YouTube Video Link"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            className="w-full p-2 bg-neutral-700 text-white rounded mb-2"
          />
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 bg-neutral-700 text-white rounded mb-2"
          />
          <input
            type="file"
            accept=".pdf"
            onChange={handlePdfChange}
            className="w-full p-2 bg-neutral-700 text-white rounded mb-2"
          />
          <textarea
            placeholder="Realtor Contact Info (e.g., Phone: 123-456-7890, Email: realtor@example.com)"
            value={realtorContact}
            onChange={(e) => setRealtorContact(e.target.value)}
            className="w-full p-2 bg-neutral-700 text-white rounded mb-2"
            rows={2}
          />
          <textarea
            placeholder="Specific FAQs (e.g., Q: Is parking included? A: Yes, 2 spots.)"
            value={faq}
            onChange={(e) => setFaq(e.target.value)}
            className="w-full p-2 bg-neutral-700 text-white rounded mb-2"
            rows={3}
          />
          <textarea
            placeholder="Full Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 bg-neutral-700 text-white rounded mb-2"
            rows={3}
          />
          <textarea
            placeholder="Bidding/Prospecting Info (e.g., Open house dates, bidding process)"
            value={biddingInfo}
            onChange={(e) => setBiddingInfo(e.target.value)}
            className="w-full p-2 bg-neutral-700 text-white rounded mb-2"
            rows={3}
          />
          <textarea
            placeholder="Witness Info (e.g., On-ground witness details for verification)"
            value={witnessInfo}
            onChange={(e) => setWitnessInfo(e.target.value)}
            className="w-full p-2 bg-neutral-700 text-white rounded mb-2"
            rows={2}
          />
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-2 bg-neutral-700 text-white rounded"
          >
            <option value="hero">Upload to Home Page Hero (3 Mansions Section)</option>
            <option value="regular">Upload to Regular Listings Profile</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-secondary-500 text-white py-2 rounded hover:bg-secondary-600"
        >
          <Upload className="inline mr-2" size={16} /> Upload & Post to Buyers
        </button>
      </div>
    </div>
  );
};

export default UploadModal;