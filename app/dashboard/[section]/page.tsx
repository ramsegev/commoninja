'use client'
import React, { lazy, Suspense } from 'react';
import {Box, Button, CssBaseline, Divider, Grid, Skeleton, TextField, Typography} from '@mui/material';
import { useDashboardContext } from '@/app/context/DashboardContext';
import { menuItems } from '@/app/api/mockups/menuItems';
import { useRedirect } from '@/app/hooks/useRedirect';
import { IItem } from '@/app/types/types';
import Loading from '@/app/components/Loading';
import useItems from '@/app/hooks/useItems';

const LazyItems = lazy(() => import('@/app/components/Items'));

const DashboardSection: React.FC = () => {
    const { sections, section } = useDashboardContext();
    const title = menuItems.find((item) => item.path === section) || { name: '' };
    useRedirect();
    const items: IItem | null = sections?.[section || ''] || null;
    const { itemsToShow, hasMore, handleLoadMore, searchTerm, handleSearchChange } = useItems(items);

    return (
        <>
            <Typography variant="h4" title={title.name} component="div">
                {title.name ? title.name : <Skeleton variant="text" height={30} />}
            </Typography>
            <TextField label="Search" variant="outlined" value={searchTerm} onChange={handleSearchChange} sx={{ my: 3 }} />
            <Divider variant="inset" component="div" />
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                {!title.name && (
                    <Grid container>
                        {[...Array(3)].map((_, index) => (
                            <Loading key={index} />
                        ))}
                    </Grid>
                )}
                <Box component="main" sx={{ flexGrow: 1, p: { xs: 0, md: 3 } }}>
                    <Suspense fallback={<Loading  />}>
                        {itemsToShow?.length ? (
                            <LazyItems items={itemsToShow} />
                        ) : searchTerm && (
                            <Typography variant="body2">No items found for your search.</Typography>
                        )}
                    </Suspense>

                    {hasMore && (
                        <Button variant="contained" color="primary" onClick={handleLoadMore} sx={{ mt: 3 }}>
                            Load More
                        </Button>
                    )}
                </Box>
            </Box>
        </>
    );
};

export default DashboardSection;
