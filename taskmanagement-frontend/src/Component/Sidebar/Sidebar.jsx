import { Avatar, Button } from '@mui/material'
import './Sidebar.css'
import React, { useState } from 'react'

const menu=[
    {name:"Home",value:"Home",role:["ROLE_ADMIN","ROLE_USER"]},
    {name:"DONE",value:"DONE",role:["ROLE_ADMIN","ROLE_USER"]},
    {name:"ASSIGNED",value:"ASSIGNED",role:["ROLE_ADMIN"]},
    {name:"NOT ASSIGNED",value:"pending",role:["ROLE_ADMIN"]},
    {name:"Create new task",value:"",role:["ROLE_ADMIN"]},
    {name:"Notification",value:"NOTIFICATION",role:["ROLE_USER"]}

]

const role="ROLE_ADMIN";

const Sidebar = () => {
    const [activeMenu,setActiveMenu]=useState("Home");
    const handleMenuChange=(item)=>{
        setActiveMenu(item.name);
    }

    const handleLogout=()=>{
        console.log("logout");
    }
  return (
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
                    <p onClick={()=>handleMenuChange(item)} className={`py-3 px-5 rounded-full text-center cursor-pointer ${activeMenu===item.name?"activeMenuItem":"menuItem"}`}>
                        {item.name}
                    </p>
                    )
                }
                <Button onClick={handleLogout} sx={{padding:".7rem",borderRadius:"2rem"}} fullWidth className='logoutButton'>
                    logout
                </Button>
                        </div>
      
    </div>
  )
}

export default Sidebar
