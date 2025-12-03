import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AISearch from './pages/AISearch';
import AllParts from './pages/AllParts';
import Cart from './pages/Cart';
import MyPage from './pages/MyPage';
// ★ 이 파일이 '자동차 사진'인지 꼭 확인하세요!
import background from './assets/background.jpg'; 

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#09090b] text-white overflow-hidden">
        
        {/* [수정된 부분] Global Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
            {/* 기존의 복잡한 그라데이션 div 2개를 지우고, 
               아래 div 하나로 합쳤습니다. 
            */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ 
                    // 이미지 위에 검은색 70% 투명막을 씌우는 코드입니다.
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${background})` 
                }}
            />
        </div>

        {/* Main Content (여기는 그대로 두시면 됩니다) */}
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