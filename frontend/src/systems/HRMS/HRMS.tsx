import { Link } from "react-router-dom";
import DashboardPage from "../../components/DashboardPage";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Assessment, Dashboard, Event, Groups } from "@mui/icons-material";

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

      <Link to="leave">
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Event />
            </ListItemIcon>
            <ListItemText primary="Leave Management" />
          </ListItemButton>
        </ListItem>
      </Link>

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

export default HRMS
