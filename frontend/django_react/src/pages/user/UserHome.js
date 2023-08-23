import React from 'react'

import { useSelector } from 'react-redux'

function UserHome() {

  const authentication_user = useSelector(state => state.authentication_user)
 
  return (
    // <div className="card">
    //   <div className="card-body">
    //     <h4>
    //       {authentication_user.isAuthenticated?<>Welcome Back {authentication_user.name} ! </>:<>Login to edit profile</>}
    //     </h4>
    //   </div>
    // </div>
<div className="row my-4 mx-4">
  <div className="col-md-6 mb-4">
    <div className="bg-image hover-overlay ripple shadow-2-strong rounded-5" data-mdb-ripple-color="light">
      <img src="https://mdbcdn.b-cdn.net/img/new/slides/080.webp" className="img-fluid" />
      <a href="#!">
        <div className="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.15)'}}></div>
      </a>
    </div>
  </div>

  <div className="col-md-6 mb-4">
    <span className="badge bg-danger px-2 py-1 shadow-1-strong mb-3">{authentication_user.isAuthenticated?<>Welcome Back {authentication_user.name} ! </>:<>Hello Guest User</>}</span>
    <h4><strong>Home Page </strong></h4>
    <p className="text-muted">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis consequatur
      eligendi quisquam doloremque vero ex debitis veritatis placeat unde animi laborum
      sapiente illo possimus, commodi dignissimos obcaecati illum maiores corporis.
    </p>
    <button type="button" className="btn btn-primary">{authentication_user.isAuthenticated?<>Go To Profile  ! </>:<>Login To Read More</>}</button>
  </div>
</div>

  )
}

export default UserHome