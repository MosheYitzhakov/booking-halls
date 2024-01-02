import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Order } from '../../hooks/useContext';



const theme = createTheme();



export function FromData({ setActive}) {
  const [dataOrder, setDataOrder] = useContext(Order);
  const [checkedC, setCheckedC] = useState(dataOrder.invoice?.submits === 'c' ? true: false);
  const [checkedK, setCheckedK] = useState(dataOrder.invoice?.submits === 'k' ? true: false);
console.log(dataOrder);
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
    setDataOrder((prv) => {
      return {
        ...prv,
        clientC: {
          ...prv.clientC,
          email: data.get('emailC'),
          phone: data.get('phoneC'),
          name: data.get("nameC"),
          side:  "c" ,
          degree:"client"
        },
        clientK: {
          ...prv.clientK,
          email: data.get('emailK'),
          phone: data.get('phoneK'),
          name: data.get("nameK"),
          side:  "k",
          degree:"client"
        },
        invoice: { submits: checkedC ? "c" : checkedK ? "k" : "" }
        ,

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
                  defaultValue={dataOrder.clientC?.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="phoneC"
                  defaultValue={dataOrder.clientC?.phone}
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
                  defaultValue={dataOrder.clientC?.email}
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
                  defaultValue={dataOrder.clientK?.name}
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="phoneK"
                  defaultValue={dataOrder.clientK?.phone}
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
                  defaultValue={dataOrder.clientK?.email}
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