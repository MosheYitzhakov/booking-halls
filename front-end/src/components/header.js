
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Typography from '../../public/ss.png';
export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
                        צור קשר  : 050-050050
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        booking-halls
                    </Typography>
                    <img src="/logoPages.png" alt="logoPages.png" width="100" height="100"/>

                </Toolbar>
            </AppBar>
        </Box>
    );
}
