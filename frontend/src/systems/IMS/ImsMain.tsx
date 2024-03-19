
import { Inbox, Mail } from '@mui/icons-material';
import { Box, Card, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link, Outlet } from 'react-router-dom'


const drawerWidth = 240;
function ImsMain() {

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'row' }} >
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
                <Card variant="outlined" sx={{
                    m: "6px",
                    p: "16px",
                    width: "100%",
                }}>

                    <Box sx={{}}>
                        <Outlet />
                    </Box>
                </Card>
            </Box >

        </ >
    )
}

export default ImsMain
