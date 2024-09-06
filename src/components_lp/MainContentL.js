import React from "react";
import PostsFeedL from "./PostFeedL";
import AddPost from "./AddPost";

const MainContentL = () => {
  return (
    <div className="flex-grow p-4 mx-4">
      {" "}
      {/* Adjusting margins for central alignment */}
      <AddPost />
      
    </div>
  );
};

export default MainContentL;
