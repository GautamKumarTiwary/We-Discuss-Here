import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockClosedIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();
            
            if (data.success) {
                localStorage.setItem("token", data.token);
                navigate("/");
            } else {
                setError(data.error || "Invalid email or password");
            }
        } catch (err) {
            setError("Failed to connect to the server");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        setCredentials(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                    <p className="text-gray-500">Sign in to continue to your account</p>
                </div>

                {error && (
                    <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Signing In...</span>
                            </>
                        ) : (
                            <>
                                <LockClosedIcon className="w-5 h-5" />
                                <span>Sign In</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <a href="/forgot-password" className="text-blue-600 hover:text-blue-800">
                        Forgot password?
                    </a>
                </div>

                <div className="mt-8 text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-blue-600 font-medium hover:text-blue-800">
                        Create account
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;