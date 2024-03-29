import axios from 'axios';
import { useEffect, useState } from 'react'
import MaterialsTable from './materialComponent/MaterialsTable';
import { Box, Button } from '@mui/material';
import MaterialSearchBar from './materialComponent/MaterialSearchBar';
import { Add } from '@mui/icons-material';

function Material() {
  const [materialData, setMaterialData] = useState<any>();
  const [searchQuery, setSearchQuery] = useState<String>("");  // search query

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

  return (
    <div>
      <Box sx={{ display: "flex" }} my={2} mx={2} >
        <MaterialSearchBar setSearchQuery={setSearchQuery} />
        <Box flexGrow={1}></Box>
        <Button variant="outlined" startIcon={<Add />} >
          Add Material
        </Button>
      </Box>
      <MaterialsTable data={materialData} query={searchQuery} />
    </div>
  )
}

export default Material
