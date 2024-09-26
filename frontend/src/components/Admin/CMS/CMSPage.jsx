import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFileAlt, faQuestionCircle, faBullhorn, faComment, faGavel } from '@fortawesome/free-solid-svg-icons';

const CMSMenu = () => {
    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">CMS Management</h2>

            {/* Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* Homepage Editor */}
                <Link to="/admin/cms/homepage" className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
                    <FontAwesomeIcon icon={faHome} className="text-teal-600 text-5xl mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Homepage Editor</h3>
                    <p className="text-gray-600">Edit hero section, featured projects, and homepage content.</p>
                </Link>

                {/* FAQs Management */}
                <Link to="/admin/cms/faqs" className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
                    <FontAwesomeIcon icon={faQuestionCircle} className="text-teal-600 text-5xl mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Manage FAQs</h3>
                    <p className="text-gray-600">Edit, add, or remove frequently asked questions.</p>
                </Link>

                {/* Legal Documents */}
                <Link to="/admin/cms/legal" className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
                    <FontAwesomeIcon icon={faGavel} className="text-teal-600 text-5xl mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Terms & Conditions</h3>
                    <p className="text-gray-600">Update Terms & Conditions, Privacy Policy, and other legal docs.</p>
                </Link>

                {/* Reviews Management */}
                <Link to="/admin/cms/reviews" className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
                    <FontAwesomeIcon icon={faComment} className="text-teal-600 text-5xl mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Manage Reviews</h3>
                    <p className="text-gray-600">Approve, reject, or flag user reviews and testimonials.</p>
                </Link>

                {/* Announcements Management */}
                <Link to="/admin/cms/announcements" className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
                    <FontAwesomeIcon icon={faBullhorn} className="text-teal-600 text-5xl mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Manage Announcements</h3>
                    <p className="text-gray-600">Post and manage important updates and announcements.</p>
                </Link>

                {/* Newsletter and Marketing */}
                <Link to="/admin/cms/newsletter" className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-shadow duration-300">
                    <FontAwesomeIcon icon={faFileAlt} className="text-teal-600 text-5xl mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Newsletter & Marketing</h3>
                    <p className="text-gray-600">Send out newsletters and manage email marketing campaigns.</p>
                </Link>

            </div>
        </div>
    );
};



const CMSPage = () => {
    return (
        <div className="container mx-auto px-6 lg:px-20 py-10">
            <CMSMenu />
        </div>
    );
};

export default CMSPage;
