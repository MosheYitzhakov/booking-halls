import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import BasicTable from "./tableOredr";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Calendar from "../calendar";
import { ClientSideContext } from "../../hooks/useContext";

export function FromOrder({ setActive, hall }) {
  const {
    order: [order, setOrder],
    dateEvent: [dateEvent, setDateEvent],
    invoice: [, setInvoice],
  } = useContext(ClientSideContext);
  const handleChange = ({ target: { value } }) => {
    setOrder((prv) => {
      return {
        ...prv,
        type: value,
      };
    })
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setInvoice((prv) => {
      return {
        ...prv,
        payment: data.get("paymentI"),
      };
    });
    setDateEvent((prv) => {
      return {
        ...prv,
        hebrew_date: dateEvent.hebrew_date,
        date: dateEvent.date,
      };
    });
    setOrder((prv) => {
      return {
        ...prv,
        num_guests: 1000,
        num_m_adults: data.get("adults"),
        num_m_children: data.get("children"),
        num_m_bar: data.get("bar"),
        total_payment: data.get("total_paymentO"),
        hebrew_date: dateEvent.hebrew_date,
        date: dateEvent.date,
      };
    });
    setActive((prv) => {
      return prv + 1;
    });
  };
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
          פריטי הזמנה
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h2" variant="h6">
                תאריך
              </Typography>
              <Calendar />
            </Grid>

            <Grid item xs={5}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  {" "}
                  רמת מנות{" "}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={order.type}
                  label=" רמת מנות "
                  onChange={handleChange}
                >
                  <MenuItem value={"p"}> פרמיום </MenuItem>
                  <MenuItem value={"b"}> רגיל </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <BasicTable hall={hall} order={order} />
            </Grid>
            <Grid item xs={19}></Grid>
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
  );
}
