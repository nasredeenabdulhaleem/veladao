import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faShare, faCopy } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import QRCode from 'react-qr-code';  // Use react-qr-code package
import logo from '../../assets/veladao-logo.png';  // Replace with your actual logo path

const FollowUS = () => {
    const twitterHandle = '@velada0';
    const twitterURL = 'https://x.com/velada0';
    const productName = 'Veladao';  // Replace with your actual product name

    const copyToClipboard = () => {
        navigator.clipboard.writeText(twitterURL);
        toast.success('Twitter link copied to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-teal-600 p-8 text-center relative">
                    {/* Product Logo */}
                    <div className="absolute top-4 left-4 bg-white rounded-full p-2 shadow-md">
                        <img
                            src={logo}  // Replace with your actual logo path
                            alt={`${productName} logo`}
                            className="w-8 h-8 object-contain"
                        />
                    </div>

                    <FontAwesomeIcon icon={faX} className="text-white text-5xl mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-white mb-2">Follow Us on X</h1>
                    <p className="text-teal-100">Stay updated with our latest news and updates</p>
                </div>

                <div className="p-8">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-white rounded-xl shadow-md">
                            <QRCode
                                value={twitterURL}
                                size={192}  // Adjust size as needed
                                fgColor="#0D9488"
                                bgColor="#FFFFFF"
                                className="rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="text-center mb-8">
                        <p className="text-gray-600 mb-2">Scan the QR code or click below</p>
                        <a
                            href={twitterURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl font-bold text-teal-600 hover:text-teal-700 transition-colors"
                        >
                            {twitterHandle}
                        </a>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={copyToClipboard}
                            className="flex-1 flex items-center justify-center gap-2 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors"
                        >
                            <FontAwesomeIcon icon={faCopy} />
                            <span>Copy Link</span>
                        </button>
                        <a
                            href={twitterURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            <FontAwesomeIcon icon={faShare} />
                            <span>Visit Profile</span>
                        </a>
                    </div>
                </div>

                <div className="border-t border-gray-100 p-4">
                    <p className="text-center text-gray-500 text-sm">
                        Follow {productName} for industry insights, company news, and more!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FollowUS;
