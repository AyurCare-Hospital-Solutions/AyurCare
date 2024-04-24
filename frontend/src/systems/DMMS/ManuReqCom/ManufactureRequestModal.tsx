import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { Button, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

export default function ManufactureRequestModal({ open, handleClose, updateRequest, updateStatus: updateProgress, deleteManufactureRequest }: { open: boolean, handleClose: () => any, updateRequest: any, updateStatus: (arg1: number, arg2: string) => any, deleteManufactureRequest: (arg: number) => any }) {
    const [request, setRequest] = useState<any>();
    useEffect(() => {
        setRequest(updateRequest);
    }, [updateRequest])

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography align="center" id="modal-modal-title" variant="h5" component="h2">
                        Update Manufacture Request
                    </Typography>
                    <Typography variant="h6" >
                        Order ID : {request?.id}
                    </Typography>
                    <Typography variant="h6" >
                        Medicine Name : {request?.Medicine?.Item?.name}
                    </Typography>
                    <Typography variant="h6" >
                        Progress : {request?.Progress}
                    </Typography>
                    <Typography variant='h6'>
                        Priority : {request?.priority}
                    </Typography>
                    <Stack mt={5} alignContent="center" direction="row" spacing={4}>
                        <Button sx={{ backgroundColor: "#4aee78" }} variant="contained" onClick={() => {
                            updateProgress(request.id, "Accepted");
                            handleClose();
                        }}>Save Changes</Button>
                        <Button variant="outlined" onClick={() => {
                            handleClose();
                        }}>Cancel</Button>
                        <IconButton color='secondary' size="medium" onClick={() => {
                            deleteManufactureRequest(request.id);
                            handleClose();
                        }}>
                            <DeleteIcon />
                        </IconButton>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}