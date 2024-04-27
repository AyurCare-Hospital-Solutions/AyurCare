import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Autocomplete, Stack, TextField } from '@mui/material';
import axios from 'axios';

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
    const [getMedicine, setGetMedicine] = useState<any>({});
    const [getMaterial, setGetMaterial] = useState<any>({});
    const [reqMaterialAmount, setReqMaterialAmount] = useState<number>(0)

    const [medicineData, setMedicineData] = useState<any>([]);
    // fetch medicine data
    const getMedicineData = async () => {
        await axios.get('api/ims/medicine').then((res) => {
            setMedicineData(res.data);
            console.log(res.data);
        })
    }

    const [materialData, setMaterialData] = useState<any>([]);
    // fetch medicine request data
    const getMaterialData = async () => {
        await axios.get('api/ims/material').then((res) => {
            setMaterialData(res.data);
            console.log(res.data);

        })
    }

    useEffect(() => {
        getMedicineData();
        getMaterialData();
    }, []);

    const medicineNames = medicineData?.map((med: any) => {
        return { "label": medimeti., "medicine": med };
    }) ?? [];

    const materialNames = materialData?.map((med: any) => {
        return { "label": med.Item.name, "material": med };
    }) ?? [];

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
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={medicineNames}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Material" />}
                        />

                    </Box>
                    {[...Array(additionalFieldsCount)].map((_, index) => (
                        <Box key={index}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={materialNames}
                                sx={{ width: 300 }}
                                renderInput={(params) => <TextField {...params} label="Material" />}
                            />
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
function useEffect(arg0: () => void, arg1: never[]) {
    throw new Error('Function not implemented.');
}

function getMaterialData() {
    throw new Error('Function not implemented.');
}

