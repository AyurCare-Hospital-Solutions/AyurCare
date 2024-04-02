import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import AccessoriesSearchBar from './accessoriesComponent/AccessoriesSearchBar';
import { Add } from '@mui/icons-material';
import axios from 'axios';
import AccessoriesTable from './accessoriesComponent/AccessoriesTable';

function Accessories() {

    // search function
    const [query, setQuery] = useState("");

    // fetch accessoires data from
    const [accessorydata, setAccessorydata] =useState();
    const getAccessories = async () => {
        await axios.get('api/ims/accessory')
            .then((res) => {
                setTimeout(() => {
                    setAccessorydata(res.data);
                },2000);
                console.log(res.data);
                
            })
    }

    useEffect(()=>{
        getAccessories();
    },[]);

    return (
        <div>
            <Box>
                <Typography variant='h3' color='primary' align="center">
                    Accessories
                </Typography>
            </Box>
            <Box sx={{ display: 'flex' }} my={2} mx={2}  >
                <AccessoriesSearchBar setQuery={setQuery} />
                <Box flexGrow={1}></Box>
                <Button variant="outlined" startIcon={<Add />} >
                    Add Accessories
                </Button>
            </Box>
            <AccessoriesTable accessorydata={accessorydata} query={query} />
        </div>
    )
}

export default Accessories
