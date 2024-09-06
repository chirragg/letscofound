import React, { useContext, useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ThemeContext } from "../context/ThemeContext"; // Import the ThemeContext
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RightColumn = () => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const navigate = useNavigate();

  const handleClick = (username) => {
    navigate(`/user/${username}`);
  };

  useEffect(() => {
    const fetchRecommendedUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          "https://lcf-backend.onrender.com/api/recommend/users",
          config
        );
        console.log(response.data);
        setRecommendedUsers(response.data);
      } catch (error) {
        console.error("Error fetching recommended users:", error);
      }
    };

    fetchRecommendedUsers();
  }, []);

  return (
    <div className={`hidden lg:block w-3/3 h-screen `} >
      {/* Middle Part: Suggested for You */}
      <div
        className={`mb-8 mt-6 w-45 ${
          theme === "dark"
            ? "bg-darkPurple text-white"
            : "bg-lightGray text-black border-4 border-lightPurple"
        } p-1 pl-3 pr-3 rounded-lg mx-auto transform hover:scale-105 transition-transform duration-300`}
      >
        <h2
          className={`text-sm ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          } rounded-full p-1 mt-2 font-semibold mb-4 text-center`}
        >
          Suggested for You
        </h2>

        <div className="flex flex-col space-y-2 items-left text-sm mb-4 text-left">
          {recommendedUsers.map((recommendedUser, index) => (
            <div
              key={index}
              className="flex text-left p-3 cursor-pointer"
              onClick={() => handleClick(recommendedUser.username)}
            >
              <img
                src={`https://lcf-backend.onrender.com/uploads/${recommendedUser.profileImage}`}
                alt="Profile"
                className="h-10 w-10 rounded-full"
              />
              <div className="ml-1">
                <p className="font-semibold p-1">{recommendedUser.fullName}</p>
                <p className="text-sm text-gray-400">
                  {recommendedUser.designation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Last Part: Categories */}
      <div
        className={`w-4/5 ${
          theme === "dark"
            ? "bg-darkPurple text-white"
            : "bg-lightGray text-black"
        } mx-auto mb-6 p-2 rounded-lg hover:scale-105 transition-transform duration-300`}
      >
        <h2
          className={`text-sm ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          } rounded-full p-1 mt-2 font-semibold mb-4 text-center`}
        >
          Categories
        </h2>
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-2">
            <img
              src="/images/pharmacy.jpeg"
              alt="Category"
              className="h-10 w-10 rounded-full"
            />
            <p className="font-semibold">Pharmaceuticals</p>
          </div>
          <div className="flex space-x-2">
            <img
              src="/images/edtech.jpeg"
              alt="Category"
              className="h-10 w-10 rounded-full"
            />
            <p className="font-semibold">EdTech</p>
          </div>
          <div className="flex space-x-2">
            <img
              src="/images/pharmacy.jpeg"
              alt="Category"
              className="h-10 w-10 rounded-full"
            />
            <p className="font-semibold">Fintech</p>
          </div>
          <div className="flex space-x-2">
            <img
              src="/images/pharmacy.jpeg"
              alt="Category"
              className="h-10 w-10 rounded-full"
            />
            <p className="font-semibold">Ecommerce</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightColumn;
