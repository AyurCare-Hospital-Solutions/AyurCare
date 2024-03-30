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
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function AddMaterialModal({ onClose, addMaterialModalOpen }: { onClose: () => any, addMaterialModalOpen: boolean }) {
    const [materialName, setMaterialName] = useState<String>("");
    const [materialAmount, setMaterialAmount] = useState<number>(0);
    const [materialReOredrBuffer, setMaterialReOredrBuffer] = useState<number>(0);
    const [materialUnit, setMaterialUnit] = useState<String>("");

    return (
        <Modal
            open={addMaterialModalOpen}
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

                            onClose();
                        }}
                    >
                        <Box>
                            <TextField required id="outlined-basic1" label="Material Name" variant="outlined" name="name" onChange={(e) => {

                            }} />
                        </Box>
                        <Box>
                            <TextField required type="number" id="outlined-basic2" label="Amount" variant="outlined" name="amount" onChange={(e) => {

                            }} />
                        </Box>
                        <Box>
                            <TextField required type="number" id="outlined-basic2" label="Re-Order Buffer" variant="outlined" name="reOrderBuffer" onChange={(e) => {

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
                            <Button variant="outlined" color="error" onClick={onClose} >Cancel</Button>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default AddMaterialModal
