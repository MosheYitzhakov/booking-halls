import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ClientSideContext } from "../../hooks/useContext";

export function FromData({ setActive }) {
  // const [order, setOrder] = useContext(Order);
  const {
    clients: [clients, setClients],
    invoice: [invoice, setInvoice],
    order: [order, setOrder],
  } = useContext(ClientSideContext);
  const [checkedC, setCheckedC] = useState(
    invoice.submits === "c" ? true : false
  );
  const [checkedK, setCheckedK] = useState(
    invoice.submits === "k" ? true : false
  );
  const [butten, setButten] = useState();

  const handleChange = (s) => {
    if (s === "c") {
      setCheckedC(!checkedC);
      setCheckedK(false);
    } else {
      setCheckedC(false);
      setCheckedK(!checkedK);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({ nameC: data.get("nameC") });

    await setClients((prv) => {
      return {
        clientC: {
          ...prv.clientC,
          email: data.get("emailC"),
          phone: data.get("phoneC"),
          name: data.get("nameC"),
        },
        clientK: {
          ...prv.clientK,
          email: data.get("emailK"),
          phone: data.get("phoneK"),
          name: data.get("nameK"),
        },
      };
    });
    await setInvoice((prv) => {
      return {
        ...prv,
        submits: checkedC ? "c" : checkedK ? "k" : "",
      };
    });
    // setOrder((prv) => {
    //   return {
    //     ...prv,
    //     clientC: {
    //       ...prv.clientC,
    //       email: data.get('emailC'),
    //       phone: data.get('phoneC'),
    //       name: data.get("nameC"),
    //       side:  "c" ,
    //       degree:"client"
    //     },
    //     clientK: {
    //       ...prv.clientK,
    //       email: data.get('emailK'),
    //       phone: data.get('phoneK'),
    //       name: data.get("nameK"),
    //       side:  "k",
    //       degree:"client"
    //     },
    //     invoice: {
    //       ...prv.invoice,
    //       submits: checkedC ? "k" : checkedK ? "c" : "" }
    //     ,

    //   }
    // })
    if (butten === "return") {
      setActive((prv) => {
        return prv - 1;
      });
    } else if (butten === "proceed") {
      setActive((prv) => {
        return prv + 1;
      });
    }
  };
  console.log({
    clients,
    invoice,
    order,
  });

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
                defaultValue={clients.clientC?.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="phoneC"
                defaultValue={clients.clientC?.phone}
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
                type="email"
                name="emailC"
                defaultValue={clients.clientC?.email}
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
                defaultValue={clients.clientK?.name}
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="phoneK"
                defaultValue={clients.clientK?.phone}
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
                type="email"
                name="emailK"
                defaultValue={clients.clientK?.email}
                autoComplete="email"
              />
            </Grid>

            <Grid item xs={12}>
              <fieldset>
                <p> מגיש הבקשה</p>
                <label>
                  {" "}
                  צד חתן{" "}
                  <input
                    type="checkbox"
                    checked={checkedK}
                    onChange={() => handleChange("k")}
                  />
                </label>

                <label>
                  {" "}
                  צד כלה{" "}
                  <input
                    type="checkbox"
                    checked={checkedC}
                    onChange={() => handleChange("c")}
                  />
                </label>
              </fieldset>
            </Grid>

            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => setButten("return")}
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
                onClick={() => setButten("proceed")}
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
