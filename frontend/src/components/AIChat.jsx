import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, X, Sparkles, ShoppingCart, ArrowRight } from 'lucide-react';

const MOCK_PRODUCTS = [
    {
        id: 1,
        name: "Ceramic Brake Pads (Front)",
        price: "$45.99",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=200&h=200"
    },
    {
        id: 2,
        name: "High-Performance Air Filter",
        price: "$29.99",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=200&h=200" // Placeholder
    }
];

const AIChat = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { type: 'bot', text: "Hello! I'm your AI parts assistant. What are you looking for today?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
        setInput('');
        setIsTyping(true);

        // Simulate AI processing
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [
                ...prev,
                {
                    type: 'bot',
                    text: "I found some compatible parts for your vehicle based on our database.",
                    products: MOCK_PRODUCTS
                }
            ]);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Chat Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 md:inset-auto md:top-[10%] md:left-1/2 md:-translate-x-1/2 md:w-[600px] md:h-[80vh] bg-[#18181B] border border-white/10 md:rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">AI Assistant</h3>
                                    <p className="text-xs text-green-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        Online
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] ${msg.type === 'user' ? 'bg-primary text-white' : 'bg-white/10 text-gray-200'} rounded-2xl px-4 py-3`}>
                                        <p className="text-sm leading-relaxed">{msg.text}</p>

                                        {/* Product Cards in Chat */}
                                        {msg.products && (
                                            <div className="mt-4 space-y-3">
                                                {msg.products.map(product => (
                                                    <div key={product.id} className="bg-black/20 rounded-xl p-3 flex gap-3 hover:bg-black/30 transition-colors cursor-pointer group">
                                                        <div className="w-16 h-16 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                                                            {/* Placeholder for image if load fails or using color block */}
                                                            <div className="w-full h-full bg-gray-700 flex items-center justify-center text-xs text-gray-500">IMG</div>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-sm font-medium text-white truncate group-hover:text-primary transition-colors">{product.name}</h4>
                                                            <div className="flex items-center gap-1 mt-1">
                                                                <span className="text-xs text-yellow-400">★ {product.rating}</span>
                                                                <span className="text-xs text-gray-500">• In Stock</span>
                                                            </div>
                                                            <div className="flex items-center justify-between mt-2">
                                                                <span className="text-sm font-bold text-white">{product.price}</span>
                                                                <button className="p-1.5 rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-white transition-colors">
                                                                    <ArrowRight className="w-3 h-3" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/10 rounded-2xl px-4 py-3 flex gap-1">
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/10 bg-white/5">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask about parts (e.g., 'Brake pads for 2022 Sonata')..."
                                    className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className="bg-primary text-white p-3 rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AIChat;
