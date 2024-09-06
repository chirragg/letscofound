// pages/GroupsPage.js
import React, { useState, useEffect } from "react";
import Header from "./Header";
import GroupsSidebar from "./GroupsSidebar";
import GroupDetails from "./GroupDetails";

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://lcf-backend.onrender.com/api/groups",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setGroups(data.groups);
    };

    fetchGroups();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <GroupsSidebar groups={groups} onSelectGroup={setSelectedGroup} />
        <GroupDetails selectedGroup={selectedGroup} />
      </div>
    </div>
  );
};

export default GroupsPage;
