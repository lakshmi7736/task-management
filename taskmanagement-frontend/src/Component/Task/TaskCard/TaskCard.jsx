import React, { useState } from 'react'
import './TaskCard.css'
import { IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserList from '../../User/UserList';
import SubmissionList from '../Submission/SubmissionList';
import EditTaskForm from './EditTaskForm';

const role="ROLE_ADMIN";
const TaskCard = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);

    // handling three dots menu click
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
    // End of handling three dots menu click


    const [openUserList,setOpenuserList]=useState(false);

    // HANDLE USER LIST
    const handleOpenUserList=()=>{
        setOpenuserList(true);
        handleMenuClose();
    }

    const handleCloseUserList=()=>{
        setOpenuserList(false);
    }

    // HANDLE SUBMISSION LIST
    const [openSubmissionList,setOpenSubmissionList]=useState(false);

    const handleOpenSubmissionList=()=>{
        setOpenSubmissionList(true);
        handleMenuClose();
    }

    const handleCloseSubmissionList=()=>{
        setOpenSubmissionList(false);
    }

    // HANDLE EDIT/UPDATE FORM
    const [openUpdateTaskForm,setOpenUpdateTaskForm]=useState(false);

    const handleOpenUpdateTaskModel=()=>{
        setOpenUpdateTaskForm(true);
        handleMenuClose();
    }

    const handleCloseUpdateTaskForm=()=>{
        setOpenUpdateTaskForm(false);
    }

    // HANDLE DELETE TASK
    const handleDeleteTask=()=>{
        handleMenuClose();
    }



  return (
    <div>
        <div className="card lg:flex justify-between ">
        <div className="lg:flex gap-5 items-center space-y-2 w-[90%] lg:w-[70%]">
            <div className=''>
                <img className='lg:w-[7rem] lg:h-[7rem] object-cover' src='https://img.freepik.com/premium-vector/car-rental-logo-template-design_316488-1614.jpg' alt='' />
            </div>
            <div className='space-y-5'>
                <div className='space-y-2'>
                    <h1 className='font-bold text-lg '>Car Rental Website</h1>
                    <p className='text-gray-500 text-sm'>Create a car rental website using latest technologies</p>
                </div>
                <div className='flex flex-wrap gap-2 items-center'>
                    {[1,1,1,1].map((item)=><span className='py-1 px-5 rounded-full techStack'>
                    Angular
                    </span>)}

                </div>

            </div>
        </div>
            <div>
                <IconButton aria-controls={openMenu ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? 'true' : undefined}
        onClick={handleMenuClick}>

                    <MoreVertIcon />
                </IconButton>

                <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {
            role==='ROLE_ADMIN'?<>
        <MenuItem onClick={handleOpenUserList}>Assigned User</MenuItem>
        <MenuItem onClick={handleOpenSubmissionList}>See submissions</MenuItem>
        <MenuItem onClick={handleOpenUpdateTaskModel}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
            </>:<>
            </>
        }
      </Menu>
            </div>
        </div>   
        <UserList open={openUserList} handleClose={handleCloseUserList} /> 
        <SubmissionList open={openSubmissionList} handleClose={handleCloseSubmissionList} />
        <EditTaskForm open={openUpdateTaskForm} handleClose={handleCloseUpdateTaskForm} />


    </div>
  )
}

export default TaskCard
