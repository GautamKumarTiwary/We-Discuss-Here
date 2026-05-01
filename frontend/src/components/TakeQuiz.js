import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TakeQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  const examName = location.state?.examName || "General Quiz";
  const testSeriesId = location.state?.testSeriesId;

  useEffect(() => {
    if (!isAuthenticated) {
        alert("Please login to take the quiz!");
        navigate("/login");
        return;
    }

    const fetchQuestions = async () => {
      try {
        let url = "http://localhost:5000/api/quiz/questions";
        if (testSeriesId) {
          url += `?testSeriesId=${testSeriesId}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        if (Array.isArray(data)) {
            setQuestions(data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [isAuthenticated, navigate, testSeriesId]);

  const handleOptionSelect = (questionId, optionId) => {
    if (isSubmitted) return; // Prevent changing after submission
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (window.confirm("Are you sure you want to submit the test?")) {
        let finalScore = 0;
        
        // Calculate score
        questions.forEach(q => {
        const selectedOptionId = selectedAnswers[q._id];
        if (selectedOptionId) {
            const selectedOption = q.answers.find(a => a._id === selectedOptionId);
            if (selectedOption && selectedOption.isCorrect) {
            finalScore += 1;
            }
        }
        });

        setScore(finalScore);
        setIsSubmitted(true);
        setCurrentQuestionIndex(0); // Reset to view review from start

        // Save to backend
        try {
        const token = localStorage.getItem('token');
        await fetch("http://localhost:5000/api/testresults", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
            examName: examName,
            score: finalScore,
            totalQuestions: questions.length
            })
        });
        } catch (error) {
        console.error("Error saving result:", error);
        }
    }
  };

  if (loading) {
    return <div className="text-center py-20 text-xl text-gray-600">Loading your test...</div>;
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">No questions available!</h2>
        <p className="text-gray-600">The admin needs to add questions to this test series first.</p>
        <button onClick={() => navigate("/quiz")} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md">
          Go Back
        </button>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];
  
  // Post-Test Review logic for option highlighting
  const getOptionClass = (option) => {
      if (!isSubmitted) {
          return selectedAnswers[currentQ._id] === option._id 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50';
      }

      // Review Mode Highlight
      if (option.isCorrect) {
          return 'border-green-500 bg-green-50 ring-2 ring-green-400';
      }
      if (selectedAnswers[currentQ._id] === option._id && !option.isCorrect) {
          return 'border-red-500 bg-red-50 ring-2 ring-red-400';
      }
      return 'border-gray-200 opacity-60';
  };

  return (
    <div className="max-w-4xl mx-auto my-8 bg-white p-6 rounded-xl shadow-md">
      
      {/* Test Header or Review Score Board */}
      {isSubmitted && currentQuestionIndex === 0 && (
          <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-xl text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Test Completed!</h2>
              <p className="text-xl text-blue-800 font-semibold mb-4">
                  Your Score: {score} / {questions.length}
              </p>
              <div className="flex justify-center gap-4">
                <button onClick={() => navigate("/profile")} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">View Profile</button>
                <button onClick={() => navigate("/quiz")} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-sm">More Tests</button>
              </div>
          </div>
      )}

      <div className="flex justify-between items-center mb-6 pb-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">{examName} {isSubmitted && "(Review Mode)"}</h2>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${isSubmitted ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>

      {/* Question Display */}
      <div className="mb-8 min-h-[200px]">
        <h3 className="text-xl font-medium text-gray-900 mb-4 leading-relaxed">
          {currentQuestionIndex + 1}. {currentQ.question}
        </h3>
        
        {/* Question Image */}
        {currentQ.questionImage && (
            <div className="mb-6 flex justify-center">
                <img src={currentQ.questionImage} alt="Question" className="max-w-full max-h-96 rounded-lg shadow-sm border" />
            </div>
        )}
        
        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {currentQ.answers.map((option, index) => (
            <div 
              key={option._id || index}
              onClick={() => handleOptionSelect(currentQ._id, option._id)}
              className={`p-4 rounded-lg border-2 transition-all flex flex-col justify-center ${
                !isSubmitted ? 'cursor-pointer' : 'cursor-default'
              } ${getOptionClass(option)}`}
            >
              <div className="flex items-start gap-3">
                <div className={`mt-1 w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center ${
                  selectedAnswers[currentQ._id] === option._id ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}>
                  {selectedAnswers[currentQ._id] === option._id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                </div>
                <span className="text-gray-800 font-medium">{option.text}</span>
              </div>
              
              {/* Option Image */}
              {option.image && (
                  <div className="mt-3 ml-8">
                      <img src={option.image} alt={`Option ${index+1}`} className="max-w-full max-h-40 rounded shadow-sm" />
                  </div>
              )}
            </div>
          ))}
        </div>

        {/* Post-Test Explanation */}
        {isSubmitted && (currentQ.explanation || currentQ.explanationImage) && (
            <div className="mt-8 p-5 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-bold text-yellow-800 flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Explanation
                </h4>
                {currentQ.explanation && <p className="text-gray-700 whitespace-pre-wrap">{currentQ.explanation}</p>}
                {currentQ.explanationImage && (
                    <div className="mt-4">
                        <img src={currentQ.explanationImage} alt="Explanation" className="max-w-full max-h-64 rounded shadow-sm border" />
                    </div>
                )}
            </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6 border-t">
        <button 
          onClick={handlePrev} 
          disabled={currentQuestionIndex === 0}
          className={`px-6 py-2 rounded-md font-medium ${
            currentQuestionIndex === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          Previous
        </button>

        {!isSubmitted ? (
            currentQuestionIndex === questions.length - 1 ? (
            <button 
                onClick={handleSubmit} 
                className="px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 shadow-md"
            >
                Submit Test
            </button>
            ) : (
            <button 
                onClick={handleNext} 
                className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 shadow-md"
            >
                Next Question
            </button>
            )
        ) : (
            <button 
                onClick={handleNext} 
                disabled={currentQuestionIndex === questions.length - 1}
                className={`px-6 py-2 rounded-md font-medium ${
                    currentQuestionIndex === questions.length - 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                }`}
            >
                Next Review
            </button>
        )}
      </div>
    </div>
  );
};

export default TakeQuiz;
