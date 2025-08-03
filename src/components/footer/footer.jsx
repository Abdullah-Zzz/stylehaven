import React from "react";

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-8 pb-8 mt-8">
            {/* Footer Container */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Logo and Description */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-400 mb-4">StyleHaven</h1>
                    <p className="text-white">
                        Your trusted partner for the best products and services. We deliver quality
                        and satisfaction, always.
                    </p>
                </div>
                {/* Quick Links */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-400 mb-4 ">Quick Links</h2>
                    <ul className="space-y-2">
                        <li>
                            <a href="/" className="text-white  hover:text-purple-400 transition">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/about" className="text-white hover:text-purple-400 transition">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="/services" className=" text-white hover:text-purple-400 transition">
                                Services
                            </a>
                        </li>
                        <li>
                            <a href="/contact" className="text-white hover:text-purple-400 transition">
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-400 mb-4">Contact</h2>
                    <ul className="space-y-2">
                        <li>
                            <span className="font-bold text-white">Phone:</span> +1 234 567 890
                        </li>
                        <li>
                            <span className="font-bold text-white">Email:</span> support@example.com
                        </li>
                        <li>
                            <span className="font-bold text-white">Address:</span> 123 Main Street, City, Country
                        </li>
                    </ul>
                </div>
                {/* Social Media */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-400 mb-4">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            aria-label="Facebook"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path d="M22.675 0H1.325C.595 0 0 .592 0 1.319v21.362C0 23.406.594 24 1.325 24h11.495v-9.293H9.691v-3.62h3.129V8.413c0-3.097 1.892-4.788 4.659-4.788 1.325 0 2.464.1 2.794.144v3.24h-1.918c-1.503 0-1.795.713-1.795 1.762v2.312h3.586l-.467 3.62h-3.12V24h6.116c.729 0 1.324-.594 1.324-1.319V1.319C24 .593 23.405 0 22.675 0z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            aria-label="Twitter"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path d="M23.954 4.569c-.885.392-1.83.654-2.825.775 1.014-.608 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.897-.956-2.178-1.555-3.594-1.555-2.723 0-4.93 2.206-4.93 4.927 0 .386.045.763.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.423.725-.666 1.56-.666 2.475 0 1.71.87 3.217 2.188 4.099-.807-.025-1.566-.247-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.317 0-.625-.03-.927-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.395 0-.786-.023-1.17-.067C2.292 21.96 5.018 23 7.965 23c9.142 0 14.307-7.721 14.307-14.414 0-.22-.005-.436-.014-.653.982-.708 1.833-1.59 2.506-2.6z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            aria-label="Instagram"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.343 3.608 1.319.975.975 1.256 2.242 1.319 3.608.057 1.266.069 1.646.069 4.851s-.012 3.584-.07 4.851c-.062 1.366-.343 2.633-1.319 3.608-.975.975-2.242 1.256-3.608 1.319-1.266.057-1.646.069-4.851.069s-3.584-.012-4.851-.07c-1.366-.062-2.633-.343-3.608-1.319-.975-.975-1.256-2.242-1.319-3.608-.057-1.266-.069-1.646-.069-4.851s.012-3.584.07-4.851c.062-1.366.343-2.633 1.319-3.608.975-.975 2.242-1.256 3.608-1.319C8.416 2.175 8.796 2.163 12 2.163m0-2.163c-3.259 0-3.667.013-4.947.071-1.464.064-2.775.34-3.852 1.417C2.343 2.49 2.067 3.8 2.004 5.264c-.058 1.28-.071 1.688-.071 4.947s.013 3.667.071 4.947c.064 1.464.34 2.775 1.417 3.852 1.077 1.077 2.388 1.353 3.852 1.417 1.28.058 1.688.071 4.947.071s3.667-.013 4.947-.071c1.464-.064 2.775-.34 3.852-1.417 1.077-1.077 1.353-2.388 1.417-3.852.058-1.28.071-1.688.071-4.947s-.013-3.667-.071-4.947c-.064-1.464-.34-2.775-1.417-3.852C19.572 2.343 18.261 2.067 16.797 2.004 15.517 1.946 15.109 1.933 12 1.933s-3.667.013-4.947.071c-1.464.064-2.775.34-3.852 1.417-1.077 1.077-1.353 2.388-1.417 3.852-.058 1.28-.071 1.688-.071 4.947s.013 3.667.071 4.947c.064 1.464.34 2.775 1.417 3.852 1.077 1.077 2.388 1.353 3.852 1.417 1.28.058 1.688.071 4.947.071s3.667-.013 4.947-.071c1.464-.064 2.775-.34 3.852-1.417 1.077-1.077 1.353-2.388 1.417-3.852.058-1.28.071-1.688.071-4.947s-.013-3.667-.071-4.947c-.064-1.464-.34-2.775-1.417-3.852-1.077-1.077-2.388-1.353-3.852-1.417-1.28-.058-1.688-.071-4.947-.071zM12 5.838a6.162 6.162 0 1 0 6.163 6.162A6.162 6.162 0 0 0 12 5.838zm0 10.142a3.98 3.98 0 1 1 3.98-3.98 3.982 3.982 0 0 1-3.98 3.98zm6.406-11.845a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-8 text-center border-t border-gray-700 pt-4">
                <p className="text-gray-500">
                    © {new Date().getFullYear()} Logo. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
