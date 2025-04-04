import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.png";


const Navbar = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMobileMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 bg-gray-900 text-white shadow-lg">
            <div className="container mx-auto px-4 ">
                <div className="flex items-center justify-between h-16">
                    {/* Brand/Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <img 
                            src={logo}
                            alt="WeDiscussHere Logo"
                            className="h-10 w-auto"
                        />
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex flex-1 justify-between">
                        <div className="flex space-x-4 ml-8">
                            <Link 
                                to="/" 
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    location.pathname === "/" 
                                    ? "bg-gray-800 text-white" 
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`}
                            >
                                Home
                            </Link>
                            <Link 
                                to="/news" 
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    location.pathname === "/news" 
                                    ? "bg-gray-800 text-white" 
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`}
                            >
                                News
                            </Link>
                            <Link 
                                to="/blog" 
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    location.pathname === "/blog" 
                                    ? "bg-gray-800 text-white" 
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`}
                            >
                                Blog
                            </Link>
                            <Link 
                                to="/AddQuestion" 
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    location.pathname === "/AddQuestion" 
                                    ? "bg-gray-800 text-white" 
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`}
                            >
                                Quiz
                            </Link>
                            <Link 
                                to="/about" 
                                className={`px-3 py-2 rounded-md text-sm font-medium ${
                                    location.pathname === "/about" 
                                    ? "bg-gray-800 text-white" 
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`}
                            >
                                About
                            </Link>
                        </div>

                        {/* Auth Buttons */}
                        <div className="flex items-center space-x-4">
                            <Link 
                                to="/login" 
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/signup" 
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                Signup
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden py-2">
                        <div className="flex flex-col space-y-1 px-2">
                            <Link 
                                to="/" 
                                onClick={closeMobileMenu}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    location.pathname === "/" 
                                    ? "bg-gray-800 text-white" 
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`}
                            >
                                Home
                            </Link>
                            <Link 
                                to="/news" 
                                onClick={closeMobileMenu}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    location.pathname === "/news" 
                                    ? "bg-gray-800 text-white" 
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`}
                            >
                                News
                            </Link>
                            <Link 
                                to="/blog" 
                                onClick={closeMobileMenu}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    location.pathname === "/blog" 
                                    ? "bg-gray-800 text-white" 
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`}
                            >
                                Blog
                            </Link>
                            <Link 
                                to="/quiz" 
                                onClick={closeMobileMenu}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    location.pathname === "/quiz" 
                                    ? "bg-gray-800 text-white" 
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`}
                            >
                                Quiz
                            </Link>
                            <Link 
                                to="/about" 
                                onClick={closeMobileMenu}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    location.pathname === "/about" 
                                    ? "bg-gray-800 text-white" 
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`}
                            >
                                About
                            </Link>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-700 px-2">
                            <Link 
                                to="/login" 
                                onClick={closeMobileMenu}
                                className="block w-full px-4 py-2 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700 mb-2"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/signup" 
                                onClick={closeMobileMenu}
                                className="block w-full px-4 py-2 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700"
                            >
                                Signup
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;