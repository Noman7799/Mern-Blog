import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoIosSearch, IoMdMoon } from "react-icons/io";
import { Button, TextInput } from "flowbite-react";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "./Logo";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
       <Logo/>
        <form>
          <TextInput
            type="text"
            placeholder="Search ..."
            rightIcon={IoIosSearch}
            className="hidden lg:block"
          />
        </form>
        <Button
          className="lg:hidden h-10 w-12 flex justify-center items-center rounded-lg"
          color="gray"
        >
          <IoIosSearch size={18} />
        </Button>
        <div className="flex gap-5 justify-between items-center md:order-2">
          <Button className="w-12 h-10 hidden sm:block rounded-lg" color="gray">
            <IoMdMoon />
          </Button>
          <Link to="/signin">
            <Button
              className="items-center flex rounded-lg"
              gradientDuoTone="purpleToBlue"
              outline
            >
              SignIn
            </Button>
          </Link>
        </div>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
            onClick={toggleMenu}
          >
            <RxHamburgerMenu size={25} />
          </button>
        </div>

        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isOpen ? "block" : "hidden"
          }`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 rounded-sm md:p-0 ${
                  location.pathname === "/"
                    ? "text-blue-700"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-400 dark:text-white md:dark:hover:text-blue-500"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`block py-2 px-3 rounded-sm md:p-0 ${
                  location.pathname === "/about"
                    ? "text-blue-700"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-400 dark:text-white md:dark:hover:text-blue-500"
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className={`block py-2 px-3 rounded-sm md:p-0 ${
                  location.pathname === "/projects"
                    ? "text-blue-700"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-400 dark:text-white md:dark:hover:text-blue-500"
                }`}
              >
                Projects
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
