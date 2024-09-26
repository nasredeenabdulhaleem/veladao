import React from 'react';

const CallToActionBanner = () => {
    return (
        <section className="bg-teal-600 text-white py-16">
            <div className="container mx-auto px-6 lg:px-20 text-center">
                {/* Compelling Message */}
                <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
                <p className="text-lg mb-8">
                    Start your own project or contribute to an existing one today and help bring dreams to life!
                </p>

                {/* Call to Action Button */}
                <a
                    href="#get-started"
                    className="bg-white text-teal-600 font-semibold py-3 px-8 rounded-full shadow-md hover:bg-teal-500 hover:text-white transition-colors duration-300"
                >
                    Get Started
                </a>
            </div>
        </section>
    );
};

export default CallToActionBanner;
