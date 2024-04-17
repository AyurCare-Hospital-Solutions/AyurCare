import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { FormControlLabel, MenuItem, Stack, Switch, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';

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

function UpdateAccessoryModal({ updateOpen, handleUpdateClose, updatedAccessory, updateAccessory }: { updateOpen: boolean, handleUpdateClose: () => any, updatedAccessory: any, updateAccessory: (arg1: number, arg2: string, arg3: number, areg4: number, arg5: string) => any }) {

    const [operation, setOperation] = useState<string | null>("add");
    const [advanced, setAdvanced] = useState(true);

    const [updateId, setUpdateId] = useState<number>(updatedAccessory.id ?? "");
    const [updateAmount, setUpdateAmount] = useState<number>(0 ?? "");
    const [updateName, setUpdateName] = useState<string>(updatedAccessory.Item.name ?? "");
    const [updateReOrderBuffer, setUpdateReOrderBuffer] = useState<number>(updatedAccessory.Item.reOrderBuffer ?? "");
    const [updateUnit, setUpdateUnit] = useState<string>(updatedAccessory.Item.unit ?? "");

    useEffect(() => {
        setUpdateId(updatedAccessory.id);
        setUpdateName(updatedAccessory.Item.name);
        setUpdateReOrderBuffer(updatedAccessory.Item.reOrderBuffer);
        setUpdateUnit(updatedAccessory.Item.unit);
    }, [updatedAccessory])


    const handleAlignment = (
        _event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        setOperation(newAlignment);
        console.log(newAlignment)
    };

    return (
        <Modal
            open={updateOpen}
            onClose={handleUpdateClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Update {updatedAccessory.Item.name ?? ""}
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
                            updateAccessory(Number(updateId), updateName, amount, updateReOrderBuffer, updateUnit);
                            handleUpdateClose();
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
                                helperText="Please select mesurement unit of medine"
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
                            <Button variant="outlined" color="error" onClick={handleUpdateClose} >Cancel</Button>
                        </Stack>

                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}

export default UpdateAccessoryModal
