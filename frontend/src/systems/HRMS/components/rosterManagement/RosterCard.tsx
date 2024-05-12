import { Box, Divider, Paper, Typography, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { ShiftData } from "../../types";
import dayjs from "dayjs";

const RosterCard = ({
  selectedShift,
  openRosterDialog,
  deleteRoster,
}: {
  selectedShift: ShiftData | null;
  openRosterDialog: (v: boolean) => void;
  deleteRoster: (id: number) => void;
}) => {
  if (!selectedShift) return null;

  return (
    <>
      <Paper>
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <Typography variant="h6">Roster ID : {selectedShift.id}</Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="body1">
            Date : {dayjs(selectedShift.date).format("DD/MM/YYYY")}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body1">
            Type : {selectedShift.ShiftType.name}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body1">
            Start time : {selectedShift.ShiftType.startTime}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body1">
            End time : {selectedShift.ShiftType.endTime}
          </Typography>
          <Divider sx={{ my: 1 }} />
        </Box>
        <Box sx={{ display: "flex", p: 2, justifyContent: "space-between" }}>
          <IconButton
            color="primary"
            aria-label="edit"
            onClick={() => openRosterDialog(true)}
          >
            <Edit />
          </IconButton>
          <IconButton
            color="error"
            aria-label="delete"
            sx={{ borderColor: "error.main" }}
            onClick={() => deleteRoster(selectedShift.id)}
          >
            <Delete />
          </IconButton>
        </Box>
      </Paper>
    </>
  );
};

export default RosterCard;
