import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

const PostsFeedL = () => {
 const [posts, setPosts] = useState([]);


useEffect(() => {
  const fetchPosts = async () => {
    try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },}
      const response = await fetch(
        "https://lcf-backend.onrender.com/api/getPostDetails",
       config
      );
      const data = await response.json();
      console.log(data); // Log the full response
      setPosts(data.posts); // Set posts as the array from data.posts
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  fetchPosts();
}, []);
  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(
        `https://lcf-backend.onrender.com/api/likePost/${postId}`,
        {},
        config
      );
      // Refresh posts or handle post state update
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
console.log(posts);

  return (
    <div className="w-full p-4">
      {Array.isArray(posts) && posts.length > 0 ? (
        posts?.map((post, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-6">
            {/* Post Header */}
            <div className="flex items-center mb-4">
              <img
                src={post.profileimageUrl}
                alt="Profile"
                className="h-10 w-10 rounded-full"
              />
              <div className="ml-3">
                <p className="font-semibold">{post.username}</p>
                <p className="text-sm text-gray-400">{post.designation}</p>
                {/* <p className="text-sm text-gray-400">
                  {formatDistanceToNow(new Date(post.createdAt))} ago
                </p> */}
              </div>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <p className="mb-2">{post.postContent}</p>
              {post.imageUrl && (
                <div className="flex justify-center mt-3">
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    className="rounded-lg max-w-full h-auto"
                    style={{ maxHeight: "300px" }} // This limits the height of the image to 300px while maintaining its aspect ratio
                  />
                </div>
              )}
            </div>

            {/* Post Footer */}
            <div className="flex justify-between text-gray-500 text-sm">
              <div className="flex items-center">
                <button
                  onClick={() => handleLike(post._id)}
                  className="hover:underline"
                >
                  Like
                </button>
                <span className="ml-2">{post.likes.length} Likes</span>
              </div>
              <div className="flex space-x-4">
                <button className="hover:underline">Comment</button>
                <button className="hover:underline">Share</button>
              </div>
            </div>

            {/* Comments Section */}
            {post.comments.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold mb-2">Comments:</p>
                {post.comments.map((comment, idx) => (
                  <div key={idx} className="flex items-center mb-2">
                    <img
                      src={`https://lcf-backend.onrender.com/uploads/${comment.profileimageUrl}`}
                      alt="Commenter Profile"
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="ml-2">
                      <p className="font-semibold">{comment.username}</p>
                      <p className="text-sm">{comment.comment}</p>
                      {/* <p className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(comment.timestamp))} ago
                      </p> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>Loading your posts</p>
      )}
    </div>
  );
};

export default PostsFeedL;
