import { useEffect, useState } from "react";
import WardTable from "./components/WardTable";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import SearchInput from "./components/SearchInput";
import WardDialog from "./components/WardDialog";
import { enqueueSnackbar } from "notistack";

const Ward = () => {
    const [data, setData] = useState(undefined);
    const [modalOpen, setModalOpen] = useState(false);


    useEffect(() => {
        axios.get("http://localhost:5000/api/icms/ward").then((res) => {
            setTimeout(() => setData(res.data), 1000);
        })
    }, []);


    const wardSubmit = async (data: any) => {
        try {
            await axios.post("http://localhost:5000/api/icms/ward", data);
            enqueueSnackbar("Ward created successfully", { variant: "success" });
        } catch (e) {
            enqueueSnackbar("Failed to create ward", { variant: "error" });
            console.error(e);
        }
    };



    return <>
        <Typography variant="h5" mx={1}>Ward Management</Typography>

        <Box sx={{ display: "flex" }} mt={4} mx={2}>
            <SearchInput onChange={function (inp: string) {
                console.log(inp)
            }} ></SearchInput>
            <Box flexGrow={1}></Box>
            <Button variant="outlined" startIcon={<Add />} onClick={() => setModalOpen(true)}>
                Add Ward
            </Button>
        </Box>

        <Box mx={2} mt={4}>
            <WardTable data={data}></WardTable>
        </Box >

        <WardDialog
            open={modalOpen}
            onClose={() => { setModalOpen(false) }}
            onSubmit={wardSubmit}>
        </WardDialog>

    </>
}

export default Ward;