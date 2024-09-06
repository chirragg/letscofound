import React, { useState, useEffect } from "react";
import { AiFillHome, AiFillFolder, AiOutlineProject } from "react-icons/ai";
import { FaNetworkWired, FaSuitcase, FaComments,FaHandsHelping,FaUsers } from "react-icons/fa";
import {BsFillBriefcaseFill} from "react-icons/bs"
import { IoMdNotifications } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PostAdd } from "@mui/icons-material";
import CreateIcon from "@mui/icons-material/Create";
import { Link } from "react-router-dom";
const Header = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const userResponse = await axios.get(
          "https://lcf-backend.onrender.com/api/profiles/getProfileDetails",
          config
        );

        setUserDetails(userResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  const navigate = useNavigate();

  const handlePost = () => {
   // navigate("/projectpage");
       navigate("/StartupOptions");
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here, like clearing tokens
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="flex justify-between items-center px-20 py-2 bg-white shadow-md relative">
      <div className="flex items-center">
        <img
          src="https://c8.alamy.com/comp/2AF32G4/initial-letter-l-logo-with-creative-modern-business-typography-vector-template-creative-abstract-letter-l-logo-vector-l-logo-design-2AF32G4.jpg"
          alt="Logo"
          className="h-10"
        />
        <div className="flex items-center bg-gray-200 p-2 rounded-md ml-4 h-8">
          <FiSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none ml-2"
          />
        </div>
      </div>
      <div className="flex items-center space-x-8 mx-auto">
        <div className="flex flex-col items-center cursor-pointer">
          <AiFillHome className="text-xl" />
          <p className="text-xs">Home</p>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <FaNetworkWired className="text-xl" />
          <p className="text-xs">My Network</p>
        </div>
        <div
          onClick={handlePost}
          className="flex flex-col items-center cursor-pointer"
        >
          <AiOutlineProject className="text-xl" />
          <p className="text-xs">New Project</p>
        </div>
        <div className="flex flex-col items-center cursor-pointer">
          <FaHandsHelping className="text-xl" />
          <p className="text-xs">Collabs</p>
        </div>
        <Link to="/communities">
          <div className="flex flex-col items-center cursor-pointer">
            <FaUsers className="text-xl" />
            <p className="text-xs">Community</p>
          </div>
        </Link>
        <div
          className="flex flex-col items-center cursor-pointer relative"
          onClick={toggleProfile}
        >
          <div className="bg-gray-300 rounded-full h-8 w-8">
            <img
              src={userDetails?.profileImage}
              alt="Profile"
              className="rounded-full object-cover h-8 w-8"
            />
          </div>
          <p className="text-xs">Me</p>
          {isProfileOpen && (
            <div className="absolute top-10 right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-4 z-50">
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src={userDetails?.profileImage}
                  alt="Profile"
                  className="rounded-full h-10 w-10"
                />
                <div>
                  <p className="font-bold">{userDetails?.fullName}</p>
                  <p className="text-sm text-gray-600">{userDetails?.bio}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Experience:</strong> {userDetails?.experience}
                </p>
                <p>
                  <strong>Designation:</strong> {userDetails?.designation}
                </p>
                <p>
                  <strong>Company:</strong> {userDetails?.company}
                </p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => navigate("/profile")}
                  className="text-blue-600 text-sm hover:underline"
                >
                  View Profile
                </button>
              </div>
              <hr className="my-4" />
              <div className="flex justify-end">
                <button
                  onClick={handleLogout}
                  className="text-red-600 text-sm hover:underline"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
