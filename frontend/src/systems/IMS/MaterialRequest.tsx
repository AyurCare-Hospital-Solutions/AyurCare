import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useConfirm } from 'material-ui-confirm';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react'
import MaterialRequestTable from './materialRequestComponent/MaterialRequestTable';

function MaterialRequest() {
    const [reqMaterial, setReqMaterial] = useState<any>({});
    const [reqMatrialAmount, setReqMaterialAmount] = useState<number>(0);


    const [materialData, setMaterialData] = useState<any>([]);
    // fetch material data
    const getMaterialData = async () => {
        await axios.get('api/ims/material').then((res) => {
            setMaterialData(res.data);
            console.log(res.data);
        });
    }

    const [materialReqData, setMaterialReqData] = useState<any>([]);
    // fetch material data
    const getMaterialReqData = async () => {
        await axios.get('api/ims/materialRequest').then((res) => {
            setMaterialReqData(res.data);
            console.log(res.data);
        })
    }

    useEffect(() => {
        getMaterialData();
        getMaterialReqData();
    }, []);

    const materialNames = materialData?.map((mat: any) => {
        return { "label": mat.Item.name, "material": mat };
    }) ?? [];

    const confirm = useConfirm();
    // add medicine request
    const addMaterialRequest = () => {
        confirm({ description: "Confirm medicine request" })
            .then(async () => {
                await axios.post('api/ims/materialRequest/addMaterialRequest', { materialId: reqMaterial, amount: reqMatrialAmount })
                    .then((res) => {
                        enqueueSnackbar("Material Request Added Successfuly...", { variant: "success" });
                        console.log(res);
                        getMaterialReqData();
                    })
                    .catch((err) => {
                        enqueueSnackbar("Failed to Add Material Request...", { variant: "error" });
                        console.log(err)
                    })
            })
    }

    return (
        <div>
            <Typography color='primary' align="center" variant="h5">
                Add Material Request
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
                    addMaterialRequest();
                    getMaterialReqData();
                }}
            >
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={materialNames}
                    sx={{ width: 300 }}
                    onChange={(e, v: any) => setReqMaterial(v.material.id)}
                    renderInput={(params) => <TextField {...params} label="Materials" />}
                />
                <TextField type="number" id="outlined-basic" label="Amount" variant="outlined" onChange={(e) => {
                    setReqMaterialAmount(Number(e.target.value));
                }} />
                <Button variant="contained" color="primary" type='submit'>Add Request</Button>
            </Box>
            <Typography color='primary' align="center" variant="h5">
                Material Request Details
            </Typography>
            <MaterialRequestTable materialReqData={materialReqData} />
        </div>
    );
}

export default MaterialRequest
