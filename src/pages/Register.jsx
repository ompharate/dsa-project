import React from "react";

const Register = () => {
  return (
    <div>
      <div className="flex flex-row  p-10 gap-40 max-w-7xl mx-auto justify-center items-center mt-10">
        <form className="flex flex-col gap-2 justify-center bg-slate-300 h-[450px] p-12 rounded-2xl">
          <h1 className="font-bold text-3xl p-3 ">Admin Register</h1>
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
            <button className="bg-blue-500 p-3 rounded-md text-white font-medium ">
              Register
            </button>
            <button className="bg-red-500 p-3 rounded-md text-white font-medium ">
              Google+
            </button>
          </div>
        </form>
        <form className="flex flex-col gap-2 justify-center bg-slate-300 h-[450px] p-12 rounded-2xl">
          <h1 className="font-bold text-3xl p-3">Student Register</h1>
          <input
            className="bg-slate-200 text-sm  rounded-lg placeholder:text-black  p-3 font-semibold w-96"
            type="text"
            name="name"
            placeholder="name"
          />
          <input
            className="bg-slate-200 text-sm  rounded-lg placeholder:text-black  p-3 font-semibold w-96"
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
            <button className="bg-blue-500 p-3 rounded-md text-white font-medium ">
              Register
            </button>
            <button className="bg-red-500 p-3 rounded-md text-white font-medium ">
              Google+
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
