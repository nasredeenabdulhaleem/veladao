// import React from 'react';
// import { motion } from 'framer-motion';

// const testimonials = [
//     {
//         quote: "This platform has revolutionized how I fund my projects. The process is seamless and effective.",
//         name: "Jane Doe",
//         role: "Entrepreneur",
//         photo: "/path/to/jane.jpg"
//     },
//     {
//         quote: "An incredible tool for bringing innovative ideas to life. Highly recommend it!",
//         name: "John Smith",
//         role: "Tech Enthusiast",
//         photo: "/path/to/john.jpg"
//     },
//     {
//         quote: "The user experience is top-notch, and the community support is outstanding.",
//         name: "Alice Johnson",
//         role: "Investor",
//         photo: "/path/to/alice.jpg"
//     }
// ];

// const TestimonialSection = () => {
//     return (
//         <section className="py-12 bg-gray-100">
//             <div className="container mx-auto px-6">
//                 <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What Our Users Say</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                     {testimonials.map((testimonial, index) => (
//                         <motion.div
//                             key={index}
//                             className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center"
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.5, delay: index * 0.2 }}
//                         >
//                             <img
//                                 src={testimonial.photo}
//                                 alt={testimonial.name}
//                                 className="w-24 h-24 rounded-full mb-4 object-cover"
//                             />
//                             <blockquote className="text-gray-600 mb-4">
//                                 <p className="text-lg italic">"{testimonial.quote}"</p>
//                             </blockquote>
//                             <div className="text-center">
//                                 <p className="text-xl font-semibold text-gray-800">{testimonial.name}</p>
//                                 <p className="text-gray-600">{testimonial.role}</p>
//                             </div>
//                         </motion.div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default TestimonialSection;

import React from 'react';

const TestimonialsSection = () => {
    // Sample data for testimonials
    const testimonials = [
        {
            id: 1,
            quote: "This platform helped me fund my dream project! The support from the community was amazing.",
            name: "John Doe",
            role: "Entrepreneur",
            photoUrl: "https://via.placeholder.com/150", // Placeholder image URL
        },
        {
            id: 2,
            quote: "As a contributor, I love seeing my donations make a real impact. It's incredibly rewarding!",
            name: "Jane Smith",
            role: "Philanthropist",
            photoUrl: "https://via.placeholder.com/150", // Placeholder image URL
        },
        {
            id: 3,
            quote: "The process of starting a campaign was seamless. I received the funds quickly and easily.",
            name: "Alex Johnson",
            role: "Campaign Owner",
            photoUrl: "https://via.placeholder.com/150", // Placeholder image URL
        },
    ];

    return (
        <section className="bg-white py-10">
            <div className="container mx-auto px-6 lg:px-20">
                {/* Section Title */}
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">What Our Users Say</h2>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                        >
                            {/* User Photo */}
                            <div className="flex justify-center mb-4">
                                <img
                                    src={testimonial.photoUrl}
                                    alt={testimonial.name}
                                    className="w-20 h-20 object-cover rounded-full border-2 border-teal-600"
                                />
                            </div>

                            {/* Quote */}
                            <p className="text-center text-gray-600 italic mb-4">"{testimonial.quote}"</p>

                            {/* User Name and Role */}
                            <div className="text-center">
                                <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                                <p className="text-sm text-gray-500">{testimonial.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
