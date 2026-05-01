import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
    const { user, loading } = useAuth();
    const [testResults, setTestResults] = useState([]);
    const [loadingResults, setLoadingResults] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await fetch("http://localhost:5000/api/testresults", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (Array.isArray(data)) {
                    setTestResults(data);
                }
            } catch (error) {
                console.error("Error fetching test results:", error);
            } finally {
                setLoadingResults(false);
            }
        };

        if (user) {
            fetchResults();
        }
    }, [user]);

    if (loading) {
        return <div className="p-4 text-center">Loading profile...</div>;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h2>
            
            {user ? (
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center mb-6">
                            <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="ml-4">
                                <h3 className="text-xl font-semibold">{user.name}</h3>
                                <p className="text-gray-600">{user.email}</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ProfileInfoItem label="User ID" value={user._id} />
                            <ProfileInfoItem label="Account Created" value={new Date(user.date).toLocaleDateString()} />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Test History</h3>
                        {loadingResults ? (
                            <p>Loading test results...</p>
                        ) : testResults.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {testResults.map((result) => (
                                            <tr key={result._id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.examName}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {result.score} / {result.totalQuestions} 
                                                    <span className="ml-2 text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                                                        {Math.round((result.score / result.totalQuestions) * 100)}%
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(result.date).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500 italic">No tests taken yet. Start exploring tests in the Quiz section!</p>
                        )}
                    </div>
                </div>
            ) : (
                <div className="text-center py-10 bg-white rounded-lg shadow-md">
                    <h3 className="text-xl font-medium text-gray-700 mb-2">
                        Profile Not Available
                    </h3>
                    <p className="text-gray-500">
                        Please login to view your profile details
                    </p>
                </div>
            )}
        </div>
    );
}

// Helper component for profile info items
const ProfileInfoItem = ({ label, value }) => (
    <div className="border-b pb-2">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
);

export default ProfilePage;