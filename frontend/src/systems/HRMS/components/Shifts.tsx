import { Box, Typography } from "@mui/material";
import RosterManagementTable from "./rosterManagement/RosterManagementTable.1";
import { useEffect, useState } from "react";
import { ShiftData } from "../types";
import axios from "axios";

const Shifts = () => {
  useEffect(() => {
    axios.get("/api/hrms/shift/employee/my").then((response) => {
      setShiftData(response.data);
    });
  }, []);

  const [shiftData, setShiftData] = useState<ShiftData[]>([]);
  const [selectedShift, setSelectedShift] = useState<ShiftData | null>(null);

  return (
    <>
      <Box sx={{ display: "flex", mx: 4, mb: 4 }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            My Shifts
          </Typography>
          <Typography variant="body2" sx={{}}>
            View all the shifts assigned to you by the HR administrator.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ m: 4 }}>
        <RosterManagementTable
          shiftData={shiftData}
          setSelectedShift={setSelectedShift}
        />
      </Box>
    </>
  );
};

export default Shifts;
