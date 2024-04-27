import axios from 'axios';
import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { enqueueSnackbar } from 'notistack';
import ManufactureRequestTable from './ManuReqCom/ManufactureRequestTable';


function ManufactuureRequest() {
  const [reqMedicine, setReqMedicine] = useState<any>({});
  const [reqAmount, setReqAmout] = useState<number | string>("");
  const [selectOption, setSelectOption] = useState<string>("")
  const [priority, setPriority] = useState<boolean | string>("");

  const [medicineData, setMedicineData] = useState<any>([]);
  // fetch medicine data
  const getMedicineData = async () => {
    await axios.get('api/ims/medicine').then((res) => {
      setMedicineData(res.data);
      console.log(res.data);
    })
  }

  const [ManufactureReqData, setManufactureReqData] = useState<any>([]);
  // fetch Manufacture request data
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
  // add manufacture request
  const addManufactureRequest = () => {
    //
    // Validate amount (required, positive integer)
    if (!reqAmount) {
      enqueueSnackbar("Amount is required...", { variant: "error" });
      return;
    } else if (isNaN(Number(reqAmount)) || Number(reqAmount) <= 0) {
      enqueueSnackbar("Amount must be a positive integer...", { variant: "error" });
      return;
    }
    confirm({ description: "Confirm Manufacture Request" })
      .then(async () => {
        await axios.post('api/dmms/request/createReq', { MedicineId: reqMedicine, amount: reqAmount, isPriority: Boolean(priority) })
          .then((res) => {
            enqueueSnackbar("Manufacture Request Added Successfuly...", { variant: "success" });
            console.log(res);
            getManufactureRequestData();
            setSelectOption("");
            setReqAmout('');
            setPriority('');
            reqMedicine('')
          })
          .catch((err) => {
            enqueueSnackbar("Failed to Add Manufacture Request...", { variant: "error" });
            console.log(err)
          })
      })
  }

  // delete manufacture request
  const deleteManufactureRequest = (id: number) => {
    confirm({ description: 'Confirm delete Manufacture request' })
      .then(async () => {
        try {
          await axios.delete(`api/dmms/request/${id}`);
          enqueueSnackbar("Request deleted successfully", { variant: 'success' });
          getManufactureRequestData();
        }
        catch (e) {
          enqueueSnackbar("Failed to delete Manufacture Request...", { variant: "error" });
          console.error(e);
        }
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
          onChange={(_e, v: any) => setReqMedicine(v.medicine.id)}
          renderInput={(params) => <TextField {...params} label="Medicine" />}
          value={selectOption}
        />
        <TextField type="number" id="outlined-basic" label="Amount"
          variant="outlined" onChange={(e) => {
            setReqAmout(Number(e.target.value));
          }}
          value={reqAmount}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Priority</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={priority}
            label="Priority"
            onChange={(event) => {
              setPriority(event.target.value)
            }}
          >
            <MenuItem value={1}>Is priority</MenuItem>
            <MenuItem value={0}>Not Priority</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type='submit'>Add Request</Button>
      </Box>
      <Typography color='primary' align="center" variant="h5">
        Manufacture Request Details
      </Typography>

      <ManufactureRequestTable manufactureReqData={ManufactureReqData} deleteManufactureRequest={deleteManufactureRequest} />

    </div>
  );
}

export default ManufactuureRequest;