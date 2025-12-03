import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, X, Sparkles, ShoppingCart, ArrowRight, Search, TrendingUp } from 'lucide-react';

const MOCK_PRODUCTS = [
    {
        id: 1,
        name: "Premium Ceramic Brake Pads",
        price: "₩54,000",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=200&h=200",
        compatibility: "Hyundai Sonata 2020+"
    },
    {
        id: 2,
        name: "High-Performance Air Filter",
        price: "₩32,000",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=200&h=200",
        compatibility: "Universal Fit"
    }
];

const SUGGESTED_QUERIES = [
    "Headlights for 2022 Grandeur",
    "Engine Oil 5W-30",
    "Brake Pads for Avante CN7",
    "Wiper Blades"
];

const AIChat = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (text = input) => {
        if (!text.trim()) return;

        const userMessage = text;
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
                        className="fixed inset-0 md:inset-auto md:top-[10%] md:left-1/2 md:-translate-x-1/2 md:w-[700px] md:h-[80vh] bg-[#09090b]/90 backdrop-blur-xl border border-white/10 md:rounded-[2rem] shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/[0.02]">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-white/5">
                                    <Sparkles className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg tracking-tight">AI Smart Search</h3>
                                    <p className="text-xs text-blue-400 flex items-center gap-1.5 font-medium">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                        </span>
                                        Online & Ready
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            {messages.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-8 opacity-0 animate-fadeIn" style={{ animationFillMode: 'forwards', animationDuration: '0.5s' }}>
                                    <div className="space-y-4">
                                        <h2 className="text-3xl font-bold text-white tracking-tight">
                                            What are you looking for?
                                        </h2>
                                        <p className="text-gray-400 max-w-md mx-auto">
                                            Describe the part you need, or select from the popular searches below.
                                        </p>
                                    </div>

                                    <div className="w-full max-w-md space-y-3">
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 px-1">
                                            <TrendingUp className="w-4 h-4" />
                                            <span>Suggested Searches</span>
                                        </div>
                                        {SUGGESTED_QUERIES.map((query, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleSend(query)}
                                                className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all duration-300 group flex items-center justify-between"
                                            >
                                                <span className="text-gray-300 group-hover:text-white transition-colors">{query}</span>
                                                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {messages.map((msg, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[85%] ${msg.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white/5 border border-white/5 text-gray-200'} rounded-2xl px-5 py-4 shadow-lg`}>
                                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                                                {/* Product Cards in Chat */}
                                                {msg.products && (
                                                    <div className="mt-4 space-y-3">
                                                        {msg.products.map(product => (
                                                            <div key={product.id} className="bg-black/40 rounded-xl p-3 flex gap-4 hover:bg-black/60 transition-colors cursor-pointer group border border-white/5">
                                                                <div className="w-20 h-20 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                                </div>
                                                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                                    <div className="flex justify-between items-start">
                                                                        <h4 className="text-sm font-bold text-white truncate group-hover:text-blue-400 transition-colors">{product.name}</h4>
                                                                        <span className="text-sm font-bold text-blue-400">{product.price}</span>
                                                                    </div>
                                                                    <p className="text-xs text-gray-500 mt-1">{product.compatibility}</p>
                                                                    <div className="flex items-center gap-2 mt-2">
                                                                        <span className="text-xs bg-yellow-500/10 text-yellow-400 px-1.5 py-0.5 rounded flex items-center gap-1">
                                                                            ★ {product.rating}
                                                                        </span>
                                                                        <span className="text-xs text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded">In Stock</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/5 rounded-2xl px-4 py-3 flex gap-1.5">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="relative"
                            >
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything..."
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl pl-6 pr-14 py-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 rounded-xl text-white hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-600/20"
                                >
                                    <Send className="w-4 h-4" />
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
