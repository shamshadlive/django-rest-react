import React, { useEffect, useState } from 'react'
import axios from 'axios'

function UserProfile() {

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
            setUserDetails(res.data)
          })
    }
    catch (error) {
      console.log(error);
      
    }

  };

 const [userDetails, setUserDetails] = useState(null)
  useEffect(() => {
    fetchUserData();
  
  }, [])
  






  return (
    <section className="" style={{backgroundColor: '#eee'}}>
  <div className="container py-5 ">
    <div className="row d-flex justify-content-center align-items-center ">
      <div className="col-md-12 col-xl-4">

        <div className="card" style={{borderRadius:'15px'}}>
          <div className="card-body text-center">
            <div className="mt-3 mb-4">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                className="rounded-circle img-fluid" style={{width: '100px'}} alt='img'/>
            </div>
            <h4 className="mb-2">{userDetails?.first_name}</h4>
            <p className="text-muted mb-1">{userDetails?.email} <span className="mx-2"></span> </p>
            <p className="text-muted mb-2">{userDetails?.phone_number} <span className="mx-2"></span> </p>
        
            
            <button type="button" className="btn btn-primary btn-rounded btn-lg">
              Update Profile Pic
            </button>
          
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
  )
}

export default UserProfile