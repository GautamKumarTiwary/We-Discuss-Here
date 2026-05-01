import React, { useContext, useState } from 'react';
import noteContext from '../context/question/questionContext';
import { convertDriveLink } from '../utils/driveLinkConverter';

const AddQuestion = ({ testSeriesId }) => {
    const context = useContext(noteContext);
    const { addQuestion } = context;

    const [note, setNote] = useState({
        question: '',
        questionImage: '',
        explanation: '',
        explanationImage: '',
        answers: [
            { text: '', image: '', isCorrect: true },
            { text: '', image: '', isCorrect: false },
            { text: '', image: '', isCorrect: false },
            { text: '', image: '', isCorrect: false },
        ]
    });

    const handleAnswerChange = (index, field, value) => {
        const newAnswers = [...note.answers];
        newAnswers[index][field] = value;
        setNote({ ...note, answers: newAnswers });
    };

    const handleCorrectChange = (index) => {
        const newAnswers = note.answers.map((answer, i) => ({
            ...answer,
            isCorrect: i === index
        }));
        setNote({ ...note, answers: newAnswers });
    };

    const handleClick = (e) => {
        e.preventDefault();
        
        // Convert any drive links before submitting
        const formattedQuestionData = {
            question: note.question,
            questionImage: convertDriveLink(note.questionImage),
            explanation: note.explanation,
            explanationImage: convertDriveLink(note.explanationImage),
            testSeriesId: testSeriesId,
            answers: note.answers.map(a => ({
                ...a,
                image: convertDriveLink(a.image)
            }))
        };

        addQuestion(formattedQuestionData);
        
        setNote({
            question: '',
            questionImage: '',
            explanation: '',
            explanationImage: '',
            answers: [
                { text: '', image: '', isCorrect: true },
                { text: '', image: '', isCorrect: false },
                { text: '', image: '', isCorrect: false },
                { text: '', image: '', isCorrect: false },
            ]
        });
        alert('Question added successfully!');
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 overflow-hidden">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Add New Question</h3>
            <form className="space-y-6">
                <div>
                    <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">
                        Question Text <span className="text-red-500">*</span>
                    </label>
                    <textarea 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                        id="question" 
                        name="question" 
                        value={note.question} 
                        onChange={onChange} 
                        rows="3"
                        required 
                        placeholder="Enter the question here..."
                    />
                </div>

                <div>
                    <label htmlFor="questionImage" className="block text-sm font-medium text-gray-700 mb-1">
                        Question Image URL (Optional)
                    </label>
                    <input 
                        type="url"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm" 
                        id="questionImage" 
                        name="questionImage" 
                        value={note.questionImage} 
                        onChange={onChange} 
                        placeholder="e.g., https://drive.google.com/... or https://imgur.com/..."
                    />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Answer Options</label>
                    <p className="text-xs text-gray-500 mb-4">Provide 4 options and select exactly one correct answer.</p>
                    
                    <div className="space-y-4">
                        {note.answers.map((answer, index) => (
                            <div key={index} className={`p-4 rounded-lg border ${answer.isCorrect ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-white'}`}>
                                <div className="flex items-start gap-4">
                                    <div className="pt-2">
                                        <input 
                                            type="radio" 
                                            name="correctAnswer" 
                                            checked={answer.isCorrect} 
                                            onChange={() => handleCorrectChange(index)} 
                                            className="w-5 h-5 text-green-600 focus:ring-green-500 cursor-pointer"
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <input 
                                            type="text" 
                                            value={answer.text} 
                                            onChange={(e) => handleAnswerChange(index, 'text', e.target.value)} 
                                            placeholder={`Option ${index + 1} text`}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                                            required 
                                        />
                                        <input 
                                            type="url" 
                                            value={answer.image} 
                                            onChange={(e) => handleAnswerChange(index, 'image', e.target.value)} 
                                            placeholder={`Option ${index + 1} Image URL (Optional)`}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t pt-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Explanation (Post-Test Review)</h4>
                    
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="explanation" className="block text-sm font-medium text-gray-700 mb-1">
                                Explanation Text (Optional)
                            </label>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                                id="explanation" 
                                name="explanation" 
                                value={note.explanation} 
                                onChange={onChange} 
                                rows="2"
                                placeholder="Explain why the correct answer is correct..."
                            />
                        </div>
                        <div>
                            <label htmlFor="explanationImage" className="block text-sm font-medium text-gray-700 mb-1">
                                Explanation Image URL (Optional)
                            </label>
                            <input 
                                type="url"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm" 
                                id="explanationImage" 
                                name="explanationImage" 
                                value={note.explanationImage} 
                                onChange={onChange} 
                                placeholder="Image link for the explanation"
                            />
                        </div>
                    </div>
                </div>

                <button 
                    disabled={note.question.length < 5 || note.answers.some(a => !a.text.trim())} 
                    type="submit" 
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed text-lg mt-4" 
                    onClick={handleClick}
                >
                    Add Question to Database
                </button>
            </form>
        </div>
    );
};

export default AddQuestion;
