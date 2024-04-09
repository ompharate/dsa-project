import React from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContex";
const Home = () => {
  const { user } = UserAuth();
  const { isLoggedOut } = UserAuth();
  return (
    <div className="">
      {/* <p>Welcome to Student Management System</p> */}
      <div className="p-3 flex flex-row items-center max-w-7xl mx-auto mt-10">
        <p className="text-wrap font-medium text-xl">
          Welcome <span className="underline"> {user?.teacherName} </span>to Our
          Student Management System Dear Students, Faculty, and Administrators,
          We are delighted to welcome you to our Student Management System, a
          centralized platform designed to streamline and enhance the
          educational experience for all members of our academic community.
        </p>
        <img className="" width={500} src="/student.png" />
      </div>

      <div className="text-center">
        {isLoggedOut ? (
          <>
            <Link to={"/login"}>
              <button className="bg-blue-500 p-3 rounded-md text-white font-medium m-2">
                Login
              </button>
            </Link>
            <Link to={"/register"}>
              <button className="bg-blue-500 p-3 rounded-md text-white font-medium m-2">
                Register
              </button>
            </Link>
          </>
        ) : (
          <Link to={"/teacher/dashboard"}>
            <button className="bg-blue-500 p-3 rounded-md text-white font-medium m-2">
              Dashboard
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
