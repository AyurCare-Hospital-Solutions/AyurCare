import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

interface SearchBarProps {
    onSearch: (results: any[]) => void; // Function to handle search results
}

function SearchBar({ onSearch }: SearchBarProps) {
    const [patientName, setPatientName] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        const response = await axios.get(`/api/opcms/medicalRecords/${patientName}`);
        onSearch(response.data); // Pass search results to parent component
    } catch (error) {
        console.error(error);
        enqueueSnackbar("Error fetching data", { variant: "error" });
    }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{mb:5, display:"flex", justifyContent:"space-around"}} >
                <TextField label="Patient Name" value={patientName} onChange={(e) => setPatientName(e.target.value)} />
                <Button type="submit" variant="contained">
                    Search
                </Button>
            </Box>
        </form>
    );
}

export default SearchBar;
