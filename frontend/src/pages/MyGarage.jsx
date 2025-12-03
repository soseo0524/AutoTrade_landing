import React, { useState } from 'react';
import { ArrowLeft, Filter, SortAsc, Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MyGarage = () => {
    const navigate = useNavigate();

    // Mock data simulating the result of a composite index query
    // Index: (status, created_at DESC)
    const garageItems = [
        { id: 1, name: 'BMW 520d Engine Mount', status: 'Good', date: '2023-12-01', price: '₩150,000', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300&h=200' },
        { id: 2, name: 'Mercedes C-Class Headlight', status: 'Good', date: '2023-11-28', price: '₩450,000', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300&h=200' },
        { id: 3, name: 'Audi A6 Brake Pads', status: 'Fair', date: '2023-11-25', price: '₩80,000', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300&h=200' },
        { id: 4, name: 'Porsche 911 Oil Filter', status: 'Excellent', date: '2023-11-20', price: '₩45,000', image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=300&h=200' },
    ];

    return (
        <div className="min-h-screen text-white p-8 pt-20 relative">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-12">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Home
                </button>

                <h1 className="text-6xl font-bold mb-4 tracking-tight">My Car Garage</h1>
                <p className="text-xl text-gray-400">Manage your auto parts collection</p>
            </div>

            {/* Optimization Indicator */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                    <Database className="w-4 h-4" />
                    <span>Query Optimized: Composite Index Applied (Status + Date)</span>
                </div>
            </div>

            {/* Filter & Sort Bar */}
            <div className="max-w-7xl mx-auto mb-8 flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="flex items-center gap-2 text-gray-300">
                    <Filter className="w-4 h-4" />
                    <span className="text-sm">Filter: <strong>Status</strong></span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-2 text-gray-300">
                    <SortAsc className="w-4 h-4" />
                    <span className="text-sm">Sort: <strong>Latest First</strong></span>
                </div>
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {garageItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-[#18181b] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all hover:-translate-y-1"
                    >
                        <div className="aspect-video bg-gray-800 relative overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                            <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/50 backdrop-blur-md text-xs font-medium border border-white/10">
                                {item.status}
                            </div>
                        </div>
                        <div className="p-5">
                            <h3 className="text-lg font-semibold mb-2 line-clamp-1">{item.name}</h3>
                            <div className="flex justify-between items-end">
                                <span className="text-gray-400 text-sm">{item.date}</span>
                                <span className="text-xl font-bold text-blue-400">{item.price}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default MyGarage;
