import React, { useState } from 'react';

const FAQModal = ({ isOpen, onClose, onSubmit, existingFAQ }) => {
    // State for FAQ inputs
    const [question, setQuestion] = useState(existingFAQ ? existingFAQ.question : '');
    const [answer, setAnswer] = useState(existingFAQ ? existingFAQ.answer : '');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!question || !answer) {
            alert("Please fill in both fields.");
            return;
        }

        const faqData = {
            question,
            answer,
        };

        // Call the onSubmit callback with the FAQ data
        onSubmit(faqData);

        // Close the modal after submission
        onClose();
    };

    if (!isOpen) return null; // Don't render modal if it's not open

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {existingFAQ ? "Edit FAQ" : "Add New FAQ"}
                </h2>

                <form onSubmit={handleSubmit}>
                    {/* FAQ Question */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Question</label>
                        <input
                            type="text"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="Enter FAQ question"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                            required
                        />
                    </div>

                    {/* FAQ Answer */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Answer</label>
                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Enter FAQ answer"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-teal-500"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* Modal Action Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-100 transition duration-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition duration-200"
                        >
                            {existingFAQ ? "Update" : "Add"} FAQ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FAQModal;
