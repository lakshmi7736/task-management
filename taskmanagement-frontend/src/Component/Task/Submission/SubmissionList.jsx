
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SubmissionCard from './SubmissionCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubmissionsByTaskId } from '../../../ReduxToolKit/SubmissionSlice';
import store from '../../../ReduxToolKit/Store';
import { useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function SubmissionList({item,handleClose,open}) {
  const {submission}=useSelector(store=>store);



  
  const dispatch=useDispatch();
  useEffect(()=>{
    if(item.id){
      dispatch(fetchSubmissionsByTaskId(item.id));
    }
  },[item.id])




  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div>
                {
                    submission.submissions.length>0? <div className='space-y-2'>
                        {submission.submissions.map((item)=><SubmissionCard item={item} />)}
                    </div>:<div className=''>
                    <div className='text-center'>
                        No Submissions found
                    </div>
                  </div>
                }
            </div>
            

          
        </Box>
      </Modal>
    </div>
  );
}
