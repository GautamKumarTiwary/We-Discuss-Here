import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { SquareUser } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuth();

    const closeMobileMenu = () => setIsMenuOpen(false);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 bg-gray-900 text-white shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <img src={logo} alt="Logo" className="h-10 w-auto" />
                    </Link>

                    {/* Mobile menu button */}
                    <button
                        className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
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
                            <Link to="/quiz" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                                Quizzes
                            </Link>
                            {user?.role === 'admin' && (
                                <Link to="/admin" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                                    Admin Panel
                                </Link>
                            )}
                        </div>

                        {/* Auth Section */}
                        <div className="flex items-center space-x-4 relative">
                            {!isAuthenticated ? (
                                <>
                                    <Link to="/login" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                                        Login
                                    </Link>
                                    <Link to="/signup" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                                        Signup
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <button onClick={toggleDropdown} className="p-2 rounded-full hover:bg-gray-700 transition-colors">
                                        <SquareUser className="w-6 h-6" />
                                    </button>

                                    {/* Dropdown menu */}
                                    {isDropdownOpen && (
                                        <div className="absolute top-12 right-0 w-64 bg-white text-black rounded-md shadow-lg z-50">
                                            <div className="flex flex-col">
                                                <div className="px-4 py-2 font-medium text-gray-700 border-b border-gray-200">
                                                    Hello, {user?.name || 'User'}
                                                </div>
                                                <Link
                                                    to="/profile"
                                                    onClick={() => setIsDropdownOpen(false)}
                                                    className="px-4 py-2 hover:bg-gray-100"
                                                >
                                                    Profile
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="px-4 py-2 text-left hover:bg-red-100 text-red-600"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden py-2">
                        <div className="flex flex-col space-y-1 px-2">
                            <Link
                                to="/quiz"
                                onClick={closeMobileMenu}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                            >
                                Quizzes
                            </Link>
                            {user?.role === 'admin' && (
                                <Link
                                    to="/admin"
                                    onClick={closeMobileMenu}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
                                >
                                    Admin Panel
                                </Link>
                            )}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-700 px-2">
                            {!isAuthenticated ? (
                                <>
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
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/profile"
                                        onClick={closeMobileMenu}
                                        className="block px-4 py-2 text-center text-white hover:bg-gray-700 rounded-md"
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            closeMobileMenu();
                                        }}
                                        className="block w-full px-4 py-2 text-center text-white bg-red-600 rounded-md hover:bg-red-700 mt-2"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
