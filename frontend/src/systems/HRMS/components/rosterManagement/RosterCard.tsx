import { Box, Divider, Paper, Typography, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const RosterCard = () => {
  return (
    <>
      <Paper>
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <Typography variant="h6">Roster ID : 1</Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant="body1">Date : 2024 - 05 -06</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body1">Type : Surgery</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body1">Start time : 12:00</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body1">End time : 12:00</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body1">Status : Done</Typography>
        </Box>
        <Box sx={{ display: "flex", p: 2, justifyContent: "space-between" }}>
          <IconButton color="primary" aria-label="edit">
            <Edit />
          </IconButton>
          <IconButton
            color="error"
            aria-label="delete"
            sx={{ borderColor: "error.main" }}
          >
            <Delete />
          </IconButton>
        </Box>
      </Paper>
    </>
  );
};

export default RosterCard;
