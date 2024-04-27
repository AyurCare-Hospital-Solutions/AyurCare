import { Assessment, Bed, Dashboard, House } from '@mui/icons-material';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom'
import DashboardPage from '../../components/DashboardPage';


function DMMS() {
    return (
        <DashboardPage>
            <Link to="/dmms/">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/dmms/reqMedicine">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            < House />
                        </ListItemIcon>
                        <ListItemText primary="Manufacture Request" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/dmms/mgMedicine">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Bed />
                        </ListItemIcon>
                        <ListItemText primary="Manage Requests" />
                    </ListItemButton>
                </ListItem>
            </Link>


            <Link to="/dmms/reports">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Assessment />
                        </ListItemIcon>
                        <ListItemText primary="Reports" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/dmms/report02">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Assessment />
                        </ListItemIcon>
                        <ListItemText primary="02" />
                    </ListItemButton>
                </ListItem>
            </Link>
        </DashboardPage>
    )
}

export default DMMS;