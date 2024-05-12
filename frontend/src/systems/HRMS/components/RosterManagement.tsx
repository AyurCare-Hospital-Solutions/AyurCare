import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import NewRosterDialog from "./rosterManagement/NewRosterDialog";
import axios from "axios";
import RosterManagementTable from "./rosterManagement/RosterManagementTable.1";
import RosterCard from "./rosterManagement/RosterCard";
import { ShiftData } from "../types";
import { useConfirm } from "material-ui-confirm";

const RosterManagement = () => {
  const [newRosterDialogOpen, setNewRosterDialogOpen] = useState(false);
  const [shiftData, setShiftData] = useState<ShiftData[]>([]);
  const [selectedShift, setSelectedShift] = useState<ShiftData | null>(null);

  const confirm = useConfirm();

  useEffect(() => {
    axios.get("/api/hrms/shift").then((response) => {
      setShiftData(response.data);
    });
  }, []);

  const addNewRoster = async (data: any) => {
    try {
      const response = await axios.post("/api/hrms/shift", data);
    } catch (error) {
      console.error("Error adding roster:", error);
    }
  };

  const updateRoster = async (data: any) => {
    try {
      const response = await axios.put(`/api/hrms/shift/${data.id}`, data);
    } catch (error) {
      console.error("Error updating roster:", error);
    }
  };

  const deleteRoster = async (id: number) => {
    try {
      await confirm({
        description: "Are you sure you want to delete this roster?",
      });
      const response = await axios.delete(`/api/hrms/shift/${id}`);
      setShiftData((prevRows) => prevRows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error deleting roster:", error);
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
            onClick={() => {
              setNewRosterDialogOpen(true);
              setSelectedShift(null);
            }}
          >
            Add Duty List
          </Button>
        </Box>
        <NewRosterDialog
          selectedShift={selectedShift}
          open={newRosterDialogOpen}
          addNewRoster={addNewRoster}
          updateRoster={updateRoster}
          onClose={() => setNewRosterDialogOpen(false)}
        />
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box sx={{ m: 4, flex: 2 }}>
          <RosterManagementTable
            shiftData={shiftData}
            setSelectedShift={setSelectedShift}
          />
        </Box>
        <Box sx={{ flex: 1, m: 4 }}>
          <RosterCard
            selectedShift={selectedShift}
            openRosterDialog={setNewRosterDialogOpen}
            deleteRoster={deleteRoster}
          />
        </Box>
      </Box>
    </div>
  );
};

export default RosterManagement;
