import React, { useEffect, useState } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import LeaveRequestTable from "./leaveManagement/LeaveRequestTable";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { LeaveRequestData } from "../types";
import SearchBar from "./SearchBar";
import { useConfirm } from "material-ui-confirm";

const LeaveRequest: React.FC = () => {
  useEffect(() => {
    fetchAllLeaveRequests();
  }, []);

  const confirm = useConfirm();

  const [rows, setRows] = useState<LeaveRequestData[]>([]);
  const [tabValue, setTabValue] = useState<"Pending" | "Processed" | "All">(
    "Pending"
  );
  const [query, setQuery] = useState<RegExp>();

  const fetchAllLeaveRequests = async () => {
    try {
      const response = await axios.get("/api/hrms/leave");
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const handleAction = async (id: number, approve: boolean) => {
    try {
      const leaveRequest = rows.find((v) => v.id == id);
      if (!leaveRequest) return;

      const status = approve ? "Approved" : "Rejected";

      const response = await axios.put(
        `/api/hrms/leave/approve/${leaveRequest.id}`,
        { status: status }
      );
      if (response.status === 200) {
        leaveRequest.status = status;
        setRows([...rows]);

        enqueueSnackbar("Leave request approved", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar("Error approving leave request", { variant: "error" });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const leaveIndex = rows.findIndex((v) => v.id == id);
      if (leaveIndex === -1) return;

      const leaveRequest = rows[leaveIndex];

      await confirm({
        description: `Are you sure you want to delete the leave request ${leaveRequest.id}?`,
      });

      const response = await axios.delete(`/api/hrms/leave/${leaveRequest.id}`);
      if (response.status === 204) {
        rows.splice(leaveIndex, 1);
        setRows([...rows]);
        enqueueSnackbar("Leave request deleted", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar("Error deleting leave request", { variant: "error" });
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: any) => {
    setTabValue(newValue);
  };

  return (
    <div className="LeaveRequest">
      <Box sx={{ display: "flex", mx: 4, mb: 4 }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Leave Request Management
          </Typography>
          <Typography variant="body2" sx={{}}>
            Use this to approve or reject pending leave requests.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mr: 4 }}>
        <SearchBar onChange={setQuery} />
      </Box>
      <Box sx={{ mx: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Pending Requests" value="Pending" />
          <Tab label="Processed Leaves" value="Processed" />
          <Tab label="All Leave Requests" value="All" />
        </Tabs>
        <Box sx={{ mt: 2 }}>
          <LeaveRequestTable
            leaveRequests={rows}
            handleAction={handleAction}
            handleDelete={handleDelete}
            type={tabValue}
            query={query}
          />
        </Box>
      </Box>
    </div>
  );
};

export default LeaveRequest;
