import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import dayjs from 'dayjs';


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

export default function NewRequestModal({ open, handleClose, updateRequest, updateProgress }: { open: boolean, handleClose: () => any, updateRequest: any, updateProgress: (arg1: number, arg2: string) => any }) {

    const formatDate = (dateString: string | number | Date | dayjs.Dayjs | null | undefined) => {
        // Parse the date string using dayjs
        const date = dayjs(dateString);
        // Format the date using dayjs (you can adjust the format string as needed)
        return date.format('DD/MM/YYYY HH:mm:ss');
    }

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
                        Check Manufacture Request
                    </Typography>
                    <Typography variant="h6" >
                        Order ID : {request?.id}
                    </Typography>
                    <Typography variant="h6" >
                        Medicine Name : {request?.Medicine?.Item?.name}
                    </Typography>
                    <Typography variant="h6" >
                        Amount : {request?.amount}
                    </Typography>
                    <Typography variant="h6" >
                        Requested Date : {formatDate(request?.createdAt)}
                    </Typography>
                    <Typography variant='h6'>
                        Priority : {request?.isPriority ? 'Is Priority' : 'Not Priority'}
                    </Typography>
                    <Stack mt={5} alignContent="center" direction="row" spacing={4}>
                        <Button sx={{ backgroundColor: "#4aee78" }} variant="contained" disabled={request?.progress === "Completed" || request?.progress === "In Progress"} onClick={() => {
                            updateProgress(request.id, "In Progress");
                            handleClose();
                        }}>Accept</Button>
                        <Button sx={{ backgroundColor: "#ff7979" }} variant="contained" disabled={request?.progress === "Completed" || request?.progress === "Rejected"} onClick={() => {
                            updateProgress(request.id, "Rejected");
                            handleClose();
                        }}>Reject</Button>
                        <Button variant="outlined" onClick={() => {
                            handleClose();
                        }}>Cancel</Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}