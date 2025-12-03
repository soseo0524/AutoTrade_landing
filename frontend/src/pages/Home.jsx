import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import ContractModal from '../components/ContractModal';

function Home() {
    const [isContractOpen, setIsContractOpen] = useState(false);

    return (
        <div className="min-h-screen text-white font-sans selection:bg-primary selection:text-white">
            <Navbar onOpenChat={() => window.location.href = '/ai-search'} />
            <main>
                <Hero
                    onOpenChat={() => window.location.href = '/ai-search'}
                    onOpenContract={() => setIsContractOpen(true)}
                />
            </main>
            <Footer />
            <ContractModal isOpen={isContractOpen} onClose={() => setIsContractOpen(false)} />
        </div>
    );
}

export default Home;
