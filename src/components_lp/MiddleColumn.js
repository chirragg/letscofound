

import React, { useContext } from "react";
import TopBar from "./TopBar";
import Stories from "../components_lp/Story/Stories";
import LinkedInPost from "./LinkedInPost";
import { ThemeContext } from "../context/ThemeContext";

export default function MiddleColumn() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`middle-column px-2 md:px-4 lg:px-6 ${
        theme === "dark"
          ? "bg-darkModeBackground text-white"
          : "bg-lightModeBackground text-black"
      }`}
    >
      {/* <div className="topbar">
        <TopBar />
      </div> */}

      <div className="stories mt-4">
        <Stories />
      </div>

      <div className="posts mt-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold mb-4 pl-2">Feeds</h2>
          <p className="text-purple-400 font-bold p-1 rounded-lg pr-2 cursor-pointer">
            Watch All
          </p>
        </div>
        <div className="z-2">
          <LinkedInPost />

        </div>
      </div>
    </div>
  );
}
