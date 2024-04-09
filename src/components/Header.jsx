import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContex";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
const Header = () => {
  const { isLoggedOut } = UserAuth();
  const { user } = UserAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/register");
  };

  return (
    <div className=" bg-blue-500">
      <nav className="flex justify-between items-center max-w-6xl mx-auto p-3 text-white font-bold">
        <Link to={"/"}>
          <h1>Student Management</h1>
        </Link>
        <ul className="flex gap-4 items-center">
          <Link to={"/about"}>
            <li>About</li>
          </Link>
          {isLoggedOut ? (
            <>
             
              <Link to={"/register"}>
                <li>SignIn</li>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/teacher/dashboard"}>
                <li>dashboard</li>
              </Link>
              <Link onClick={handleLogout}>
                <li>logout</li>
              </Link>

              <li>
                <img className="rounded-full" width={40} height={40} src={user.photoURL} />
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
