import { useState } from "react";
import ExternalPrescriptionTable from "../Components/ExternalPrescription/ExternalPrescriptionTable";
import { Box, Typography } from "@mui/material";
import BackButton from "../Components/Common/BackButton";

const ReceivedPrescription = () => {
  const [query, setQuery] = useState("");

  const setSearch = (query: string) => {
    setQuery(query);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <BackButton />
        <Typography sx={{ mb: 3, flexGrow: 1 }} variant="h5">
          External Prescription Management
        </Typography>
      </Box>
      <ExternalPrescriptionTable />
    </div>
  );
};

export default ReceivedPrescription;
