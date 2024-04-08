import { Dashboard, HowToReg, EditCalendar, Assessment } from '@mui/icons-material';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom'
import DashboardPage from '../../components/DashboardPage';


function ICMS() {
    return (
        <DashboardPage>
            <Link to="/prs/dashboard">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/prs/patients">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HowToReg />
                        </ListItemIcon>
                        <ListItemText primary="Patients" />
                    </ListItemButton>
                </ListItem>
            </Link>
            
            <Link to="/prs/appointment">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <EditCalendar />
                        </ListItemIcon>
                        <ListItemText primary="Appointment" />
                    </ListItemButton>
                </ListItem>
            </Link>
            
            <Link to="/prs/report">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Assessment />
                        </ListItemIcon>
                        <ListItemText primary="Report" />
                    </ListItemButton>
                </ListItem>
            </Link>
        </DashboardPage>
    )
}

export default ICMS;