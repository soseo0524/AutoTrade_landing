// App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import Home from './pages/Home';
import AISearch from './pages/AISearch';
import AllParts from './pages/AllParts';
import Cart from './pages/Cart';
import MyPage from './pages/MyPage';
import background from './assets/back.png';

function App() {
  const [cartItems, setCartItems] = React.useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  React.useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => [...prev, { ...product, id: Date.now() }]);
    alert(`${product.name} added to cart!`);
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Router>
      <AppInner
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    </Router>
  );
}

// 여기에서만 useLocation 사용
function AppInner({ cartItems, addToCart, removeFromCart }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const bgStyle = isHome
    ? {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${background})`,
    }
    : {}; // 홈이 아니면 배경 없음

  return (
    <div
      className={`min-h-screen text-white overflow-hidden ${isHome ? 'bg-cover bg-center' : 'bg-[#09090b]'
        }`}
      style={bgStyle}
    >
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai-search" element={<AISearch addToCart={addToCart} />} />
          <Route path="/all-parts" element={<AllParts addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;