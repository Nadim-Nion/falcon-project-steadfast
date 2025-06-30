import React, { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { BsCart } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaBox, FaHeadphones, FaStore, FaTimes } from "react-icons/fa";
import falcon from "../../assets/images/falcon.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="bg-slate-900 text-white">
      {/* Top header */}
      <div className="flex items-center justify-between px-3 py-3 sm:px-4 md:px-6 lg:px-8">
        {/* Mobile hamburger menu button */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-gray-200 transition-colors"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <RxHamburgerMenu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Falcon Logo Container */}
        <div className="flex items-center space-x-2 md:space-x-6">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={falcon} alt="Falcon Logo" />
          </div>
        </div>

        {/* Search bar container*/}
        <div className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl xl:max-w-3xl mx-4 lg:mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for anything..."
              className="w-full px-3 py-2 lg:px-4 lg:py-2.5 pr-12 text-gray-900 bg-white rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm lg:text-base"
            />
            <button className="absolute right-0 top-0 h-full px-3 lg:px-4 bg-emerald-500 text-white rounded-r-md hover:bg-emerald-600 transition-colors">
              <HiMagnifyingGlass className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          </div>
        </div>

        {/* Mobile only search button (icon) */}
        <div className="md:hidden">
          <button
            onClick={toggleSearch}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <HiMagnifyingGlass className="w-6 h-6" />
          </button>
        </div>

        {/* Cart and Profile container */}
        <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-6">
          {/* Cart */}
          <div className="relative">
            <BsCart className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center font-semibold">
              12
            </span>
          </div>

          {/* Profile */}
          <IoPersonOutline className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
        </div>
      </div>

      {/* Mobile only Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden px-3 pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for anything..."
              className="w-full px-3 py-2 pr-12 text-gray-900 bg-white rounded-md border-0 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button className="absolute right-0 top-0 h-full px-3 bg-emerald-500 text-white rounded-r-md hover:bg-emerald-600 transition-colors">
              <HiMagnifyingGlass className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation menu - Desktop */}
      <div className="hidden md:block border-t bg-white shadow-xl">
        <div className="flex items-center justify-between px-4 lg:px-8 py-3">
          {/* Categories Container */}
          <div className="flex items-center space-x-2 lg:space-x-8">
            {/* Categories */}
            <div className="flex items-center space-x-2 font-semibold text-black">
              <RxHamburgerMenu className="text-teal-500 w-6 h-6 lg:w-7 lg:h-7" />
              <span className="text-sm lg:text-base">Categories</span>
            </div>
          </div>

          {/* Main Nav Links */}
          <nav className="lg:flex items-center space-x-4 xl:space-x-6 text-sm xl:text-base font-normal">
            <a
              href="#"
              className="text-gray-800 hover:text-teal-600 transition-colors whitespace-nowrap"
            >
              Electronics
            </a>
            <a
              href="#"
              className="text-gray-800 transition-colors whitespace-nowrap"
            >
              Home Appliances
            </a>
            <a
              href="#"
              className="text-gray-800 transition-colors whitespace-nowrap"
            >
              Mother & Baby
            </a>
            <a
              href="#"
              className="text-gray-800 transition-colors whitespace-nowrap"
            >
              Automotive
            </a>
            <a
              href="#"
              className="text-gray-800 transition-colors whitespace-nowrap"
            >
              Sports Gear
            </a>
          </nav>

          {/* Extra Icons Container */}
          <div className="flex items-center space-x-3 lg:space-x-4 xl:space-x-6 text-xs lg:text-sm font-normal">
            {/* Track Order */}
            <div className="hidden xl:flex items-center space-x-1 text-gray-700 cursor-pointer hover:text-teal-600 transition">
              <FaBox className="text-gray-500" />
              <span>TRACK ORDER</span>
            </div>

            {/* Help Center */}
            <div className="hidden lg:flex items-center space-x-1 text-gray-700 cursor-pointer hover:text-teal-600 transition">
              <FaHeadphones className="text-gray-500" />
              <span className="hidden xl:inline">HELP CENTER</span>
              <span className="xl:hidden">HELP</span>
            </div>

            {/* Sell With Us */}
            <div className="flex items-center space-x-1 text-gray-700 cursor-pointer hover:text-teal-600 transition">
              <FaStore className="text-teal-500" />
              <span className="hidden lg:inline">SELL WITH US</span>
              <span className="lg:hidden">SELL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t shadow-xl">
          <div className="px-4 py-3">
            {/* Categories */}
            <div className="flex items-center space-x-2 font-semibold text-black mb-4">
              <RxHamburgerMenu className="text-teal-500 w-6 h-6" />
              <span>Categories</span>
            </div>

            {/* Mobile Nav Links */}
            <nav className="space-y-3 mb-4">
              <a
                href="#"
                className="block text-gray-800 hover:text-teal-600 transition-colors py-2"
              >
                Electronics
              </a>
              <a
                href="#"
                className="block text-gray-800 hover:text-teal-600 transition-colors py-2"
              >
                Home Appliances
              </a>
              <a
                href="#"
                className="block text-gray-800 hover:text-teal-600 transition-colors py-2"
              >
                Mother & Baby
              </a>
              <a
                href="#"
                className="block text-gray-800 hover:text-teal-600 transition-colors py-2"
              >
                Automotive
              </a>
              <a
                href="#"
                className="block text-gray-800 hover:text-teal-600 transition-colors py-2"
              >
                Sports Gear
              </a>
            </nav>

            {/* Mobile Extra Links */}
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-teal-600 transition">
                <FaBox className="text-gray-500" />
                <span className="text-sm">TRACK ORDER</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-teal-600 transition">
                <FaHeadphones className="text-gray-500" />
                <span className="text-sm">HELP CENTER</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700 cursor-pointer hover:text-teal-600 transition">
                <FaStore className="text-teal-500" />
                <span className="text-sm">SELL WITH US</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
