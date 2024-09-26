// import React from 'react';

// const FeaturedProjectsSection = () => {
//     // Example data for projects
//     const projects = [
//         {
//             id: 1,
//             title: "Renewable Energy Initiative",
//             description: "Empowering communities with sustainable energy solutions.",
//             imageUrl: "path/to/energy-project.jpg",
//             fundsRaised: 5000,
//             fundingGoal: 10000,
//             daysLeft: 20,
//             tags: ["Technology", "Sustainability", "Energy"],
//         },
//         {
//             id: 2,
//             title: "Clean Water for All",
//             description: "Providing access to clean and safe drinking water.",
//             imageUrl: "path/to/water-project.jpg",
//             fundsRaised: 7500,
//             fundingGoal: 12000,
//             daysLeft: 15,
//             tags: ["Health", "Community", "Water"],
//         },
//         {
//             id: 3,
//             title: "Education for Everyone",
//             description: "Improving education in underserved regions.",
//             imageUrl: "path/to/education-project.jpg",
//             fundsRaised: 8500,
//             fundingGoal: 15000,
//             daysLeft: 30,
//             tags: ["Education", "Development", "Youth"],
//         },
//     ];

//     return (
//         <section className="bg-gray-50 py-10">
//             <div className="container mx-auto px-6 lg:px-20">
//                 {/* Section Title */}
//                 <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Projects</h2>

//                 {/* Projects Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {projects.map((project) => (
//                         <div key={project.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
//                             {/* Project Image */}
//                             <img src={project.imageUrl} alt={project.title} className="w-full h-40 object-cover rounded-t-lg mb-4" />

//                             {/* Project Title */}
//                             <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>

//                             {/* Brief Description */}
//                             <p className="text-gray-600 mb-4">{project.description}</p>

//                             {/* Progress Bar */}
//                             <div className="relative pt-1 mb-4">
//                                 <div className="overflow-hidden h-4 mb-1 text-xs flex rounded bg-teal-200">
//                                     <div
//                                         style={{ width: `${(project.fundsRaised / project.fundingGoal) * 100}%` }}
//                                         className="flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
//                                     ></div>
//                                 </div>
//                                 <span className="text-sm text-gray-500">{`${Math.round(
//                                     (project.fundsRaised / project.fundingGoal) * 100
//                                 )}% funded`}</span>
//                             </div>

//                             {/* Funding Details */}
//                             <div className="flex justify-between items-center mb-4">
//                                 <span className="text-sm text-gray-500">Raised: <span className="font-semibold">${project.fundsRaised}</span></span>
//                                 <span className="text-sm text-gray-500">Goal: <span className="font-semibold">${project.fundingGoal}</span></span>
//                                 <span className="text-sm text-gray-500">Days Left: <span className="font-semibold">{project.daysLeft}</span></span>
//                             </div>

//                             {/* Tags */}
//                             <div className="mb-4">
//                                 {project.tags.map((tag, index) => (
//                                     <span key={index} className="inline-block bg-teal-100 text-teal-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
//                                         {tag}
//                                     </span>
//                                 ))}
//                             </div>

//                             {/* View Project Button */}
//                             <a href={`/projects/${project.id}`} className="block bg-teal-600 text-white text-center py-2 rounded-lg hover:bg-teal-700 transition duration-200">
//                                 View Project
//                             </a>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default FeaturedProjectsSection;

import React from 'react';

// Sample data for images and tags
const sampleImage = 'https://via.placeholder.com/300'; // Placeholder image URL
const sampleTags = ['Technology', 'Health', 'Education']; // Placeholder tags

