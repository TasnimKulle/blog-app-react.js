import React from "react";
import { Link } from "react-router";
import { FaTwitter ,FaInstagram , FaGithub} from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hiddensm:px-6 lg:px-8 ">
        {/* nav  */}
        <div className="-mx-5 -my-2 flex flex-wrap justify-center">
          <div className="px-5 py-2">
            <Link
              to="/"
              className="text-base text-gray-500 hover:text-gray-900"
            >
              Home
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              to="/articles"
              className="text-base text-gray-500 hover:text-gray-900"
            >
              Articles
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              to="/tags"
              className="text-base text-gray-500 hover:text-gray-900"
            >
              Tags
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              to="/about"
              className="text-base text-gray-500 hover:text-gray-900"
            >
              About Us
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link
              to="/contect"
              className="text-base text-gray-500 hover:text-gray-900"
            >
              Contact
            </Link>
          </div>
        </div>
        {/* social media icon */}
        <div className="flex justify-center space-x-4 mt-8">
          <a href="#" className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Twitter</span>
            <FaTwitter className="h-6 w-6"/>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Instagram</span>
            <FaInstagram className="h-6 w-6"/>
          </a>
          <a href="#" className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">GitHub</span>
            <FaGithub className="h-6 w-6"/>
          </a>
        </div>
        <p className="text-center text-gray-400 text-base mt-8">
            &copy;{new Date().getFullYear()} Blogify All rights reserved
        </p>
      </div>
    </div>
  );
};
