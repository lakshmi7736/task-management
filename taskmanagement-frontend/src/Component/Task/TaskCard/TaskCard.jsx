import React, { useState } from 'react'
import './TaskCard.css'
import { IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserList from '../../User/UserList';
import SubmissionList from '../Submission/SubmissionList';
import EditTaskForm from './EditTaskForm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../../../ReduxToolKit/TaskSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import SubmitFormModel from '../SubmitFormModel';
import store from '../../../ReduxToolKit/Store';

const TaskCard = ({item}) => {
    const {auth}= useSelector(store=>store);


    const dispatch=useDispatch();
    const location= useLocation();
    const navigate= useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    // handling three dots menu click
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
    // End of handling three dots menu click



    // HANDLE USER LIST
    const [openUserList,setOpenuserList]=useState(false);
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
        // const updatedParams=new URLSearchParams(location.search);
        setOpenUpdateTaskForm(true);
        // updatedParams.set("taskId",item.id);
        // navigate(`${location.pathname}?${updatedParams.toString()}`)
        handleMenuClose();
    }

    const handleCloseUpdateTaskForm=()=>{
        setOpenUpdateTaskForm(false);
    }

    // HANDLE DELETE TASK
    const handleDeleteTask=()=>{
        dispatch(deleteTask(item.id));
        handleMenuClose();
    }

    // HANDLE SUBMIT
    const [openSubmitFormModel,setOpenSubmitFormModel]=useState(false);

    const handleOpenSubmitFormModel=()=>{
        setOpenSubmitFormModel(true);
        handleMenuClose();
    }

    const handleCloseSubmitFormModel=()=>{
        setOpenSubmitFormModel(false);
    }





  return (
    <div>
        <div className="card lg:flex justify-between ">
        <div className="lg:flex gap-5 items-center space-y-2 w-[90%] lg:w-[70%]">
            <div className=''>
                <img className='lg:w-[7rem] lg:h-[7rem] object-cover' src={item.image} alt='' />
            </div>
            <div className='space-y-5'>
                <div className='space-y-2'>
                    <h1 className='font-bold text-lg '>{item.title}</h1>
                    <p className='text-gray-500 text-sm'>{item.description}</p>
                </div>
                <div className='flex flex-wrap gap-2 items-center'>
                    {item.tags.map((item)=><span className='py-1 px-5 rounded-full techStack'>
                    {item}
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
            auth.user?.role==='ROLE_ADMIN'?<>
        <MenuItem onClick={handleOpenUserList}>Assigned User</MenuItem>
        <MenuItem onClick={handleOpenSubmissionList}>See submissions</MenuItem>
        <MenuItem onClick={handleOpenUpdateTaskModel}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
            </>:
            (<>
             <MenuItem onClick={handleOpenSubmitFormModel}>submit</MenuItem>
                </>)
        }
      </Menu>
            </div>
        </div>   
        <UserList item={item} open={openUserList} handleClose={handleCloseUserList} /> 
        <SubmissionList item={item} open={openSubmissionList} handleClose={handleCloseSubmissionList} />
        <EditTaskForm item={item} open={openUpdateTaskForm} handleClose={handleCloseUpdateTaskForm} />
        <SubmitFormModel item={item}  open={openSubmitFormModel} handleClose={handleCloseSubmitFormModel} />


    </div>
  )
}

export default TaskCard
