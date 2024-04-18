import { useEffect, useState } from "react";
import WardTable from "./components/WardTable";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import SearchInput from "./components/SearchInput";
import { enqueueSnackbar } from "notistack";
import { useConfirm } from "material-ui-confirm";
import WardDialog from "./components/WardDialog";
import { ward } from "./types";

const Ward = () => {
    const [wards, setWards] = useState<any>(undefined);
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalRenameOpen, setModalRenameOpen] = useState(false);
    const [editWard, setEditWard] = useState<ward | undefined>(undefined);

    const confirm = useConfirm();

    useEffect(() => {
        axios.get("/api/icms/ward").then((res) => {
            setTimeout(() => setWards(res.data), 1000);
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

    const renameWard = async (name: string) => {
        if (!editWard) {
            enqueueSnackbar("Failed to rename ward", { variant: 'error' });
            console.log("edit ward not set");
            return;
        }

        try {
            await axios.put(`/api/icms/ward/${editWard.id}`, { name: name });
            editWard.name = name;
            setWards([...wards])
            enqueueSnackbar("Ward renamed successfully", { variant: "success" });
        } catch (e) {
            enqueueSnackbar("Failed to rename ward", { variant: "error" });
            console.error(e);
        }
    }

    const onWardDeleteClick = async (v: ward) => {
        await confirm({ description: `This will permanently delete ward ${v.name}.` });
        try {
            await axios.delete(`/api/icms/ward/${v.id}`);
            setWards(wards.filter((i: ward) => i.id != v.id));
            enqueueSnackbar("Ward deleted successfully", { variant: "success" });
        } catch (e) {
            enqueueSnackbar("Failed to delete ward", { variant: "error" });
            console.error(e);
        }
    }

    const onWardRenameClick = (v: ward) => {
        setEditWard(v);
        setModalRenameOpen(true);
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
            <WardTable data={wards} search={search} onDelete={onWardDeleteClick} onRename={onWardRenameClick}></WardTable>
        </Box >

        <WardDialog
            open={modalOpen}
            onClose={() => { setModalOpen(false) }}
            onSubmit={createWard}
            action="Create"
        />

        <WardDialog
            open={modalRenameOpen}
            onClose={() => { setModalRenameOpen(false) }}
            onSubmit={renameWard}
            action="Rename"
            data={editWard}
        />


    </>
}

export default Ward;