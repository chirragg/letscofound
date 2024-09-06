import React from "react";
import { Avatar, Button } from "@mui/material";
import { PersonAdd } from "@mui/icons-material"; // Importing PersonAdd icon from @mui/icons-material

const SuggestedConnection = ({ profileImage, name, designation }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-300 py-4">
      <div className="flex items-center">
        <Avatar
          alt={name}
          src={`https://lcf-backend.onrender.com/uploads/${profileImage}`}
        />
        <div className="ml-4">
          <h3 className="font-semibold">{name}</h3>{" "}
          {/* Changed fullName to name */}
          <p className="text-gray-500 text-sm">{designation}</p>
        </div>
      </div>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<PersonAdd />} // Using PersonAdd icon as the start icon of the button
      >
        Connect
      </Button>
    </div>
  );
};

const SuggestedConnectionsContainer = ({ recommendedUsers }) => {
  return (
    <div className="mt-2">
      <h2 className="text-xl font-semibold mb-4">Suggested Connections</h2>
      {recommendedUsers && recommendedUsers.length > 0 ? (
        recommendedUsers.map((recommendedUser, index) => (
          <SuggestedConnection
            key={index}
            profileImage={recommendedUser.profileImage}
            name={recommendedUser.name}
            designation={recommendedUser.designation}
          />
        ))
      ) : (
        <p>No suggested connections available</p>
      )}
    </div>
  );
};

export default SuggestedConnectionsContainer;
