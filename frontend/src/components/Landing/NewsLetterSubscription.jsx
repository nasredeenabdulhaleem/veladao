import React from 'react';

const NewsletterSubscription = () => {
    return (
        <section className="bg-gray-100 py-10">
            <div className="container mx-auto px-6 lg:px-20 text-center">
                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Stay Updated!</h2>

                {/* Description */}
                <p className="text-lg text-gray-600 mb-6">
                    Subscribe to our newsletter to receive the latest news and updates about our projects.
                </p>

                {/* Subscription Form */}
                <div className="flex justify-center items-center">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full md:w-1/2 lg:w-1/3 px-4 py-3 rounded-l-full border-2 border-teal-600 focus:outline-none focus:border-teal-700"
                    />
                    <button className="bg-teal-600 text-white font-semibold py-3 px-6 rounded-r-full hover:bg-teal-700 transition duration-300">
                        Subscribe
                    </button>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSubscription;
