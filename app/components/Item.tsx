import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { IDoc } from "@/app/types/types";

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US');
};

const Item: React.FC<{ item: IDoc }> = ({ item }) => {
    const { name, type, buttonText, description, created, status, previewImage, thumbnail, promotionImage } = item;

    const image = previewImage || thumbnail || promotionImage || "/commoninja.png";

    return (
        <Card sx={{ display: 'flex' }}>
            {image && (
                <CardMedia
                    component="img"
                    image={image}
                    alt={name}
                    sx={{ maxWidth: 150, p: 2 }}
                />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'column'}}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    {name && <Typography gutterBottom variant="h6">{name}</Typography>}
                    {type && <Typography gutterBottom variant="caption">Type: {type}</Typography>}
                    {buttonText && <Typography gutterBottom variant="caption">{buttonText}</Typography>}
                    {description && <Typography variant="caption" color="text.secondary">{description}</Typography>}
                    {created && <Typography variant="body2" color="text.secondary">Created: {formatDate(created)}</Typography>}
                    {status && <Typography variant="body2" color="text.secondary">Status: {status}</Typography>}
                </CardContent>
            </Box>
        </Card>
    );
};

export default Item;
