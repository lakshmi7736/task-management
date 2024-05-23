
    import Box from '@mui/material/Box';
    import Typography from '@mui/material/Typography';
    import Modal from '@mui/material/Modal';
import { Avatar, Button, Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../../ReduxToolKit/AuthSlice';
import store from '../../ReduxToolKit/Store';
import { assignedTaskToUser } from '../../ReduxToolKit/TaskSlice';
import { useEffect } from 'react';
    
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      outline:"none",
      boxShadow: 24,
      p: 2,
    };

    const tasks=[1,1,1,1];
    
    export default function UserList({item,handleClose,open}) {
      const dispatch=useDispatch();
      const {auth}=useSelector(store=>store)
      useEffect((item)=>{
        dispatch(getUserList(localStorage.getItem("jwt")));
        handleClose();
      },[])

      const handleAssignedTask=(user)=>{
        dispatch(assignedTaskToUser({userId:user.id,taskId:item.id}));
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
              {
                auth.users.map((item,index)=>
                    <>
                     <div className='flex items-center justify-between w-full'>
                    <div>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src='https://p16-capcut-sign-va.ibyteimg.com/tos-alisg-v-643f9f/oIPAyiMIrAAyiXN1zxrDBZYzB4AXESAkCBELY~tplv-nhvfeczskr-1:250:0.webp?lk3s=44acef4b&x-expires=1743052918&x-signature=RsMMkmTq2W8dEl%2FLfpSzBGArZuQ%3D' />
                            </ListItemAvatar>
                            <ListItemText primary={item.fullName} secondary={`@${item.fullName.split(" ").join("_").toLowerCase()}`} />
                        </ListItem>
                    </div>
                    <div>
                        <Button onClick={()=>handleAssignedTask(item)} className='customeButton'>select</Button>
                    </div>
                </div>
                {index!==tasks.length-1 && <Divider />}
             </>
               
               
                )
              }
            </Box>
          </Modal>
        </div>
      );
    }
    