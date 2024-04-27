import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack, TextField } from '@mui/material';

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

export default function AddMedicineMaterials() {
    const [additionalFieldsCount, setAdditionalFieldsCount] = useState(0);

    const addAdditionalField = () => {
        if (additionalFieldsCount < 4) {
            setAdditionalFieldsCount(additionalFieldsCount + 1);
        }
    };

    const removeAdditionalField = () => {
        if (additionalFieldsCount > 0) {
            setAdditionalFieldsCount(additionalFieldsCount - 1);
        }
    };

    return (
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Add New Medicine Recipe
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
                    }}
                >
                    <Box>
                        <TextField id="outlined-basic1" label="Medicine Name" variant="outlined" name="name" onChange={(_e) => {
                        }} />
                    </Box>
                    <Box>
                        <Button variant="outlined" onClick={addAdditionalField}>Add More Fields</Button>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <TextField type="number" id="outlined-basic2" label="Material" variant="outlined" name="reOrderBuffer" onChange={(_e) => {
                        }} />

                    </Box>
                    {[...Array(additionalFieldsCount)].map((_, index) => (
                        <Box key={index}>
                            <TextField type="number" id="outlined-basic2" label="Material" variant="outlined" name="reOrderBuffer" onChange={(__e) => {
                            }} />
                        </Box>
                    ))}
                    {additionalFieldsCount > 0 && (
                        <Button variant="outlined" onClick={removeAdditionalField}>Remove Field</Button>
                    )}
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Button variant="outlined" color="success" type='submit'>Create</Button>
                        <Button variant="outlined" color="error">Cancel</Button>
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}
