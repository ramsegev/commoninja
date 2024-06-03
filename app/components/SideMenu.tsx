import React, { useState } from 'react';
import Link from 'next/link';
import { Drawer, List, ListItem, ListItemText, Toolbar, IconButton, ListItemIcon, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { menuItems } from '@/app/api/mockups/menuItems';

const drawerWidth = 240;

const SideMenu: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuItemClick = () => {
        setMobileOpen(false);
    };

    const renderDrawer = () => (
        <>
            <Toolbar />
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.path} component={Link} href={`/dashboard/${item.path}`} onClick={handleMenuItemClick}>
                        <ListItemIcon>
                            <item.icon />
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                ))}
            </List>
        </>
    );

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    top: 8,
                    left: mobileOpen ? drawerWidth - 56 : 16,
                    transition: 'left 225ms',
                    zIndex: 1300, // Above Drawer zIndex
                }}
            >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
            </Box>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {renderDrawer()}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                {renderDrawer()}
            </Drawer>
        </>
    );
};

export default SideMenu;
