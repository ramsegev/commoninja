import React from 'react';
import {Grid, Skeleton} from "@mui/material";

const Loading: React.FC = () => {
    return (
        <Grid container xs={12} md={4} sx={{flex: '1 0 auto', px:7}}>
            <Grid item xs={12} md={4}>
                <Skeleton variant="rectangular"  height="100%" sx={{maxWidth: 150, p: 2}}/>
            </Grid>
            <Grid item xs={12} md={8} spacing={5} p={3}>
                <Skeleton variant="text" height={30}/>
                <Skeleton variant="text"  height={20}/>
                <Skeleton variant="text"  height={20}/>
            </Grid>
        </Grid>
    );
};

export default Loading;