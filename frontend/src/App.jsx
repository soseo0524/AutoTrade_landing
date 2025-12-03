import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import ContractModal from './components/ContractModal';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isContractOpen, setIsContractOpen] = useState(false);

  return (
    <div className="min-h-screen bg-secondary text-white font-sans selection:bg-primary selection:text-white">
      <Navbar onOpenChat={() => setIsChatOpen(true)} />
      <main>
        <Hero
          onOpenChat={() => setIsChatOpen(true)}
          onOpenContract={() => setIsContractOpen(true)}
        />
      </main>
      <Footer />
      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <ContractModal isOpen={isContractOpen} onClose={() => setIsContractOpen(false)} />
    </div>
  );
}

export default App;
