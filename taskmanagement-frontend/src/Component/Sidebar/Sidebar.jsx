import { Avatar, Button } from '@mui/material'
import './Sidebar.css'
import React, { useState } from 'react'
import CreateNewTaskForm from '../Task/Createtask/CreateNewTaskForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../ReduxToolKit/AuthSlice';
import store from '../../ReduxToolKit/Store';

const menu=[
    {name:"Home",value:"Home",role:["ROLE_ADMIN","ROLE_USER"]},
    {name:"DONE",value:"DONE",role:["ROLE_ADMIN","ROLE_USER"]},
    {name:"ASSIGNED",value:"ASSIGNED",role:["ROLE_ADMIN"]},
    {name:"NOT ASSIGNED",value:"PENDING",role:["ROLE_ADMIN"]},
    {name:"MANAGE USER'S",value:"",role:["ROLE_ADMIN"]},
    {name:"Create new task",value:"",role:["ROLE_ADMIN"]},
    {name:"Notification",value:"NOTIFICATION",role:["ROLE_USER"]}

]



const Sidebar = () => {

    const {auth}=useSelector(store=>store)


    const role=auth.user.role;
    const dispatch=useDispatch();

    const location=useLocation();
    const navigate=useNavigate();

    const [activeMenu,setActiveMenu]=useState("Home");

    // HANDLE MENU CHANGE
    const handleMenuChange=(item)=>{
        const updatedParams= new URLSearchParams(location.search);
        if(item.name==="Create new task"){
            handleOpenCreateTaskModel();
        }
        else if(item.name=="Home"){
            updatedParams.delete("filter");
            const queryString = updatedParams.toString();
            const updatedPath=queryString? `${location.pathname}?${queryString}`:location.pathname;
            navigate(updatedPath);
        }
        else{
            updatedParams.set("filter",item.value);
            navigate(`${location.pathname}?${updatedParams.toString()}`)
        }
        setActiveMenu(item.name);
    }

    const handleLogout=()=>{
        dispatch(logout());
        console.log("logout");
    }

         // HANDLE CREATE TASK FORM
         const [openCreateTaskForm,setOpenCreateTaskForm]=useState(false);

         const handleOpenCreateTaskModel=()=>{
          setOpenCreateTaskForm(true);
          }
        const handleCloseCreateTaskForm=()=>{
          setOpenCreateTaskForm(false);
         }
    
  return (
    <>
    <div className='card min-h-[85vh] flex flex-col justify-center fixed w-[20vw]'>
        <div className='space-y-5 h-full'>
            <div className='flex justify-center'>
            <Avatar
            sx={{width:"8rem",height:"8rem"}}
            className='border-2 border-[#c24dd0]'
             src='https://p16-capcut-sign-va.ibyteimg.com/tos-alisg-v-643f9f/oIPAyiMIrAAyiXN1zxrDBZYzB4AXESAkCBELY~tplv-nhvfeczskr-1:250:0.webp?lk3s=44acef4b&x-expires=1743052918&x-signature=RsMMkmTq2W8dEl%2FLfpSzBGArZuQ%3D' />
            </div>
                {
                    menu.filter((item)=>item.role.includes(role))
                    .map((item)=>
                    <p onClick={()=>handleMenuChange(item)} className={`py-3 px-5 rounded-full text-center cursor-pointer
                     ${activeMenu===item.name?"activeMenuItem":"menuItem"}`}>
                        {item.name}
                    </p>
                    )
                }
                <Button onClick={handleLogout} sx={{padding:".7rem",borderRadius:"2rem"}} fullWidth className='logoutButton'>
                    logout
                </Button>
             </div>  
    </div>
    <CreateNewTaskForm open={openCreateTaskForm} handleClose={handleCloseCreateTaskForm} />
    </>
    
  )
}

export default Sidebar
