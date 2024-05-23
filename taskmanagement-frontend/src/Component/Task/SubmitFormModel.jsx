
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {  Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { submitTask } from '../../ReduxToolKit/SubmissionSlice';
import { fetchTasksById } from '../../ReduxToolKit/TaskSlice';
import store from '../../ReduxToolKit/Store';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function SubmitFormModel({item,handleClose,open}) {

  const dispatch=useDispatch();
  const {task}=useSelector(store=>store);

const [formData,setFormData]=useState({
  gitHubLink:"",
  description:"",
})

const handleChange=(e)=>{
const {name,value} = e.target;
setFormData({
  ...formData,
  [name]:value,
});
};



const handleSubmit=(e)=>{
e.preventDefault();
console.log(formData);
dispatch(submitTask({taskId:item.id, gitHubLink:formData.gitHubLink}));
handleClose();
}

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField label="Github Link" 
                fullWidth name='gitHubLink'
                 value={formData.gitHubLink} onChange={handleChange} />
              </Grid>


              <Grid item xs={12}>
                <TextField label="Description" 
                fullWidth name='description'
                multiline
                rows={4}
                 value={formData.description} onChange={handleChange} />
              </Grid>

              <Grid item xs={12}>
               <Button fullWidth
               sx={{padding:".9rem"}} className='customeButton' type='submit' >
                submit</Button>
              </Grid> 
                
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

