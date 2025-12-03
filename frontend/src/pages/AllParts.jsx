import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AllParts = () => {
    const navigate = useNavigate();
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Initial mock data - sorted by date (newest first)
    const [parts, setParts] = useState([
        { id: 1, name: 'Porsche 911 GT3 RS Wing', date: '2025-12-03', price: '₩4,500,000', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300&h=200', status: 'New' },
        { id: 2, name: 'Brembo Carbon Ceramic Brakes', date: '2025-12-02', price: '₩12,000,000', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300&h=200', status: 'New' },
        { id: 3, name: 'BMW M4 CSL Laser Taillights', date: '2025-12-01', price: '₩3,200,000', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300&h=200', status: 'Used' },
        { id: 4, name: 'Audi RS6 Akrapovic Exhaust', date: '2025-11-30', price: '₩8,900,000', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300&h=200', status: 'New' },
        { id: 5, name: 'Mercedes AMG GT Grille', date: '2025-11-29', price: '₩1,500,000', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300&h=200', status: 'Used' },
    ]);

    const handleRefresh = () => {
        setIsRefreshing(true);
        // Simulate fetching new data
        setTimeout(() => {
            const newPart = {
                id: Date.now(),
                name: 'New Arrival: Ferrari 488 Pista Wheel',
                date: new Date().toISOString().split('T')[0],
                price: '₩5,000,000',
                image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300&h=200',
                status: 'Just In'
            };
            setParts(prev => [newPart, ...prev]);
            setIsRefreshing(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen text-white pt-20 pb-20 relative overflow-y-auto">
            {/* Header Section */}
            <div className="w-3/5 mx-auto mb-20 text-center relative">
                <button
                    onClick={() => navigate('/')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                </button>

                <h1 className="text-6xl font-bold tracking-tight">All parts</h1>
                <p className="text-gray-400 mt-2">Discover the latest automotive components</p>
            </div>

            {/* Actions Bar */}
            <div className="w-3/5 mx-auto mb-10 flex justify-end">
                <button
                    onClick={handleRefresh}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-sm text-gray-300 hover:text-white"
                >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Refresh List
                </button>
            </div>

            {/* Parts List */}
            <div className="w-3/5 mx-auto flex flex-col gap-4">
                <AnimatePresence mode='popLayout'>
                    {parts.map((part) => (
                        <motion.div
                            layout
                            key={part.id}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="group flex items-center gap-6 p-4 rounded-2xl bg-[#18181b] border border-white/5 hover:border-white/10 transition-all hover:bg-[#202023]"
                        >
                            {/* Image */}
                            <div className="w-48 h-32 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0 relative">
                                <img src={part.image} alt={part.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-xs font-medium border border-white/10">
                                    {part.status}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold truncate pr-4">{part.name}</h3>
                                    <span className="text-sm text-gray-500 whitespace-nowrap">{part.date}</span>
                                </div>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                    High-quality authentic part. Verified by AutoTrade AI inspection system.
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-2xl font-bold text-blue-400">{part.price}</span>
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors">
                                        <ShoppingCart className="w-4 h-4" />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AllParts;
