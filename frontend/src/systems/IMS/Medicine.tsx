import React, { useEffect, useState } from 'react'
//@ts-ignore
import MedicineTable from "./medicineComponent/MedicineTable"
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
import AddMedicineModal from './medicineComponent/AddMedicineModal';
import UpdateMedicineModalOpen from './medicineComponent/UpdateMedicineModal'
import MedicineSearchBar from './medicineComponent/MedicineSearchBar';
import { Add } from '@mui/icons-material';
import { useConfirm } from 'material-ui-confirm';
import { enqueueSnackbar } from 'notistack';
import MedicineLotModal from './medicineLotComponent/MedicineLotModal';

function Medicine() {
  const [medicineData, setMedicineData] = useState<any>();
  const [searchQuery, setSearchQuery] = useState<String>("");  // for search query

  //Add medicine modal
  const [AddModalOpen, setAddModalOpen] = React.useState(false);
  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);

  // Update medicine modal
  const [updateModalOpen, setUpdateModalOpen] = React.useState(false);
  const handleUpdateModalOpen = () => setUpdateModalOpen(true);
  const handleUpdateModalClose = () => setUpdateModalOpen(false);

  // Update details object
  const [updatedMedicine, setUpdatedmedicine] = useState({ Item: {} });

  // Search
  const search = (str: String) => {
    setSearchQuery(str)
  }

  // Fetch Medicine Data
  const getMedicineData = async () => {
    await axios.get('api/ims/medicine').then((res) => {
      setTimeout(() => setMedicineData(res.data), 1000);
      console.log(res.data);
    })
  }

  useEffect(() => {
    getMedicineData();
  }, []);

  // Add new medicine
  const addMedicine = (data: any) => {
    // validation 
    // Validate medicine name (required, alphanumeric with spaces)
    if (!data.name.trim()) {
      enqueueSnackbar("Medicine name is required...", { variant: "error" });
      return;
    } else if (!/^[a-zA-Z0-9\s]+$/.test(data.name)) {
      enqueueSnackbar("Medicine name can only contain letters, numbers, and spaces...", { variant: "error" });
      return;
    }
    // Validate reorder buffer (required, positive integer)
    if (!data.buffer) {
      enqueueSnackbar("Re-Order Buffer is required...", { variant: "error" });
      return;
    } else if (isNaN(Number(data.buffer)) || Number(data.buffer) <= 0) {
      enqueueSnackbar("Re-Order Buffer must be a positive integer...", { variant: "error" });
      return;
    }
    // Validate measurement unit
    if (data.unit.trim() === '') {
      enqueueSnackbar("Measurement unit is required...", { variant: "error" });
      return;
    }
    // api call
    axios.post("api/ims//medicine/addMedicine", {
      medicineName: data.name,
      inHouse: data.origin === 'inHouse',
      buffer: data.buffer,
      unit: data.unit,
    })
      .then((res) => {
        enqueueSnackbar("Medicine Added Successfuly...", { variant: "success" });
        console.log(res);
        getMedicineData();
      })
      .catch((err) => {
        enqueueSnackbar("Failed to add Medicine...", { variant: "error" });
        console.log(err)
      })
    handleAddModalClose();
  }

  // confirm handle
  const confirm = useConfirm();

  // Delete medicine
  const deleteConfirmation = (row: any) => {
    confirm({ description: `This will permanently delete Medicine ${row.Item.name}` })
      .then(async () => {
        try {
          await axios.post("api/ims/medicine/deleteMedicine", { id: row.id });
          getMedicineData();
          enqueueSnackbar("Medicine Deleted Successfuly...", { variant: "success" });
        }
        catch (e) {
          enqueueSnackbar("Failed to Delete medicine...", { variant: "error" });
          console.error(e);

        }
      })
  };

  // Update medicine
  const updateMedicine = (data: any) => {
    // validation 
    // Validate medicine name (required, alphanumeric with spaces)
    if (!data.updateName.trim()) {
      enqueueSnackbar("Medicine name is required...", { variant: "error" });
      return;
    } else if (!/^[a-zA-Z0-9\s]+$/.test(data.name)) {
      enqueueSnackbar("Medicine name can only contain letters, numbers, and spaces...", { variant: "error" });
      return;
    }
    // Validate reorder buffer (required, positive integer)
    if (!data.updateBuffer) {
      enqueueSnackbar("Re-Order Buffer is required...", { variant: "error" });
      return;
    } else if (isNaN(Number(data.updateBuffer)) || Number(data.updateBuffer) <= 0) {
      enqueueSnackbar("Re-Order Buffer must be a positive integer...", { variant: "error" });
      return;
    }
    // Validate measurement unit
    if (data.updateUnit.trim() === '') {
      enqueueSnackbar("Measurement unit is required...", { variant: "error" });
      return;
    }

    confirm({ description: "Confirm Update Medicine Details" })
      .then(async () => {
        try {
          await axios.put(`api/ims/medicine/updateMedicine/${data.updateId}`, { medicineName: data.updateName, inHouse: data.updateOrigin, buffer: data.updateBuffer, unit: data.updateUnit });
          enqueueSnackbar(`Medicine ${data.updateName} Updated Successfuly...`, { variant: "success" });
          getMedicineData();
        }
        catch (e) {
          enqueueSnackbar("Failed to Update Material...", { variant: "error" });
          console.error(e);
        }
      })
  }

  // Medicine Lot #######################################################

  // Mediicine Lot modal
  const [openLotModal, setOpenLotModal] = React.useState(false);
  const handleLotModalOpen = () => setOpenLotModal(true);
  const handleLotModalClose = () => setOpenLotModal(false);

  // Medicine lot modal data
  const [lotModalData, setLotModalData] = useState({ Item: {} }); // get medicine row data

  return (
    <div>
      <Box>
        <Typography variant='h3' color='primary' align="center">
          Medicine
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }} my={2} mx={2} >
        <MedicineSearchBar onSearch={search} />
        <Box flexGrow={1}></Box>
        <Button variant="outlined" onClick={handleAddModalOpen} startIcon={<Add />} >
          Add Medicine
        </Button>
      </Box>
      <MedicineTable data={medicineData} query={searchQuery} deleteMedicine={deleteConfirmation} handleUpdateModalOpen={handleUpdateModalOpen} setUpdatedmedicine={setUpdatedmedicine} handleLotModalOpen={handleLotModalOpen} setLotModalData={setLotModalData} />
      <AddMedicineModal open={AddModalOpen} onClose={handleAddModalClose} addMedicine={addMedicine} />
      <UpdateMedicineModalOpen open={updateModalOpen} onClose={handleUpdateModalClose} updatedMedicine={updatedMedicine} setupdatetedMedicine={setUpdatedmedicine} updateMedicine={updateMedicine} />
      <MedicineLotModal openLotModal={openLotModal} handleLotModalClose={handleLotModalClose} lotModalData={lotModalData} />
    </div>
  )
}

export default Medicine;

