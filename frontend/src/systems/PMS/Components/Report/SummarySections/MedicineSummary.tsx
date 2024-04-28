import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import TickPlacementBars from "../Charts/TickPlacementBars";

const MedicineSummary = () => {
  const style = {
    p: 0,
    width: "100%",
    maxWidth: 430,
    borderRadius: 2,
    border: "1px solid #0d4838",
    borderColor: "divider",
    backgroundColor: "background.paper",
  };
  return (
    <div>
      <Paper elevation={24} sx={{ p: 5 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          Medicine Management
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TickPlacementBars />
          </Grid>

          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={6}>
              <List sx={style} aria-label="mailbox folders">
                <ListItem>
                  {/* add the total medicine count here! */}
                  <ListItemText primary="Total medicine count: " />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={6}>
              <List sx={style} aria-label="mailbox folders">
                <ListItem>
                  <ListItemText primary="Number of the medicines' stock less than 10: " />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default MedicineSummary;
