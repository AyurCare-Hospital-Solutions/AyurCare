import { Dashboard } from '@mui/icons-material';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import ScienceIcon from '@mui/icons-material/Science';
import HealingIcon from '@mui/icons-material/Healing';
import { Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom'
import DashboardPage from '../../components/DashboardPage';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';


function OPCMS_Main() {

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
                            <VaccinesIcon />
                        </ListItemIcon>
                        <ListItemText primary="Appointments" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/opcms/records">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ScienceIcon />
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
                            <HealingIcon />
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
                            <MedicalServicesIcon />
                        </ListItemIcon>
                        <ListItemText primary="Analytics" />
                    </ListItemButton>
                </ListItem>
            </Link>
        </DashboardPage>
    )
}

export default OPCMS_Main
