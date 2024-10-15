import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './PostsOverlayModal.css'
import { Fade } from '@mui/material';
import { useTranslation } from 'react-i18next';

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
    

    const {t} = useTranslation();

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
                    <Box sx={style} className="rounded-xl border-none outline-none w-5/6 sm:w-1/2 dark:bg-darkerBlueColor dark:text-white">
                        <Typography className='text-h3 mb-4 font-bold' id="modal-modal-title" variant="h6" component="h2">
                            {t("postOverlay.warning")}
                        </Typography>
                        <button className=' bg-darkBlueColor text-white py-1 px-4 rounded capitalize me-3' onClick={cancelPost}>
                            {t("postOverlay.yes")}
                        </button>
                        <button className='bg-grayColor text-white py-1 px-4 rounded capitalize' onClick={modal.handleClose}>
                            {t("postOverlay.no")}
                        </button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
