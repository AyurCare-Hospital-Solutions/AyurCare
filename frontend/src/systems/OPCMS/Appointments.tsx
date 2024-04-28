import { useState } from "react";
import AppointmentsTable from "./components/AppointmentsTable";
import SearchInput from "./components/SearchInput";
import { Typography } from "@mui/material";

const Appointments = () => {
    const [search, setSearch] = useState<string>("");

    return (
        <div>
            <Typography sx={{ mb: 2 }} variant="h4">
                Appointments
            </Typography>
            <SearchInput onSearch={(s) => setSearch(s)} />
            <AppointmentsTable search={search} />
        </div>
    );
};

export default Appointments;
