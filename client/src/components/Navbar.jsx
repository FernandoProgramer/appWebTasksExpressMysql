import { Link } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-indigo-600 text-white shadow-md mb-11">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <h1 className="text-xl font-bold">React MySQL ExpressJs</h1>

                    {/* Hamburger Menu (Mobile) */}
                    <div className="flex lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white hover:text-indigo-200 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Links */}
                    <ul
                        className={`${
                            isMenuOpen
                                ? "block bg-white text-black rounded-md p-4 shadow-lg absolute top-16 left-0 w-full z-10"
                                : "hidden"
                        } lg:flex space-y-4 lg:space-y-0 lg:space-x-6 lg:items-center`}
                    >
                        <li>
                            <Link
                                to="/"
                                className="block hover:text-indigo-600 transition duration-200"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/newTask"
                                className="block hover:text-indigo-600 transition duration-200"
                            >
                                Crear tarea
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/register"
                                className="block hover:text-indigo-600 transition duration-200"
                            >
                                Registrarme
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
