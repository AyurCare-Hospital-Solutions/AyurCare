import { Assessment, Dashboard, House } from '@mui/icons-material';
import HealingIcon from '@mui/icons-material/Healing';
import { Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
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

            <Divider />

            <ListItem>
                <ListItemText primary="Medicine Requests" />
            </ListItem>

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

            {/* <Link to="/dmms/reqMedicine">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            < House />
                        </ListItemIcon>
                        <ListItemText primary="Manufacture Request" />
                    </ListItemButton>
                </ListItem>
            </Link> */}

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

            <Divider />

            <ListItem>
                <ListItemText primary="Reports" />
            </ListItem>

            <Link to="/dmms/reqMaterial">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <HealingIcon />
                        </ListItemIcon>
                        <ListItemText primary="Request Material" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Divider />

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

            {/* <Link to="/dmms/test_01">
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <FiberNewSharpIcon />
                        </ListItemIcon>
                        <ListItemText primary="New R" />
                    </ListItemButton>
                </ListItem>
            </Link> */}
        </DashboardPage>
    )
}

export default DMMS;