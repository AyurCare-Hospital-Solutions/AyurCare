
import { Dashboard, Inbox, Mail } from '@mui/icons-material';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, Outlet } from 'react-router-dom'
import DashboardPage from '../../components/DashboardPage';


function ImsMain() {

    return (
        <DashboardPage>
            <Link to="/ims/dashboard">
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
        </DashboardPage>
    )
}

export default ImsMain
