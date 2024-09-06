

// import React, { useState, useContext } from "react";
// import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
// import LeftColumn from "./LeftColumn";
// import RightColumn from "./RightColumn";
// import MiddleColumn from "./MiddleColumn";
// import MessagingSidebar from "./MessagingComp/MessagingSidebar";
// import ChatWindow from "./MessagingComp/ChatWindow";
// import Settings from "./SettingsPage/SettingsPage";
// import TopBar from "./TopBar";
// import { ThemeContext } from "../context/ThemeContext";

// const HomePage = () => {
//   const [isRightColumnVisible, setRightColumnVisible] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { theme } = useContext(ThemeContext);

//   const handleMessagingClick = () => {
//     navigate("/chatMessage");
//   };

//   const handleSettingsClick = () => {
//     navigate("/settings");
//   };

//   const handleBellIconClick = () => {
//     setRightColumnVisible(!isRightColumnVisible);
//   };

//   const isMessagingRoute = location.pathname === "/chatMessage";
//   const isSettingsRoute = location.pathname === "/settings";

//   return (
//     <div
//       className={`flex flex-col h-screen ${
//         theme === "dark" ? "bg-black text-white" : "bg-white text-black"
//       }`}
//     >
//       <TopBar onBellIconClick={handleBellIconClick} />
//       <div className="flex flex-grow">
//         <div
//           className={`lg:w-1/5 fixed top-0 bottom-0 ${
//             theme === "dark" ? "bg-black text-white" : "bg-white text-black"
//           }`}
//         >
//           <LeftColumn
//             onMessagingClick={handleMessagingClick}
//             onSettingsClick={handleSettingsClick}
//           />
//         </div>

//         {isMessagingRoute ? (
//           <div className="flex w-4/5 ml-auto">
//             <MessagingSidebar />
//             <ChatWindow />
//           </div>
//         ) : isSettingsRoute ? (
//           <div className="flex w-4/5 ml-auto">
//             <div className="w-full">
//               <Settings />
//             </div>
//           </div>
//         ) : (
//           <>
//             <div
//               className={`lg:w-3/5 ml-auto overflow-y-auto ${
//                 theme === "dark" ? "bg-black text-white" : "bg-white text-black"
//               }`}
//             >
//               <MiddleColumn />
//             </div>

//             <div
//               className={`overflow-y-auto lg:w-1/5 ${
//                 isRightColumnVisible ? "block" : "hidden lg:block"
//               } fixed lg:static top-0 right-0 lg:top-auto lg:right-auto ${
//                 theme === "dark" ? "bg-black text-white" : "bg-white text-black"
//               }`}
//             >
//               <RightColumn />
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;
import React from "react";
import Header from "./HeaderL";
import MainContent from "./MainContentL";
import Profile from "./ProfileL";
import SuggestedUsersL from "./SuggestedUsersL";
const Home = () => {
  return (
    <div>
      <Header />
      <div className="flex bg-gray-100 h-screen justify-center space-x-6 px-4">
        <div className="w-1/4">
          <Profile /> {/* Left Column */}
        </div>
        <div className="w-2/4">
          <MainContent /> {/* Middle Column */}
        </div>
        <div className="w-1/4">
          <SuggestedUsersL /> {/* Right Column */}
        </div>
      </div>
    </div>
  );
};

export default Home;
