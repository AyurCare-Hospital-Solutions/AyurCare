import axios from 'axios';
import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button, Typography } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { enqueueSnackbar } from 'notistack';
import MedicineRequestTable from './medicineRequestComponent/MedicineRequestTable';

function MedicineRequest() {
    const [reqMedicine, setReqMedicine] = useState<any>({});
    const [reqMedicineAmount, setReqMedicineAmout] = useState<number>(0)

    const [medicineData, setMedicineData] = useState<any>([]);
    // fetch medicine data
    const getMedicineData = async () => {
        await axios.get('api/ims/medicine').then((res) => {
            setMedicineData(res.data);
            console.log(res.data);
        })
    }

    const [medicineReqData, setMedicineReqData] = useState<any>([]);
    // fetch medicine request data
    const getMedicineRequestData = async () => {
        await axios.get('api/ims/medicineRequest').then((res) => {
            console.log(res.data);
            setMedicineReqData(res.data);
        })
    }

    useEffect(() => {
        getMedicineData();
        getMedicineRequestData();
    }, []);

    const medicineNames = medicineData?.map((med: any) => {
        return { "label": med.Item.name, "medicine": med };
    }) ?? [];

    const confirm = useConfirm();
    // add medicine request
    const addMedicineRequest = () => {
        // Validate amount (required, positive integer)
        if (!reqMedicineAmount) {
            enqueueSnackbar("Amount is required...", { variant: "error" });
            return;
        } else if (isNaN(Number(reqMedicineAmount)) || Number(reqMedicineAmount) <= 0) {
            enqueueSnackbar("Amount must be a positive integer...", { variant: "error" });
            return;
        }
        confirm({ description: "Confirm medicine request" })
            .then(async () => {
                await axios.post('api/ims/medicineRequest/addMedicineRequest', { medicineId: reqMedicine, amount: reqMedicineAmount })
                    .then((res) => {
                        enqueueSnackbar("Medicine Request Added Successfuly...", { variant: "success" });
                        console.log(res);
                        getMedicineRequestData();
                    })
                    .catch((err) => {
                        enqueueSnackbar("Failed to Add Medicine Request...", { variant: "error" });
                        console.log(err)
                    })
            })
    }

    return (
        <div>
            <Typography color='primary' align="center" variant="h5">
                Add Medicine Request
            </Typography>
            <Box
                display="flex"
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="on"
                onSubmit={(e) => {
                    e.preventDefault();
                    addMedicineRequest()
                }}
            >
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={medicineNames}
                    sx={{ width: 300 }}
                    onChange={(e, v: any) => setReqMedicine(v.medicine.id)}
                    renderInput={(params) => <TextField {...params} label="Medicine" />}
                />
                <TextField type="number" id="outlined-basic" label="Amount" variant="outlined" onChange={(e) => {
                    setReqMedicineAmout(Number(e.target.value));
                }} />
                <Button variant="contained" color="primary" type='submit'>Add Request</Button>
            </Box>
            <Typography color='primary' align="center" variant="h5">
                Medicine Request Details
            </Typography>
            <MedicineRequestTable medicineReqData={medicineReqData} />
        </div>
    );
}

export default MedicineRequest
