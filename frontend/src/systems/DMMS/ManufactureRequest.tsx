import axios from 'axios';
import { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import { enqueueSnackbar } from 'notistack';
import ManufactureRequestTable from './ManuReqCom/ManufactureRequestTable';
import AddManufactureRequest from './manufactureRequestComponent/AddManufactureRequest';
import React from 'react';
import { Add } from '@mui/icons-material';
import SearchBar from './SearchBar';


function ManufactuureRequest() {
  const [reqMedicine, setReqMedicine] = useState<any>({});
  const [reqAmount, setReqAmout] = useState<number | string>("");
  const [selectOption, setSelectOption] = useState<string>("")
  const [priority, setPriority] = useState<boolean | string>("");
  const [searchQuery, setSearchQuery] = useState<RegExp>();  // for search query

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
    if (!reqMedicine) {
      enqueueSnackbar("Medicine is required...", { variant: "error" });
      return;
    }
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
            setReqMedicine("");
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


  // Add modal
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box>
        <Typography color='primary' align="center" variant="h5">
          Manufacture Request Details
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }} my={2} mx={2} >
        <SearchBar onChange={(q) => setSearchQuery(q)} />
        <Box flexGrow={1}></Box>
        <Button variant="outlined" onClick={handleClickOpen} startIcon={<Add />}>Add Request</Button>
      </Box>


      <ManufactureRequestTable manufactureReqData={ManufactureReqData} deleteManufactureRequest={deleteManufactureRequest} />
      <AddManufactureRequest handleClose={handleClose} open={open} addManufactureRequest={addManufactureRequest} medicineNames={medicineNames} setReqMedicine={setReqMedicine} selectOption={selectOption} setReqAmout={setReqAmout} reqAmount={reqAmount} priority={priority} setPriority={setPriority} />
    </div>
  );
}

export default ManufactuureRequest;