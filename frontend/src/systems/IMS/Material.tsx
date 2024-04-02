import axios from 'axios';
import { useEffect, useState } from 'react'
import MaterialsTable from './materialComponent/MaterialsTable';
import { Box, Button, Typography } from '@mui/material';
import MaterialSearchBar from './materialComponent/MaterialSearchBar';
import { Add } from '@mui/icons-material';
import { useConfirm } from 'material-ui-confirm';
import { enqueueSnackbar } from 'notistack';
import AddMaterialModal from './materialComponent/AddMaterialModal';
import UpdateMaterialModal from './materialComponent/UpdateMaterialModal';

function Material() {
  const [materialData, setMaterialData] = useState<any>();
  const [searchQuery, setSearchQuery] = useState<String>("");  // search query

  // Add material modal 
  const [addMaterialModalOpen, setAddMaterialModalOpen] = useState<boolean>(false);
  const handleAddModalOpen = () => setAddMaterialModalOpen(true);
  const handleAddModalClose = () => setAddMaterialModalOpen(false);

  // Update material modal
  const [updateMaterialModalOpen, setUpdateMaterialModalOpen] = useState<boolean>(false);
  const hadelUpdateModalOpen = () => setUpdateMaterialModalOpen(true);
  const hadelUpdateModalClose = () => setUpdateMaterialModalOpen(false);

  // Update details object
  const [updatedMaterial, setUpdatedMaterial] = useState({ Item: {} });    // MUI error --> to avoid undefined --> pass fake object 

  // Fetch material data 
  const getMaterialData = async () => {
    await axios.get("api/ims/material").then((res) => {
      setTimeout(() => setMaterialData(res.data), 2000)
      console.log(res.data);
    })
  }

  useEffect(() => {
    getMaterialData();
  }, []);

  // add new Material
  const addNewMaterial = (data: any) => {
    axios.post("api/ims/material/addMaterial", {
      materialName: data.materialName,
      amount: data.materialAmount,
      buffer: data.materialReOredrBuffer,
      unit: data.materialUnit,
    })
      .then((res) => {
        enqueueSnackbar("Material Added Successfuly...", { variant: "success" });
        console.log(res);
        getMaterialData();
      })
      .catch((err) => {
        enqueueSnackbar("Failed to Add Material...", { variant: "error" });
        console.log(err)
      })
  }

  // confirm handle
  const confirm = useConfirm();

  // Delete material
  const deleteMaterial = (row: any) => {
    confirm({ description: `This will permanently Material delete ` })
      .then(async () => {
        try {
          await axios.post("api/ims/material/deleteMaterial", { id: row.id })
          getMaterialData();
          enqueueSnackbar("Material Deleted Successfuly...", { variant: "success" });
        }
        catch (e) {
          enqueueSnackbar("Failed to Delete Material...", { variant: "error" });
          console.error(e);
        }
      })
  }

  // Update material
  const updateMaterial = (data: any) => {
    confirm({ description: "Confirm Update Material Details" })
      .then(async () => {
        try {
          console.log(data);
          await axios.put(`api/ims/material/updateMaterial/${data.updateId}`, { materialName: data.updateName, amount: data.amount, buffer: data.updateReOrderBuffer, unit: data.updateUnit });
          enqueueSnackbar(`Material ${data.updateName} Updated Successfuly...`, { variant: "success" });
          getMaterialData();
        }
        catch (e) {
          enqueueSnackbar("Failed to Update Material...", { variant: "error" });
          console.error(e);
        }
      })
      
  }

  return (
    <div>
      <Box>
        <Typography variant='h3' color='primary' align="center">
          Material
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }} my={2} mx={2} >
        <MaterialSearchBar setSearchQuery={setSearchQuery} />
        <Box flexGrow={1}></Box>
        <Button variant="outlined" startIcon={<Add />} onClick={handleAddModalOpen} >
          Add Material
        </Button>
      </Box>
      <MaterialsTable data={materialData} query={searchQuery} deleteMaterial={deleteMaterial} hadelUpdateModalOpen={hadelUpdateModalOpen} setUpdatedMaterial={setUpdatedMaterial} />
      <AddMaterialModal onClose={handleAddModalClose} addMaterialModalOpen={addMaterialModalOpen} addNewMaterial={addNewMaterial} />
      <UpdateMaterialModal open={updateMaterialModalOpen} onClose={hadelUpdateModalClose} updatedMaterial={updatedMaterial} updateMaterial={updateMaterial} />
    </div>
  )
}

export default Material;
