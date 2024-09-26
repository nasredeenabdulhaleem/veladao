import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faProjectDiagram, faUsers } from '@fortawesome/free-solid-svg-icons';

const StatisticsAndImpactSection = () => {
    // Sample data for statistics
    const statistics = [
        {
            id: 1,
            icon: faDollarSign,
            title: 'Total Amount Raised',
            value: '$1,000,000',
        },
        {
            id: 2,
            icon: faProjectDiagram,
            title: 'Projects Funded',
            value: '150',
        },
        {
            id: 3,
            icon: faUsers,
            title: 'Contributors',
            value: '3,500',
        },
    ];

    return (
        <section className="bg-teal-600 py-10 text-white">
            <div className="container mx-auto px-6 lg:px-20">
                {/* Section Title */}
                <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {statistics.map((stat) => (
                        <div
                            key={stat.id}
                            className="bg-teal-500 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 text-center"
                        >
                            {/* Icon */}
                            <div className="text-5xl mb-4">
                                <FontAwesomeIcon icon={stat.icon} />
                            </div>

                            {/* Statistic Value */}
                            <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>

                            {/* Statistic Title */}
                            <p className="text-lg">{stat.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatisticsAndImpactSection;
