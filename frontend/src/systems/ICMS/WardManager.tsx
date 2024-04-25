import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material";
import { Add, Launch } from "@mui/icons-material";
import SearchInput from "./components/SearchInput";
import { enqueueSnackbar } from "notistack";
import WardDialog from "./components/WardDialog";
import { Ward, WardArraySchema } from "./types";
import TableLoader from "../../components/TableLoader";
import { useNavigate } from "react-router-dom";

const WardManager = () => {
    const [wards, setWards] = useState<Ward[]>([]);
    const [search, setSearch] = useState<RegExp>();
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const navigator = useNavigate();


    const rows = useMemo(() => {
        if (search) {
            return wards.filter((v) => {
                return v.name.search(search) !== -1;
            })
        }
        return wards;

    }, [wards, search]);

    useEffect(() => {
        axios.get("/api/icms/ward").then((res) => {
            const data = WardArraySchema.cast(res.data);
            setWards(data);
            setLoading(false);
        })
    }, []);


    const createWard = async (name: string) => {
        try {
            let resp = await axios.post("/api/icms/ward", { name: name });
            setWards([...wards, resp.data]);
            enqueueSnackbar("Ward created successfully", { variant: "success" });
        } catch (e) {
            enqueueSnackbar("Failed to create ward", { variant: "error" });
            console.error(e);
        }
    };

    return <>
        <Typography variant="h5" mx={1} my={2}>Ward Management</Typography>

        <Box sx={{ display: "flex" }} mt={4} mx={2}>
            <SearchInput onChange={(s) => setSearch(s)} ></SearchInput>
            <Box flexGrow={1}></Box>
            <Button variant="outlined" startIcon={<Add />} onClick={() => setModalOpen(true)}>
                Add Ward
            </Button>
        </Box>

        <Box mx={2} mt={4}>
            <TableContainer component={Paper}>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell size="small">ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell sx={{ maxWidth: "32px", pl: 0 }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(v =>
                            <TableRow key={v.id} onClick={() => navigator("/icms/ward/" + v.id)} hover>
                                <TableCell >{v.id.toString()}</TableCell>
                                <TableCell>{v.name}</TableCell>
                                <TableCell sx={{ maxWidth: "32px", pl: 0 }}>
                                    <Tooltip title="View Ward Details">
                                        <Launch sx={{ fontSize: "1.24em" }} />
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        )
                        }
                        {loading ? <TableLoader columns={3} /> : null}
                        {
                            !loading && rows.length == 0 ? <TableRow>
                                <TableCell colSpan={3}>No records found</TableCell>
                            </TableRow> : undefined
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </Box >

        <WardDialog
            open={modalOpen}
            onClose={() => { setModalOpen(false) }}
            onSubmit={createWard}
            action="Create"
        />



    </>
}

export default WardManager;