import React, { useContext, useEffect } from 'react';
import questionContext from '../context/question/questionContext';

const AdminQuestionList = ({ testSeriesId }) => {
    const context = useContext(questionContext);
    const { questions, getQuestions } = context;

    useEffect(() => {
        if (testSeriesId) {
            getQuestions(testSeriesId);
        }
        // eslint-disable-next-line
    }, [testSeriesId]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this question?")) {
            try {
                const response = await fetch(`http://localhost:5000/api/quiz/questions/${id}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    getQuestions(testSeriesId); // Refresh list after delete
                    alert("Question deleted successfully!");
                } else {
                    alert("Failed to delete question.");
                }
            } catch (error) {
                console.error("Error deleting question:", error);
            }
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 overflow-hidden">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Manage Questions</h3>
            
            {questions.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No questions found in the database.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correct Answer</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {questions.map((q) => {
                                const correctAnswer = q.answers.find(a => a.isCorrect);
                                return (
                                    <tr key={q._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-md truncate">
                                            {q.question}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                                            {correctAnswer ? correctAnswer.text : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button 
                                                onClick={() => handleDelete(q._id)}
                                                className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminQuestionList;
