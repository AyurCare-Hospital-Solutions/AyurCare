import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import NewShiftTypeDialog from "./components/shiftType/NewShiftTypeDialog";
import ShiftTypeTable from "./components/shiftType/ShiftTypeTable";

const ShiftTypes = () => {
  const [newShiftDialogOpen, setNewShiftDialogOpen] = useState(false);

  return (
    <div className="shiftType">
      <Box sx={{ display: "flex", mx: 4 }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Shift Types
          </Typography>
          <Typography variant="body2"></Typography>
        </Box>
        <Button
          sx={{ ml: "auto", my: "auto" }}
          variant="outlined"
          onClick={() => setNewShiftDialogOpen(true)}
        >
          Add Shift Type
        </Button>
      </Box>
      <Box flexGrow={1} />
      <NewShiftTypeDialog
        open={newShiftDialogOpen}
        onClose={() => setNewShiftDialogOpen(false)}
      />
      <Box sx={{ m: 4 }}>
        <ShiftTypeTable />
      </Box>
    </div>
  );
};

export default ShiftTypes;
