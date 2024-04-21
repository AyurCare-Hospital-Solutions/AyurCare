import { Link } from "react-router-dom";
import DashboardPage from "../../components/DashboardPage";
import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Assessment,
  Category,
  ConfirmationNumber,
  Dashboard,
  Event,
  Groups,
} from "@mui/icons-material";

const HRMS = () => {
  return (
    <DashboardPage>
      <Link to="/HRMS/Dashboard">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Divider sx={{ mt: 2, mb: 1 }} />
      <Typography
        color="textSecondary"
        sx={{
          fontWeight: 550,
          ml: -2,
          fontSize: "0.99rem",
          textAlign: "center",
        }}
      >
        Leave Management{" "}
      </Typography>
      <Link to="myLeaveRequests">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ConfirmationNumber />
            </ListItemIcon>
            <ListItemText primary="My Leave Requests" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link to="leaveRequests">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Event />
            </ListItemIcon>
            <ListItemText primary="Leave Requests" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Link to="leaveTypes">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Category />
            </ListItemIcon>
            <ListItemText primary="Leave Types" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Divider sx={{ mt: 2, mb: 1 }} />

      <Link to="/HRMS/Dashboard">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Groups />
            </ListItemIcon>
            <ListItemText primary="Roster Management" />
          </ListItemButton>
        </ListItem>
      </Link>

      <Link to="/HRMS/Dashboard">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Assessment />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
        </ListItem>
      </Link>
    </DashboardPage>
  );
};

export default HRMS;
