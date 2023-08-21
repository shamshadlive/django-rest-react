import React from 'react'

import { useSelector } from 'react-redux'

function UserHome() {

  const user = useSelector(state => state.user)
 
  return (
    <div className="card">
      <div className="card-body">
        <h4>
          {user.isAuthenticated?<>Welcome Back {user.name} ! </>:<>Login to edit profile</>}
        </h4>
      </div>
    </div>
  )
}

export default UserHome