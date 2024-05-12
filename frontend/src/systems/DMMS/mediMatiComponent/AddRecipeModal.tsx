import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

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


function AddRecipeModal({
    handleClose,
    addRecipeModalOpen,
    setReqMedicine,
    setMaterial,
    addNewRecipe
}: {
    handleClose: () => any,
    addRecipeModalOpen: boolean,
    setReqMedicine: (p: any) => void,
    setMaterial: (p: any) => void,
    addNewRecipe: () => void,
}) {
    const [materialAmount, setMaterialAmount] = useState<number>(0);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addNewRecipe();
        handleClose(); // Close the dialog after submission
    };
    const [medicineData, setMedicineData] = useState<any>([]);
    // fetch medicine data
    const getMedicineData = async () => {
        await axios.get('api/ims/medicine').then((res) => {
            setMedicineData(res.data);
            console.log(res.data);
        })
    }

    const [materialData, setMaterialData] = useState<any>([]);
    // fetch medicine data
    const getMaterialData = async () => {
        await axios.get('api/ims/material').then((res) => {
            setMedicineData(res.data);
            console.log(res.data);
        })
    }

    useEffect(() => {
        getMedicineData();
        getMaterialData();
    }, []);

    const medicineNames = medicineData?.map((medimeti: any) => {
        return { "label": medimeti.Item.name, "medicine": medimeti };
    }) ?? [];

    const materialNames = materialData?.map((medimeti: any) => {
        return { "label": medimeti.Item.name, "medicine": medimeti };
    }) ?? [];

    return (
        <Modal
            open={addRecipeModalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add New Material
                </Typography>
                <Box id="modal-modal-description" sx={{ mt: 2 }}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="on"
                    >
                        <Box>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={materialNames}
                                sx={{ width: 300 }}
                                onChange={(_e, v: any) => {
                                    if (v && v.medicine) {
                                        setReqMedicine(v.medicine?.id);
                                    }
                                }}
                                renderInput={(params) => <TextField {...params} label="Medicine" />}
                            />
                        </Box>
                        <Box>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={medicineNames}
                                sx={{ width: 300 }}
                                onChange={(_e, v: any) => {
                                    if (v && v.medicine) {
                                        setReqMedicine(v.medicine?.id);
                                    }
                                }}
                                renderInput={(params) => <TextField {...params} label="Medicine" />}
                            />
                        </Box>
                        <Box>
                            <TextField type="number" id="outlined-basic2" label="Amount" variant="outlined" name="amount" onChange={(e) => {
                                setMaterialAmount(Number(e.target.value));
                            }} />
                        </Box>
                        <Stack direction="row" spacing={2}>
                            <Button variant="outlined" color="success" type='submit'>Create</Button>
                            <Button variant="outlined" color="error" onClick={handleClose} >Cancel</Button>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default AddRecipeModal;
