import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
export function Main() {
    const { pathname } = useLocation();
    const nauigat = useNavigate()

const handleLink = ({ target }, pathname)=>{
    const path = pathname.split('/')
    const url = `/${path[1]}/${path[2]}/${target.value}`
    nauigat(url)
}
    return (
        <Box
            sx={{
                display: 'flex',
                '& > *': {
                    m: 1,
                },
                height: "100%"
            }}
        >

            <Outlet />

            <ButtonGroup
                sx={{ width: "25%" }}
                orientation="vertical"
                aria-label="vertical contained button group"
                variant="contained"
            >
                {/* {buttons}
                 */}
                <Button sx={{ height: "20%", fontSize: '1.5rem' }} key="one" value="settings" onClick={(e) => { handleLink(e, pathname) }}>הגדרות אולם</Button>,
                <Button sx={{ height: "20%", fontSize: '1.5rem' }} key="two" value="futureOrders" onClick={(e) => { handleLink(e, pathname) }}>הזמנות עתידיות</Button>,
                <Button sx={{ height: "20%", fontSize: '1.5rem' }} key="three" value="allOrders" onClick={(e) => { handleLink(e, pathname) }}>כל ההזמנות</Button>,
                <Button sx={{ height: "20%", fontSize: '1.5rem' }} key="three" value="invoices" onClick={(e) => { handleLink(e, pathname) }}>חשבוניות</Button>,
                <Button sx={{ height: "20%", fontSize: '1.5rem' }} key="three" value="invoices" onClick={(e) => { handleLink(e, pathname) }}>לוח שנה הזמנות</Button>,
            </ButtonGroup>
        </Box>
    );
}