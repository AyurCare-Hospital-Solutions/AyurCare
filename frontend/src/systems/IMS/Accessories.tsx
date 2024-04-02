import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import AccessoriesSearchBar from './accessoriesComponent/AccessoriesSearchBar';
import { Add } from '@mui/icons-material';
import axios from 'axios';
import AccessoriesTable from './accessoriesComponent/AccessoriesTable';
import UpdateAccessoryModal from './accessoriesComponent/UpdateAccessoryModal';
import { useConfirm } from 'material-ui-confirm';
import { enqueueSnackbar } from 'notistack';
import AddAccessoryModal from './accessoriesComponent/AddAccessoryModal';

function Accessories() {
    // confirm handle
    const confirm = useConfirm();

    // add accessory
    const [openAddModal, setOpenAddModal] = useState(false);
    const handleAddOpen = () => setOpenAddModal(true);
    const handleAddClose = () => setOpenAddModal(false);

    const addAccessory = (accessoryName: string, amount: number, buffer: number, unit: string) => {
        confirm({ description: `Confirm new Accessory creation` })
            .then(async () => {
                await axios.post('api/ims/accessory/addAccessory', { accessoryName, amount, buffer, unit })
                    .then((res) => {
                        enqueueSnackbar("Accessory Added Successfuly...", { variant: "success" });
                        console.log(res);
                        getAccessories();
                    })
                    .catch((err) => {
                        enqueueSnackbar("Failed to Add Accessory...", { variant: "error" });
                        console.log(err)
                    })
            }
            )
    }

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

    // Delete accessory
    const deleteAccessory = (row: any) => {
        confirm({ description: `This will permanently delete ${row.Item.name}` })
            .then(async () => {
                try {
                    await axios.post("api/ims/accessory/deleteAccessory", { id: row.id })
                    getAccessories();
                    enqueueSnackbar("Accessory Deleted Successfuly...", { variant: "success" });
                }
                catch (e) {
                    enqueueSnackbar("Failed to Delete Accessory...", { variant: "error" });
                    console.error(e);
                }
            })
    }

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
                <Button variant="outlined" startIcon={<Add />} onClick={handleAddOpen} >
                    Add Accessory
                </Button>
            </Box>
            <AccessoriesTable accessorydata={accessorydata} query={query} setUpdatedAccessory={setUpdatedAccessory} handleUpdateOpen={handleUpdateOpen} deleteAccessory={deleteAccessory} />
            <UpdateAccessoryModal updateOpen={updateOpen} handleUpdateClose={handleUpdateClose} updatedAccessory={updatedAccessory} updateAccessory={updateAccessory} />
            <AddAccessoryModal addAccessory={addAccessory} openAddModal={openAddModal} handleAddClose={handleAddClose} />
        </div>
    );
}

export default Accessories;
