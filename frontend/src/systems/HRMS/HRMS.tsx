import { Link } from "react-router-dom";
import DashboardPage from "../../components/DashboardPage";
import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Assessment,
  Category,
  ConfirmationNumber,
  Dashboard,
  Email,
  Event,
  Group,
  Groups,
  QueryBuilder,
} from "@mui/icons-material";

const HRMS = () => {
  return (
    <DashboardPage>
      <Link to="/hrms/">
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

      <Link to="rosterManagement" hidden>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Groups />
            </ListItemIcon>
            <ListItemText primary="Roster Management" />
          </ListItemButton>
        </ListItem>
      </Link>

      <Link to="shiftTypes" hidden>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary="Shift Types" />
          </ListItemButton>
        </ListItem>
      </Link>

      <Link to="shifts" hidden>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <QueryBuilder />
            </ListItemIcon>
            <ListItemText primary="My Shifts" />
          </ListItemButton>
        </ListItem>
      </Link>

      <Link to="reports">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Assessment />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
        </ListItem>
      </Link>

      <Link to="chat">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Email />
            </ListItemIcon>
            <ListItemText primary="Chat" />
          </ListItemButton>
        </ListItem>
      </Link>
    </DashboardPage>
  );
};

export default HRMS;
