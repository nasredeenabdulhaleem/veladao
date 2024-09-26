import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-teal-400 to-teal-600 text-white py-20 lg:py-32">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('src/assets/hero-banner.png')" }}></div>

      {/* Overlay */}
      <div className="relative z-10 container mx-auto px-6 lg:px-20 flex flex-col items-center">
        {/* Main Headline */}
        <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-center">
          Fund Your Passion. Make a Difference.
        </h1>

        {/* Subheadline */}
        <p className="text-lg lg:text-xl mb-8 text-center max-w-2xl">
          Join our community and help bring innovative projects to life. Explore or start a campaign today!
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Primary Button */}
          <a href="/projects" className="bg-white text-teal-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition duration-200">
            Explore Projects
          </a>

          {/* Secondary Button */}
          <a href="/start-campaign" className="bg-teal-800 text-white font-semibold py-3 px-6 rounded-full hover:bg-teal-900 transition duration-200">
            Start a Campaign
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
