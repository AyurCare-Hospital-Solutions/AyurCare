import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Gauge } from "@mui/x-charts/Gauge";

const style = {
  py: 0,
  width: "100%",
  maxWidth: 360,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};
const UserConcernsSummary = () => {
  
  return (
    <div>
      <Paper elevation={24} sx={{ p: 5 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          Customer Support
        </Typography>

        <Gauge
        value={79}
          width={100}
          height={100}
          text={({ value, valueMax }) => `${value} / ${valueMax}`}
        />
        <List sx={style}>
          <ListItem>
            <ListItemText primary="Approved prescriptions: " />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary="Rejected prescriptions: " />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </Paper>
    </div>
  );
};

export default UserConcernsSummary;
