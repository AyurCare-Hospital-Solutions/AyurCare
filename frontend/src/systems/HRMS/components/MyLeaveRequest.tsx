// MyLeaveRequest.tsx
import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MyLeaveRequestDialog from "./myLeaveRequest/MyLeaveRequestDialog";
import MyLeaveRequestTable from "./myLeaveRequest/MyLeaveRequestTable";
import { useConfirm } from "material-ui-confirm";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { MyLeaveRequestData } from "../types";

const MyLeaveRequest = () => {
  useEffect(() => {
    fetchUserLeaveRequests();
  }, []);

  const confirm = useConfirm();

  const [rows, setRows] = useState<MyLeaveRequestData[]>([]);
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);

  //Fetching all the leave requests by user id
  const fetchUserLeaveRequests = async () => {
    try {
      const response = await axios.get<MyLeaveRequestData[]>(
        "/api/hrms/leave/user"
      );
      console.log(response.data);
      setRows(response.data);
    } catch (error) {
      console.log("Error fetching Leave Request by User ID :", error);
    }
  };

  //Adding a leave request
  const addLeaveRequest = async (data: any) => {
    try {
      const response = await axios.post("/api/hrms/leave", {
        reason: data.reason,
        startDate: data.start_date,
        endDate: data.end_date,
        hours: data.hours,
        type: data.leave_type?.id, // Fixed property access
        registration: data.registration,
      });

      setRows([...rows, response.data]);
      enqueueSnackbar("Leave Request added successfully", {
        variant: "success",
      });
    } catch (error) {
      console.error("Error adding leave type:", error);
      enqueueSnackbar("Error adding leave type", { variant: "error" });
    }
  };

  const handleOpenDialog = () => {
    setRequestDialogOpen(true);
  };

  const deleteLeaveRequest = async (id: number) => {
    await confirm({
      description: "Are you sure you want to delete this leave request?",
    });

    try {
      await axios.delete(`/api/hrms/leave/${id}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      enqueueSnackbar("Leave type deleted successfully", {
        variant: "success",
      });
    } catch (error) {
      // Handle error here
      console.error("Error deleting leave request:", error);
      enqueueSnackbar("Failed to delete leave request", {
        variant: "error",
      });
    }
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
        <Button
          sx={{ ml: "auto", my: "auto" }}
          variant="outlined"
          onClick={handleOpenDialog}
        >
          Request Leave
        </Button>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", mx: 4, mb: 4 }}>
          <Box flexGrow={1} />
          <MyLeaveRequestDialog
            addLeaveRequest={addLeaveRequest}
            open={requestDialogOpen}
            onClose={() => setRequestDialogOpen(false)}
          />
        </Box>
        <Paper sx={{ display: "flex", m: 4 }}>
          {/* <MyLeaveRequestSearch /> */}
        </Paper>
        <Box sx={{ display: "flex", mx: 4 }}>
          <MyLeaveRequestTable
            rows={rows}
            deleteLeaveRequest={deleteLeaveRequest}
          />
        </Box>
      </Box>
    </div>
  );
};

export default MyLeaveRequest;
