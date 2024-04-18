import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MenuItem, Stack, TextField } from '@mui/material';
import { useState } from 'react';

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

function AddAccessoryModal({ openAddModal, handleAddClose, addAccessory }: { openAddModal: boolean, handleAddClose: () => any, addAccessory: (arg1:string,arg2:number,arg3:number,arg4:string) => any }) {

    const [name, setName] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [buffer, setBuffer] = useState<number>(0);
    const [unit, setUnit] = useState<string>("");

    return (
        <div>
            <Modal
                open={openAddModal}
                onClose={handleAddClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add new Accessory
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
                                addAccessory(name,amount,buffer,unit);
                                handleAddClose();
                            }}
                        >
                            <Box>
                                <TextField required id="outlined-basic1" label="Accessory Name" variant="outlined" name="name" onChange={(e) => {
                                    setName(e.target.value);
                                }} />
                            </Box>
                            <Box>
                                <TextField type="number" id="outlined-basic2" label="Amount" variant="outlined" name="amount" onChange={(e) => {
                                    setAmount(Number(e.target.value));
                                }} />
                            </Box>
                            <Box>
                                <TextField type="number" id="outlined-basic2" label="Re-Order Buffer" variant="outlined" name="reOrderBuffer" onChange={(e) => {
                                    setBuffer(Number(e.target.value));
                                }} />
                            </Box>
                            <Box>
                                <TextField
                                    id="outlined-select3"
                                    select
                                    label="Unit"
                                    required
                                    defaultValue=""
                                    helperText="Please select mesurement unit of accessory"
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
                            <Stack direction="row" spacing={2}>
                                <Button variant="outlined" color="success" type='submit'>Create</Button>
                                <Button variant="outlined" color="error" onClick={handleAddClose} >Cancel</Button>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default AddAccessoryModal
