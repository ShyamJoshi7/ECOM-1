import React from "react";
import logo from "../assets/ZEbrox.png";
import TopBanner from "./topBanner";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <TopBanner />

      <nav className="navbar">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-around">
          <Link to="/" className="flex-none w-40">
            <img src={logo} />
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
