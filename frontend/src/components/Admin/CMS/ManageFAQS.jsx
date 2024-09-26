import React, { useState } from 'react';
import FAQModal from './FAQModal';

const ManageFAQS = () => {
    const [faqs, setFaqs] = useState([
        { id: 1, question: 'How does crowdfunding work?', answer: 'Crowdfunding allows you to...' },
        { id: 2, question: 'What payment methods are accepted?', answer: 'We accept credit cards...' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editFaq, setEditFaq] = useState(null);

    const openModal = (faq) => {
        setEditFaq(faq);
        setIsModalOpen(true);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Manage FAQs</h2>
                <button onClick={() => openModal(null)} className="bg-teal-600 text-white px-4 py-2 rounded-lg">Add FAQ</button>
            </div>
            <ul>
                {faqs.map((faq) => (
                    <li key={faq.id} className="mb-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{faq.question}</h3>
                                <p className="text-gray-600">{faq.answer}</p>
                            </div>
                            <button onClick={() => openModal(faq)} className="text-blue-500 hover:underline">Edit</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* FAQ Modal */}
            <FAQModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} faq={editFaq} />
        </div>
    );
};

export default ManageFAQS;
