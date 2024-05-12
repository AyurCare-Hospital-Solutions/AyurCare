import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import Piechart from "../PieChartReport";

const style = {
  py: 0,
  width: "100%",
  maxWidth: 360,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};
const InventorySummary = () => {
  return (
    <div>
      <Paper elevation={24} sx={{ p: 5 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          Medicine Management
        </Typography>

        <Piechart />

        <List sx={style}>
          <ListItem>
            <ListItemText primary="Full width variant below" />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary="Inset variant below" />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemText primary="Middle variant below" />
          </ListItem>
          <Divider variant="middle" component="li" />
          <ListItem>
            <ListItemText primary="List item" />
          </ListItem>
        </List>
        <Typography>
          1. Total no of the medincines: 19 <br />
          2. Medicines counts are less than 10: <br />
          3. Medicines are
        </Typography>
      </Paper>
    </div>
  );
};

export default InventorySummary;
