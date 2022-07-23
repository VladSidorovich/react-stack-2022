import React from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <div className="flex justify-content items-center h-[50px] px-5 shadow-md bg-gray-500 text-white">
      <h3> Github </h3>
      <span className="ml-2">
        <Link to="/" className="mr-2">
          Search
        </Link>
        <Link to="/favourites"> Favourites </Link>
      </span>
    </div>
  );
};
