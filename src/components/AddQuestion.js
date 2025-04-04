// AddQuestion.js
import React, { useContext, useState } from 'react';
import noteContext from '../context/question/questionContext';

const AddQuestion = () => {
    const context = useContext(noteContext);
    const { addQuestion } = context; // ✅ Updated to lowercase 'a'

    const [note, setNote] = useState({
        question: '',
        answers: [
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false },
            { text: '', isCorrect: false }
        ]
    });

    const handleClick = (e) => {
        e.preventDefault();
        addQuestion(note.question, note.answers); // Pass question and answers separately
        setNote({
            question: '',
            answers: [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false }
            ]
        });
    };
    

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...note.answers];
        newAnswers[index].text = value;
        setNote({ ...note, answers: newAnswers });
    };

    const handleCorrectChange = (index) => {
        const newAnswers = note.answers.map((answer, i) => ({
            ...answer,
            isCorrect: i === index
        }));
        setNote({ ...note, answers: newAnswers });
    };

    return (
        <div className="container mx-auto my-8 p-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl max-w-3xl">
            <h2 className="text-3xl font-bold text-white mb-6">Add a Quiz Question</h2>
            <form className="space-y-6">
                <div>
                    <label htmlFor="question" className="block text-white font-medium mb-2">Question</label>
                    <input 
                        type="text" 
                        className="w-full p-3 border border-transparent rounded-lg bg-white text-gray-800 focus:outline-none focus:border-pink-500 shadow-sm"
                        id="question" 
                        name="question" 
                        value={note.question} 
                        onChange={onChange} 
                        placeholder="Enter your question here"
                        required 
                    />
                </div>

                {note.answers.map((answer, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-white shadow-sm">
                        <label htmlFor={`answer${index}`} className="block text-gray-700 mb-1">
                            Option {index + 1}
                        </label>
                        <input 
                            type="text" 
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                            id={`answer${index}`} 
                            value={answer.text} 
                            onChange={(e) => handleAnswerChange(index, e.target.value)} 
                            placeholder={`Option ${index + 1}`}
                            required 
                        />
                        <div className="flex items-center mt-2">
                            <input 
                                className="mr-2 h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded-full" 
                                type="radio" 
                                name="correctAnswer" 
                                id={`correct${index}`} 
                                checked={answer.isCorrect} 
                                onChange={() => handleCorrectChange(index)} 
                            />
                            <label htmlFor={`correct${index}`} className="text-gray-600">
                                Mark as Correct
                            </label>
                        </div>
                    </div>
                ))}

                <button 
                    type="submit" 
                    className="w-full bg-white text-purple-600 font-bold py-3 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
                    onClick={handleClick}
                >
                    Add Question
                </button>
            </form>
        </div>
    );
};

export default AddQuestion;
