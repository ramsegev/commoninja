'use client'
import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Widgets as WidgetsIcon, Folder as FolderIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useDashboardContext } from '@/app/context/DashboardContext';
import { useRedirect } from '@/app/hooks/useRedirect';

const DashboardPage: React.FC = () => {
    const { widgets, projects } = useDashboardContext();
    const router = useRouter();
    useRedirect();

    const handleClick = (route: string) => {
        router.push(`/dashboard/${route}`);
    };

    const renderCard = (icon: JSX.Element, title: string, count: number) => (
        <Grid item md={2}>
            <Paper elevation={3} sx={{ display: 'flex', alignItems: 'center', p: 4, cursor: 'pointer' }} onClick={() => handleClick(title)}>
                {icon}
                <Typography gutterBottom variant="h5">
                    {title}: {count}
                </Typography>
            </Paper>
        </Grid>
    );

    return (
        <Box>
            <Typography variant="h2">Dashboard</Typography>
            <Typography variant="body1">Welcome to the dashboard!</Typography>
            <Grid container spacing={4} mt={2}>
                {renderCard(<FolderIcon sx={{ mx: 1 }} />, 'projects', projects?.docs.length || 0)}
                {renderCard(<WidgetsIcon sx={{ mx: 1 }} />, 'widgets', widgets?.docs.length || 0)}
            </Grid>
        </Box>
    );
};

export default DashboardPage;
