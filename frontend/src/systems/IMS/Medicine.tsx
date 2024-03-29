import React, { useEffect, useState } from 'react'
//@ts-ignore
import MedicineTable from "./component/MedicineTable"
import axios from 'axios';
import { Box, Button } from '@mui/material';
import AddMedicineModal from './component/AddMedicineModal';
import MedicineSearchBar from './component/MedicineSearchBar';
import { Add } from '@mui/icons-material';
import { useConfirm } from 'material-ui-confirm';
import { enqueueSnackbar } from 'notistack';

function Medicine() {
  const [medicineData, setMedicineData] = useState([]);
  const [searchQuery, setSearchQuery] = useState<String>("");

  //Add medicine modal
  const [AddModalOpen, setAddModalOpen] = React.useState(false);
  const handleAddModalOpen = () => setAddModalOpen(true);
  const handleAddModalClose = () => setAddModalOpen(false);

  // Update medicine modal
  const [UpdateModalOpen, setUpdateModalOpen] = React.useState(false);
  const handleUpdateModalOpen = () => setUpdateModalOpen(true);
  const handleUpdateModalClose = () => setUpdateModalOpen(false);

  // Search
  const search = (str: String) => {
    setSearchQuery(str)
  }

  // Fetch Medicine Data
  const getMedicineData = async () => {
    await axios.get('/api/ims/medicine').then((res) => {
      setTimeout(() => setMedicineData(res.data), 1000);
      console.log(res.data);
    })
  }

  useEffect(() => {
    getMedicineData();
  }, []);

  // Add new medicine
  const addMedicine = (data: any) => {
    console.log(data);
    axios.post("api/ims//medicine/addMedicine", {
      medicineName: data.name,
      inHouse: data.origin === 'inHouse' ? true : false,
      buffer: data.buffer,
      unit: data.unit,
    })
      .then((res) => {
        console.log(res);
        getMedicineData();
      })
      .catch((err) => console.log(err))
  }

  // confirm handle
  const confirm = useConfirm();

  // Delete medicine
  const deleteConfirmation = (row: any) => {
    console.log(row.id);

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

  return (
    <div>
      <Box sx={{ display: "flex" }} my={2} mx={2} >
        <MedicineSearchBar onSearch={search} />
        <Box flexGrow={1}></Box>
        <Button variant="outlined" onClick={handleAddModalOpen} startIcon={<Add />} >
          Add Medicine
        </Button>
      </Box>
      <MedicineTable data={medicineData} query={searchQuery} deleteMedicine={deleteConfirmation} />
      <AddMedicineModal open={AddModalOpen} onClose={handleAddModalClose} addMedicine={addMedicine} />
    </div>
  )
}

export default Medicine;

