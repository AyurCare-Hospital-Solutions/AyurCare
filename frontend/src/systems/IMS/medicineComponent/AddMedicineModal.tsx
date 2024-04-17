import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MenuItem, Stack, TextField } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

export default function AddMedicineModal({ open, onClose, addMedicine }: { open: boolean, onClose: () => any, addMedicine: (data: any) => any }) {
    const [name, setName] = React.useState("");
    const [buffer, setBuffer] = React.useState(0);
    const [unit, setUnit] = React.useState("");
    const [origin, setOrigin] = React.useState("");
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add New Medicine
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
                            addMedicine({ name, buffer, unit, origin });
                            onClose();
                        }}
                    >
                        <Box>
                            <TextField required id="outlined-basic1" label="Medicine Name" variant="outlined" name="name" onChange={(e) => {
                                setName(e.target.value);
                            }} />
                        </Box>
                        <Box>
                            <TextField required type="number" id="outlined-basic2" label="Re-Order Buffer" variant="outlined" name="reOrderBuffer" onChange={(e) => {
                                setBuffer(Number.parseInt(e.target.value));
                            }} />
                        </Box>
                        <Box>
                            <TextField
                                id="outlined-select3"
                                select
                                label="Unit"
                                required
                                defaultValue=""
                                helperText="Please select mesurement unit of medine"
                                onChange={(e) => {
                                    setUnit(e.target.value);
                                }}
                            >
                                <MenuItem value="liter">
                                    Liter
                                </MenuItem>
                                <MenuItem value="gram">
                                    Gram
                                </MenuItem>
                                <MenuItem value="units">
                                    Units
                                </MenuItem>
                            </TextField>
                        </Box>
                        <Box>
                            <TextField
                                id="outlined-select"
                                select
                                label="Origin"
                                defaultValue=""
                                required
                                helperText="Please select origin of medicine"
                                onChange={(e) => {
                                    setOrigin(e.target.value);
                                }}
                            >
                                <MenuItem value="inHouse">
                                    In-House
                                </MenuItem>
                                <MenuItem value="OutSource">
                                    Out-Source
                                </MenuItem>
                            </TextField>
                        </Box>
                        <Stack direction="row" spacing={2}>
                            <Button variant="outlined" color="success" type='submit'>Create</Button>
                            <Button variant="outlined" color="error" onClick={onClose} >Cancel</Button>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}