import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Home, PeopleAlt, Notifications } from "@mui/icons-material";
import ExploreIcon from "@mui/icons-material/Explore";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav
      className={`${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      } flex justify-between items-center w-full py-4 px-6 fixed top-0 left-0 right-0 z-50 shadow-md`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/home">
          <h1 className="text-3xl font-bold tracking-wide">
            <span className="text-darkPurple">L</span>ets
            <span className="text-darkPurple">C</span>o
            <span className="text-darkPurple">F</span>ound
          </h1>
        </Link>
      </div>

      {/* Hamburger Icon for Mobile */}
      <button
        onClick={toggleDropdown}
        className="lg:hidden text-3xl focus:outline-none"
      >
        {isDropdownOpen ? "✖" : "☰"}
      </button>

      {/* NavLinks */}
      <div
        className={`${
          isDropdownOpen ? "block" : "hidden"
        } lg:flex lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 items-center absolute lg:static top-16 left-0 w-full lg:w-auto bg-gray-800 lg:bg-transparent p-4 lg:p-0 z-40`}
      >
        <Link
          to="/home"
          className="text-white lg:text-inherit bg-darkPurple hover:bg-lightPurple p-2 rounded-full flex items-center transition-colors duration-300"
        >
          <Home />
          <span className="ml-2">Home</span>
        </Link>
        <Link
          to="/network"
          className="text-white lg:text-inherit bg-darkPurple hover:bg-lightPurple p-2 rounded-full flex items-center transition-colors duration-300"
        >
          <PeopleAlt />
          <span className="ml-2">Network</span>
        </Link>
        <Link
          to="/jobs"
          className="text-white lg:text-inherit bg-darkPurple hover:bg-lightPurple p-2 rounded-full flex items-center transition-colors duration-300"
        >
          <ExploreIcon />
          <span className="ml-2">Explore</span>
        </Link>
        <Link
          to="/notifications"
          className="text-white lg:text-inherit bg-darkPurple hover:bg-lightPurple p-2 rounded-full flex items-center transition-colors duration-300"
        >
          <Notifications />
          <span className="ml-2">Notifications</span>
        </Link>
        <Link
          to="/projectpage"
          className="text-white lg:text-inherit bg-darkPurple hover:bg-lightPurple p-2 rounded-full flex items-center transition-colors duration-300"
        >
          <span className="ml-2">Projects</span>
        </Link>
        <Link
          to="/messaging"
          className="text-white lg:text-inherit bg-darkPurple hover:bg-lightPurple p-2 rounded-full flex items-center transition-colors duration-300"
        >
          <span className="ml-2">Messaging</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
