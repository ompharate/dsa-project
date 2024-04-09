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
      console.log(result);
      const { displayName, email, uid, photoURL } = result.user;
      const formData = {
        uid: uid,
        photoURL: photoURL,
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
      <div className="flex flex-col gap-4 max-w-xl p-4 mx-auto justify-center items-center mt-10 bg-slate-300 rounded-xl">
        <h1 className="font-bold text-3xl p-3 ">Teacher Register</h1>

        <div className="flex flex-col gap-1">
          <button
            onClick={(e) => registerUserGoogle(event, "teacher")}
            className="bg-red-500 p-3 rounded-md text-white font-medium "
          >
            Google+
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
