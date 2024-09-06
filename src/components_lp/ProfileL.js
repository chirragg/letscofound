import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [followDetails, setFollowDetails] = useState(0);
  const [followingDetails, setFollowingDetails] = useState(0);
  const [posts, setPosts] = useState(0);

  // const handleLogout = () => {
  //   // Clear the token and user ID from local storage
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("userId");

  //   // Redirect to the login page or home page
  //   navigate("/login"); // Adjust the path as needed
  // };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const userResponse = await axios.get(
          "https://lcf-backend.onrender.com/api/profiles/getProfileDetails",
          config
        );

        setUserDetails(userResponse.data);

        const userId = localStorage.getItem("userId");

        const followResponse = await axios.get(
          `https://lcf-backend.onrender.com/api/profiles/followers/${userId}`,
          config
        );
        setFollowDetails(followResponse.data.length);

        const followingResponse = await axios.get(
          `https://lcf-backend.onrender.com/api/profiles/following/${userId}`,
          config
        );
        setFollowingDetails(followingResponse.data.length);

        if (userId) {
          const postsResponse = await axios.get(
            `https://lcf-backend.onrender.com/api/getUserPosts/${userId}`,
            config
          );
          console.log(postsResponse);
          
          setPosts(postsResponse.data.length);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

 return (
   <div className="bg-white p-4 mx-auto mt-6 rounded-xl shadow-md w-60">
     <div className="flex flex-col items-center">
       <div className="relative w-24 h-24">
         <img
           src={userDetails?.profileImage}
           alt="Profile"
           className="rounded-full object-cover w-full h-full"
         />
       </div>
       <h2 className="text-lg font-semibold mt-2">{userDetails?.fullname}</h2>
       <p className="text-gray-600 text-sm text-center mt-1">
         {userDetails?.bio}
       </p>
       <div className="flex justify-between w-full mt-4 text-center">
         <div>
           <h3 className="font-bold text-lg">{posts}</h3>
           <p className="text-gray-600 text-xs">Posts</p>
         </div>
         <div>
           <h3 className="font-bold text-lg">{followDetails}</h3>
           <p className="text-gray-600 text-xs">Followers</p>
         </div>
         <div>
           <h3 className="font-bold text-lg">{followingDetails}</h3>
           <p className="text-gray-600 text-xs">Following</p>
         </div>
       </div>
     </div>
     <Link to="/groups">
       <div className="mt-4">
         <p className="text-sm text-blue-700">Groups</p>
       </div>
     </Link>
   </div>
 );

};

export default Profile;
