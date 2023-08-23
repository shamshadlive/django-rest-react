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
import { set_Authentication } from "../../../Redux/authentication/authenticationSlice"; 
import { set_user_basic_details } from "../../../Redux/userBasicDetails/userBasicDetailsSlice"; 
import axios from 'axios'


function UserWrapper() {
  const dispatch = useDispatch();

  const authentication_user = useSelector(state => state.authentication_user)
  

  const checkAuth = async () => {
    const isAuthenticated = await isAuthUser();
    dispatch(
      set_Authentication({
        name: isAuthenticated.name,
        isAuthenticated: isAuthenticated.isAuthenticated
      })
    );

    

  };

  const baseURL='http://127.0.0.1:8000'
  const token = localStorage.getItem('access');

  const fetchUserData = async () => {
    try {
        // const res = await axios.post(baseURL+'/api/accounts/user/details/',{headers: {Authorization: `Bearer ${token}`}})
        const res = await axios.get(baseURL+'/api/accounts/user/details/',{headers: {
          'authorization': `Bearer ${token}`,
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }})
        .then(res => {
            
            dispatch(
              set_user_basic_details({
                name : res.data.first_name,
                profile_pic : res.data.profile_pic
              })
            );
          })
    }
    catch (error) {
      console.log(error);
      
    }

  };


  useEffect(() => {
    if(!authentication_user.name)
    {
     
      checkAuth();
    
    }
    if(authentication_user.isAuthenticated)
    {
      fetchUserData();
    }

  }, [authentication_user])
  

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
