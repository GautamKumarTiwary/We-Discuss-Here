import React, { useState, useEffect } from 'react';
import AddQuestion from './AddQuestion';
import AdminQuestionList from './AdminQuestionList';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const { user, loading } = useAuth();
    
    // Step State
    const [step, setStep] = useState(1); // 1: Categories, 2: SubCategories, 3: TestSeries, 4: Questions
    
    // Data State
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [testSeries, setTestSeries] = useState([]);
    
    // Selection State
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [selectedTestSeries, setSelectedTestSeries] = useState(null);
    
    // Form Input State
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newSubCategoryName, setNewSubCategoryName] = useState('');
    const [newSubCategoryDetails, setNewSubCategoryDetails] = useState('');
    const [newSubCategoryPrice, setNewSubCategoryPrice] = useState('');
    const [newTestSeriesName, setNewTestSeriesName] = useState('');

    const token = localStorage.getItem('token');

    // -------------------------------------------------------------
    // CATEGORIES (STEP 1)
    // -------------------------------------------------------------
    const fetchCategories = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/admin/categories");
            const data = await res.json();
            setCategories(data);
        } catch (err) { console.error(err); }
    };

    const handleCreateCategory = async () => {
        if (!newCategoryName.trim()) return;
        try {
            await fetch("http://localhost:5000/api/admin/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ name: newCategoryName })
            });
            setNewCategoryName('');
            fetchCategories();
        } catch (err) { console.error(err); }
    };

    // -------------------------------------------------------------
    // SUBCATEGORIES (STEP 2)
    // -------------------------------------------------------------
    const fetchSubCategories = async (categoryId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/admin/subcategories/${categoryId}`);
            const data = await res.json();
            setSubCategories(data);
        } catch (err) { console.error(err); }
    };

    const handleCreateSubCategory = async () => {
        if (!newSubCategoryName.trim()) return;
        try {
            await fetch("http://localhost:5000/api/admin/subcategories", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ 
                    name: newSubCategoryName, 
                    categoryId: selectedCategory._id,
                    details: newSubCategoryDetails,
                    price: Number(newSubCategoryPrice) || 0
                })
            });
            setNewSubCategoryName('');
            setNewSubCategoryDetails('');
            setNewSubCategoryPrice('');
            fetchSubCategories(selectedCategory._id);
        } catch (err) { console.error(err); }
    };

    // -------------------------------------------------------------
    // TEST SERIES (STEP 3)
    // -------------------------------------------------------------
    const fetchTestSeries = async (subCategoryId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/admin/testseries/${subCategoryId}`);
            const data = await res.json();
            setTestSeries(data);
        } catch (err) { console.error(err); }
    };

    const handleCreateTestSeries = async () => {
        if (!newTestSeriesName.trim()) return;
        try {
            await fetch("http://localhost:5000/api/admin/testseries", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ 
                    name: newTestSeriesName, 
                    subCategoryId: selectedSubCategory._id
                })
            });
            setNewTestSeriesName('');
            fetchTestSeries(selectedSubCategory._id);
        } catch (err) { console.error(err); }
    };

    // -------------------------------------------------------------
    // INITIAL LOAD
    // -------------------------------------------------------------
    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchCategories();
        }
    }, [user]);

    // -------------------------------------------------------------
    // RENDER LOGIC
    // -------------------------------------------------------------
    if (loading) return <div className="text-center p-8 text-xl">Loading...</div>;

    if (!user || user.role !== 'admin') {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
                <p className="text-gray-600 text-lg">You do not have permission to view this page.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Admin Dashboard</h1>

            {/* Breadcrumb Navigation */}
            <div className="flex items-center space-x-2 text-sm mb-8 bg-white p-4 rounded-lg shadow-sm border">
                <button onClick={() => setStep(1)} className={`font-medium hover:text-blue-600 ${step >= 1 ? 'text-blue-600' : 'text-gray-500'}`}>
                    1. Categories
                </button>
                {step >= 2 && selectedCategory && (
                    <>
                        <span className="text-gray-400">/</span>
                        <button onClick={() => setStep(2)} className={`font-medium hover:text-blue-600 ${step >= 2 ? 'text-blue-600' : 'text-gray-500'}`}>
                            {selectedCategory.name}
                        </button>
                    </>
                )}
                {step >= 3 && selectedSubCategory && (
                    <>
                        <span className="text-gray-400">/</span>
                        <button onClick={() => setStep(3)} className={`font-medium hover:text-blue-600 ${step >= 3 ? 'text-blue-600' : 'text-gray-500'}`}>
                            {selectedSubCategory.name}
                        </button>
                    </>
                )}
                {step === 4 && selectedTestSeries && (
                    <>
                        <span className="text-gray-400">/</span>
                        <span className="font-medium text-gray-800">{selectedTestSeries.name}</span>
                    </>
                )}
            </div>

            {/* STEP 1: CATEGORIES */}
            {step === 1 && (
                <div className="bg-white p-6 rounded-xl shadow-md border">
                    <h2 className="text-2xl font-bold mb-4 border-b pb-2">Select or Create a Category</h2>
                    <div className="flex gap-4 mb-6">
                        <input 
                            type="text" 
                            placeholder="New Category Name (e.g. Banking Exams)" 
                            value={newCategoryName} 
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            className="flex-1 p-2 border rounded-md"
                        />
                        <button onClick={handleCreateCategory} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Add</button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {categories.map(c => (
                            <div 
                                key={c._id} 
                                onClick={() => { setSelectedCategory(c); setStep(2); fetchSubCategories(c._id); }}
                                className="p-4 border-2 border-blue-100 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                            >
                                <h3 className="font-semibold text-lg text-blue-800 text-center">{c.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* STEP 2: SUBCATEGORIES */}
            {step === 2 && (
                <div className="bg-white p-6 rounded-xl shadow-md border">
                    <h2 className="text-2xl font-bold mb-4 border-b pb-2">Create a Package in "{selectedCategory.name}"</h2>
                    <div className="flex flex-col gap-4 mb-6 bg-gray-50 p-4 rounded-lg border">
                        <div className="flex flex-col md:flex-row gap-4">
                            <input 
                                type="text" 
                                placeholder="Package Name (e.g. IBPS PO Complete)" 
                                value={newSubCategoryName} 
                                onChange={(e) => setNewSubCategoryName(e.target.value)}
                                className="flex-1 p-2 border rounded-md"
                            />
                            <input 
                                type="number" 
                                placeholder="Price (₹) - Leave 0 for Free" 
                                value={newSubCategoryPrice} 
                                onChange={(e) => setNewSubCategoryPrice(e.target.value)}
                                className="w-full md:w-1/3 p-2 border rounded-md"
                            />
                        </div>
                        <textarea 
                            placeholder="Package Details / Description (What's included?)" 
                            value={newSubCategoryDetails} 
                            onChange={(e) => setNewSubCategoryDetails(e.target.value)}
                            className="w-full p-2 border rounded-md"
                            rows="2"
                        />
                        <button onClick={handleCreateSubCategory} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 w-full md:w-auto self-end">Create Package</button>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-4 text-gray-700">Existing Packages:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {subCategories.length === 0 ? <p className="text-gray-500">No packages found.</p> : subCategories.map(sc => (
                            <div 
                                key={sc._id} 
                                onClick={() => { setSelectedSubCategory(sc); setStep(3); fetchTestSeries(sc._id); }}
                                className="p-4 border-2 border-purple-100 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors relative"
                            >
                                {sc.price > 0 && <span className="absolute top-2 right-2 bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">₹{sc.price}</span>}
                                <h3 className="font-semibold text-lg text-purple-800 text-center mt-2">{sc.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* STEP 3: TEST SERIES */}
            {step === 3 && (
                <div className="bg-white p-6 rounded-xl shadow-md border">
                    <h2 className="text-2xl font-bold mb-4 border-b pb-2">Create Mock Tests in "{selectedSubCategory.name}"</h2>
                    <div className="flex gap-4 mb-6">
                        <input 
                            type="text" 
                            placeholder="New Test Series (e.g. Mock Test 1)" 
                            value={newTestSeriesName} 
                            onChange={(e) => setNewTestSeriesName(e.target.value)}
                            className="flex-1 p-2 border rounded-md"
                        />
                        <button onClick={handleCreateTestSeries} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Add Test</button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {testSeries.length === 0 ? <p className="text-gray-500">No test series found.</p> : testSeries.map(ts => (
                            <div 
                                key={ts._id} 
                                onClick={() => { setSelectedTestSeries(ts); setStep(4); }}
                                className="p-4 border-2 border-indigo-100 rounded-lg cursor-pointer hover:bg-indigo-50 transition-colors"
                            >
                                <h3 className="font-semibold text-lg text-indigo-800 text-center mt-2">{ts.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* STEP 4: MANAGE QUESTIONS */}
            {step === 4 && selectedTestSeries && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left side: Add new question */}
                    <div>
                        <AddQuestion testSeriesId={selectedTestSeries._id} />
                    </div>
                    
                    {/* Right side: Manage existing questions */}
                    <div>
                        <AdminQuestionList testSeriesId={selectedTestSeries._id} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
