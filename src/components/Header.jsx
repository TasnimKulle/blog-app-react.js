import React, { useState } from "react";
import { Link } from "react-router";
import { FaUserAlt } from "react-icons/fa";

export const Header = () => {
  const [isMenuOpens, setIsMenuOpes] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const avatar_url=null;
//   'https://media.istockphoto.com/id/2248985094/photo/portrait-of-muslim-woman-in-kebaya-sitting-in-garden-looking-at-camera.webp?a=1&b=1&s=612x612&w=0&k=20&c=gSSiMkUg-AuRvM4KQEfC8idTlAcQUpVCDMaBaxdSzhk='
  return (
    <header>
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-orange-600 text-2xl font-bold">
                  Blogify
                </Link>
              </div>
              <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 border-b-2 
                  border-orange-500 text-sm font-medium text-gray-800"
                >
                  Home
                </Link>
                <Link
                  to="/write"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-800"
                >
                  Write
                </Link>
                <Link
                  to="/articles"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-800"
                >
                  Articles
                </Link>
                <Link
                  to="myarticles"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-800"
                >
                  My Article
                </Link>
              </nav>
            </div>
            {/* right */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                // profile menu
                <>
                  <div className="text-sm text-gray-700">
                    <span>Hello, Tasnim</span>
                  </div>
                  <div className="relative">
                    <button
                    onMouseEnter={()=>setIsDropdownOpen(true)}
                    onClick={()=>setIsDropdownOpen(!isDropdownOpen)}
                    className="h-8 w-8 flex
                   justify-center items-center focus:outline-none
                   focus:ring-2 focus:ring-offset-2 focus:ring-orange-600
                   rounded-full bg-gray-50 "
                    >
                        {
                            avatar_url ? <img className="h-8 w-8 rounded-full" src={avatar_url}/>: <FaUserAlt className="text-gray-600 "/>
                        }
                    </button>
                    {
                        isDropdownOpen &&(
                            <div 
                            onMouseLeave={()=>setIsDropdownOpen(false)}
                            className="absolute right-0 w-48 shadow-lg rounded-md bg-white">
                                <div className="absolute w-full
                                top-[12px]  h-3"></div>
                                <Link className="block px-4 py-2 text-sm hover:bg-gray-100">Your Profile</Link>
                                <Link className="block px-4 py-2 text-sm hover:bg-gray-100">Manage Articles</Link>
                                <Link className="block px-4 py-2 text-sm hover:bg-gray-100">SignOut</Link>
                            </div>
                        )
                    }
                  </div>
                </>
              ) : (
                // authantication buttons
                <div className="flex justify-center space-x-2.5">
                  <Link
                    to="/signin"
                    className="inline-flex px-4 py-2 items-center text-sm bg-orange-600
                        hover:bg-orange-700 text-white rounded-md font-medium border border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2
                        focus:ring-orange-500"
                  >
                    SignIn
                  </Link>
                  <Link
                    to="/signup"
                    className="inline-flex px-4 py-2 items-center text-sm bg-white
                        hover:bg-orange-50 text-orange-600
                          rounded-md font-medium border border-transparent focus:outline-none focus:ring-2  focus:ring-offset-2 focus:ring-orange-500"
                  >
                    SignUp
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
