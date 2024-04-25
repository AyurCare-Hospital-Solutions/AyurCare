import {
  Dashboard,
  EditCalendar,
  AssignmentInd,
  Summarize,
  Assessment,
} from "@mui/icons-material";
import {
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import DashboardPage from "../../components/DashboardPage";

function OPCMS() {
  return (
    <DashboardPage>
      <Link to="dashboard">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Dashboard />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Divider />
      <Link to="/opcms/appointments">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <EditCalendar />
            </ListItemIcon>
            <ListItemText primary="Appointments" />
          </ListItemButton>
        </ListItem>
      </Link>

      <Link to="/opcms/records">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AssignmentInd />
            </ListItemIcon>
            <ListItemText primary="Medical Records" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Divider />

      <Link to="/opcms/reports">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Summarize />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
        </ListItem>
      </Link>
      <Divider />

      <Link to="/opcms/analytics">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Assessment />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItemButton>
        </ListItem>
      </Link>
    </DashboardPage>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default OPCMS;
