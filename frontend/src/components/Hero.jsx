import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Car, ShoppingBag, ArrowRight, Grid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = ({ onOpenContract }) => {
    const navigate = useNavigate();

    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
            {/* Background Elements - Moved to App.jsx */}

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[1800px] mx-auto px-4 md:px-8 flex flex-col items-center">

                {/* Main Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-[100px]"
                >
                    <h1 className="text-7xl md:text-[10rem] font-bold text-white mb-8 tracking-tighter leading-none">
                        Automated auto Parts Trading
                    </h1>
                    <p className="text-xl md:text-3xl text-gray-400 font-light tracking-wide max-w-3xl mx-auto">
                        자동차 물품 거래의 새로운 기준
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <div className="w-full flex flex-row justify-center items-center gap-[150px] px-4 md:px-8 max-w-[1600px] mx-auto">
                    {/* AI Smart Search */}
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/ai-search')}
                        className="group relative w-[240px] h-[120px] rounded-[2rem] bg-white/5 backdrop-blur-sm border-none transition-all duration-500 overflow-hidden flex flex-col items-center justify-center p-4 text-left hover:shadow-[0_0_50px_rgba(59,130,246,0.25)] hover:bg-white/10 cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="relative z-10 flex flex-col items-center text-center pointer-events-none">
                            <div className="mb-3 p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-500">
                                <Sparkles className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors duration-500" />
                            </div>
                            <h2 className="text-lg font-medium text-white tracking-wide transition-colors duration-300">AI Smart Search</h2>
                        </div>
                    </motion.button>

                    {/* My Car Garage */}
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative w-[240px] h-[120px] rounded-[2rem] bg-white/5 backdrop-blur-sm border-none transition-all duration-500 overflow-hidden flex flex-col items-center justify-center p-4 text-left hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] hover:bg-white/10 cursor-pointer"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="mb-3 p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-500">
                                <Car className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors duration-500" />
                            </div>
                            <h2 className="text-lg font-medium text-white tracking-wide transition-colors duration-300">My Car Garage</h2>
                        </div>
                    </motion.button>

                    {/* All Parts */}
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative w-[240px] h-[120px] rounded-[2rem] bg-white/5 backdrop-blur-sm border-none transition-all duration-500 overflow-hidden flex flex-col items-center justify-center p-4 text-left hover:shadow-[0_0_50px_rgba(236,72,153,0.25)] hover:bg-white/10"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10 flex flex-col items-center text-center">
                            <div className="mb-3 p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-500">
                                <Grid className="w-6 h-6 text-pink-400 group-hover:text-pink-300 transition-colors duration-500" />
                            </div>
                            <h2 className="text-lg font-medium text-white tracking-wide transition-colors duration-300">All Parts</h2>
                        </div>
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
