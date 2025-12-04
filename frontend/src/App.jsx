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
  // [State Lifting] 장바구니 상태를 최상위에서 관리
  const [cartItems, setCartItems] = React.useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 장바구니 변경 시 localStorage 동기화
  React.useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // 장바구니 추가 함수
  const addToCart = (product) => {
    setCartItems(prev => [...prev, { ...product, id: Date.now() }]); // Ensure unique ID
    alert(`${product.name} added to cart!`);
  };

  // 장바구니 삭제 함수
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

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
            <Route
              path="/ai-search"
              element={<AISearch addToCart={addToCart} />}
            />
            <Route
              path="/all-parts"
              element={<AllParts addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />}
            />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;