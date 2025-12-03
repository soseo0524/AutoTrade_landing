import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AISearch from './pages/AISearch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-search" element={<AISearch />} />
      </Routes>
    </Router>
  );
}

export default App;
