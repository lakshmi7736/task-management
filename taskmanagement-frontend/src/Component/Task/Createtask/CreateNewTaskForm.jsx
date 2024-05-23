
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useDispatch } from 'react-redux';
import { createTask } from '../../../ReduxToolKit/TaskSlice';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline:"none",
  boxShadow: 24,
  p: 4,
};

const tags=["Angular","React","Mern","Mean","Spring boot"];

export default function CreateNewTaskForm({handleClose,open}) {
  const dispatch=useDispatch();
const [formData,setFormData]=useState({
  title:"",
  image:"",
  description:"",
  tags:[],
  deadline: new Date(),
})

const handleChange=(e)=>{
const {name,value} = e.target;
setFormData({
  ...formData,
  [name]:value,
});
};

const [selectedTags,setSelectedTags]=useState([]);

const handletagsChange=(event,value)=>{
  setSelectedTags(value);
}

const handleDeadlineChange=(date)=>{
setFormData({
  ...formData,
  deadline:date

})
}

const handleSubmit=(e)=>{
e.preventDefault();
const {deadline}=formData;
formData.deadline=formatDate(deadline);
formData.tags=selectedTags;
dispatch(createTask(formData));
console.log(formData);
handleClose();
}

// to change date and time as in Db
const formatDate=(input)=>{
  let{
    $y: year,
    $M: month,
    $D: day,
    $H: hours,
    $m: minutes,
    $s: seconds,
    $ms: milliseconds,
  }=input;
  const date=new Date(year,month,day,hours,minutes,seconds,milliseconds);
  const formatedDate=date.toISOString();
  return formatedDate;
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
                <TextField label="Title" 
                fullWidth name='title'
                 value={formData.title} onChange={handleChange} />
              </Grid>

              <Grid item xs={12}>
                <TextField label="Image" 
                fullWidth name='image'
                 value={formData.image} onChange={handleChange} />
              </Grid>

              <Grid item xs={12}>
                <TextField label="Description" 
                fullWidth name='description'
                multiline
                rows={4}
                 value={formData.description} onChange={handleChange} />
              </Grid>
              

              <Grid item xs={12}>
                <Autocomplete multiple id='multiple-limit-tags'
                 options={tags} 
                 onChange={handletagsChange} 
                 getOptionLabel={(option)=>option}
                 renderInput={(params)=>
                  <TextField label="Tags" 
                fullWidth {...params}
                 />
                 }
                 />

               <Grid item xs={12}>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker onChange={handleDeadlineChange} label="Deadline" renderInput={(params)=><TextField {...params} /> } />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid> 

              <Grid item xs={12}>
               <Button fullWidth
               sx={{padding:".9rem"}} className='customeButton' type='submit' >
                Create</Button>
              </Grid> 
                
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

