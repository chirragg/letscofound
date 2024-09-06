import React, { useState, useContext } from "react";
import PostBox from "./PostBox";
import { UserContext } from "./Context/UserContext";
import PostsFeedL from "./PostFeedL";

const AddPost = () => {
  const [showPostBox, setShowPostBox] = useState(false);
  const { user, loading } = useContext(UserContext);
  const [refreshKey, setRefreshKey] = useState(0);

  console.log("User in AddPost component:", user);
 
  const refreshFeed = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>No user data found</div>;
console.log(user.industries);
  return (
    <>
      <div className="add-post-box border rounded-lg p-4 mb-4 bg-white shadow-sm">
        <div className="flex items-center">
          <img
            src={user.profileImage}
            alt="profile"
            className="rounded-full w-10 h-10"
          />
          <button
            className="ml-4 flex-grow text-left bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2"
            onClick={() => setShowPostBox(true)}
          >
            Start a post
          </button>
        </div>
      </div>
      {showPostBox && (
        <PostBox
          isOpen={showPostBox}
          setIsOpen={setShowPostBox}
          refreshFeed={refreshFeed}
        />
      )}
      <PostsFeedL key={refreshKey} />
    </>
  );
};

export default AddPost;
