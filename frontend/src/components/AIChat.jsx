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
                    {/* Full Screen Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-[#09090b] z-[100] flex flex-col"
                    >
                        {/* Minimal Header */}
                        <div className="flex items-center justify-end p-6">
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Main Content - Centered like Google */}
                        <div className="flex-1 flex flex-col items-center justify-center px-4 w-full max-w-3xl mx-auto -mt-20">

                            {messages.length === 0 ? (
                                <div className="w-full flex flex-col items-center space-y-8">
                                    {/* Logo / Title */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="flex flex-col items-center gap-4"
                                    >
                                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-500/20">
                                            <Sparkles className="w-10 h-10 text-white" />
                                        </div>
                                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                                            AI Smart Search
                                        </h1>
                                    </motion.div>

                                    {/* Search Input */}
                                    <motion.form
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                        className="w-full relative group"
                                    >
                                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                            <Search className="h-6 w-6 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            placeholder="Search for parts, compatibility, or issues..."
                                            className="w-full bg-white/5 border border-white/10 rounded-full pl-16 pr-16 py-5 text-xl text-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-lg hover:shadow-xl hover:bg-white/[0.07]"
                                            autoFocus
                                        />
                                        <button
                                            type="submit"
                                            disabled={!input.trim()}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 rounded-full text-white hover:bg-blue-500 disabled:opacity-0 disabled:cursor-not-allowed transition-all"
                                        >
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </motion.form>

                                    {/* Quick Actions / Categories */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="flex flex-wrap justify-center gap-3 mt-4"
                                    >
                                        {[
                                            { icon: TrendingUp, label: "Trending Parts" },
                                            { icon: Car, label: "My Garage" },
                                            { icon: ShoppingCart, label: "Order History" },
                                            { icon: Sparkles, label: "AI Diagnosis" }
                                        ].map((item, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => handleSend(item.label)}
                                                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all text-sm text-gray-300 hover:text-white"
                                            >
                                                <item.icon className="w-4 h-4" />
                                                <span>{item.label}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                </div>
                            ) : (
                                /* Chat Interface (When messages exist) */
                                <div className="w-full h-full flex flex-col max-w-5xl">
                                    <div className="flex-1 overflow-y-auto space-y-8 pr-4 scrollbar-thin scrollbar-thumb-white/10 py-8">
                                        {messages.map((msg, idx) => (
                                            <div key={idx} className={`flex gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === 'user' ? 'bg-blue-600' : 'bg-gradient-to-br from-blue-500 to-purple-600'}`}>
                                                    {msg.type === 'user' ? <User className="w-5 h-5 text-white" /> : <Sparkles className="w-5 h-5 text-white" />}
                                                </div>
                                                <div className={`flex-1 max-w-[80%] space-y-2`}>
                                                    <div className="text-sm text-gray-400 ml-1">{msg.type === 'user' ? 'You' : 'AI Assistant'}</div>
                                                    <div className={`rounded-2xl px-6 py-4 text-lg leading-relaxed ${msg.type === 'user' ? 'bg-white/10 text-white' : 'text-gray-200'}`}>
                                                        <p>{msg.text}</p>
                                                        {msg.products && (
                                                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                                {msg.products.map(product => (
                                                                    <div key={product.id} className="bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all cursor-pointer group border border-white/5 hover:border-blue-500/30">
                                                                        <div className="aspect-video bg-black/40 relative overflow-hidden">
                                                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                                                        </div>
                                                                        <div className="p-4">
                                                                            <h4 className="font-bold text-white truncate">{product.name}</h4>
                                                                            <div className="flex justify-between items-center mt-2">
                                                                                <span className="text-blue-400 font-bold">{product.price}</span>
                                                                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                                                                    <span>★ {product.rating}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {isTyping && (
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                                    <Sparkles className="w-5 h-5 text-white" />
                                                </div>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                                                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Bottom Input (only when chatting) */}
                                    <div className="py-6 border-t border-white/5">
                                        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative max-w-4xl mx-auto">
                                            <input
                                                type="text"
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                placeholder="Ask follow-up questions..."
                                                className="w-full bg-white/5 border border-white/10 rounded-full pl-6 pr-14 py-4 text-white focus:outline-none focus:bg-white/10 focus:border-blue-500/50 transition-all"
                                            />
                                            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-blue-600 rounded-full text-white hover:bg-blue-500 transition-colors">
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AIChat;
