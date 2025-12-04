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
                    className="w-full text-left mb-[100px]"
                >
                    <h1 className="w-[50%] ml-[28%] text-[3vw] font-bold text-white mb-8 tracking-tighter leading-tight whitespace-nowrap">
                        Automated auto Parts Trading
                    </h1>
                    <p className="text-xl md:text-3xl text-gray-400 font-light tracking-wide max-w-3xl mx-auto text-center">
                        자동차 물품 거래의 새로운 기준
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <div className="w-full flex flex-row justify-center items-center gap-[150px] px-4 md:px-8 max-w-[1600px] mx-auto">
                    {/* AI Smart Search */}
                    {/* AI Smart Search */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/ai-search')}
                        className="neon-button-medium w-[240px] h-[120px] flex flex-col items-center justify-center gap-3 cursor-pointer"
                    >
                        <Sparkles className="w-8 h-8" />
                        <h2 className="text-xl font-bold tracking-wide">AI Smart Search</h2>
                    </motion.button>

                    {/* Cart */}
                    {/* Cart */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/cart')}
                        className="neon-button-medium w-[240px] h-[120px] flex flex-col items-center justify-center gap-3 cursor-pointer"
                    >
                        <ShoppingBag className="w-8 h-8" />
                        <h2 className="text-xl font-bold tracking-wide">Cart</h2>
                    </motion.button>

                    {/* All Parts */}
                    {/* All Parts */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/all-parts')}
                        className="neon-button-medium w-[240px] h-[120px] flex flex-col items-center justify-center gap-3 cursor-pointer"
                    >
                        <Grid className="w-8 h-8" />
                        <h2 className="text-xl font-bold tracking-wide">All Parts</h2>
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
