import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import NewShiftTypeDialog from "./shiftType/NewShiftTypeDialog";
import ShiftTypeTable from "./shiftType/ShiftTypeTable";
import axios from "axios";
import { ShiftTypeData } from "../types";
import { enqueueSnackbar } from "notistack";
import { useConfirm } from "material-ui-confirm";

const ShiftTypes = () => {
  const [newShiftDialogOpen, setNewShiftDialogOpen] = useState(false);
  const [rows, setRows] = useState<ShiftTypeData[]>([]);

  const confirm = useConfirm();
  useEffect(() => {
    getAllShiftTypes();
  }, []);

  const getAllShiftTypes = async () => {
    try {
      const response = await axios.get("/api/hrms/shiftType");
      setRows(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const addShiftType = async (data: any) => {
    try {
      const response = await axios.post("/api/hrms/shiftType", {
        name: data.name,
        startTime: data.startTime,
        endTime: data.endTime,
      });

      setRows([...rows, response.data]);
      enqueueSnackbar("Shift type added successfully", { variant: "success" });
    } catch (error) {
      console.error("Error adding leave type:", error);
      enqueueSnackbar("Error adding leave type", { variant: "error" });
    }
  };

  const updateShiftType = async (
    row: ShiftTypeData,
    name: string,
    startTime: Date,
    endTime: Date
  ) => {
    try {
      await axios.put(`/api/hrms/leaveType/${row.id}`, {
        name: name,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      });
      row.name = name;
      row.startTime = startTime.toISOString();

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

    const deleteShiftType = async (id: number) => {
      await confirm({
        description: "Are you sure you want to delete this shift type?",
      });
      try {
        await axios.delete(`/api/hrms/shiftType/${id}`);
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
        enqueueSnackbar("Shift type deleted successfully", {
          variant: "success",
        });
      } catch (error) {
        console.error("Error deleting row:", error);
        enqueueSnackbar("Error deleting leave type", {
          variant: "error",
        });
      }
    };

    return (
      <div className="shiftType">
        <Box sx={{ display: "flex", mx: 4 }}>
          <Box>
            <Typography variant="h5" gutterBottom>
              Shift Types
            </Typography>
            <Typography variant="body2">
              Add, Remove and Edit Shift Types
            </Typography>
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
          addShiftType={addShiftType}
          onClose={() => setNewShiftDialogOpen(false)}
        />
        <Box sx={{ m: 4 }}>
          <ShiftTypeTable
            rows={rows}
            deleteShiftType={deleteShiftType}
            updateShiftType={updateShiftType}
          />
        </Box>
      </div>
    );
  };
};
export default ShiftTypes;
