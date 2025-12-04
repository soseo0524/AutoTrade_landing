import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, Search, Mic, Camera, X, User, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MOCK_PRODUCTS = [
    {
        id: 1,
        name: "Premium Ceramic Brake Pads",
        price: "₩85,000",
        rating: 4.8,
        compatibility: "Fits 2020-2023 Hyundai Sonata",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 2,
        name: "Performance Brake Rotors",
        price: "₩120,000",
        rating: 4.9,
        compatibility: "Fits 2020-2023 Hyundai Sonata",
        image: "https://images.unsplash.com/photo-1626246967483-3b4764c08403?auto=format&fit=crop&q=80&w=400"
    }
];

const AISearch = ({ addToCart }) => {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Scenario State
    // const [queryCount, setQueryCount] = useState(0); // Not used in text-based trigger

    const handleSend = async (text = input) => {
        if (!text.trim()) return;

        const userMessage = { type: 'user', text };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Scenario Logic
        // Remove queryCount dependency to allow specific text triggers regardless of order
        // const currentQueryIndex = queryCount; 
        // setQueryCount(prev => prev + 1);

        setTimeout(() => {
            setIsTyping(false);
            let aiResponse;

            // Check for Porsche/2025 keyword for Scenario 2
            if (text.toLowerCase().includes("porsche") || text.includes("2025")) {
                // Scenario 2: Porsche (Similar Match - 2023 recommendation for 2025 search)
                aiResponse = {
                    type: 'ai',
                    text: `완벽하게 일치하는 부품을 찾지 못했습니다! 대신 호환 가능한 2023년형 모델을 추천해 드립니다.`,
                    products: [{
                        id: 101,
                        name: "Porsche 911 GT3 RS Wing (2023)",
                        price: "₩4,500,000",
                        rating: 5.0,
                        compatibility: "Compatible (2023 Model)",
                        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300&h=200"
                    }]
                };
            } else {
                // Scenario 1: Brembo (Exact Match) - Default for other queries
                aiResponse = {
                    type: 'ai',
                    text: `완벽하게 일치하는 부품을 찾았습니다!`,
                    products: [{
                        id: 102,
                        name: "Brembo Carbon Ceramic Brakes",
                        price: "₩12,000,000",
                        rating: 4.9,
                        compatibility: "Exact Match",
                        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300&h=200"
                    }]
                };
            }
            setMessages(prev => [...prev, aiResponse]);
        }, 1500);
    };

    return (
        <div className="min-h-screen text-white flex flex-col relative overflow-hidden">
            {/* Background Elements - Moved to App.jsx */}

            {/* Header Section (Matches AllParts) */}
            <div className="w-3/5 mx-auto text-center relative z-20">
                <button
                    onClick={() => navigate('/')}
                    style={{
                        position: 'fixed',
                        top: '53.15625px',
                        left: '20%',
                        width: '69.640625px',
                        height: '30px',
                        zIndex: 50
                    }}
                    className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                </button>
            </div>

            {/* Main Content */}
            <div className={`relative z-10 flex-1 flex flex-col items-center px-4 w-full max-w-3xl mx-auto ${messages.length === 0 ? 'justify-center' : 'justify-start'}`}>

                {messages.length === 0 ? (
                    <div className="w-full flex flex-col items-center space-y-40">
                        {/* Logo / Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="flex flex-col items-center gap-0"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                                    <Sparkles className="w-6 h-6 text-white" />
                                </div>
                                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
                                    AutoTrade.AI
                                </h1>
                            </div>
                            <p className="text-2xl text-gray-400 font-light tracking-wide mt-[-10px]">
                                원하는 부품을 검색하세요
                            </p>
                        </motion.div>

                        {/* Search Input Container */}
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            className="w-[60%] relative group"
                        >
                            {/* Search Bar */}
                            <div className="relative flex items-center w-full bg-[#202124] border border-gray-700 hover:bg-[#303134] hover:border-gray-600 hover:shadow-lg rounded-full transition-all duration-200 pl-[50px] pr-6 py-4">
                                {/* Search Icon */}
                                <Search className="w-5 h-5 text-gray-400 mr-4" />

                                {/* Input */}
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Search for parts or describe your issue..."
                                    className="flex-1 bg-transparent border-none text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-0"
                                    autoFocus
                                />

                                {/* Right Actions */}
                                <div className="flex items-center gap-4 ml-4 border-l border-gray-600 pl-4">
                                    <button
                                        type="submit"
                                        disabled={!input.trim()}
                                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Sparkles className="w-4 h-4" />
                                        <span>AI Mode</span>
                                    </button>
                                </div>
                            </div>
                        </motion.form>
                    </div>
                ) : (
                    /* Chat Interface (When messages exist) */
                    <div className="w-full h-full flex flex-col max-w-5xl pt-20 pb-10">
                        <div className="flex-1 overflow-y-auto space-y-8 pr-4 scrollbar-thin scrollbar-thumb-white/10">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-col items-center w-full'}`}>
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === 'user' ? 'bg-blue-600' : 'bg-gradient-to-br from-blue-500 to-purple-600'}`}>
                                        {msg.type === 'user' ? <User className="w-5 h-5 text-white" /> : <Sparkles className="w-5 h-5 text-white" />}
                                    </div>
                                    <div className={`flex-1 max-w-[80%] space-y-2 ${msg.type === 'ai' ? 'flex flex-col items-center' : ''}`}>
                                        <div className={`text-sm text-gray-400 ml-1 ${msg.type === 'ai' ? 'text-center' : ''}`}>
                                            {msg.type === 'user' ? 'You' : 'AI Assistant'}
                                        </div>
                                        <div className={`rounded-2xl px-6 py-4 text-lg leading-relaxed ${msg.type === 'user' ? 'bg-white/10 text-white' : 'text-gray-200 text-center w-full'}`}>
                                            <p>{msg.text}</p>
                                            {msg.products && (
                                                <div className="mt-6 flex flex-wrap justify-center gap-4">
                                                    {msg.products.map(product => (
                                                        <div key={product.id} className="w-64 bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all cursor-pointer group border border-white/5 hover:border-blue-500/30 text-left">
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
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        addToCart(product);
                                                                    }}
                                                                    className="w-full mt-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
                                                                >
                                                                    Add to Cart
                                                                </button>
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
                        <div className="py-6 border-t border-white/5 mt-4">
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
        </div>
    );
};

export default AISearch;
