import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AllParts = ({ addToCart }) => {
    const navigate = useNavigate();
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Initial mock data - sorted by date (newest first)
    const [parts, setParts] = useState([
        { id: 1, name: 'Michelin Pilot Sport Cup 2', date: '2025-12-03', price: '₩850,000', image: '/assets/part1.png', status: 'New', description: 'High-performance track tire with ultimate dry grip.' },
        { id: 2, name: 'Brembo GT Brake Kit', date: '2025-12-02', price: '₩4,200,000', image: '/assets/part2.png', status: 'New', description: '6-piston monoblock calipers with drilled rotors.' },
        { id: 3, name: 'BBS FI-R Forged Wheels', date: '2025-12-01', price: '₩12,500,000', image: '/assets/part3.png', status: 'New', description: 'Ultra-lightweight forged aluminum wheels for track use.' },
        { id: 4, name: 'Akrapovic Titanium Exhaust', date: '2025-11-30', price: '₩8,900,000', image: '/assets/part4.png', status: 'New', description: 'Full titanium exhaust system with carbon fiber tips.' },
        { id: 5, name: 'Digital Racing Dash', date: '2025-11-29', price: '₩2,500,000', image: '/assets/part5.png', status: 'Used', description: 'Configurable LCD instrument cluster with telemetry.' },
        { id: 6, name: 'Carbon Fiber Gear Shifter', date: '2025-11-28', price: '₩450,000', image: '/assets/part6.png', status: 'New', description: 'Ergonomic carbon fiber gear knob with weighted feel.' },
        { id: 7, name: 'Laserlight Headlight Module', date: '2025-11-27', price: '₩3,800,000', image: '/assets/part7.png', status: 'Used', description: 'Adaptive laser headlight assembly for maximum visibility.' },
        { id: 8, name: 'V8 Engine Block Assembly', date: '2025-11-26', price: '₩15,000,000', image: '/assets/part8.png', status: 'Refurbished', description: 'Complete short block assembly for high-performance builds.' },
        { id: 9, name: 'KW V3 Coilover Suspension', date: '2025-11-25', price: '₩3,200,000', image: '/assets/part9.png', status: 'New', description: 'Adjustable damping coilover kit for street and track.' },
        { id: 10, name: 'Alcantara Racing Steering', date: '2025-11-24', price: '₩1,200,000', image: '/assets/part10.png', status: 'Used', description: 'Flat-bottom racing steering wheel with center marker.' },
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

    // Local addToCart removed - using prop from App.jsx

    return (
        <div className="min-h-screen text-white pt-20 pb-20 relative overflow-y-auto">
            <div className="w-[53%] mx-auto mb-20 text-center relative">
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

            <div className="w-[53%] mx-auto mb-10 flex justify-end">
                <button
                    onClick={handleRefresh}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-sm text-gray-300 hover:text-white"
                >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Refresh List
                </button>
            </div>

            <div className="w-[53%] mx-auto flex flex-col">
                <AnimatePresence mode='popLayout'>
                    {parts.map((part) => (
                        <motion.div
                            layout
                            key={part.id}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            // overflow-hidden: 내부 박스들의 border-radius를 위해 추가
                            className="group flex items-stretch rounded-2xl bg-[#18181b] border border-white/5 hover:border-white/10 transition-all overflow-hidden mb-6 last:mb-0"
                        >
                            {/* [1구역] 이미지 박스 */}
                            {/* p-4: 이미지 주변 여백 */}
                            <div className="p-1.5 flex-shrink-0">
                                <div className="w-20 h-10 rounded-lg overflow-hidden bg-gray-800 relative">
                                    <img src={part.image} alt={part.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-medium border border-white/10 z-10">
                                        {part.status}
                                    </div>
                                </div>
                            </div>

                            {/* [2구역] 설명 박스 (가운데) */}
                            {/* flex-1: 남은 공간 다 차지 */}
                            <div className="flex-1 flex flex-col justify-center py-1.5 pr-4 min-w-0">
                                <span className="text-xs text-gray-500 font-mono mb-0.5 block">
                                    {part.date}
                                </span>
                                <h3 className="text-xs font-semibold truncate mb-0.5 text-white" title={part.name}>
                                    {part.name}
                                </h3>
                                <p className="text-gray-400 text-[9px] mb-0.5 line-clamp-1 leading-tight">
                                    {part.description}
                                </p>
                                <span className="text-sm font-bold text-blue-400">{part.price}</span>
                            </div>

                            {/* [3구역] 장바구니 박스 (오른쪽 끝) */}
                            {/* w-32: 고정 너비 */}
                            {/* border-l: 왼쪽 설명 박스와 구분선 */}
                            <button
                                onClick={() => {
                                    // 가격 문자열에서 숫자만 추출
                                    const priceNumber = parseInt(part.price.replace(/[^0-9]/g, ''), 10);
                                    addToCart({ ...part, price: priceNumber });
                                }}
                                className="w-20 p-1.5 flex flex-col justify-center border-l border-white/5 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group/cart"
                            >
                                <div className="p-2 rounded-full bg-white/10 group-hover/cart:bg-white/20 transition-colors mb-1">
                                    <ShoppingCart className="w-5 h-5 text-gray-300 group-hover/cart:text-white" />
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 group-hover/cart:text-white">ADD</span>
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default AllParts;