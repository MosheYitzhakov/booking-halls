import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import BasicTable from './tableOredr';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Calendar from '../calendar';
import { Dates, Order } from '../../hooks/useContext';




export function FromOrder({ setActive, hall }) {
    const [dataOrder, setDataOrder] = useContext(Order);
    const [typeO, setTypeO] = useState(dataOrder.order?.type ? dataOrder.order?.type : 'b');
    const [dateOE, setDateOE] = useState(dataOrder.dateEvent?.date);
    const [butten, setButten] = useState();
    const [dates] = useContext(Dates);
    const handleChange = (event) => {
        setTypeO(event.target.value);
    };
    useEffect(() => {
        if (dataOrder.order && dataOrder.order?.type) {
            setTypeO(dataOrder.order.type)
        }
    }, [dataOrder])

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        setDataOrder((prv) => {
            return {
                ...prv,
                order: {
                    ...prv.order,
                    num_guests: 1000,
                    num_m_adults: data.get('adults'),
                    num_m_children: data.get('children'),
                    num_m_bar: data.get('bar'),
                    type: data.get('typeO'),
                    total_payment: data.get('total_paymentO'),
                    hebrew_date: dates.dateH,
                    date: dateOE,
                },
                invoice: {
                    ...prv.invoice,
                    payment: data.get('paymentI'),
                },
                dateEvent: {
                    ...prv.dateEvent,
                    hebrew_date: dates.dateH,
                    date: dateOE,
                }

            }
        })

        if (butten === "b1") {
            setActive((prv) => {
                return prv - 1;
            })
        } else if (butten === "b2") {
            setActive((prv) => {
                return prv + 1;
            })
        }
    };
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow: 3,
                    borderRadius: 2,
                    background: "white",
                    px: 4,
                    py: 6,
                }}
            >

                <Typography component="h1" variant="h5">
                    פריטי הזמנה
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} >
                            <Typography component="h1" variant="h5">
                                תאריך
                            </Typography>
                            <Calendar
                                idHall={hall.id_hall}
                                setDateOE={setDateOE && setDateOE}
                            />
                        </Grid>

                        <Grid item xs={5}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label"> רמת מנות </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={typeO}
                                    name='typeO'
                                    label=" רמת מנות "
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"p"}> פרמיום </MenuItem>
                                    <MenuItem value={"b"}> רגיל </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <BasicTable hall={hall} typeO={typeO} dataOrder={dataOrder} />
                        </Grid>
                        <Grid item xs={19} >

                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}

                                onClick={() => setButten("b1")}
                            >
                                חזור
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={() => setButten("b2")}
                            >
                                המשך
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}