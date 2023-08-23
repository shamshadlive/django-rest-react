import React from 'react'
import { Routes, Route } from "react-router-dom";
import AdminHeader from '../AdminHeader/AdminHeader';
import AdminFooter from '../AdminFooter/AdminFooter';
import AdminHome from '../../../pages/admin/AdminHome';
import AdminLogin from '../../../pages/admin/AdminLogin';
import AdminPrivateRoute from '../../AdminPrivateRoute';

function AdminWrapper() {
  return (
    <>
    
    <AdminHeader/>
      <AdminPrivateRoute>
      <Routes>
          <Route  path="/" element={<AdminHome/>}></Route>

          <Route  path="login" element={<AdminLogin/>}></Route>
    

        </Routes>    
      </AdminPrivateRoute>
      <AdminFooter/>
   </>

  )
}

export default AdminWrapper