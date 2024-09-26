
const MaintenanceMode = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">We’re Under Maintenance</h1>
                <p className="text-lg text-gray-600 mb-6">
                    Our platform is currently undergoing maintenance. Please check back later. We’ll be back soon!
                </p>
                <p className="text-gray-500">
                    For urgent inquiries, contact us at <a href="mailto:support@platform.com" className="text-teal-600">support@platform.com</a>
                </p>
            </div>
        </div>
    );
};

export default MaintenanceMode;
