import React, { useContext } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Order } from "../../hooks/useContext";
import { useNavigate } from "react-router-dom";

export function SumOrder({ hall }) {
  const [dataOrder] = useContext(Order);
  console.log(dataOrder);
  console.log(hall);
  const navigate = useNavigate();
  const price =
    dataOrder?.order?.type === "b"
      ? {
          children:
            Number(dataOrder?.order?.num_m_children) *
            Number(hall.p_b_children),
          bar: Number(dataOrder?.order?.num_m_bar) * Number(hall.p_b_bar),
          adults:
            Number(dataOrder?.order?.num_m_adults) * Number(hall.p_b_adults),
        }
      : {
          children:
            Number(dataOrder?.order?.num_m_children) *
            Number(hall.p_p_children),
          bar: Number(dataOrder?.order?.num_m_bar) * Number(hall.p_p_bar),
          adults:
            Number(dataOrder?.order?.num_m_adults) * Number(hall.p_p_adults),
        };

  const handleMain = () => {
    navigate("..");
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
          סיכום
        </Typography>
        <Box noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography
                sx={{ textDecoration: "underline" }}
                component="h3"
                variant="p"
                textAlign={"center"}
              >
                צד חתן
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                sx={{ textDecoration: "underline" }}
                component="h3"
                variant="p"
                textAlign={"center"}
              >
                צד כלה
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h3" variant="p" textAlign={"center"}>
                {dataOrder?.clientC?.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h3" variant="p" textAlign={"center"}>
                {dataOrder?.clientK?.name}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h3" variant="p" textAlign={"center"}>
                {dataOrder?.clientC?.phone}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h3" variant="p" textAlign={"center"}>
                {dataOrder?.clientK?.phone}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h3" variant="p" textAlign={"center"}>
                {dataOrder?.clientC?.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography component="h3" variant="p" textAlign={"center"}>
                {dataOrder?.clientK?.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography component="h1" variant="h5" textAlign={"center"}>
                הזמנה
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography component="h3" variant="p" textAlign={"center"}>
                סוג מנות:
                {dataOrder?.order?.type === "b" ? " רגיל " : " פרימיום "}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography component="h3" variant="p" textAlign={"center"}>
                תאריך: {dataOrder?.order?.hebrew_date}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography component="h3" variant="p" textAlign={"center"}>
                אסמכתא: {JSON.parse(localStorage.orderId)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography
                component="h3"
                variant="p"
                textAlign={"center"}
              ></Typography>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Typography component="h3" variant="p" textAlign={"center"}>
                {price.adults}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography component="h3" variant="p" textAlign={"center"}>
                :מנות מבוגר
              </Typography>
            </Grid>

            <Grid item xs={12} sm={7}>
              <Typography component="h3" variant="p" textAlign={"center"}>
                {price.children}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography component="h3" variant="p" textAlign={"center"}>
                :מנות ילדים
              </Typography>
            </Grid>

            <Grid item xs={12} sm={7}>
              <Typography component="h3" variant="p" textAlign={"center"}>
                {price.bar}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography component="h3" variant="p" textAlign={"center"}>
                :מנות בר
              </Typography>
            </Grid>

            <Grid item xs={12} sm={7}>
              <Typography component="h3" variant="p" textAlign={"center"}>
                {hall.base_price}
              </Typography>
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                name="nameC"
                variant="standard"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography component="h3" variant="p" textAlign={"center"}>
                :אולם
              </Typography>
            </Grid>

            <Grid item xs={12} marginLeft={20} marginRight={20}></Grid>

            <Grid item xs={12} sm={7}>
              <Typography component="h3" variant="p" textAlign={"center"}>
                {price.adults + price.bar + price.children + hall.base_price}
              </Typography>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleMain}
          >
            חזרה לעמוד ראשי
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
