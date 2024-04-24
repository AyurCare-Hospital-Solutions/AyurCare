import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import MyLeaveRequestDialog from "./myLeaveRequest/MyLeaveRequestDialog";
import MyLeaveRequestTable from "./myLeaveRequest/MyLeaveRequestTable";
import SearchBar from "./myLeaveRequest/SearchBar";

const MyLeaveRequest = () => {
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);

  // Function to handle opening the dialog
  const handleOpenDialog = () => {
    setRequestDialogOpen(true);
  };

  return (
    <div className="MyLeaveRequest">
      <Box sx={{ display: "flex", mx: 4 }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            My Leave Requests
          </Typography>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
        </Box>
        {/* Button to open the dialog */}
        <Button
          sx={{ ml: "auto", my: "auto" }}
          variant="outlined"
          onClick={handleOpenDialog} // Call handleOpenDialog on click
        >
          Request Leave
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", mx: 4, mb: 4 }}>
          <Box flexGrow={1} />
          {/* Pass the state and setState function to the dialog component */}
          <MyLeaveRequestDialog
            open={requestDialogOpen}
            onClose={() => setRequestDialogOpen(false)}
          />
        </Box>
        <Box sx={{ display: "flex", mb: 4 }}>
          <SearchBar />
        </Box>
        <Box sx={{ display: "flex", mx: 4 }}>
          <MyLeaveRequestTable />
        </Box>
      </Box>
    </div>
  );
};

export default MyLeaveRequest;
