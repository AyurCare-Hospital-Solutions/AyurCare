import { Box, Button, FormControlLabel, MenuItem, Modal, Stack, Switch, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

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

function UpdateMaterialModal({ open, onClose, updatedMaterial, updateMaterial }: { open: boolean, onClose: () => any, updatedMaterial: any, updateMaterial: any }) {
    const [updateId, setUpdateId] = useState(updatedMaterial.id);
    const [updateName, setUpdateName] = useState(updatedMaterial.Item.name ?? "");
    const [updateAmount, setUpdateAmount] = useState(updatedMaterial.amount ?? "");
    const [updateReOrderBuffer, setUpdateReOrderBuffer] = useState(updatedMaterial.Item.reOrderBuffer ?? "");
    const [updateUnit, setUpdateUnit] = useState(updatedMaterial.Item.unit ?? "");

    useEffect(() => {
        setUpdateId(updatedMaterial.id);
        setUpdateName(updatedMaterial.Item.name ?? "");
        setUpdateAmount(updatedMaterial.amount ?? "");
        setUpdateReOrderBuffer(updatedMaterial.Item.reOrderBuffer ?? "");
        setUpdateUnit(updatedMaterial.Item.unit ?? "");
    }, [updatedMaterial]);

    
    const [operation, setOperation] = useState<string | null>("add");
    const [advanced, setAdvanced] = useState(true);

    const handleAlignment = (
        _event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        setOperation(newAlignment);
        console.log(newAlignment)
    };


    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Update Material Details
                </Typography>
                <Box id="modal-modal-description" sx={{ mt: 2 }}>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 2, width: '25ch' },
                        }}
                        autoComplete="off"
                        onSubmit={(e) => {
                            e.preventDefault();
                            let amount = (operation === 'remove' ? -(updateAmount) : updateAmount)
                            updateMaterial({ updateId, updateName, amount, updateReOrderBuffer, updateUnit });
                            onClose();
                        }}
                    >

                        <ToggleButtonGroup
                            value={operation}
                            exclusive
                            onChange={handleAlignment}
                        >
                            <ToggleButton value="add" >
                                <Typography>Add</Typography>
                            </ToggleButton>
                            <ToggleButton value="remove">
                                <Typography>Remove</Typography>
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <Box>
                            <TextField required type="number" id="outlined-basic2" value={updateAmount} label="Amount" variant="outlined" name="reOrderBuffer" onChange={(e) => {
                                setUpdateAmount(Number.parseInt(e.target.value));
                            }} />
                        </Box>

                        <FormControlLabel control={<Switch />} label="Other changes"
                            labelPlacement="start"
                            onClick={() => setAdvanced(!advanced)}
                        />

                        <Box>
                            <TextField required id="outlined-basic1" value={updateName} disabled={advanced} label="Material Name" variant="outlined" name="name" onChange={(e) => {
                                setUpdateName(e.target.value);
                            }} />
                        </Box>
                        <Box>
                            <TextField required type="number" id="outlined-basic2" value={updateReOrderBuffer} disabled={advanced} label="Re-Order Buffer" variant="outlined" name="reOrderBuffer" onChange={(e) => {
                                setUpdateReOrderBuffer(Number.parseInt(e.target.value));
                            }} />
                        </Box>
                        <Box>
                            <TextField
                                id="outlined-select3"
                                disabled={advanced}
                                value={updateUnit}
                                select
                                label="Unit"
                                required
                                defaultValue=""
                                helperText="Please select mesurement unit of material"
                                onChange={(e) => {
                                    setUpdateUnit(e.target.value);
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
                            <Button variant="outlined" color="success" type='submit'>Update</Button>
                            <Button variant="outlined" color="error" onClick={onClose} >Cancel</Button>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default UpdateMaterialModal;
