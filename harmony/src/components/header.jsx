import React from "react";

const Header = (props) => {
  return (
    <>
      <div className=" bg-pink-300 text-white  flex space-x-52 text-4xl px-5 py-2 items-center">
        <h1 className=" font-bold font-serif">harmony</h1>
        <div className=" space-x-52 font-light text-2xl ">
          <span>temp</span>
          <span>temp</span>
          <span>temp</span>
          <span>temp</span>
        </div>
      </div>
    </>
  );
};

export default Header;
