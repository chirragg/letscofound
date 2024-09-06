import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext"; // Import the ThemeContext
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsThreeDotsVertical } from "react-icons/bs";

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
        setRecommendedUsers(response.data);
      } catch (error) {
        console.error("Error fetching recommended users:", error);
      }
    };

    fetchRecommendedUsers();
  }, []);

  return (
    <div className="hidden lg:block w-80 h-screen bg-white shadow-lg p-4 rounded-lg">
      {/* Suggested for You Section */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4 text-center border-b pb-2">
          Suggested for You
        </h2>
        <div className="space-y-4">
          {recommendedUsers.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
              onClick={() => handleClick(user.username)}
            >
              <div className="flex items-center">
                <img
                  src={`https://lcf-backend.onrender.com/uploads/${user.profileImage}`}
                  alt="Profile"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="ml-4">
                  <p className="font-semibold text-sm">{user.fullName}</p>
                  <p className="text-xs text-gray-500">{user.designation}</p>
                </div>
              </div>
              <BsThreeDotsVertical className="text-gray-500" />
            </div>
          ))}
        </div>
        <button className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          View More
        </button>
      </div>
    </div>
  );
};

export default RightColumn;
