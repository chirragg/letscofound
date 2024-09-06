import React, { useState, useContext } from "react";
import { UserContext } from "./Context/UserContext";
import uploadImgToCloudinary from "../cloudinary";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

export default function PostBox({ isOpen, setIsOpen, refreshFeed }) {
  // Receive refreshFeed as a prop
  const { user } = useContext(UserContext);
  const [postContent, setPostContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  if (!user) return <div>Loading...</div>;

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const data = await uploadImgToCloudinary(file);
      setImageUrl(data.url);
      setPostImage(file);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true); // Start loading
    try {
      const token = localStorage.getItem("token");
      const formData = {
        postPrivacy: "Public",
        postContent,
        imageUrl,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "https://lcf-backend.onrender.com/api/createPost",
        formData,
        config
      );

      toast.success("Post created successfully!"); // Show success toast

      // Refresh the feed
      refreshFeed();

      setPostContent("");
      setImageUrl("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Error creating post. Please try again later."); // Show error toast
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <>
      <ToastContainer /> {/* Toast container for notifications */}
      {isOpen && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="p-4 bg-white rounded-lg shadow-lg">
            <div className="flex items-center space-x-4">
              <img
                src={user.profileImage}
                alt="Profile"
                className="rounded-full w-10 h-10"
              />
              <span className="font-medium">{user.fullname}</span>
            </div>
            <textarea
              className="w-full mt-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="What do you want to talk about?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 cursor-pointer">
                  <span>📷</span>
                  <span>Photo</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 ml-2"
                  disabled={isLoading} // Disable button during loading
                >
                  {isLoading ? (
                    <span className="spinner-border spinner-border-sm"></span> // Show spinner
                  ) : (
                    "Post"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
