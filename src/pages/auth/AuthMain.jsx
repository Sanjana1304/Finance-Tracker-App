import React from 'react';
import {SignedIn,SignedOut,SignInButton,SignUpButton} from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const AuthMain = () => {
  return (
    <div className='sign-in-app background-image'>
    
      <SignedOut>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="container text-center">
          <div className="row">
            <div className="col-12"><h1 className='mb-5 fw-bold'>Finance Tracker</h1></div>
            <div className="col-12"><img src={`${process.env.PUBLIC_URL}/logicon.jpg`} alt="logo" className='mb-5 logo-img'/></div>
            <div className="col-12"><SignUpButton mode='modal' className='sign-btn'/></div>
            <div className="col-12"><SignInButton mode='modal'className='sign-btn'/></div>
            
          </div>
        </div>
      </div>
      </SignedOut>
      
      <SignedIn>
        <Navigate to="/"/>
      </SignedIn>
      
      
    </div>
  )
}

export default AuthMain