import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { DatePicker } from "@mui/x-date-pickers";
import { Box, Paper } from "@mui/material";
import {
  MyLeaveRequestSearchProps,
  LeaveSearchParams,
  leaveTypes,
} from "./MyLeaveRequestSearch";

export const MyLeaveRequestSearch: React.FC<MyLeaveRequestSearchProps> = ({
  onSearch,
}) => {
  const [leaveID, setLeaveID] = useState<string>("");
  const [leaveType, setLeaveType] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSearch = () => {
    const searchParams: LeaveSearchParams = {
      leaveID,
      leaveType,
      startDate,
      endDate,
    };
    onSearch(searchParams);
  };

  return (
    <Box display="flex" alignItems="center">
      <TextField
        label="LeaveID"
        value={leaveID}
        onChange={(e) => setLeaveID(e.target.value)}
        margin="normal"
      />
      <TextField
        select
        label="Leave Type"
        value={leaveType}
        onChange={(e) => setLeaveType(e.target.value as string)}
        margin="normal"
        sx={{ minWidth: 120, marginLeft: 1 }}
      >
        {leaveTypes.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={(date) => setStartDate(date)}
        margin="normal"
        sx={{ marginLeft: 1, mt: 2 }}
      />
      <DatePicker
        label="End Date"
        value={endDate}
        onChange={(date) => setEndDate(date)}
        margin="normal"
        sx={{ marginLeft: 1, mt: 2 }}
      />
    </Box>
  );
};
