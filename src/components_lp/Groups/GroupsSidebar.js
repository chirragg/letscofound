// components/GroupsSidebar.js
import React from "react";
import { FaUsers } from "react-icons/fa"; // Example icon

const GroupsSidebar = ({ groups, onSelectGroup }) => {
  return (
    <div className="w-1/4 bg-white shadow-lg p-4 border-r border-gray-200">
      <input
        type="text"
        placeholder="Search groups..."
        className="w-full mb-4 p-2 border rounded-lg shadow-sm"
      />
      <ul className="space-y-2">
        {groups?.map((group) => (
          <li
            key={group._id}
            onClick={() => onSelectGroup(group)}
            className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded-lg transition duration-200"
          >
            <FaUsers className="text-blue-500 mr-3" />
            <span className="font-medium text-lg">{group.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupsSidebar;
