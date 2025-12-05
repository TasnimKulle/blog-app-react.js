import React, { useState } from "react";
import { Link } from "react-router";
import { FaUserAlt } from "react-icons/fa";
import { CiMenuBurger } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";

export const Header = () => {
  const [isMenuOpens, setIsMenuOpes] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const avatar_url = null;
  //   'https://media.istockphoto.com/id/2248985094/photo/portrait-of-muslim-woman-in-kebaya-sitting-in-garden-looking-at-camera.webp?a=1&b=1&s=612x612&w=0&k=20&c=gSSiMkUg-AuRvM4KQEfC8idTlAcQUpVCDMaBaxdSzhk='
  return (
    <header>
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex justify-between h-16">
            {/* left  */}
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
                  to="/articles"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-800"
                >
                  Articles
                </Link>
                {isLoggedIn && (
                  <>
                    <Link
                      to="/editor"
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-900"
                    >
                      Write
                    </Link>

                    <Link
                      to="/articles"
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-900"
                    >
                      Articles
                    </Link>

                    <Link
                      to="/manage-articles"
                      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-900"
                    >
                      My Articles
                    </Link>
                  </>
                )}
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
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="h-8 w-8 flex
                   justify-center items-center focus:outline-none
                   focus:ring-2 focus:ring-offset-2 focus:ring-orange-600
                   rounded-full bg-gray-50 "
                    >
                      {avatar_url ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={avatar_url}
                        />
                      ) : (
                        <FaUserAlt className="text-gray-600 " />
                      )}
                    </button>
                    {isDropdownOpen && (
                      <div
                        onMouseLeave={() => setIsDropdownOpen(false)}
                        className="absolute right-0 w-48 shadow-lg rounded-md bg-white"
                      >
                        <div
                          className="absolute w-full
                                top-[12px]  h-3"
                        ></div>
                        <Link className="block px-4 py-2 text-sm hover:bg-gray-100">
                          Your Profile
                        </Link>
                        <Link className="block px-4 py-2 text-sm hover:bg-gray-100">
                          Manage Articles
                        </Link>
                        <Link className="block px-4 py-2 text-sm hover:bg-gray-100">
                          SignOut
                        </Link>
                      </div>
                    )}
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
            {/* hambergar menu  */}
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpes(!isMenuOpens)}
                className="inline-flex items-center justify-center p-2  text-gray-500 font-medium "
              >
                {isMenuOpens ? (
                  <IoIosClose className="block w-6 h-6" />
                ) : (
                  <CiMenuBurger className="block w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        {/* mobile menu  */}
        {isMenuOpens && (
          <div className="sm:hidden ">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block items-center pl-3 pr-4 py-2 border-l-2 border-orange-500  text-sm font-medium bg-orange-50 text-gray-800"
              >
                Home
              </Link>

              <Link
                to="/articles"
                className="block items-center pl-3 pr-4 py-2  border-l-2 border-transparent text-sm font-medium text-gray-800"
              >
                Articles
              </Link>
            </div>
            {/* if is logged in  */}
            {isLoggedIn && (
              <>
                <Link
                  to="/write"
                  className="block items-center pl-3 pr-4 py-2 border-l-2 border-transparent text-sm font-medium text-gray-800 hover:bg-gray-50"
                >
                  Write
                </Link>
                <Link
                  to="myarticles"
                  className="block items-center pl-3 pr-4 py-2  border-l-2 border-transparent text-sm font-medium text-gray-800 hover:bg-gray-50"
                >
                  My Article
                </Link>
                <Link
                  to="/profile"
                  className="block items-center pl-3 pr-4 py-2 border-l-2 border-transparent text-sm font-medium text-gray-800 hover:bg-gray-50"
                >
                  Profile
                </Link>
                <button className="block items-center pl-3 pr-4 py-2  border-l-2 border-transparent text-sm font-medium text-gray-800 hover:bg-gray-50">
                  Sign Out
                </button>
              </>
            )}
            {/* if is Not Logged in */}
            {!isLoggedIn && (
              <div className="">
                <Link
                  to="/signin"
                  className="block items-center pl-3 pr-4 py-2  border-l-2 border-transparent text-sm font-medium text-gray-800 hover:bg-gray-50"
                >
                  SignIn
                </Link>
                <Link
                  to="/signup"
                  className="block items-center pl-3 pr-4 py-2  border-l-2 border-transparent text-sm font-medium text-gray-800 hover:bg-gray-50"
                >
                  SignUp
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
