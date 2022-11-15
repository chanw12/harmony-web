import React from "react";

const Header = (props) => {
  return (
    <nav className=" bg-pink-300 text-white justify-between flex text-4xl px-5 py-2 items-center w-full">
      <h1 className=" font-bold font-serif">harmony</h1>
      <div className=" w-2/3 font-light text-2xl flex justify-between"></div>
    </nav>
  );
};

export default Header;
