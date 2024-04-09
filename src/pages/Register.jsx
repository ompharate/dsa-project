import React, { useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/config";
import { useAddUsers } from "../hooks/useAddUsers";
import { UserAuth } from "../context/AuthContex";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const { isLoggedOut } = UserAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedOut) {
      navigate("/teacher/dashboard");
    }
  }, [isLoggedOut, navigate]);

  const { addToDb } = useAddUsers();
  const registerUserGoogle = async (e, userType) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, uid } = result.user;
      const formData = {
        uid: uid,
        teacherName: displayName,
        teacherEmail: email,
        type: userType,
      };
      await addToDb({
        formData,
        CollectionName: userType,
      });
    } catch (error) {
      console.log(`error from register ${userType}->`, error);
    }
  };
  return (
    <div>
      <div className="flex flex-row  p-10 gap-40 max-w-7xl mx-auto justify-center items-center mt-10">
        <form className="flex flex-col gap-2 justify-center bg-slate-300 h-[450px] p-12 rounded-2xl">
          <h1 className="font-bold text-3xl p-3 ">Teacher Register</h1>
          <input
            className="bg-slate-200  text-sm rounded-lg placeholder:text-black  p-3 font-semibold w-96"
            type="text"
            name="name"
            placeholder="name"
          />
          <input
            className="bg-slate-200  text-sm rounded-lg placeholder:text-black  p-3 font-semibold w-96"
            type="text"
            name="email"
            placeholder="email"
          />

          <input
            className="bg-slate-200 text-sm  rounded-lg placeholder:text-black  p-3 font-semibold w-96"
            type="text"
            name="password"
            placeholder="password"
          />
          <div className="flex flex-col gap-1">
            <button
              onClick={(e) => registerUserGoogle(event, "teacher")}
              className="bg-red-500 p-3 rounded-md text-white font-medium "
            >
              Google+
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
