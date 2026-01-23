import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
  ];

  return (
    <nav className="bg-primary border-white/10 flex items-center justify-between px-8 py-4 border-b sticky top-0 z-50">
      
      {/* LEFT */}
      <div className="flex items-center gap-12">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-buttonColor rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-primary rounded-full" />
          </div>
          <span className="text-buttonColor text-2xl font-black tracking-tighter">
            TASKLY
          </span>
        </Link>

        {/* SECTION LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-text-muted hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* Sign In */}
        <Link
          to="/login"
          className="text-white hover:text-buttonColor text-sm font-bold px-4 py-2 transition-colors"
        >
          Sign In
        </Link>

        {/* Get Started */}
        <Link
          to="/signup"
          className="bg-buttonColor hover:bg-buttonHover text-primary px-6 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-lg shadow-buttonColor/10"
        >
          Get Started — Free
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
