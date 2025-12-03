import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Car, Grid } from 'lucide-react';

const Hero = ({ onOpenChat, onOpenContract }) => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#09090b] pt-16">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983&auto=format&fit=crop"
                    alt="Car Background"
                    className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-[#09090b]/80 to-[#09090b]" />
            </div>

            {/* Sophisticated Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '6s' }} />
                <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-white/[0.02] rotate-12 blur-3xl pointer-events-none" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center min-h-[80vh]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-[100px] mt-10"
                >
                    <h1 className="text-7xl md:text-[10rem] font-bold text-white mb-8 tracking-tighter leading-none">
                        Automated Auto Parts Trading
                    </h1>
                    <p className="text-xl md:text-3xl text-gray-400 font-light tracking-wide">
                        자동차 물품 거래의 새로운 기준
                    </p>
                </motion.div>

                <div className="w-full flex flex-row justify-center items-center gap-[150px] px-4 md:px-8 max-w-[1600px] mx-auto">
                    {/* AI Smart Search */}
                    <motion.button
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onOpenChat}
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
                        className="group relative w-[240px] h-[120px] rounded-[2rem] bg-white/5 backdrop-blur-sm border-none transition-all duration-500 overflow-hidden flex flex-col items-center justify-center p-4 text-left hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] hover:bg-white/10"
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
        </div>
    );
};

export default Hero;
