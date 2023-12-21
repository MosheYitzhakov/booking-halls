import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BasicTable from '../tableOredr';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Calendar from '../calendar';



const theme = createTheme();

export function FromOrder({ setActive, setDate, dateE = null, setDateE, hall }) {
    const [typeO, setTypeO] = useState('b');

    const handleChange = (event) => {
        setTypeO(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        setActive((prv) => {
            return prv + 1;
        })
    };
    const handleButton = (setActive) => {

        setActive((prv) => {
            return prv - 1;
        })

    };
    return (
        <ThemeProvider theme={theme}>
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
                                {/* <TextField
                                    fullWidth
                                    disabled
                                    id="outlined-disabled"
                                    label="תאריך הנבחר"
                                    defaultValue="Hello World"

                                /> */}
                                <Typography component="h1" variant="h5">
                                    תאריך
                                </Typography>
                                <Calendar setDate={setDate} dateE={dateE} setDateE={setDateE}
                                    idHall={hall.id_hall}
                                />
                            </Grid>
                            <Grid item xs={7} >
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    type="number"
                                    label="מספר מוזמנים"
                                    autoFocus

                                />
                            </Grid>

                            <Grid item xs={5}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label"> רמת מנות </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={typeO}
                                        label=" רמת מנות "
                                        onChange={handleChange}
                                    >
                                        <MenuItem  value={"p"}> פרמיום </MenuItem>
                                        <MenuItem value={"b"}> רגיל </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <BasicTable hall={hall} typeO={typeO}/>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    type="button"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => handleButton(setActive)}
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
                                >
                                    המשך
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}