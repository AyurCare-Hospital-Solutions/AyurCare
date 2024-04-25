import { Dashboard } from '@mui/icons-material';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SummarizeIcon from '@mui/icons-material/Summarize';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom'
import DashboardPage from '../../components/DashboardPage';


function OPCMS() {

    return (
        <DashboardPage>
            <Link to="/opcms">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Dashboard />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </ListItem>
            </Link>
        <Divider />
            <Link to="/opcms/appointments">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <EditCalendarIcon />
                        </ListItemIcon>
                        <ListItemText primary="Appointments" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/opcms/records">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AssignmentIndIcon />
                        </ListItemIcon>
                        <ListItemText primary="Medical Records" />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Divider/>

            <Link to="/opcms/reports">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <SummarizeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Reports" />
                    </ListItemButton>
                </ListItem>
            </Link>
            <Divider />
            
            <Link to="/opcms/analytics">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AssessmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="Analytics" />
                    </ListItemButton>
                </ListItem>
            </Link>
        </DashboardPage>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export default OPCMS
