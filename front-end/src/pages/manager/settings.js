import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { TableSettingManager } from "../../components/tableManager";
import { useLocation } from "react-router-dom";
import instance from "../../API";

export function Settings({ data }) {
  console.log(data);
  const { pathname } = useLocation();
  const path = pathname.split("/");
  const nameM = "/" + path[1] + "/" + path[3];
  const [newSettings, setNewSettings] = useState({
    base_price: "",
    down_payment: "",
    email: "",
    id_hall: "",
    id_user: "",
    max_guests: "",
    min_meals: 0,
    name: "",
    name_hall: "",
    p_b_adults: "",
    p_b_bar: "",
    p_b_children: "",
    p_p_adults: "",
    p_p_bar: "",
    p_p_children: "",
    password: "",
    phone: "",
    side: "",
  });
  const [settings, setSettings] = useState();
  const [updateTable, setUpdateTable] = useState(false);
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setNewSettings((prev) => ({ ...prev, [name]: value }));
  };
  const handleUndoingChange = () => {
    setNewSettings(settings);
    setUpdateTable(!updateTable);
  };
  useEffect(() => {
    console.log(nameM + "/" + path[2]);
    async function name() {
      try {
        setSettings(data[0]);
        setNewSettings(data[0]);
      } catch (error) {
        return error.message;
      }
    }
    name();
  }, [data]);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataAll = new FormData(event.currentTarget);

    try {
      const { data } = await instance.put(
        nameM + "/" + settings.id_hall,
        {
          name_hall: dataAll.get("name_hall"),
          max_guests: dataAll.get("max_guests"),
          down_payment: dataAll.get("down_payment"),
          min_meals: dataAll.get("min_meals"),
          p_p_adults: dataAll.get("p_p_adults"),
          p_b_adults: dataAll.get("p_b_adults"),
          p_p_children: dataAll.get("p_p_children"),
          p_b_children: dataAll.get("p_b_children"),
          p_p_bar: dataAll.get("p_p_bar"),
          p_b_bar: dataAll.get("p_b_bar"),
        },
        { headers: { auth: JSON.parse(localStorage.uesrToken) } }
      );
      console.log(data);
      if (data === "updated setting") {
        setSettings({
          name_hall: dataAll.get("name_hall"),
          max_guests: dataAll.get("max_guests"),
          down_payment: dataAll.get("down_payment"),
          min_meals: dataAll.get("min_meals"),
          p_p_adults: dataAll.get("p_p_adults"),
          p_b_adults: dataAll.get("p_b_adults"),
          p_p_children: dataAll.get("p_p_children"),
          p_b_children: dataAll.get("p_b_children"),
          p_p_bar: dataAll.get("p_p_bar"),
          p_b_bar: dataAll.get("p_b_bar"),
        });
      }
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
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
          הגדרות
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                name="name"
                required
                fullWidth
                helperText=" שם מנהל "
                value={newSettings?.name}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                name="name_hall"
                required
                fullWidth
                helperText=" שם אולם "
                value={newSettings?.name_hall}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="down_payment"
                helperText=" דמי מקדמה "
                type="number"
                value={newSettings?.down_payment}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                type="number"
                helperText=" מקסימום מוזמנים "
                name="max_guests"
                value={newSettings?.max_guests}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                type="number"
                id="lastName"
                helperText=" מינימום מנות  "
                name="min_meals"
                autoComplete="family-name"
                value={newSettings?.min_meals}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TableSettingManager
                updateTable={updateTable}
                settings={settings && settings}
              />
            </Grid>

            <Grid item xs={6}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleUndoingChange()}
              >
                <Typography variant="h5">בטל שינוים </Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                <Typography variant="h5" color={"yellow"}>
                  עדכן{" "}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
