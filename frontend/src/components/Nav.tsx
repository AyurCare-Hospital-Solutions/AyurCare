import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { AccountCircle, ConfirmationNumber, Event, Logout, Mail } from '@mui/icons-material';
import { ListItemIcon } from '@mui/material';


function TopNavBar() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };


    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
<<<<<<< HEAD
        <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
=======
        <AppBar position="sticky">
>>>>>>> 2d03c8a0d56a370e7d3c9390068499b6c369070c
            <Container maxWidth={false}>
                <Toolbar>
                    <Box sx={{ flexGrow: 0 }}>
                        <img src="/assets/logo.png" alt="AyurCare Logo" style={{ height: "50px" }} />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <Box>
                        <IconButton sx={{ p: 0 }}>
                            <Mail sx={{ color: "#ffffff", fontSize: "24px", mx: 2 }}></Mail>
                        </IconButton>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Box onClick={handleOpenUserMenu} sx={{ display: "flex" }} id="menu-opener">
                            <IconButton sx={{ p: 0 }}>
                                <AccountCircle sx={{ color: "#ffffff", fontSize: "40px" }}></AccountCircle>
                            </IconButton>
                            <Typography sx={{ color: "#ffffff", my: "auto", mx: 2 }}>User Name</Typography>
                        </Box>
                        <Menu
                            sx={{ mt: '45px', mx: '16px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <ListItemIcon>
                                    <AccountCircle></AccountCircle>
                                </ListItemIcon>

                                <Typography>Profile</Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Event></Event>
                                </ListItemIcon>
                                <Typography>Leave Requests</Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <ConfirmationNumber></ConfirmationNumber>
                                </ListItemIcon>
                                <Typography>Support Tickets</Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Logout></Logout>
                                </ListItemIcon>
                                <Typography>Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default TopNavBar;
