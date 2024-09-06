import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";

const CommunityPage = () => {
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useContext(UserContext);

  const industry = user?.industries[0]; // User's industry for fetching community members

  useEffect(() => {
    const fetchCommunityData = async () => {
      const token = localStorage.getItem("token");

      // Fetch community members
      const membersResponse = await fetch(
        `https://lcf-backend.onrender.com/api/communities/${industry}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const membersData = await membersResponse.json();
      setMembers(membersData.members);

      // Fetch projects for the user
      const projectsResponse = await fetch(
        `https://lcf-backend.onrender.com/api/projects/user-projects`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const projectsData = await projectsResponse.json();
      setProjects(projectsData);

      // Fetch community chat messages
      const chatResponse = await fetch(
        `https://lcf-backend.onrender.com/api/chat/${industry}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const chatData = await chatResponse.json();
      setMessages(chatData.messages);
    };

    fetchCommunityData();
  }, [industry, user]);

  // Handle posting a new message
  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const token = localStorage.getItem("token");

    const response = await fetch(
      `https://lcf-backend.onrender.com/api/chat/${industry}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: newMessage }),
      }
    );

    if (response.ok) {
      const postedMessage = await response.json();
      setMessages([...messages, postedMessage]); // Append new message to chat
      setNewMessage(""); // Clear input field
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for Participants */}
      <div className="w-1/4 bg-white border-r border-gray-300 p-4">
        <h2 className="text-xl font-bold mb-4">{industry} Participants</h2>
        <ul>
          {members?.map((member) => (
            <li
              key={member._id}
              className="p-2 flex items-center hover:bg-gray-200 rounded-md"
            >
              <img
                src={member.profileImage}
                alt={member.fullName}
                className="w-8 h-8 rounded-full mr-3"
              />
              <div>
                <p className="font-medium">{member.fullName}</p>
                <p className="text-sm text-gray-500">@{member.username}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Chat Section */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-white border-b border-gray-300 flex items-center justify-between">
          <h2 className="text-xl font-bold">{industry} Community Chat</h2>
        </div>

        {/* Chat Messages and Projects */}
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Display Projects in Chat */}
          {projects?.map((project) => (
            <div
              key={project._id}
              className="mb-4 p-4 bg-gradient-to-r from-green-100 to-green-200 rounded-lg shadow-md flex flex-col justify-between"
            >
              <div>
                <p className="text-base font-semibold text-gray-700">
                  Project by:{" "}
                  <span className="font-medium">{project.username}</span>
                </p>
                <h3 className="text-xl font-bold text-gray-800 my-2">
                  Title: {project.concept}
                </h3>
                <p className="text-base text-gray-700">
                  Problem: {project.problem}
                </p>
              </div>
              <Link to={`/detailedproject/${project._id}`}>
                <button className="bg-green-500 text-white text-sm rounded-lg p-2 mt-4">
                  View More
                </button>
              </Link>
            </div>
          ))}

          {/* Community Chat Messages */}
          {messages?.map((message) => (
            <div
              key={message._id}
              className="mb-4 p-2 bg-white rounded-lg shadow-sm"
            >
              <p className="font-medium">{message.senderName}</p>
              <p className="text-sm text-gray-700">{message.text}</p>
            </div>
          ))}
        </div>

        {/* Chat Input Section */}
        <div className="p-4 bg-white border-t border-gray-300 flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-full"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
