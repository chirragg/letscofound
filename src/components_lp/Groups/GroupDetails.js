// components/GroupDetails.js
import React from "react";

const GroupDetails = ({ selectedGroup }) => {
  if (!selectedGroup) {
    return <div className="flex-1 p-4">Select a group to see details</div>;
  }

  return (
    <div className="flex-1 p-6 bg-gray-100 border border-gray-200 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">{selectedGroup.name}</h2>
      <p className="text-lg mb-4">{selectedGroup.description}</p>
      {/* Add more group details here like recent posts, discussions, etc. */}
    </div>
  );
};

export default GroupDetails;
