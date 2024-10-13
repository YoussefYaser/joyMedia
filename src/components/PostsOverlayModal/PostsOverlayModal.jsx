import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './PostsOverlayModal.css'
import { Fade } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function PostsOverlayModal({open, modal, setShowOverlay}) {
    

    function cancelPost(){
        setTimeout(() => {
            document.body.removeAttribute('style');
            
        }, 100);
        setShowOverlay(false);
        modal.handleClose();
    }

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className=' z-[999999] '
            >
                <Fade in={open}>
                    <Box sx={style} className="rounded-xl border-none outline-none w-5/6 sm:w-1/2">
                        <Typography className='text-h3 mb-4 font-bold' id="modal-modal-title" variant="h6" component="h2">
                            Are you sure you want to close and undo post?
                        </Typography>
                        <button className=' bg-darkBlueColor text-white py-1 px-4 rounded capitalize me-3' onClick={cancelPost}>yes</button>
                        <button className='bg-grayColor text-white py-1 px-4 rounded capitalize' onClick={modal.handleClose}>no</button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
