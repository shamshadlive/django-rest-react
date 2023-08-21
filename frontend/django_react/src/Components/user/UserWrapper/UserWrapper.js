import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import UserHeader from "../UserHeader/UserHeader";
import UserFooter from "../UserFooter/UserFooter";
import UserHome from "../../../pages/user/UserHome";
import UserProfile from "../../../pages/user/UserProfile";
import UserRegister from "../../../pages/user/UserRegister";
import UserLogin from "../../../pages/user/UserLogin";
import PrivateRoute from "../../PrivateRoute";
import isAuthUser from "../../../utils/isAuthUser";
import { useDispatch,useSelector } from 'react-redux';
import { set_User } from "../../../Redux/userBasic/userBasicSlice";


function UserWrapper() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  const checkAuth = async () => {
    const isAuthenticated = await isAuthUser();
    dispatch(
      set_User({
        name: isAuthenticated.name,
        isAuthenticated: isAuthenticated.isAuthenticated
      })
    );

  };

  useEffect(() => {
    if(!user.name)
    {
     
      checkAuth();
    }

  }, [user])
  

  return (
    <>
   
    <UserHeader/>
      <Routes>
          <Route  path="/" element={<UserHome/>}></Route>

          <Route  path="login" element={<UserLogin/>}></Route>
          <Route  path="register" element={<UserRegister/>}></Route>

          <Route  path="profile" element={
            <PrivateRoute>
                <UserProfile/>
          </PrivateRoute>
          }>

          </Route>

        </Routes>    
      <UserFooter/>
    
    </>
  );
}

export default UserWrapper;
