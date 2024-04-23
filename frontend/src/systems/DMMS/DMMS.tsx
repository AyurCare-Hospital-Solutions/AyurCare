import { Assessment, Bed, Dashboard,  House } from '@mui/icons-material';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom'
import DashboardPage from '../../components/DashboardPage';


function DMMS() {
    return (
        <DashboardPage>
            <Link to="/dmms/Dashboard">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/dmms/ManufacturingRequestModel">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            < House />
                        </ListItemIcon>
                        <ListItemText primary="ManufactureTable" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/dmms/ManufactureRequestTable">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Bed />
                        </ListItemIcon>
                        <ListItemText primary="Metirials Request" />
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
        </DashboardPage>
    )
}

export default DMMS;