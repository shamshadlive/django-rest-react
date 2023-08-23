import React, { useEffect, useState } from 'react'
import { Link ,useLocation,useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { set_Authentication } from '../../Redux/authentication/authenticationSlice';
import jwt_decode from "jwt-decode";


function UserLogin() {
  const { state } = useLocation();
  const [message, setmessage] = useState(null)
  const [formError, setFormError] = useState([])
  const baseURL='http://127.0.0.1:8000'

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if(state){
      setmessage(state)
    }
    
    navigate('', {}); 
    
  }, [state,navigate])


  const handleLoginSubmit = async(event)=> {
    event.preventDefault();
    setFormError([])
    const formData = new FormData();
    formData.append("email", event.target.email.value);
    formData.append("password", event.target.password.value);
    try {
      const res = await axios.post(baseURL+'/api/accounts/login/', formData)
      if(res.status === 200){
        localStorage.setItem('access', res.data.access)
        localStorage.setItem('refresh', res.data.refresh)
        dispatch(
          set_Authentication({
            name: jwt_decode(res.data.access).first_name,
            isAuthenticated: true
          })
        );
        navigate('/')
        return res
      }  
      
    }
    catch (error) {
      console.log(error);
      if (error.response.status===401)
      {
       
        setFormError(error.response.data)
      }
      else
      {
        console.log(error);
  
      }
    }
  }
  

  return (
    <section >
  <div className="container py-5">
    <div className="row d-flex align-items-center justify-content-center">
      <div className="col-md-8 col-lg-7 col-xl-6">
      {message && <div class="alert alert-primary" role="alert" data-mdb-color="dark">
      {message}
      </div>}
      

        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="img-fluid" alt="Phone "/>
      </div>
      <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
        <form method='POST' onSubmit={handleLoginSubmit}>
          {/* <!-- Email input --> */}
          <div className=" mb-4">
            <input type="email" name='email' id="form1Example13" className="form-control form-control-lg" />
            <label className="form-label" htmlFor="form1Example13">Email address</label>
          </div>

          {/* <!-- Password input --> */}
          <div className=" mb-4">
            <input type="password" name='password' id="form1Example23" className="form-control form-control-lg" />
            <label className="form-label" htmlFor="form1Example23">Password</label>
          </div>

          <div className="d-flex justify-content-around align-items-center mb-4">
           
            <Link to='/register'>Not Have Account?</Link>
          </div>

          {/* <!-- Submit button --> */}
          <button type="submit" className="btn btn-primary btn-lg btn-block">Sign in</button>

          <ul className='text-danger'>
             {formError['detail'] && <li>
             {formError['detail']}
              </li>}
            </ul>
          
        </form>
      </div>
    </div>
  </div>
</section>
  )
}

export default UserLogin