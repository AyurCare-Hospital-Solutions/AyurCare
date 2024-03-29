import { Box, Button, MenuItem, Modal, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function UpdateMedicineModal(props: any) {
    const [updateId, setUpdateId] = useState(props.updatedMedicine.id ?? "");
    const [updateName, setUpdateName] = useState(props.updatedMedicine.Item.name ?? "");
    const [updateBuffer, setUpdateBuffer] = useState(props.updatedMedicine.Item.reOrderBuffer ?? "");
    const [updateUnit, setUpdateUnit] = useState(props.updatedMedicine.Item.unit ?? "");
    const [updateOrigin, setUpdateOrigin] = useState(props.updatedMedicine.Item.inHouse ?? "");

    useEffect(() => {
        setUpdateId(props.updatedMedicine.id ?? "");
        setUpdateName(props.updatedMedicine.Item.name ?? "");
        setUpdateBuffer(props.updatedMedicine.Item.reOrderBuffer ?? "");
        setUpdateUnit(props.updatedMedicine.Item.unit ?? "");
        setUpdateOrigin(props.updatedMedicine.inHouse ?? "");
    }, [props.updatedMedicine]);

    return (
        <Modal
            open={props.open}
            onClose={props.onClose}
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
                            props.updateMedicine({ updateId, updateName, updateBuffer, updateOrigin, updateUnit })
                            props.onClose();
                        }}
                    >
                        <Box>
                            <TextField required id="outlined-basic1" value={updateName} label="Medicine Name" variant="outlined" name="name" onChange={(e) => {
                                setUpdateName(e.target.value);
                            }} />
                        </Box>
                        <Box>
                            <TextField required type="number" id="outlined-basic2" value={updateBuffer} label="Re-Order Buffer" variant="outlined" name="reOrderBuffer" onChange={(e) => {
                                setUpdateBuffer(Number.parseInt(e.target.value));
                            }} />
                        </Box>
                        <Box>
                            <TextField
                                id="outlined-select3"
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
                        <Box>
                            <TextField
                                id="outlined-select"
                                value={updateOrigin ? "inHouse" : "OutSource"}
                                select
                                label="Origin"
                                defaultValue=""
                                required
                                helperText="Please select origin of medicine"
                                onChange={(e) => {
                                    setUpdateOrigin(e.target.value === "inHouse");
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
                            <Button variant="outlined" color="success" type='submit'>Update</Button>
                            <Button variant="outlined" color="error" onClick={props.onClose} >Cancel</Button>
                        </Stack>
                    </Box>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Box>
            </Box>
        </Modal>
    )
}

export default UpdateMedicineModal
