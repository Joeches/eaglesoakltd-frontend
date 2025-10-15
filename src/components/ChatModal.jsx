import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SendHorizontal, Loader2, Bot, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ChatMessage = ({ message }) => {
  const { isUser, text } = message;
  return (
    <motion.div
      className={`flex items-end gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!isUser && (
        <div className="w-9 h-9 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 border border-primary-500/30">
          <Bot size={20} className="text-primary-400" />
        </div>
      )}
      <div
        className={`max-w-xs md:max-w-md p-3 px-4 rounded-2xl shadow-md ${
          isUser
            ? 'bg-primary-600 text-white rounded-br-none'
            : 'bg-neutral-700 text-gray-200 rounded-bl-none'
        }`}
      >
        <p style={{ whiteSpace: 'pre-wrap' }}>{text || '...'}</p>
      </div>
    </motion.div>
  );
};

const ChatModal = ({ isOpen, onClose, propertyId, propertyTitle }) => {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setMessages([{ text: `Hello! I'm Nexus, your AI assistant. How can I help you with "${propertyTitle || 'this listing'}" today?`, isUser: false }]);
    }
  }, [isOpen, propertyTitle]);

  // ARCHITECTURAL FIX: This is the definitive, world-class streaming response handler.
  const handleSend = async (messageText = input) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = { text: messageText, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    setMessages(prev => [...prev, { text: '', isUser: false }]);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ai/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ question: messageText, property_id: propertyId }),
      });

      if (!response.body) throw new Error("No response body.");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "An API error occurred.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let buffer = '';

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        buffer += decoder.decode(value, { stream: true });

        // Process all complete SSE messages in the buffer
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || ''; // Keep any partial message for the next chunk

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.substring(6);
            if (data.trim() === '[DONE]') {
              break;
            }
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content || '';
              if (content) {
                setMessages(prev => {
                  const newMessages = [...prev];
                  const lastMessage = newMessages[newMessages.length - 1];
                  lastMessage.text += content;
                  return newMessages;
                });
              }
            } catch (e) {
              console.error('Failed to parse stream chunk:', data);
            }
          }
        }
      }
    } catch (error) {
      setMessages(prev => prev.slice(0, -1));
      setMessages(prev => [...prev, { text: `Sorry, I've encountered an error. Please try again.`, isUser: false }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div 
        className="bg-neutral-800/50 backdrop-blur-xl rounded-2xl w-full max-w-lg h-[85vh] flex flex-col border border-neutral-700/80 shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className="flex justify-between items-center p-4 border-b border-neutral-700 flex-shrink-0">
          <h3 className="text-white text-lg font-semibold flex items-center gap-3">
            <Sparkles size={22} className="text-primary-400" />
            AI Assistant: {propertyTitle || 'General Inquiry'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Close modal"><X size={24} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((msg, i) => <ChatMessage key={i} message={msg} />)}
          {isLoading && (
            <div className="flex items-end gap-3">
               <div className="w-9 h-9 rounded-full bg-primary-500/20 flex items-center justify-center flex-shrink-0 border border-primary-500/30">
                <Bot size={20} className="text-primary-400" />
              </div>
              <div className="bg-neutral-700 text-gray-200 p-3 rounded-2xl rounded-bl-none flex items-center">
                <Loader2 className="animate-spin h-5 w-5 mr-3" />
                Nexus is thinking...
              </div>
            </div>
          )}
          {!isLoading && messages.length <= 1 && (
             <motion.div className="pt-4 space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <p className="text-sm text-gray-400">Or, ask one of these:</p>
                <div className="flex flex-col items-start gap-2">
                    <button onClick={() => handleSend("What are the 3 most unique features of this property?")} className="text-sm text-left bg-neutral-700/50 p-2 px-3 rounded-lg hover:bg-neutral-700 transition-colors">What are the 3 most unique features?</button>
                    <button onClick={() => handleSend("Tell me about the neighborhood and nearby amenities.")} className="text-sm text-left bg-neutral-700/50 p-2 px-3 rounded-lg hover:bg-neutral-700 transition-colors">Tell me about the neighborhood.</button>
                    <button onClick={() => handleSend("What is the pricing history and current bidding info?")} className="text-sm text-left bg-neutral-700/50 p-2 px-3 rounded-lg hover:bg-neutral-700 transition-colors">What is the pricing and bidding info?</button>
                </div>
             </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-neutral-700 flex-shrink-0">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center bg-neutral-700/50 rounded-lg border border-neutral-600 focus-within:ring-2 focus-within:ring-primary-500">
            <input
              type="text" value={input} onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-3 bg-transparent text-white focus:outline-none"
              placeholder="Ask about features, pricing..." disabled={isLoading}
            />
            <button type="submit" className="text-white p-3 hover:text-primary-400 disabled:opacity-50" disabled={isLoading || !input.trim()}>
              <SendHorizontal size={20} />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatModal;

