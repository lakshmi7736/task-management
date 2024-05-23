import React, { useState } from 'react';
import './Auth.css';
import Signin from './Signin';
import Signup from './Signup';

const Auth = () => {
  const [isregister, setisRegister] = useState(false);
  const togglepanel = () => {
    setisRegister(!isregister);
  };

  return (
    <div className='flex justify-center h-screen items-center overflow-hidden'>
      <div className='box lg:max-w-4xl'>
        <div className={`cover ${isregister ? "rotate-active" : ""}`}> 
          <div className='front'>
            <img 
              src='https://t3.ftcdn.net/jpg/06/18/82/72/360_F_618827274_hQW3dUo4ErEIo7sWH6YV8EZU7cff6rKe.jpg' 
              alt='' 
            />
            <div className='text'>
              <span className='text-1'>Success is built upon well-organized tasks</span>
              <span className='text-2 text-xs'>Let's get connected</span>
            </div>
          </div>
          <div className='back'>
            <img 
              src='https://www.mooc.org/hubfs/applications-of-computer-programming.jpg' 
              alt='' 
            />
          </div>
        </div>
        <div className='forms h-full'>
          <div className='form-content h-full'>
            <div className='login-form'>
              <Signin togglepanel={togglepanel} />
            </div>
            <div className='signup-form'>
              <Signup togglepanel={togglepanel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
