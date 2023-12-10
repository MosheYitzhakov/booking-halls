import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Input } from '@mui/material';
import { TableSettingManager } from '../../components/tableManager';



const theme = createTheme();

export function Settings() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
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
                        הגדרות
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} >
                                <TextField
                                    fullWidth
                                    // disabled
                                    id="outlined-disabled"
                                    label=" שם מנהל "
                                    defaultValue="Hello World"
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    type="number"
                                    label=" שם אולם "
                                    defaultValue="Hello World"
                                    autoFocus

                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label=" דמי מקדמה "
                                    type="number"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>


                            <Grid item xs={6} >
                                <TextField
                                    required
                                    fullWidth
                                    type="number"
                                    id="lastName"
                                    label=" מקסימום מוזמנים "
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    fullWidth
                                    type="number"
                                    id="email"
                                    label=" מינימום מוזמנים "
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={6} >
                                <TextField
                                    required
                                    fullWidth
                                    type="number"
                                    id="lastName"
                                    label=" מינימום מנות  "
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>

                                <TableSettingManager />
                            </Grid>

                            <Grid item xs={6}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                <Typography variant='h5'>בטל שינוים </Typography>
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    <Typography variant='h5' color={'yellow'}>עדכן </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                        {/* <Input type='file' /> */}

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}