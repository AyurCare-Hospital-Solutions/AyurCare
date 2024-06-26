import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

interface SearchFormProps {
  onSearch: (results: any[]) => void; // Function to handle search results
}

function SearchForm({ onSearch }: SearchFormProps) {
  const [patientId, setPatientId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/opcms/medicalRecords`, {
        patientId: patientId,
        startDate: startDate,
        endDate: endDate,
      });
      onSearch(response.data);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Failed to fetch medical records", { variant: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Medical Records
      </Typography>
      <Box sx={{ mb: 5, display: "flex", justifyContent: "space-around" }}>
        <TextField
          label="Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained">
          Search
        </Button>
      </Box>
    </form>
  );
}

export default SearchForm;
