import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import DashboardPage from "../../components/DashboardPage";
import StorageIcon from "@mui/icons-material/Storage";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import HelpIcon from "@mui/icons-material/Help";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BookIcon from "@mui/icons-material/Book";
import { SnackbarProvider } from "notistack";

import { Dashboard, Assessment } from "@mui/icons-material";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const Pms = () => {
  return (
    <SnackbarProvider>
      <DashboardPage>
        <Link to="/pms/dashboard">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/pms/medicines">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LocalHospitalIcon />
              </ListItemIcon>
              <ListItemText primary="Medicines" />
            </ListItemButton>
          </ListItem>
        </Link>

        {/* <Link to="/pms/keep">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary="Keep" />
            </ListItemButton>
          </ListItem>
        </Link> */}

        <Link to="/pms/inventoryrequest">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <StorageIcon />
              </ListItemIcon>
              <ListItemText primary="Inventory Request" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/pms/prescriptionmanagement">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Prescription Management" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/pms/receivedprescription">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AssignmentTurnedInIcon />
              </ListItemIcon>
              <ListItemText primary="Received Prescription" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/pms/userconcerns">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              <ListItemText primary="Customer Support" />
            </ListItemButton>
          </ListItem>
        </Link>

        <Link to="/pms/reports">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Assessment />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItemButton>
          </ListItem>
        </Link>

        {/* <Link to="/pms/userguide">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BookIcon />;
              </ListItemIcon>
              <ListItemText primary="User Guide" />
            </ListItemButton>
          </ListItem>
        </Link> */}
      </DashboardPage>
    </SnackbarProvider>
  );
};

export default Pms;
