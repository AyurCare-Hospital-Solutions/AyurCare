import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import AccessoriesSearchBar from './accessoriesComponent/AccessoriesSearchBar';
import { Add } from '@mui/icons-material';
import axios from 'axios';
import AccessoriesTable from './accessoriesComponent/AccessoriesTable';
import UpdateAccessoryModal from './accessoriesComponent/UpdateAccessoryModal';
import { useConfirm } from 'material-ui-confirm';
import { enqueueSnackbar } from 'notistack';

function Accessories() {

    // search function
    const [query, setQuery] = useState("");

    // fetch accessoires data from
    const [accessorydata, setAccessorydata] = useState();
    const getAccessories = async () => {
        await axios.get('api/ims/accessory')
            .then((res) => {
                setTimeout(() => {
                    setAccessorydata(res.data);
                }, 2000);
                console.log(res.data);

            })
    }

    useEffect(() => {
        getAccessories();
    }, []);

    // update modal
    const [updateOpen, setUpdateOpen] = useState(false);
    const handleUpdateOpen = () => setUpdateOpen(true);
    const handleUpdateClose = () => setUpdateOpen(false);

    // confirm handle
    const confirm = useConfirm();
    // update accessory
    const [updatedAccessory, setUpdatedAccessory] = useState({ Item: {} });
    const updateAccessory = (id: number, accessoryName: string, amount: number, buffer: number, unit: string) => {
        confirm({ description: `Confirm Update ${accessoryName}` })
            .then(async () => {
                try {
                    console.log("hello");
                    await axios.put(`api/ims/accessory/updateAccessory/${id}`, { accessoryName, amount, buffer, unit });
                    enqueueSnackbar(`${accessoryName} Updated Successfuly...`, { variant: "success" });
                    getAccessories();
                }
                catch (e) {
                    enqueueSnackbar(`Failed to Update ${accessoryName}...`, { variant: "error" });
                    console.error(e);
                }
            })
    }

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
                    Add Accessory
                </Button>
            </Box>
            <AccessoriesTable accessorydata={accessorydata} query={query} setUpdatedAccessory={setUpdatedAccessory} handleUpdateOpen={handleUpdateOpen} />
            <UpdateAccessoryModal updateOpen={updateOpen} handleUpdateClose={handleUpdateClose} updatedAccessory={updatedAccessory} updateAccessory={updateAccessory} />
        </div>
    )
}

export default Accessories
