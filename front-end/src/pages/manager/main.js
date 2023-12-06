import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

const buttons = [
    <Button sx={{height:"20%", fontSize:'1.5rem'}} key="one">הגדרות אולם</Button>,
    <Button sx={{height:"20%", fontSize:'1.5rem'}} key="two">הזמנות עתידיות</Button>,
    <Button sx={{height:"20%", fontSize:'1.5rem'}} key="three">כל ההזמנות</Button>,
    <Button sx={{height:"20%", fontSize:'1.5rem'}} key="three">חשבוניות</Button>,
    <Button sx={{height:"20%", fontSize:'1.5rem'}} key="three">לוח שנה הזמנות</Button>,
];

export function Main() {
    return (
        <Box
        sx={{
            display: 'flex',
            '& > *': {
                m: 1,
            },
            height:"100%"
        }}
        >
            <Outlet/>

            <ButtonGroup
                sx={{ width: "25%" }}
                orientation="vertical"
                aria-label="vertical contained button group"
                variant="contained"
            >
                {buttons}
            </ButtonGroup>
        </Box>
    );
}