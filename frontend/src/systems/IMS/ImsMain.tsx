
import { Dashboard, Inbox, Mail } from '@mui/icons-material';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import ScienceIcon from '@mui/icons-material/Science';
import HealingIcon from '@mui/icons-material/Healing';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, Outlet } from 'react-router-dom'
import DashboardPage from '../../components/DashboardPage';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';


function ImsMain() {

    return (
        <DashboardPage>
            <Link to="/ims">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/ims/medicine">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <VaccinesIcon />
                        </ListItemIcon>
                        <ListItemText primary="Medicine" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/ims/material">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ScienceIcon />
                        </ListItemIcon>
                        <ListItemText primary="Material" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/ims/accessories">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HealingIcon />
                        </ListItemIcon>
                        <ListItemText primary="Accessories" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/ims/medicineRequests">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <MedicalServicesIcon />
                        </ListItemIcon>
                        <ListItemText primary="Manage Medicine Requests" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/ims/materialRequests">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <MedicalServicesIcon />
                        </ListItemIcon>
                        <ListItemText primary="Manage Material Requests" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/ims/reqMedicine">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HealingIcon />
                        </ListItemIcon>
                        <ListItemText primary="Request Medicine(temp)" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/ims/reqMaterial">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HealingIcon />
                        </ListItemIcon>
                        <ListItemText primary="Request Material(temp)" />
                    </ListItemButton>
                </ListItem>
            </Link>
        </DashboardPage>
    )
}

export default ImsMain
