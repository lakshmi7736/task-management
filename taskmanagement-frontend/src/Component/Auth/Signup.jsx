import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import IfAccountHolder from './IfAccountHolder';
import { useDispatch } from 'react-redux';
import { register } from '../../ReduxToolKit/AuthSlice';

const Signup = ({togglepanel}) => {

    const dispatch=useDispatch();

    const [formData,setFormData]=useState({
        fullName:"",
        email:"",
        password:""
    })
const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formData,[name]:value})
}

const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(register(formData));
    console.log("login form",formData)
}

  return (
    <div>
        <h1 className='text-lg font-bold text-center pb-8'>Register</h1>
        <form className='space-y-3' onSubmit={handleSubmit}>

        <TextField
            fullWidth
            label="Full name"
            name='fullName'
            type='text'
            value={formData.fullName}
            onChange={handleChange}
            placeholder='Enter you full name..'
            />

            <TextField
            fullWidth
            label="Email"
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='Enter you email..'
            />
             <TextField
            fullWidth
            label="Password"
            name='password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='Enter you password..'
            />

            <div>
               <Button fullWidth
               sx={{padding:".9rem"}} className='customeButton' type='submit' >
                Register</Button>
              </div> 
        </form>
        
        <IfAccountHolder togglepanel={togglepanel} />     
    </div>
  )
}


export default Signup
