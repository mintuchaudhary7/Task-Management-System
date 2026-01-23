import React from "react";

const Footer = () => {
    return (
        <footer className="bg-primary text-text-light pt-16 pb-8 relative">
            <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Branding */}
                <div>
                    <h2 className="text-2xl font-extrabold mb-4">Taskly</h2>
                    <p className="text-text-light/70 leading-relaxed">
                        Minimalist task management system for high-performance teams.
                        Track progress, manage deadlines, and hit your goals efficiently.
                    </p>
                </div>

                {/* Product Links */}
                <div>
                    <h3 className="text-lg font-bold mb-4">Product</h3>
                    <ul className="space-y-2 text-text-light/70">
                        <li className="hover:text-buttonColor transition cursor-pointer">Features</li>
                        <li className="hover:text-buttonColor transition cursor-pointer">Pricing</li>
                        <li className="hover:text-buttonColor transition cursor-pointer">Integrations</li>
                        <li className="hover:text-buttonColor transition cursor-pointer">Updates</li>
                    </ul>
                </div>

                {/* Company Links */}
                <div>
                    <h3 className="text-lg font-bold mb-4">Company</h3>
                    <ul className="space-y-2 text-text-light/70">
                        <li className="hover:text-buttonColor transition cursor-pointer">About Us</li>
                        <li className="hover:text-buttonColor transition cursor-pointer">Careers</li>
                        <li className="hover:text-buttonColor transition cursor-pointer">Blog</li>
                        <li className="hover:text-buttonColor transition cursor-pointer">Contact</li>
                    </ul>
                </div>

                {/* Social / Contact */}
                <div>
                    <h3 className="text-lg font-bold mb-4">Connect</h3>
                    <ul className="flex gap-4">
                        {/* Placeholder for social icons */}
                        <li className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-buttonColor/20 transition">
                            {/* Icon: Facebook */}
                        </li>
                        <li className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-buttonColor/20 transition">
                            {/* Icon: Twitter */}
                        </li>
                        <li className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-buttonColor/20 transition">
                            {/* Icon: LinkedIn */}
                        </li>
                        <li className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-buttonColor/20 transition">
                            {/* Icon: Instagram */}
                        </li>
                    </ul>

                    <p className="text-text-light/50 text-sm mt-6">
                        © {new Date().getFullYear()} Taskly. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
