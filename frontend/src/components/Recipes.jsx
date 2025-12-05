import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActionArea, Button } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const recipes = [
    "Grilled Chicken Panouzzo.pdf",
    "Beetroot Hummus.pdf",
    "Blanched Sliced Potato.pdf",
    "Brisket Roast Panouzzi .pdf",
    "Gruyere & Jam Panuozzo .pdf",
    "Pastrami, Potato & Leeks Galette.pdf",
    "Ribeye Roast Beef Panuozzo .pdf",
    "Turkey And Cheese Panouzzo .pdf",
    "Veal Scalopini.pdf",
    "doc1-720.pdf", "doc1-721.pdf", "doc1-722.pdf", "doc1-723.pdf", "doc1-724.pdf",
    "doc1-725.pdf", "doc1-726.pdf", "doc1-727.pdf", "doc1-728.pdf", "doc1-729.pdf",
    "doc1-730.pdf", "doc1-731.pdf", "doc1-732.pdf", "doc1-733.pdf", "doc1-734.pdf",
    "doc1-735.pdf", "doc1-736.pdf", "doc1-737.pdf", "doc1-738.pdf", "doc1-739.pdf",
    "doc1-740.pdf", "doc1-748.pdf", "doc1-749.pdf", "doc1-750.pdf", "doc1-754.pdf",
    "doc1-755.pdf", "doc1-756.pdf", "doc1-757.pdf", "doc1-758.pdf", "doc1-759.pdf",
    "doc1-760.pdf", "doc1-761.pdf", "doc1-762.pdf", "doc1-763.pdf", "doc1-764.pdf",
    "doc1-765.pdf", "doc1-766.pdf", "doc1-767.pdf", "doc1-768.pdf", "doc1-769.pdf",
    "doc1-770.pdf", "doc1-771.pdf", "doc1-772.pdf", "doc1-773.pdf", "doc1-774.pdf",
    "doc1-775.pdf", "doc1-776.pdf", "doc1-777.pdf", "doc1-778.pdf", "doc1-779.pdf",
    "doc1-780.pdf", "doc1-781.pdf", "doc1-782.pdf", "doc1-783.pdf", "doc1-784.pdf",
    "doc1-785.pdf", "doc1-786.pdf", "doc1-787.pdf", "doc1-788.pdf", "doc1-789.pdf",
    "doc1-790.pdf", "doc1-791.pdf", "doc1-792.pdf", "doc1-793.pdf", "doc1-794.pdf",
    "doc1-795.pdf", "doc1-796.pdf", "doc1-797.pdf", "doc1-798.pdf", "doc1-799.pdf",
    "doc1-800.pdf", "doc1-801.pdf", "doc1-802.pdf", "doc1-803.pdf", "doc1-804.pdf",
    "doc1-805.pdf", "doc1-806.pdf", "doc1-807.pdf", "doc1-808.pdf", "doc1-809.pdf",
    "doc1-810.pdf", "doc1-811.pdf", "doc1-812.pdf"
];

const Recipes = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 3 }}>
                Recipes & Procedures
            </Typography>
            <Grid container spacing={3}>
                {recipes.map((recipe, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', '&:hover': { boxShadow: 6 } }}>
                            <CardActionArea href={`/recipes/${recipe}`} target="_blank" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                                <PictureAsPdfIcon sx={{ fontSize: 60, color: '#e74c3c', mb: 2 }} />
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'medium' }}>
                                        {recipe.replace('.pdf', '')}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Recipes;
