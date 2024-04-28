import { Assessment, ConfirmationNumber, Dashboard, PeopleAlt, SettingsAccessibility } from '@mui/icons-material';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom'
import DashboardPage from '../../components/DashboardPage';

function ACS() {
    return (
        <DashboardPage>
            <Link to="/acs/dashboard">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/acs/staff">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <PeopleAlt />
                        </ListItemIcon>
                        <ListItemText primary="Staff" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/acs/support_tickets">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ConfirmationNumber />
                        </ListItemIcon>
                        <ListItemText primary="Support Tickets" />
                    </ListItemButton>
                </ListItem>
            </Link>


            <Link to="/acs/access_control">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <SettingsAccessibility />
                        </ListItemIcon>
                        <ListItemText primary="Access Control" />
                    </ListItemButton>
                </ListItem>
            </Link>


            <Link to="/acs/reports">
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

export default ACS;