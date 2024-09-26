import React, { useState } from 'react';

const EditHomePage = () => {
    const [headline, setHeadline] = useState('Fund Your Passion. Make a Difference.');
    const [subheading, setSubheading] = useState('Join us in supporting the best crowdfunding campaigns.');
    const [backgroundImage, setBackgroundImage] = useState('');

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => setBackgroundImage(reader.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit the updated data
        console.log({ headline, subheading, backgroundImage });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Hero Section</h2>
            <form onSubmit={handleSubmit}>
                {/* Headline */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Headline</label>
                    <input
                        type="text"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                {/* Subheading */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Subheading</label>
                    <input
                        type="text"
                        value={subheading}
                        onChange={(e) => setSubheading(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                {/* Background Image */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Background Image</label>
                    <input type="file" onChange={handleImageUpload} className="w-full" />
                    {backgroundImage && (
                        <img src={backgroundImage} alt="Background Preview" className="mt-4 rounded-lg shadow-md" />
                    )}
                </div>
                {/* Submit */}
                <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded-lg">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditHomePage;
