
import { Inbox, Mail } from '@mui/icons-material';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, Outlet } from 'react-router-dom'


const drawerWidth = 240;
function ImsMain() {

    return (
        <div>
            <Box sx={{ display: 'flex', flexDirection: 'row', minHeight: '100%' }}>
                <Drawer variant="permanent"
                    elevation={0}
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: drawerWidth, boxSizing: 'border-box',
                            mt: "64px", position: "fixed"
                        },
                        mb: 'auto'
                    }}>
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <Inbox /> : <Mail />}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <Box sx={{ ml: "16px", mt: "16px" }}>
                    <Outlet />
                </Box>
            </Box >

        </div >
    )
}

export default ImsMain
