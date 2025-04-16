import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Menu } from 'lucide-react';
import { FaYoutube, FaBell, FaVideo } from 'react-icons/fa';

import { setCategory, setSearchSuggestion, toggleSidebar } from '@/utils/appSlice';
import { SEARCH_SUGGESTIONS_API } from '@/utils/constant';

function Navbar() {
    const [input, setInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const { searchSuggestion } = useSelector((store) => store.app);
    const dispatch = useDispatch();

    const searchVedio = async () => {
        dispatch(setCategory(input));
        setInput('');
        setIsFocused(false);
    };

    const toggleHandler = () => {
        dispatch(toggleSidebar());
    };

    const showSuggestion = async () => {
        try {
            const res = await axios.get(SEARCH_SUGGESTIONS_API + input);
            dispatch(setSearchSuggestion(res?.data[1]));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (input.trim()) {
            showSuggestion();
        }
    }, [input]);

    return (
        <div className="flex items-center justify-between px-4 py-2 bg-white shadow-sm sticky top-0 z-50">
            {/* Left section */}
            <div className="flex items-center gap-4">
                <Menu
                    onClick={toggleHandler}
                    className="cursor-pointer text-gray-700 hover:text-black"
                />
                <div className="flex items-center gap-1 cursor-pointer">
                    <FaYoutube className="text-red-600 text-3xl" />
                    <span className="text-xl font-bold text-gray-800">YouTube</span>
                </div>
            </div>

            {/* Center search bar */}
            <div className="relative flex-col w-full max-w-md mx-4 hidden sm:flex">
                <div className="flex items-center w-full">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                        type="text"
                        placeholder="Search"
                        className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                        onClick={searchVedio}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 border border-l-0 border-gray-300 rounded-r-full"
                    >
                        🔍
                    </button>
                </div>

                {/* Suggestions Dropdown */}
                <div
                    className={`absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-md z-50 max-h-64 overflow-y-auto transition-all duration-200 ease-in-out transform ${isFocused && searchSuggestion?.length > 0
                        ? 'opacity-100 scale-100 visible'
                        : 'opacity-0 scale-95 invisible'
                        }`}
                >
                    <ul>
                        {searchSuggestion.map((text, idx) => (
                            <li
                                key={idx}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                                onClick={() => {
                                    dispatch(setCategory(text));
                                    setInput('');
                                    setIsFocused(false);
                                }}
                            >
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Right section */}
            <div className="flex items-center gap-4">
                <FaVideo className="text-xl text-gray-700 hover:text-blue-600 cursor-pointer" />
                <FaBell className="text-xl text-gray-700 hover:text-red-600 cursor-pointer" />
                <img
                    src="https://i.pravatar.cc/40"
                    alt="avatar"
                    className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-300 hover:border-blue-400"
                />
            </div>
        </div>
    );
}

export default Navbar;
