import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10">
            <div className="container mx-auto px-6 lg:px-20">
                {/* Footer Content */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    {/* Quick Links */}
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="hover:text-teal-500 transition-colors duration-300">About Us</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-teal-500 transition-colors duration-300">Contact</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-teal-500 transition-colors duration-300">Privacy Policy</a>
                            </li>
                            <li>
                                <Link to="terms-and-conditions" className="hover:text-teal-500 transition-colors duration-300">Terms of Service</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Icons */}
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-lg font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-white hover:text-teal-500 transition-colors duration-300">
                                <FontAwesomeIcon icon={faFacebook} size="2x" />
                            </a>
                            <a href="#" className="text-white hover:text-teal-500 transition-colors duration-300">
                                <FontAwesomeIcon icon={faTwitter} size="2x" />
                            </a>
                            <a href="#" className="text-white hover:text-teal-500 transition-colors duration-300">
                                <FontAwesomeIcon icon={faInstagram} size="2x" />
                            </a>
                            <a href="#" className="text-white hover:text-teal-500 transition-colors duration-300">
                                <FontAwesomeIcon icon={faLinkedin} size="2x" />
                            </a>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mb-6 md:mb-0">
                        <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                        <p>Email: <a href="mailto:info@example.com" className="hover:text-teal-500 transition-colors duration-300">info@example.com</a></p>
                        <p>Phone: <a href="tel:+1234567890" className="hover:text-teal-500 transition-colors duration-300">+123 456 7890</a></p>
                        <p>Address: 123 Main St, Anytown, USA</p>
                    </div>

                    {/* Newsletter Signup */}
                    <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-bold mb-4">Newsletter Signup</h3>
                        <form>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-2 rounded-l-full text-black border-none focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="bg-teal-600 text-white px-6 py-2 rounded-r-full hover:bg-teal-700 transition-colors duration-300"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="text-center pt-6 border-t border-gray-700">
                    <p className="text-sm">© 2024 Crowdfunding Platform. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
