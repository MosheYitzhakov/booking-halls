import { Button } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
export const Nuvbar = ({ thisPage }) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <Button
            type="button"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
                if (pathname.split('/')[1] === 'managers') {

                } else {
                    navigate('/')
                }
            }}>חזרה לעמוד ראשי</Button>
    )
} 