import React from 'react'
import {Outlet,Navigate} from "react-router-dom"
import { UserAuth } from '../../context/AuthContex';

const HandleUser = () => {
  const { user,isLoggedOut } = UserAuth();
  
  return !isLoggedOut ? <Outlet/> : <Navigate to={"/register"} />;
}

export default HandleUser