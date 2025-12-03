import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, CreditCard, BarChart3, Lock, RefreshCw } from 'lucide-react';

const features = [
    {
        icon: Database,
        title: "Real-time Inventory",
        description: "Sync your inventory instantly across all channels. Never oversell again."
    },
    {
        icon: Cpu,
        title: "AI-Powered Matching",
        description: "Our algorithms find the perfect buyer for your parts automatically."
    },
    {
        icon: CreditCard,
        title: "Instant Settlements",
        description: "Get paid immediately upon delivery confirmation. No more waiting."
    },
    {
        icon: BarChart3,
        title: "Market Analytics",
        description: "Deep insights into pricing trends and demand forecasting."
    },
    {
        icon: Lock,
        title: "Verified Security",
        description: "Enterprise-grade encryption and vetted trading partners."
    },
    {
        icon: RefreshCw,
        title: "Automated Returns",
        description: "Streamlined return process handled entirely by our system."
    }
];

const Features = () => {
    return (
        <section className="py-24 bg-secondary relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Why Choose <span className="text-primary">AutoTrade.AI</span>?
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        We've rebuilt the auto parts trading experience from the ground up, focusing on speed, security, and automation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                <feature.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
