



import React, { useState } from "react";
import PostList from "./Project_Posts/PostList";
import UserProjectsList from "./Project_Posts/UserProjectsList";
import InterestRequests from "./Project_Posts/InterestRequests";
import ApprovedProjectsList from "./Project_Posts/ApprovedProjectsList";

const MiddleColumn = () => {
  const [activeTab, setActiveTab] = useState("All Projects");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-black text-white p-4 shadow-md w-full h-screen max-w-4xl mt-20 mx-auto">
      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          className={`py-2 px-4 ${
            activeTab === "All Projects"
              ? "bg-purple-800 text-white rounded-lg"
              : "bg-black text-white"
          }`}
          onClick={() => handleTabClick("All Projects")}
        >
          All Projects
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "My Projects"
              ? "bg-purple-800 text-white rounded-lg"
              : "bg-black text-white"
          }`}
          onClick={() => handleTabClick("My Projects")}
        >
          My Projects
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "My Requested Projects"
              ? "bg-purple-800 text-white rounded-lg"
              : "bg-black text-white"
          }`}
          onClick={() => handleTabClick("My Requested Projects")}
        >
          My Requested Projects
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "My Approved Projects"
              ? "bg-purple-800 text-white rounded-lg"
              : "bg-black text-white"
          }`}
          onClick={() => handleTabClick("My Approved Projects")}
        >
          My Approved Projects
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === "All Projects" && (
        <div>
          <PostList />
        </div>
      )}

      {activeTab === "My Projects" && (
        <div>
          <UserProjectsList />
        </div>
      )}

      {activeTab === "My Requested Projects" && (
        <div>
          <InterestRequests />
        </div>
      )}
      
      {activeTab === "My Approved Projects" && (
        <div>
          <ApprovedProjectsList />
        </div>
      )}
    </div>
  );
};

export default MiddleColumn;
