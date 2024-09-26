import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from '../../redux/actions/projectActions';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import logo from '../../assets/veladao-logo.png'

const Header = () => {
    const { projects } = useSelector((state) => state.project);
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjects());
    }, [dispatch]);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const dashboardUrl = () => {

        if (user.role === 'admin') {
            return "/admin"
        }
        return "/dashboard"
    }
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-white shadow-md fixed w-full z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl flex flex-row font-bold text-teal-600">
                    <a href="/" className="flex items-center space-x-2">
                        <img src={logo} alt="Veladao Logo" className="h-8 w-8" />
                        <span>Veladao</span>
                    </a>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-6 items-center">
                    <a href="/" className="text-gray-600 hover:text-teal-600">Home</a>
                    <a href="/projects" className="text-gray-600 hover:text-teal-600">Projects</a>
                    <a href="/about" className="text-gray-600 whitespace-nowrap hover:text-teal-600">About Us</a>
                    <a href="/how-it-works" className="text-gray-600 whitespace-nowrap hover:text-teal-600">How It Works</a>
                    <a href="/faqs" className="text-gray-600 hover:text-teal-600">FAQs</a>
                    <a href="/contact" className="text-gray-600 hover:text-teal-600">Contact</a>
                    <div className="relative">

                        < SearchBar projects={projects} />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-teal-600">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>

                    {isAuthenticated ? (
                        <Link to={dashboardUrl()} className="bg-teal-600 text-white px-4 py-2 rounded-lg whitespace-nowrap hover:bg-teal-700 transition duration-200">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link to="/register" className="bg-teal-600 text-white px-4 py-2 rounded-lg whitespace-nowrap hover:bg-teal-700 transition duration-200">
                                Sign Up
                            </Link>
                            <Link to="/login" className="bg-teal-100 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-200 transition duration-200">
                                Login
                            </Link>
                        </>
                    )}
                </nav>

                {/* Mobile Hamburger Menu */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-teal-600">
                        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden pt-16 bg-white shadow-lg fixed top-0 right-0 w-2/3 h-full z-40 p-6">
                    <button onClick={toggleMenu} className="absolute top-4 right-4 text-teal-600">
                        <FontAwesomeIcon icon={faTimes} className="h-6 w-6" />
                    </button>
                    <nav className="space-y-4">
                        <a href="/" className="block text-gray-600 hover:text-teal-600">Home</a>
                        <a href="/projects" className="block text-gray-600 hover:text-teal-600">Projects</a>
                        <a href="/about" className="block text-gray-600 hover:text-teal-600">About Us</a>
                        <a href="/how-it-works" className="block text-gray-600 hover:text-teal-600">How It Works</a>
                        <a href="/faqs" className="block text-gray-600 hover:text-teal-600">FAQs</a>
                        <a href="/contact" className="block text-gray-600 hover:text-teal-600">Contact</a>
                        <div className="relative">
                            < SearchBar projects={projects} />
                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-teal-600">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                        {
                            isAuthenticated ? (
                                <Link to={dashboardUrl()} className="block bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-200 text-center">Dashboard</Link>

                            ) :
                                (
                                    <>
                                        <Link to="/register" className="block bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-200 text-center">Sign Up</Link>
                                        <Link to="/login" className="block bg-teal-100 text-teal-600 px-4 py-2 rounded-lg hover:bg-teal-200 transition duration-200 text-center">Login</Link>
                                    </>)
                        }
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
