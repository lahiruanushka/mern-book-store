import React, { useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { 
  BiSearch, 
  BiHeart, 
  BiShoppingBag, 
  BiUserCircle,
  BiBookOpen,
  BiSun,
  BiMoon
} from 'react-icons/bi';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const cartItems = ["Book1", "Book2", "Book3"];
  const currentUser = "jhon";

  const navigation = [
    { name: "Dashboard", href: "/user-dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart", href: "/cart" },
    { name: "Checkout", href: "/checkout" },
  ];

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Toggle dark class on document root element
    document.documentElement.classList.toggle('dark');
  };

  const handleLogOut = () => {
    // Logout logic here
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BiBookOpen className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="font-bold text-xl text-gray-900 dark:text-white hidden sm:block">
                BookStore
              </span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BiSearch className="h-5 w-5 text-gray-400 dark:text-gray-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 
                         border border-gray-200 dark:border-gray-700 
                         rounded-lg 
                         focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                         focus:border-transparent
                         bg-gray-50 dark:bg-gray-800 
                         text-gray-900 dark:text-gray-100
                         text-sm placeholder-gray-500 dark:placeholder-gray-400
                         transition-colors duration-200"
                placeholder="Search for books, authors, genres..."
              />
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 
                       text-gray-600 dark:text-gray-300 
                       transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <BiSun className="h-6 w-6" />
              ) : (
                <BiMoon className="h-6 w-6" />
              )}
            </button>

            {/* Wishlist */}
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 
                             text-gray-600 dark:text-gray-300 
                             transition-colors duration-200">
              <BiHeart className="h-6 w-6" />
            </button>

            {/* Cart */}
            <Link 
              to="/cart"
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 
                       text-gray-600 dark:text-gray-300 
                       transition-colors duration-200 relative"
            >
              <BiShoppingBag className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 
                               bg-indigo-600 dark:bg-indigo-500 
                               text-white 
                               rounded-full h-5 w-5 
                               flex items-center justify-center 
                               text-xs
                               transition-colors duration-200">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {currentUser ? (
              <Menu as="div" className="relative ml-3">
                <Menu.Button className="flex rounded-full bg-white dark:bg-gray-800 
                                     text-sm focus:outline-none 
                                     focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                                     focus:ring-offset-2 dark:focus:ring-offset-gray-900
                                     transition-colors duration-200">
                  <img
                    className="h-8 w-8 rounded-full ring-2 ring-indigo-500 dark:ring-indigo-400"
                    src={`https://ui-avatars.com/api/?name=${currentUser}&background=random`}
                    alt={currentUser}
                  />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 
                                      origin-top-right rounded-md 
                                      bg-white dark:bg-gray-800 
                                      py-1 shadow-lg 
                                      ring-1 ring-black ring-opacity-5 dark:ring-gray-700 
                                      focus:outline-none
                                      transition-colors duration-200">
                    {navigation.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <Link
                            to={item.href}
                            className={`${
                              active ? 'bg-gray-100 dark:bg-gray-700' : ''
                            } block px-4 py-2 text-sm 
                               text-gray-700 dark:text-gray-300
                               transition-colors duration-200`}
                          >
                            {item.name}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogOut}
                          className={`${
                            active ? 'bg-gray-100 dark:bg-gray-700' : ''
                          } block w-full text-left px-4 py-2 text-sm 
                             text-gray-700 dark:text-gray-300
                             transition-colors duration-200`}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            ) : (
              <Link 
                to="/login"
                className="flex items-center space-x-1 p-2 
                         rounded-full hover:bg-gray-100 dark:hover:bg-gray-800
                         text-gray-600 dark:text-gray-300
                         transition-colors duration-200"
              >
                <BiUserCircle className="h-6 w-6" />
                <span className="text-sm font-medium hidden sm:block">
                  Sign in
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;