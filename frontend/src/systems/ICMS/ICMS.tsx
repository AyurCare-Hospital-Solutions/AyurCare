import { Assessment, Bed, Dashboard, HourglassTop, House, People } from '@mui/icons-material';
import { Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom'
import DashboardPage from '../../components/DashboardPage';


function ICMS() {
    return (
        <DashboardPage>
            <Link to="/icms/">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/icms/patient">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <People />
                        </ListItemIcon>
                        <ListItemText primary="Patient Management" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/icms/wait_list">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HourglassTop />
                        </ListItemIcon>
                        <ListItemText primary="Wait List" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Divider sx={{ mt: 1, mb: 1 }} />

            <Link to="/icms/wards">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            < House />
                        </ListItemIcon>
                        <ListItemText primary="Manage Wards" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/icms/beds">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Bed />
                        </ListItemIcon>
                        <ListItemText primary="Manage Beds" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Divider sx={{ mt: 1, mb: 1 }} />


            <Link to="/icms/reports">
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
    )
}

export default ICMS;