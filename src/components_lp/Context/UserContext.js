import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        console.log("Token or userId missing, skipping fetch.");
        setLoading(false);
        return;
      }

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        console.log("Fetching user data...");
        const userResponse = await axios.get(
          "https://lcf-backend.onrender.com/api/profiles/getProfileDetails",
          config
        );

        console.log("Fetched user data:", userResponse.data);
        setUser(userResponse.data);
        console.log(userResponse.data.industries[0]);
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  
  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
