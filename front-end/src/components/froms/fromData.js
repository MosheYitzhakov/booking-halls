import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme();



export function FromData({ setActive }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      family: data.get("lastName"),

    });
    setActive((prv) => {
      return prv + 1;
    })

  };
  // const handleButton = (setActive) => {
  
  //   setActive((prv) => {
  //     return prv - 1;
  //   })

  // };
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
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            פרטים אישים
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item container spacing={0}>
                <Typography component="h3" variant="p">
                  צד חתן
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="משפחה"
                  name="lastName"
                  autoComplete="family"

                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  type="number"
                  label="טלפון"

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="איימיל"
                  type='email'
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item container spacing={0}>
                <Typography component="h3" variant="p">
                  צד כלה
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="משפחה"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  type="number"
                  label="טלפון"
                //
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="איימיל"
                  type='email'
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <fieldset>
                  <p>  מי מגיש את הבקשה</p>
                  <label><input type='checkbox'
                  //  checked={false}
                  />צד חתן </label>
                  <label><input type='checkbox'
                  //  checked={false}
                  /> צד כלה </label>

                </fieldset>
              </Grid>
              {/* <Grid item xs={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                onClick={()=> handleButton(setActive)}
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
                // onClick={()=> handleButton(setActive)}
                >
                  המשך
                </Button>
              </Grid> */}
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