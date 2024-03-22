import { useEffect, useState } from "react";
import WardTable from "./components/WardTable";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import SearchInput from "./components/SearchInput";
import WardDialog from "./components/WardDialog";
import { enqueueSnackbar } from "notistack";
import { useConfirm } from "material-ui-confirm";

const Ward = () => {
    const [wards, setWards] = useState<any>(undefined);
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [modalOpen, setModalOpen] = useState(false);

    const confirm = useConfirm();

    useEffect(() => {
        axios.get("/api/icms/ward").then((res) => {
            setTimeout(() => setWards(res.data), 1000);
        })
    }, []);


    const wardSubmit = async (data: any) => {
        try {
            let resp = await axios.post("/api/icms/ward", data);
            setWards([...wards, resp.data]);
            enqueueSnackbar("Ward created successfully", { variant: "success" });
        } catch (e) {
            enqueueSnackbar("Failed to create ward", { variant: "error" });
            console.error(e);
        }
    };

    const wardDelete = async (v: any) => {
        await confirm({ description: `This will permanently delete ward ${v.name}.` });
        try {
            await axios.delete(`/api/icms/ward/${v.id}`);
            setWards(wards.filter((i: any) => i.id != v.id));
            enqueueSnackbar("Ward deleted successfully", { variant: "success" });
        } catch (e) {
            enqueueSnackbar("Failed to delete ward", { variant: "error" });
            console.error(e);
        }
    }

    const wardRename = (v: any) => {
        console.log(v)
    }



    return <>
        <Typography variant="h5" mx={1}>Ward Management</Typography>

        <Box sx={{ display: "flex" }} mt={4} mx={2}>
            <SearchInput onChange={(s) => setSearch(s)} ></SearchInput>
            <Box flexGrow={1}></Box>
            <Button variant="outlined" startIcon={<Add />} onClick={() => setModalOpen(true)}>
                Add Ward
            </Button>
        </Box>

        <Box mx={2} mt={4}>
            <WardTable data={wards} search={search} onDelete={wardDelete} onRename={wardRename}></WardTable>
        </Box >

        <WardDialog
            open={modalOpen}
            onClose={() => { setModalOpen(false) }}
            onSubmit={wardSubmit}
        >
        </WardDialog>

    </>
}

export default Ward;