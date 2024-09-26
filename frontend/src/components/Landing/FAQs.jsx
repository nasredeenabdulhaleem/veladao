import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const FAQs = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    // Toggle the FAQ on click
    const toggleFAQ = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const faqData = [
        {
            question: "How do I start a crowdfunding campaign?",
            answer: "To start a campaign, sign up on our platform, click on 'Start a Campaign', and follow the prompts to set your campaign goals, description, and other details."
        },
        {
            question: "What are the platform fees?",
            answer: "Our platform charges a small fee on successful campaigns. You can view the detailed fee structure on the pricing page."
        },
        {
            question: "How can I contribute to a project?",
            answer: "You can contribute by clicking on the 'Contribute' button on any active project. You’ll be able to choose from multiple payment methods, including cryptocurrency."
        },
        {
            question: "How does milestone-based fund release work?",
            answer: "Funds are released in stages according to the milestones you set in your campaign. Once a milestone is reached, the corresponding funds will be disbursed."
        },
        {
            question: "How do I know if a project is verified?",
            answer: "All projects go through a verification process where documents are reviewed. Verified projects display a 'Verified' badge on their campaign page."
        }
    ];

    return (
        <section className="bg-gray-50 py-12 px-6 lg:px-20">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Frequently Asked Questions</h2>

                <div className="space-y-4">
                    {faqData.map((faq, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg">
                            {/* Question */}
                            <div
                                onClick={() => toggleFAQ(index)}
                                className="flex justify-between items-center cursor-pointer px-6 py-4 text-gray-800 hover:bg-gray-100 transition duration-200 ease-in-out"
                            >
                                <h3 className="text-lg font-semibold">{faq.question}</h3>
                                <FontAwesomeIcon
                                    icon={activeIndex === index ? faChevronUp : faChevronDown}
                                    className="text-gray-600"
                                />
                            </div>
                            {/* Answer */}
                            {activeIndex === index && (
                                <div className="px-6 py-4 text-gray-700 border-t border-gray-200">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQs;
