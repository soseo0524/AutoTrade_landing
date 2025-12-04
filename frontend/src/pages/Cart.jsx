import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, Trash2, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
    const navigate = useNavigate();

    // Initialize cart from localStorage
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Update localStorage whenever cart changes
    const removeItem = (id) => {
        const newItems = cartItems.filter(item => item.id !== id);
        setCartItems(newItems);
        localStorage.setItem('cartItems', JSON.stringify(newItems));
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="min-h-screen text-white pt-44 pb-20 relative overflow-y-auto">

            <button
                onClick={() => navigate('/')}
                style={{
                    position: 'fixed',
                    top: '53.15625px',
                    left: '20%',
                    width: '69.640625px',
                    height: '30px',
                    zIndex: 50
                }}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
            </button>

            <div className="w-3/5 mx-auto">
                {/* [수정 1] justify-center 추가: 제목 중앙 정렬 */}
                <h1 className="text-4xl font-bold mb-8 flex items-center justify-center gap-3">
                    Your Cart
                    <span className="text-xl font-normal text-gray-500">({cartItems.length} items)</span>
                </h1>

                {cartItems.length > 0 ? (
                    // [수정 2] gap-12: 휴지통 버튼 공간 확보를 위해 리스트와 요약창 사이 간격을 넓힘
                    <div className="flex flex-col lg:flex-row gap-12">

                        {/* 리스트 영역 */}
                        <div className="flex-1 flex flex-col gap-4">
                            <AnimatePresence>
                                {cartItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                        // relative 추가: 휴지통 버튼 위치 기준점
                                        className="relative flex gap-6 p-4 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 items-center hover:bg-white/10 transition-colors"
                                    >
                                        {/* 이미지 */}
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-800 flex-shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>

                                        {/* 정보 */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs text-gray-400 mb-1">{item.category}</p>
                                            <h3 className="text-lg font-bold truncate pr-4">{item.name}</h3>
                                            <p className="text-xl font-bold text-blue-400 mt-1">
                                                ₩{item.price.toLocaleString()}
                                            </p>
                                        </div>

                                        {/* [수정 3] 휴지통 버튼: 박스 오른쪽 바깥으로 이동 */}
                                        {/* absolute -right-12: 오른쪽으로 48px 밖으로 밀어냄 */}
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="absolute -right-12 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-red-400 transition-colors"
                                            title="Remove item"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* 요약 창 */}
                        <div className="lg:w-80 h-fit p-6 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>₩{totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                <div className="h-px bg-white/10 my-4"></div>
                                <div className="flex justify-between text-xl font-bold text-white">
                                    <span>Total</span>
                                    <span>₩{totalPrice.toLocaleString()}</span>
                                </div>
                            </div>
                            <button className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-colors flex justify-center items-center gap-2">
                                <CreditCard className="w-5 h-5" />
                                Checkout
                            </button>
                        </div>
                    </div>
                ) : (
                    // 빈 장바구니 화면
                    <div className="w-full p-16 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 text-center mt-10">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-700/50 flex items-center justify-center">
                            <ShoppingBag className="w-10 h-10 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                        <p className="text-gray-400 mb-8">Looks like you haven't added any parts yet.</p>
                        <button
                            onClick={() => navigate('/all-parts')}
                            className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Start Shopping
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;