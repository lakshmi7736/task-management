
    import * as React from 'react';
    import Box from '@mui/material/Box';
    import Typography from '@mui/material/Typography';
    import Modal from '@mui/material/Modal';
import { Avatar, Button, Divider, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
    
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
    
    export default function UserList({handleClose,open}) {
    
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
                tasks.map((item,index)=>
                    <>
                     <div className='flex items-center justify-between w-full'>
                    <div>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar src='https://p16-capcut-sign-va.ibyteimg.com/tos-alisg-v-643f9f/oIPAyiMIrAAyiXN1zxrDBZYzB4AXESAkCBELY~tplv-nhvfeczskr-1:250:0.webp?lk3s=44acef4b&x-expires=1743052918&x-signature=RsMMkmTq2W8dEl%2FLfpSzBGArZuQ%3D' />
                            </ListItemAvatar>
                            <ListItemText primary={"code with laksh"} secondary={"@laksh codes"} />
                        </ListItem>
                    </div>
                    <div>
                        <Button className='customeButton'>select</Button>
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
    