
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminFooter from '../AdminFooter/AdminFooter';
import AdminHome from '../../../pages/admin/AdminHome';
import AdminLogin from '../../../pages/admin/AdminLogin';
import AdminPrivateRoute from '../../AdminPrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { set_Authentication } from '../../../Redux/authentication/authenticationSlice';
import { set_user_basic_details } from '../../../Redux/userBasicDetails/userBasicDetailsSlice';
import axios from 'axios';
import isAuthAdmin from '../../../utils/isAuthAdmin';
import AdminCreateUser from '../../../pages/admin/AdminCreateUser';
import AdminUpdateUser from '../../../pages/admin/AdminUpdateUser';

function AdminWrapper() {
  const dispatch = useDispatch();
  const authentication_user = useSelector(state => state.authentication_user);

  const baseURL = 'http://127.0.0.1:8000';
  const token = localStorage.getItem('access');

  const checkAuthAndFetchUserData = async () => {
    try {
      const isAuthenticated = await isAuthAdmin();
      dispatch(
        set_Authentication({
          name: isAuthenticated.name,
          isAuthenticated: isAuthenticated.isAuthenticated,
          isAdmin: isAuthenticated.isAdmin,
        })
      );

      if (isAuthenticated.isAuthenticated) {
        const res = await axios.get(baseURL + '/api/accounts/user/details/', {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        dispatch(
          set_user_basic_details({
            name: res.data.first_name,
            profile_pic: res.data.profile_pic,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!authentication_user.name) {
      checkAuthAndFetchUserData();
    }
  }, []);

  return (
    <>
      <AdminHeader />
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route path="/" element={<AdminPrivateRoute><AdminHome /></AdminPrivateRoute>} />
        <Route path="/user/create" element={<AdminPrivateRoute><AdminCreateUser /></AdminPrivateRoute>} />
        <Route path="/user/update/:id" element={<AdminPrivateRoute><AdminUpdateUser /></AdminPrivateRoute>} />
      </Routes>
      <AdminFooter />
    </>
  );
}

export default AdminWrapper;
