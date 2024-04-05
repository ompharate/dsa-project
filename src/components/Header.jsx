import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className=" bg-blue-500">
      <nav className="flex justify-between items-center max-w-6xl mx-auto p-3 text-white font-bold">
      <Link to={"/"} > 
        <h1>Student Management</h1>
        </Link>
        <ul className="flex gap-4 ">
      <Link to={"/about"} > 
          <li>About</li>
        </Link>
      <Link to={"/login"} > 
          <li>Login</li>
        </Link>
      <Link to={"/register"} > 
          <li>Register</li>
        </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
