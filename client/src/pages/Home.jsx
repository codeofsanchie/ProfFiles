import React from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import Profile from "./Profile"

function Home() {
  return (
    <div className="flex">
     
      <Sidebar />
      <Content />
      <Profile />
     
    </div>
  );
}

export default Home;
