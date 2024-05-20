import React from 'react'
import LaunchIcon from '@mui/icons-material/Launch';
import { Button, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const SubmissionCard = () => {

    const handleAcceptDecline=(status)=>{
        console.log(status)
    }

  return (
    <div className='rounded-md bg-black p-5 flex items-center justify-between'>
        <div className='space-y-2'>
            <div className='flex items-center gap-2'>
                <span>Git hub :</span>
                <div className='flex items-center gap-2 text-[#c24dd0]'>
                    <LaunchIcon />
                    <a href="/" target="_blank" rel="noopener noreferrer">Go To Link</a>
                </div>
            </div>
            <div className='flex items-center gap-2 text-xs'>
                <p>Submission Time:</p>
                <p className=' text-gray-400 '>11:223:9830</p>
            </div>
        </div>
      <div>
        {
           true?<div className='flex gap-5'>
            <div className='text-green-500'>
                <IconButton color='success' onClick={()=>handleAcceptDecline("ACCEPTED")}>
                    <CheckIcon />
                </IconButton>
            </div>

            <div className='text-red-500'>
                <IconButton color='error' onClick={()=>handleAcceptDecline("DECLINED")}>
                    <CloseIcon />
                </IconButton>
            </div>

           </div> :<Button color={true?"success":"error"} size='small' variant='outlined'>Accept</Button>
        }
      </div>
    </div>
  )
}

export default SubmissionCard
