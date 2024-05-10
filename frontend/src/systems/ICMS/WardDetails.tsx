import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Bed, BedArraySchema, BedSchema, Ward, WardSchema } from "./types";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import WardDialog from "./components/WardDialog";
import { Add, ArrowBack, DeleteForever, Edit } from "@mui/icons-material";
import { Box, Button, ButtonGroup, Divider, IconButton, List, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import TableLoader from "../../components/TableLoader";
import AddBedDialog from "./components/AddBedDialog";

const WardDetails = () => {
    const { wardId } = useParams();
    const confirm = useConfirm();
    const navigate = useNavigate();

    const [ward, setWard] = useState<Ward>();
    const [beds, setBeds] = useState<Bed[]>([]);
    const [loading, setLoading] = useState(true);

    const [renameOpen, setRenameOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                let wardData = await axios.get(`/api/icms/ward/${wardId}`);
                let bedData = await axios.get(`/api/icms/beds/${wardId}`);

                setWard(WardSchema.cast(wardData.data));
                setBeds(BedArraySchema.cast(bedData.data));
                setLoading(false);

            } catch (e: any) {
                if (e?.response?.status == 404) {
                    enqueueSnackbar(`Ward ${wardId} does not exist`, { variant: "error" });
                } else {
                    enqueueSnackbar("Failed to get ward details", { variant: "error" });
                }

                console.log(e);
                navigate("/icms/ward");
            }
        })()
    }, [])

    const renameWard = async (name: string) => {
        if (!ward) {
            return;
        }

        try {
            await axios.put(`/api/icms/ward/${ward.id}`, { name: name });
            ward.name = name;
            setWard({ ...ward })
            enqueueSnackbar("Ward renamed successfully", { variant: "success" });
        } catch (e) {
            enqueueSnackbar("Failed to rename ward", { variant: "error" });
            console.error(e);
        }
    }

    const deleteWard = async () => {
        if (!ward) {
            return;
        }

        if (beds.filter(v => !!v.IPDAdmissionId).length > 0) {
            enqueueSnackbar("Cannot delete ward with patients", { variant: "error" });
            return;
        }

        await confirm({ description: `This will permanently delete ward ${ward.name}.` });
        try {
            await axios.delete(`/api/icms/ward/${ward.id}`);
            enqueueSnackbar("Ward deleted successfully", { variant: "success" });
            navigate("/icms/ward");
        } catch (e) {
            enqueueSnackbar("Failed to delete ward", { variant: "error" });
            console.error(e);
        }
    }

    const createBed = async (bed: number) => {
        if (!ward) {
            return;
        }

        try {
            let resp = await axios.post(`/api/icms/beds`, { WardId: ward.id, number: bed });
            let bedData = BedSchema.cast(resp.data);
            setBeds([...beds, bedData]);

            enqueueSnackbar("Added Bed Successfully", { variant: "success" });
        } catch (e) {
            enqueueSnackbar("Failed to Add Bed", { variant: "error" });
            console.error(e);
        }
    }


    const deleteBed = async (bed: Bed) => {
        if (!ward) {
            return;
        }


        await confirm({ description: `This will permanently delete bed ${bed.number}.` });
        try {
            await axios.delete(`/api/icms/beds/${bed.id}`);
            beds.splice(beds.indexOf(bed), 1);
            setBeds([...beds]);
            enqueueSnackbar("Bed deleted successfully", { variant: "success" });
        } catch (e) {
            enqueueSnackbar("Failed to delete bed", { variant: "error" });
            console.error(e);
        }
    }

    return <>
        <Box sx={{ mb: 2 }}>
            <Link to="/icms/ward">
                <IconButton color="primary" size="large">
                    <ArrowBack />
                </IconButton>
            </Link>

            <Typography variant="h5" mx={1} mb={2} display="inline">Ward Editor</Typography>
        </Box>

        <Typography variant="h6">Ward Info</Typography>
        <Divider />

        <Box sx={{ mx: 2, mb: 4, mt: 2, display: "flex", flexDirection: "column" }}>
            <List>
                <ListItemText>
                    Name: {ward?.name}
                </ListItemText>
                <ListItemText>
                    Number of Beds: {beds.length}
                </ListItemText>
            </List>
            <ButtonGroup sx={{ ml: "auto" }}>
                <Button variant="outlined" color="info" startIcon={<Edit />} onClick={() => setRenameOpen(true)}>Rename</Button>
                <Button variant="outlined" color="error" startIcon={<DeleteForever />} onClick={deleteWard}>Delete</Button>
            </ButtonGroup>
        </Box >

        <Typography variant="h6">Beds</Typography>
        <Divider />
        <Box sx={{ display: "flex", mx: 2, mt: 2 }}>
            <Button variant="outlined" sx={{ ml: "auto" }} startIcon={<Add />} onClick={() => setAddOpen(true)} >
                Add Bed
            </Button>
        </Box>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Bed Number</TableCell>
                        <TableCell>Occupied</TableCell>
                        <TableCell size="small"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {beds.map((v) => <TableRow >
                        <TableCell>{v.number}</TableCell>
                        <TableCell>{v.IPDAdmissionId ? "Yes" : "No"}</TableCell>
                        <TableCell>
                            <IconButton
                                sx={{ ml: "auto", my: 0, py: 0 }}
                                color="primary" size="small"
                                onClick={() => deleteBed(v)}
                                disabled={!!v.IPDAdmissionId}
                            >
                                <DeleteForever sx={{ fontSize: "1.2em" }} />
                            </IconButton></TableCell>
                    </TableRow>)}
                    {loading ? <TableLoader columns={3} /> : null}
                </TableBody>
            </Table>
        </TableContainer>

        <WardDialog data={ward} action="Rename"
            open={renameOpen} onClose={() => setRenameOpen(false)}
            onSubmit={renameWard}
        />

        <AddBedDialog open={addOpen} beds={beds} onClose={() => setAddOpen(false)} onSubmit={createBed} />

    </>
}

export default WardDetails;