import React, { useState } from 'react';

const EditLegalDocuments = ({ title, initialContent }) => {
    const [content, setContent] = useState(initialContent);

    const handleSave = () => {
        // Save the updated content to the database
        console.log('Updated Content:', content);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit {title}</h2>
            <textarea
                rows="15"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
            />
            <button onClick={handleSave} className="bg-teal-600 text-white px-4 py-2 rounded-lg mt-4">
                Save Changes
            </button>
        </div>
    );
};

export default EditLegalDocuments;
