import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Quiz = () => {
  const { user, isAuthenticated } = useAuth();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const [testSeries, setTestSeries] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [purchasedPackages, setPurchasedPackages] = useState(user?.purchasedSubCategories || []);
  
  const navigate = useNavigate();

  // Load Razorpay Script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // Update purchased tests when user data changes
  useEffect(() => {
    if (user && user.purchasedSubCategories) {
      setPurchasedPackages(user.purchasedSubCategories);
    }
  }, [user]);

  // Fetch Categories on Mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/categories');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch SubCategories when Category is selected
  useEffect(() => {
    if (selectedCategory) {
      const fetchSubCategories = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/admin/subcategories/${selectedCategory._id}`);
          const data = await res.json();
          setSubCategories(data);
          setSelectedSubCategory(null);
          setTestSeries([]); // Reset test series
        } catch (err) {
          console.error("Error fetching subcategories:", err);
        }
      };
      fetchSubCategories();
    }
  }, [selectedCategory]);

  // Fetch TestSeries when a specific SubCategory (Package) is viewed
  useEffect(() => {
    if (selectedSubCategory) {
      const fetchTestSeries = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/admin/testseries/${selectedSubCategory._id}`);
          const data = await res.json();
          setTestSeries(data);
        } catch (err) {
          console.error("Error fetching test series:", err);
        }
      };
      fetchTestSeries();
    }
  }, [selectedSubCategory]);

  const handlePayment = async (packageObj) => {
    if (!isAuthenticated) {
        alert("Please login first to buy a package!");
        navigate('/login');
        return;
    }

    try {
        const token = localStorage.getItem('token');
        
        // 1. Create Order
        const orderRes = await fetch("http://localhost:5000/api/payment/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({ subCategoryId: packageObj._id })
        });
        const orderData = await orderRes.json();
        
        if (!orderData.success) {
            alert("Could not create order: " + orderData.error);
            return;
        }

        // 2. Initialize Razorpay Options
        const options = {
            key: "rzp_test_dummy_key", // Dummy key
            amount: orderData.order.amount,
            currency: "INR",
            name: "Test Series Platform",
            description: `Purchase ${packageObj.name} Package`,
            order_id: orderData.order.id,
            handler: async function (response) {
                // 3. Verify Payment
                try {
                    const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            subCategoryId: packageObj._id
                        })
                    });
                    const verifyData = await verifyRes.json();
                    
                    if (verifyData.success) {
                        setPurchasedPackages(verifyData.purchasedSubCategories);
                        alert("Payment successful! You can now access all tests in this package.");
                    } else {
                        alert("Payment verification failed.");
                    }
                } catch (err) {
                    console.error("Verification error", err);
                    alert("Error communicating with verification server.");
                }
            },
            prefill: {
                name: user?.name || "Test User",
                email: user?.email || "test@example.com",
            },
            theme: { color: "#2563EB" }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response){
            alert("Payment failed: " + response.error.description);
        });
        rzp1.open();

    } catch (err) {
        console.error("Payment setup error", err);
        alert("Payment setup error");
    }
  };

  // Helper to check if user has access to a package
  const hasAccessToPackage = (pkg) => {
      const isFree = !pkg.price || pkg.price === 0;
      const isPurchased = purchasedPackages.includes(pkg._id);
      const isAdmin = user?.role === 'admin' || user?.email === 'admin@example.com';
      return isFree || isPurchased || isAdmin;
  };

  if (loadingCategories) {
    return <div className="text-center mt-10 text-xl">Loading Exams...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Left Sidebar - Categories */}
      <div className="w-full md:w-1/4 bg-white border-r border-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Exam Categories</h2>
        {categories.length === 0 ? (
          <p className="text-gray-500">No categories found.</p>
        ) : (
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category._id}
                className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                  selectedCategory?._id === category._id
                    ? 'bg-blue-100 text-blue-700 border-blue-300'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-200'
                }`}
                onClick={() => {
                  setSelectedCategory(category);
                  setSearchTerm('');
                  setSelectedSubCategory(null);
                }}
              >
                <span className="font-medium">{category.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="flex-1 p-4">
        {!selectedCategory ? (
          <div className="text-center text-gray-500 mt-8">
            Select an Exam Category from the left to view available exam packages.
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
              {selectedCategory.name} Packages
            </h3>

            {/* If NOT viewing a specific SubCategory details, list all SubCategories */}
            {!selectedSubCategory ? (
              <div>
                {subCategories.length === 0 ? (
                  <p className="text-gray-500">No packages available for {selectedCategory.name}.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subCategories.map(sub => {
                      const hasAccess = hasAccessToPackage(sub);
                      const isFree = !sub.price || sub.price === 0;

                      return (
                        <div 
                          key={sub._id}
                          className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col overflow-hidden h-full relative"
                        >
                          {/* Top Banner (Price/Access status) */}
                          <div className={`py-2 px-4 text-center font-bold text-sm text-white ${hasAccess ? 'bg-green-500' : 'bg-indigo-600'}`}>
                              {hasAccess ? (isFree ? 'FREE PACKAGE' : 'PURCHASED') : `PREMIUM - ₹${sub.price}`}
                          </div>

                          <div className="p-5 flex-1 flex flex-col">
                              <h4 className="text-xl font-bold text-gray-800 mb-2">{sub.name}</h4>
                              {sub.details ? (
                                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{sub.details}</p>
                              ) : (
                                  <p className="text-gray-400 text-sm mb-4 italic">No details provided.</p>
                              )}
                              
                              <div className="mt-auto flex flex-col gap-2">
                                  {!hasAccess && (
                                      <button 
                                          onClick={() => handlePayment(sub)}
                                          className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md font-bold shadow-sm transition-colors"
                                      >
                                          Buy Now (₹{sub.price})
                                      </button>
                                  )}
                                  <button 
                                      onClick={() => setSelectedSubCategory(sub)}
                                      className={`w-full py-2 rounded-md font-medium border transition-colors ${hasAccess ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
                                  >
                                      {hasAccess ? 'View Tests' : 'View Details'}
                                  </button>
                              </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              /* SPECIFIC PACKAGE DETAILS VIEW */
              <div>
                <div className="mb-4">
                  <button 
                    onClick={() => setSelectedSubCategory(null)}
                    className="text-blue-600 hover:underline font-medium flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to Packages
                  </button>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                    <div className="bg-indigo-50 p-6 border-b border-indigo-100 flex justify-between items-start flex-col md:flex-row gap-4">
                        <div>
                            <h4 className="text-2xl font-bold text-indigo-900 mb-2">
                                {selectedSubCategory.name}
                            </h4>
                            <p className="text-indigo-800 bg-white inline-block px-3 py-1 rounded-full text-sm font-semibold border border-indigo-200">
                                {selectedSubCategory.price > 0 ? `Premium Package - ₹${selectedSubCategory.price}` : 'Free Package'}
                            </p>
                        </div>
                        {!hasAccessToPackage(selectedSubCategory) && (
                            <button 
                                onClick={() => handlePayment(selectedSubCategory)}
                                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-bold shadow-md transition-colors whitespace-nowrap"
                            >
                                Unlock All Tests for ₹{selectedSubCategory.price}
                            </button>
                        )}
                    </div>
                    {selectedSubCategory.details && (
                        <div className="p-6 bg-white">
                            <h5 className="font-semibold text-gray-800 mb-2">Package Details:</h5>
                            <p className="text-gray-700 whitespace-pre-wrap">{selectedSubCategory.details}</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center mb-4">
                    <h5 className="text-xl font-bold text-gray-800">Included Mock Tests ({testSeries.length})</h5>
                    <input
                        type="text"
                        placeholder="Search tests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-64 p-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>

                {/* Test Series List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {testSeries.filter(ts => ts.name.toLowerCase().includes(searchTerm.toLowerCase())).length > 0 ? (
                    testSeries.filter(ts => ts.name.toLowerCase().includes(searchTerm.toLowerCase())).map((ts) => {
                      const hasAccess = hasAccessToPackage(selectedSubCategory);

                      return (
                        <div
                          key={ts._id}
                          className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between h-full"
                        >
                          <div>
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="font-bold text-gray-800 text-lg">{ts.name}</h4>
                                {!hasAccess ? (
                                    <span title="Locked - Purchase Package to unlock" className="text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                    </span>
                                ) : (
                                    <span title="Unlocked" className="text-green-500">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" /></svg>
                                    </span>
                                )}
                            </div>
                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded mb-4">
                              Mock Test
                            </span>
                          </div>
                          <button 
                            onClick={() => {
                                if (hasAccess) {
                                    navigate('/takequiz', { state: { examName: ts.name, testSeriesId: ts._id } });
                                } else {
                                    handlePayment(selectedSubCategory);
                                }
                            }}
                            className={`w-full py-2 rounded-md font-medium transition-colors flex justify-center items-center gap-2 ${
                              hasAccess 
                                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                                : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                            }`}
                          >
                            {hasAccess ? "Take Test" : <>Unlock Test <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg></>}
                          </button>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col-span-full text-gray-500 mt-4">
                      {testSeries.length === 0 ? "No tests available in this package yet." : "No tests match your search."}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
