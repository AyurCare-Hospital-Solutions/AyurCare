import { Box, Button } from "@mui/material";
import LeaveTypeDialog from "./leaveType/NewLeaveTypeDialog";
import axios from "axios";
import LeaveTypeTable from "./leaveType/LeaveTypeTable";
import { useEffect, useState } from "react";
import { LeaveTypeData } from "../types";
import { useConfirm } from "material-ui-confirm";
import { enqueueSnackbar } from "notistack";

const LeaveType = () => {
  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const confirm = useConfirm();

  const [rows, setRows] = useState<LeaveTypeData[]>([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const fetchLeaveTypes = async () => {
    try {
      const response = await axios.get<LeaveTypeData[]>("/api/hrms/leaveType");
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addLeaveType = async (data: any) => {
    console.log(data);
    const res = await axios.post("/api/hrms/leaveType", {
      name: data.name,
      hours: data.duration,
    });

    setRows([...rows, res.data]);
  };

  const deleteLeaveType = async (id: number) => {
    await confirm({
      description: "Are you sure you want to delete this leave type?",
    });
    try {
      await axios.delete(`/api/hrms/leaveType/${id}`);
      setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      enqueueSnackbar("Leave type deleted successfully", {
        variant: "success",
      });
    } catch (error) {
      console.error("Error deleting row:", error);
      enqueueSnackbar("Error deleting leave type", {
        variant: "error",
      });
    }
  };

  const updateLeaveType = async (
    row: LeaveTypeData,
    name: string,
    duration: number
  ) => {
    try {
      await axios.put(`/api/hrms/leaveType/${row.id}`, {
        name: name,
        hours: duration,
      });
      row.name = name;
      row.hours = duration;
      setRows([...rows]);
      enqueueSnackbar("Leave type updated successfully", {
        variant: "success",
      });
    } catch (error) {
      console.error("Error updating leave type:", error);
      enqueueSnackbar("Error updating leave type", {
        variant: "error",
      });
    }
  };

  return (
    <div className="LeaveType">
      <Box sx={{ display: "flex" }} my={2} mx={2}>
        {/* <LeaveTypeSearch /> */}
        <Box flexGrow={1} />
        <Button variant="outlined" onClick={() => setAddDialogOpen(true)}>
          Add Leave Type
        </Button>
        <LeaveTypeDialog
          addLeaveType={addLeaveType}
          open={addDialogOpen}
          onClose={() => setAddDialogOpen(false)}
        />
      </Box>

      <LeaveTypeTable
        rows={rows}
        deleteLeaveType={deleteLeaveType}
        updateLeaveType={updateLeaveType}
      />
    </div>
  );
};

export default LeaveType;
