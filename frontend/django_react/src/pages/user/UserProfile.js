import React, { useEffect, useState } from 'react'
import axios from 'axios'
import userimg from '../../images/user.png'
import { set_Authentication } from "../../Redux/authentication/authenticationSlice"; 
import { useDispatch ,useSelector} from 'react-redux';

function UserProfile() {

  const dispatch = useDispatch();
  const authentication_user = useSelector(state => state.authentication_user)

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

  const [userUpdateDetails, setUserUpdateDetails] = useState({
    image:null
  })

  const handleImageChange = (e) => {
    setUserUpdateDetails({
      image: e.target.files[0]
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userUpdateDetails);
    let form_data = new FormData();
    form_data.append('profile_pic', userUpdateDetails.image, userUpdateDetails.image.name);
    let url = baseURL+'/api/accounts/user/details/update';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data',
        'authorization': `Bearer ${token}`,
      }
    })
        .then(res => {
          dispatch(
            set_Authentication({
              name: '',
              isAuthenticated: false
            })
          );

        })
        .catch(err => console.log(err))
 

  }

 const [userDetails, setUserDetails] = useState(null)
  useEffect(() => {
    fetchUserData();
  
  }, [authentication_user])
  






  return (
    <section className="" style={{backgroundColor: '#eee'}}>
  <div className="container py-5 ">
    <div className="row d-flex justify-content-center align-items-center ">
      <div className="col-md-12 col-xl-4">

        <div className="card" style={{borderRadius:'15px'}}>
          <div className="card-body text-center">
            <div className="mt-3 mb-4">
              <img src={userDetails?userDetails.profile_pic?userDetails.profile_pic:userimg:userimg}
                className="rounded-circle img-fluid" style={{width: '100px'}} alt='img'/>
            </div>
            <h4 className="mb-2">{userDetails?.first_name}</h4>
            <p className="text-muted mb-1">{userDetails?.email} <span className="mx-2"></span> </p>
            <p className="text-muted mb-2">{userDetails?.phone_number} <span className="mx-2"></span> </p>
        
            
            <form onSubmit={handleSubmit}>

            <input type="file"
                   id="image"
                   accept="image/png, image/jpeg" className='form-control my-2'  onChange={handleImageChange} required/>

            <button type="submit" className="btn btn-primary btn-rounded btn-lg">
              Update Profile Pic
            </button>

          
         

            </form>
          
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
  )
}

export default UserProfile