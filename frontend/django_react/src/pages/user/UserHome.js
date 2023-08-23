import React from 'react'

import { useSelector } from 'react-redux'

function UserHome() {

  const authentication_user = useSelector(state => state.authentication_user)
 
  return (
    <div className="card">
      <div className="card-body">
        <h4>
          {authentication_user.isAuthenticated?<>Welcome Back {authentication_user.name} ! </>:<>Login to edit profile</>}
        </h4>
      </div>
    </div>
  )
}

export default UserHome