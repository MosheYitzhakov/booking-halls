import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme();



export function FromData({ setActive, setDataOrder, dataOrder }) {
  const [checkedC, setCheckedC] = useState(false);
  const [checkedK, setCheckedK] = useState(false);



  const handleChange = (s) => {
    if (s === 'c') {
      setCheckedC(!checkedC)
      setCheckedK(false)
    } else {
      setCheckedC(false)
      setCheckedK(!checkedK)
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({

    //   emailC: data.get('emailC'),
    //   phoneC: data.get('phoneC'),
    //   nameC: data.get("nameC"),
    //   emailK: data.get('emailK'),
    //   phoneK: data.get('phoneK'),
    //   nameK: data.get("nameK"),
    //   submits: checkedC ? "c" : checkedK ? "k" : "",

    // });
    setDataOrder((prv) => {
      return {
        ...prv,
        emailC: data.get('emailC'),
        phoneC: data.get('phoneC'),
        nameC: data.get("nameC"),
        emailK: data.get('emailK'),
        phoneK: data.get('phoneK'),
        nameK: data.get("nameK"),
        submits: checkedC ? "c" : checkedK ? "k" : "",

      }
    })
    setActive((prv) => {
      return prv + 1;
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
            פרטים
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
                  label="משפחה"
                  name="nameC"
                  defaultValue={dataOrder?.nameC}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="phoneC"
                  defaultValue={dataOrder?.phoneC}
                  required
                  fullWidth
                  type="tel"
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
                  name="emailC"
                  defaultValue={dataOrder?.emailC}
                // autoComplete="email"
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
                  name="nameK"
                  defaultValue={dataOrder?.nameK}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="phoneK"
                  defaultValue={dataOrder?.phoneK}
                  required
                  fullWidth
                  id="firstName"
                  type="tel"
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
                  name="emailK"
                  defaultValue={dataOrder?.emailK}
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <fieldset>
                  <p> מגיש  הבקשה</p>
                  <label> צד חתן <input type='checkbox'
                    checked={checkedK}
                    onChange={() => handleChange("k")}
                  /></label>

                  <label> צד כלה <input type='checkbox'
                    checked={checkedC}
                    onChange={() => handleChange('c')}
                  /></label>

                </fieldset>
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