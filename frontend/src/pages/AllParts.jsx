import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AllParts = () => {
    const navigate = useNavigate();
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Initial mock data
    const [parts, setParts] = useState([
        { id: 1, name: 'Porsche 911 GT3 RS Wing - Ultra Lightweight Carbon Edition with Aerodynamic Testing', date: '2025-12-03', price: '₩4,500,000', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300&h=200', status: 'New' },
        { id: 2, name: 'Brembo Carbon Ceramic Brakes', date: '2025-12-02', price: '₩12,000,000', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300&h=200', status: 'New' },
        { id: 3, name: 'BMW M4 CSL Laser Taillights', date: '2025-12-01', price: '₩3,200,000', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300&h=200', status: 'Used' },
        { id: 4, name: 'Audi RS6 Akrapovic Exhaust', date: '2025-11-30', price: '₩8,900,000', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300&h=200', status: 'New' },
        { id: 5, name: 'Mercedes AMG GT Grille', date: '2025-11-29', price: '₩1,500,000', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300&h=200', status: 'Used' },
    ]);

    const handleRefresh = () => {
        setIsRefreshing(true);
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

            <div className="w-3/5 mx-auto mb-10 flex justify-end">
                <button
                    onClick={handleRefresh}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-sm text-gray-300 hover:text-white"
                >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Refresh List
                </button>
            </div>

            <div className="w-3/5 mx-auto flex flex-col gap-4">
                <AnimatePresence mode='popLayout'>
                    {parts.map((part) => (
                        <motion.div
                            layout
                            key={part.id}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            // [핵심 변경 1] grid 사용: 왼쪽(192px) - 중간(나머지 1fr) - 오른쪽(160px)
                            // items-center: 세로 중앙 정렬
                            className="group grid grid-cols-[192px_1fr_160px] gap-6 p-4 rounded-2xl bg-[#18181b] border border-white/5 hover:border-white/10 transition-all hover:bg-[#202023] items-center"
                        >
                            {/* 1. 이미지 구역 (w-full로 부모 grid 셀 채움) */}
                            <div className="h-32 rounded-xl overflow-hidden bg-gray-800 relative w-full">
                                <img src={part.image} alt={part.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-xs font-medium border border-white/10">
                                    {part.status}
                                </div>
                            </div>

                            {/* 2. 텍스트 구역 (min-w-0와 overflow-hidden 필수) */}
                            <div className="flex flex-col justify-center min-w-0 overflow-hidden h-full py-1">
                                <h3 className="text-xl font-semibold truncate mb-2" title={part.name}>
                                    {part.name}
                                </h3>
                                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                                    High-quality authentic part. Verified by AutoTrade AI inspection system.
                                </p>
                                <span className="text-2xl font-bold text-blue-400">{part.price}</span>
                            </div>

                            {/* 3. 버튼 구역 (h-full로 높이 꽉 채우고 flex로 위아래 찢음) */}
                            <div className="h-full flex flex-col justify-between items-end border-l border-white/10 pl-4 py-1">
                                <span className="text-sm text-gray-500 font-mono whitespace-nowrap">{part.date}</span>
                                <button className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm font-medium transition-colors whitespace-nowrap">
                                    <ShoppingCart className="w-4 h-4" />
                                    Add
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AllParts;