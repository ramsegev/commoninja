import React from 'react';
import { Grid } from "@mui/material";
import { IDoc } from "@/app/types/types";
import Item from "@/app/components/Item";

const Items: React.FC<{ items: IDoc[] }> = ({ items }) => {
    return (
        <>
            {items.length > 0 && (
                <Grid container spacing={2} p={{ xs: 0, md: 4 }}>
                    {items.map((item, index) => (
                        <Grid item xs={12} md={4} p={2} key={item.id || index}>
                            <Item item={item} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

export default Items;
