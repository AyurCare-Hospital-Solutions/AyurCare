import { useState } from "react";
import AppointmentsTable from "./components/AppointmentsTable";
import SearchInput from "./components/SearchInput";
import { Box, Typography } from "@mui/material";

const Appointments = () => {
    const [search, setSearch] = useState<string>("");

    return (
        <div>
            <Typography sx={{ mb: 2 }} variant="h4">
                Appointments
            </Typography>
            <Box sx={{ mb: 2 }}>
                <SearchInput onSearch={(s) => setSearch(s)} />
            </Box>
            <AppointmentsTable search={search} />
        </div>
    );
};

export default Appointments;
