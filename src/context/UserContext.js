import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the UserContext
export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get(
            "https://lcf-backend.onrender.com/api/current_user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(res.data);
        } catch (err) {
          console.error("Error fetching user:", err);
          // Optional: handle token expiration or clear token
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
