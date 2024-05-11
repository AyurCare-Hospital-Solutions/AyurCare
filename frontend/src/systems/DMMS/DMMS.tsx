import { Assessment, Bed, Dashboard, House } from '@mui/icons-material';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import FiberNewSharpIcon from '@mui/icons-material/FiberNewSharp';
import CommentSharpIcon from '@mui/icons-material/CommentSharp';
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
                            <CommentSharpIcon />
                        </ListItemIcon>
                        <ListItemText primary="Manage Requests" />
                    </ListItemButton>
                </ListItem>
            </Link>


            {/* <Link to="/dmms/reports">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Assessment />
                        </ListItemIcon>
                        <ListItemText primary="Reports" />
                    </ListItemButton>
                </ListItem>
            </Link> */}

            <Link to="/dmms/report">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Assessment />
                        </ListItemIcon>
                        <ListItemText primary="Analyse Reports" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to="/dmms/test">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <FiberNewSharpIcon />
                        </ListItemIcon>
                        <ListItemText primary="New Requests" />
                    </ListItemButton>
                </ListItem>
            </Link>
        </DashboardPage>
    )
}

export default DMMS;