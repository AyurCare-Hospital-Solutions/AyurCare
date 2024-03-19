import { SetStateAction, useEffect, useState } from "react";
import WardTable from "./components/WardTable";
import axios from "axios";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { AccountCircle, Search } from "@mui/icons-material";

const Ward = () => {
    const [data, setData] = useState(undefined);
    useEffect(() => {
        axios.get("http://localhost:5000/api/icms/ward").then((res: { data: SetStateAction<undefined>; }) => {
            setTimeout(() => setData(res.data), 1000);
        })
    }, [])

    return <>
        <Typography variant="h5" mx={1}>Ward Management</Typography>
        <TextField
            placeholder="Search"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                ),
            }}
            variant="outlined"
            size={"small"}
        />

        <Box mx={2} mt={4}>
            <WardTable data={data}></WardTable>
        </Box>

    </>
}

export default Ward;