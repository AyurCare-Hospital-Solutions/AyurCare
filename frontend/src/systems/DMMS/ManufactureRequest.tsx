import axios from 'axios';
import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { enqueueSnackbar } from 'notistack';
//import ManufactureRequestTable from './ManuReqCom/ManufactureRequestTable';

function ManufactuureRequest() {
  const [reqMedicine, setReqMedicine] = useState<any>({});
  const [reqAmount, setReqAmout] = useState<number>(0)
  const [priority, setpriority] = useState<boolean>();

  const [medicineData, setMedicineData] = useState<any>([]);
  // fetch medicine data
  const getMedicineData = async () => {
    await axios.get('api/ims/medicine').then((res) => {
      setMedicineData(res.data);
      console.log(res.data);
    })
  }

  const [manufactureReqData, setManufactureReqData] = useState<any>([]);
  // fetch medicine request data
  const getManufactureRequestData = async () => {
    await axios.get('api/dmms/request').then((res) => {
      console.log(res.data);
      setManufactureReqData(res.data);
    })
  }

  useEffect(() => {
    getMedicineData();
    getManufactureRequestData();
  }, []);

  const medicineNames = medicineData?.map((med: any) => {
    return { "label": med.Item.name, "medicine": med };
  }) ?? [];

  const confirm = useConfirm();
  // add medicine request
  const addManufactureRequest = () => {
    // Validate amount (required, positive integer)
    if (!reqAmount) {
      enqueueSnackbar("Amount is required...", { variant: "error" });
      return;
    } else if (isNaN(Number(reqAmount)) || Number(reqAmount) <= 0) {
      enqueueSnackbar("Amount must be a positive integer...", { variant: "error" });
      return;
    }
    confirm({ description: "Confirm manufacture request" })
      .then(async () => {
        await axios.post('api/dmms/request', { MedicineId: reqMedicine, amount: reqAmount, isPriority: priority })
          .then((res) => {
            enqueueSnackbar("Medicine Request Added Successfuly...", { variant: "success" });
            console.log(res);
            getManufactureRequestData();
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
        Add Manufacture Request
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
          addManufactureRequest()
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
          setReqAmout(Number(e.target.value));
        }} />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Priority</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={priority}
            label="Priority"
            onChange={(event) => {
              setpriority(event.target.value as boolean)
            }}
          >
            <MenuItem value={1}>Is priority</MenuItem>
            <MenuItem value={0}>Not Priority</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type='submit'>Add Request</Button>
      </Box>
      <Typography color='primary' align="center" variant="h5">
        Medicine Request Details
      </Typography>

    </div>
  );
}

export default ManufactuureRequest