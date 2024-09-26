import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faHandHoldingHeart, faRocket } from '@fortawesome/free-solid-svg-icons';

const HowItWorksSection = () => {
    // Sample data for the steps
    const steps = [
        {
            id: 1,
            icon: faBullhorn,
            title: 'Create Your Campaign',
            description: 'Sign up and create a campaign. Share your story and set your fundraising goal.',
        },
        {
            id: 2,
            icon: faHandHoldingHeart,
            title: 'Share with Your Network',
            description: 'Promote your campaign through social media, email, and word of mouth to gain support.',
        },
        {
            id: 3,
            icon: faRocket,
            title: 'Reach Your Goal',
            description: 'Collect donations and reach your goal. Withdraw funds and make a difference!',
        },
    ];

    return (
        <section className="bg-gray-100 py-10">
            <div className="container mx-auto px-6 lg:px-20">
                {/* Section Title */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">How It Works</h2>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step) => (
                        <div key={step.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-center">
                            {/* Icon */}
                            <div className="text-teal-600 text-4xl mb-4">
                                <FontAwesomeIcon icon={step.icon} />
                            </div>

                            {/* Step Title */}
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>

                            {/* Description */}
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
