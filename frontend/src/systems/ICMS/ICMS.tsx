import { Assessment, Bed, Dashboard, HourglassTop, House, MonitorHeart, ReceiptLong } from '@mui/icons-material';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom'
import DashboardPage from '../../components/DashboardPage';


function ICMS() {
    return (
        <DashboardPage>
            <Link to="/icms/dashboard">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
            </Link>

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


            <Link to="/icms/nursing_log">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ReceiptLong />
                        </ListItemIcon>
                        <ListItemText primary="Nursing Log" />
                    </ListItemButton>
                </ListItem>
            </Link>


            <Link to="/icms/care_plan">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            < MonitorHeart />
                        </ListItemIcon>
                        <ListItemText primary="Care Plans" />
                    </ListItemButton>
                </ListItem>
            </Link>


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