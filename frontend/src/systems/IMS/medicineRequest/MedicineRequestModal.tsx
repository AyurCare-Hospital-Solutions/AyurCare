import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MedicineRequestModal({ open, handleClose, updateRequest, updateStatus }: { open: boolean, handleClose: () => any, updateRequest: any, updateStatus: (arg1: number, arg2: string) => any }) {
    const [request, setRequest] = useState<any>();
    useEffect(() => {
        setRequest(updateRequest);
    }, [request])

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
                        Update Medicine Request
                    </Typography>
                    <Typography variant="h6" >
                        ID : {request?.id}
                    </Typography>
                    <Typography variant="h6" >
                        ID : {request?.Medicine?.Item?.name}
                    </Typography>
                    <Typography variant="h6" >
                        Status : {request?.status}
                    </Typography>
                    <Stack alignItems="center" direction="row" spacing={3}>
                        <Button sx={{ backgroundColor: "#4aee78" }} variant="contained" onClick={() => {
                            updateStatus(request.id, "Accepted");
                            handleClose();
                        }}>Accept</Button>
                        <Button sx={{ backgroundColor: "#ff7979" }} variant="contained" onClick={() => {
                            updateStatus(request.id, "Rejected");
                            handleClose();
                        }} >Reject</Button>
                        <Button variant="outlined" onClick={() => {
                            handleClose();
                        }}>Cancel</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}