const FeaturedProjectsSection = () => {
    // Example data for projects, replace this with props or state in real usage
    const projects = [
        {
            id: 6,
            title: 'Project Alpha',
            description: 'Description for Project Alpha',
            fundingGoal: 10000,
            currentFunding: 5000,
            status: 'active',
            endDate: '2024-09-30T12:51:05.000Z',
            ownerId: 1,
            createdAt: '2024-08-31T12:51:05.000Z',
            updatedAt: '2024-08-31T12:51:05.000Z',
            milestones: [
                {
                    id: 3,
                    description: 'Milestone 1 for Project Alpha',
                    dueDate: '2024-09-30T12:52:43.000Z',
                    projectId: 6,
                    status: 'pending',
                    createdAt: '2024-08-31T12:52:43.000Z',
                    updatedAt: '2024-08-31T12:52:43.000Z',
                },
            ],
            contributions: [
                {
                    id: 1,
                    projectId: 6,
                    ref: 'CONTRIB001',
                    userId: 1,
                    amount: 100,
                    createdAt: '2024-08-31T12:52:09.000Z',
                    updatedAt: '2024-08-31T12:52:09.000Z',
                },
                {
                    id: 3,
                    projectId: 6,
                    ref: 'CONTRIB001',
                    userId: 1,
                    amount: 100,
                    createdAt: '2024-08-31T12:52:43.000Z',
                    updatedAt: '2024-08-31T12:52:43.000Z',
                },
            ],
            reviews: [
                {
                    id: 1,
                    projectId: 6,
                    userId: 1,
                    rating: 5,
                    comment: 'Excellent project!',
                    createdAt: '2024-08-31T12:52:43.000Z',
                    updatedAt: '2024-08-31T12:52:43.000Z',
                },
            ],
            owner: {
                id: 1,
                username: 'nasredeen',
                email: 'nabdulhaleem09@gmail.com',
                password: '$2b$10$8bjj/L7LdRueXbJZMjGDQ.TO4s4ShaBzcDboS6G4Wi25sCB7vzgwC',
                role: 'user',
                createdAt: '2024-08-31T12:50:22.000Z',
                updatedAt: '2024-08-31T12:50:22.000Z',
            },
        },
        // More projects...
    ];

    return (
        <section className="bg-gray-50 py-10">
            <div className="container mx-auto px-6 lg:px-20">
                {/* Section Title */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Projects</h2>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                            {/* Project Image */}
                            <img
                                src={sampleImage} // Replace this with project.image when data is available
                                alt={project.title}
                                className="w-full h-40 object-cover rounded-t-lg mb-4"
                            />

                            {/* Project Title */}
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>

                            {/* Brief Description */}
                            <p className="text-gray-600 mb-4">{project.description}</p>

                            {/* Progress Bar */}
                            <div className="relative pt-1 mb-4">
                                <div className="overflow-hidden h-4 mb-1 text-xs flex rounded bg-teal-200">
                                    <div
                                        style={{ width: `${(project.currentFunding / project.fundingGoal) * 100}%` }}
                                        className="flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"
                                    ></div>
                                </div>
                                <span className="text-sm text-gray-500">{`${Math.round(
                                    (project.currentFunding / project.fundingGoal) * 100
                                )}% funded`}</span>
                            </div>

                            {/* Funding Details */}
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm text-gray-500">
                                    Raised: <span className="font-semibold">${project.currentFunding}</span>
                                </span>
                                <span className="text-sm text-gray-500">
                                    Goal: <span className="font-semibold">${project.fundingGoal}</span>
                                </span>
                                <span className="text-sm text-gray-500">
                                    Days Left: <span className="font-semibold">{Math.ceil((new Date(project.endDate) - new Date()) / (1000 * 60 * 60 * 24))}</span>
                                </span>
                            </div>

                            {/* Tags */}
                            <div className="mb-4">
                                {sampleTags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-block bg-teal-100 text-teal-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* View Project Button */}
                            <a
                                href={`/projects/${project.id}`}
                                className="block bg-teal-600 text-white text-center py-2 rounded-lg hover:bg-teal-700 transition duration-200"
                            >
                                View Project
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjectsSection;
