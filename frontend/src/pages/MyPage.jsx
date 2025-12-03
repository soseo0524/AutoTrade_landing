import React from 'react';
import { ArrowLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen text-white pt-20 pb-20 relative overflow-y-auto">
            {/* Header Section (Matches AllParts) */}
            <div className="w-3/5 mx-auto mb-20 text-center relative">
                <button
                    onClick={() => navigate('/')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-gray-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                </button>
            </div>

            <div className="w-3/5 mx-auto flex flex-col items-center justify-center">
                <div className="w-full p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <User className="w-10 h-10 text-blue-400" />
                    </div>
                    <h1 className="text-4xl font-bold mb-4">My Page</h1>
                    <p className="text-gray-400 text-lg">User profile and settings will appear here.</p>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
