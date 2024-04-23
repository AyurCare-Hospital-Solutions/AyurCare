import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack, TextField } from '@mui/material';
import { useState } from 'react';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

function MedicineLotAddModal({ addLotOpen, handleAddClose, addNewMedicineLot }: { addLotOpen: boolean, handleAddClose: () => any, addNewMedicineLot: (p1: string, p2: number, p3: any) => any }) {

    // add part
    const [manufacturer, setManufacturer] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [expDate, setExpDate] = useState<any>();

    return (
        <div >
            <Modal
                open={addLotOpen}
                onClose={handleAddClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add New Medicine Lot
                        </Typography>
                        <Box id="modal-modal-description" sx={{ mt: 2 }}>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 3, width: '25ch' },
                                }}
                                autoComplete="off"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    addNewMedicineLot(manufacturer, amount, expDate)
                                    handleAddClose();
                                }}
                            >
                                <Box>
                                    <TextField required id="outlined-basic1" label="Manufacturer" variant="outlined" name="manufacturer" onChange={(e) => {
                                        setManufacturer(e.target.value)
                                    }} />
                                </Box>
                                <Box>
                                    <TextField required type="number" id="outlined-basic2" label="Amount" variant="outlined" name="amount" onChange={(e) => {
                                        setAmount(Number(e.target.value))
                                    }} />
                                </Box>
                                <Box>
                                    <Typography sx={{ color: '#4a4949' }}>Expire date :</Typography>
                                    <TextField required type="date" id="outlined-basic2" variant="outlined" name="expDate" onChange={(e) => {
                                        setExpDate(e.target.value)
                                    }} />
                                </Box>
                                <Stack direction="row" spacing={2}>
                                    <Button variant="outlined" color="success" type='submit'>Create</Button>
                                    <Button variant="outlined" color="error" onClick={handleAddClose} >Cancel</Button>
                                </Stack>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default MedicineLotAddModal;
