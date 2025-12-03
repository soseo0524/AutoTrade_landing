import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AISearch from './pages/AISearch';
import AllParts from './pages/AllParts';
import Cart from './pages/Cart';
import MyPage from './pages/MyPage';
import background from './assets/background.jpg';

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#09090b] text-white overflow-hidden">
        {/* Global Background */}
        <div className="fixed inset-0 z-0 pointer-events-none bg-[#09090b]">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-100"
            style={{ backgroundImage: `url(${background})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/80 via-transparent to-[#09090b]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/80 via-transparent to-[#09090b]/80" />
        </div>

        {/* Main Content */}
        <div className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ai-search" element={<AISearch />} />
            <Route path="/all-parts" element={<AllParts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
