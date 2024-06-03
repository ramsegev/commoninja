"use client"
import React from 'react';
import {AppBar, Toolbar, Typography, Box, CssBaseline} from '@mui/material';
import SideMenu from './SideMenu';
import useFetchData from "@/app/hooks/useFetchData";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {
    useFetchData();
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" sx={{
                width: {xs: "100%", sm: `calc(100% - 240px)`},
                ml: {sm: `240px`},
                color: 'primary.main',
                backgroundColor: 'secondary.main',
            }}>
                <Toolbar>
                    <Typography variant="h6" noWrap sx={{pl: 5}}>
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{width: {sm: 240}, flexShrink: {sm: 0}, zIndex: 1300, ml:2, mt:1}}
                aria-label="mailbox folders"
            >
                <SideMenu/>
            </Box>
            <Box component="main" sx={{flexGrow: {xs: 0, md: 1}, p: {xs: 1, md: 3}, pl:{sx:0} }}>
                <Toolbar/>
                {children}
            </Box>
        </Box>
    );
};

export default DashboardLayout;
