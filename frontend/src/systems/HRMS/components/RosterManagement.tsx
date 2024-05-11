import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import NewRosterDialog from "./rosterManagement/NewRosterDialog";
import axios from "axios";
import RosterManagementTable from "./rosterManagement/RosterManagementTable";
import RosterCard from "./rosterManagement/RosterCard";

const RosterManagement = () => {
  const [newRosterDialogOpen, setNewRosterDialogOpen] = useState(false);

  const addNewRoster = async (data: any) => {
    console.log(data);

    try {
      const response = await axios.post("/api/hrms/shift", data);
    } catch (error) {
      console.error("Error adding roster:", error);
    }
  };

  return (
    <div className="RosterManagement">
      <Box sx={{ display: "flex", mx: 4 }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Roster Management
          </Typography>
          <Typography variant="body2" gutterBottom>
            Add, Remove and Edit Rosters
          </Typography>
        </Box>
        <Box sx={{ ml: "auto", my: "auto" }}>
          <Button
            variant="outlined"
            onClick={() => setNewRosterDialogOpen(true)}
          >
            Add Duty List
          </Button>
        </Box>
        <NewRosterDialog
          open={newRosterDialogOpen}
          addNewRoster={addNewRoster}
          onClose={() => setNewRosterDialogOpen(false)}
        />
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box sx={{ m: 4, flex: 2 }}>
          <RosterManagementTable />
        </Box>
        <Box sx={{ flex: 1, m: 4 }}>
          <RosterCard />
        </Box>
      </Box>
    </div>
  );
};

export default RosterManagement;
