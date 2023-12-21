import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BasicTable from '../tableOredr';



const theme = createTheme();
// const change =(e)=>{
// console.log(e);
// }
export function FromOrder() {
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
                        background:"white",
                        px: 4,
                        py: 6,
                    }}
                >
                    {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
                    <Typography component="h1" variant="h5">
                        פריטי הזמנה
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
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
                                <Grid item xs={12} >
                                    <TextField
                                        fullWidth
                                        disabled
                                        id="outlined-disabled"
                                        label="תאריך הנבחר"
                                        defaultValue="Hello World"
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField
                                        required
                                        fullWidth
                                        type="number"
                                        id="lastName"
                                        label="כמה מנות מבוגר"
                                        name="lastName"
                                        autoComplete="family-name"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="number"
                                        id="email"
                                        label="כמה מנות ילדים"
                                        name="email"
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="כמה מנות בר"
                                        type="number"
                                        id="password"
                                        autoComplete="new-password"
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    {/* <FormControlLabel
                                    // control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                /> */}
                                    <Grid item xs={12}>
                                        <fieldset>
                                            <p> סוג מנות</p>
                                            <label><input type='checkbox'
                                            //  checked={false}
                                            /> פרמיום </label>
                                            <label><input type='checkbox'
                                            //  checked={false}
                                            />  רגיל </label>

                                        </fieldset>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                המשך
                            </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}