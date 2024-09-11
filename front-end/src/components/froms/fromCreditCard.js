import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Cards from "react-credit-cards-2";
import instance from "../../API";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { Order } from "../../hooks/useContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
export function FromCreditCard({ setActive }) {
  const [dataOrder] = useContext(Order);
  const [alert, setAlert] = useState(false);
  const [numberCard, setNumberCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [focused, setFocused] = useState("");
  console.log(dataOrder);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await instance.post(`/craetOrder`, dataOrder);
      // const data = "OK";
      console.log(data);
      if (Number(data?.orderId)) {
        console.log(data?.orderId);
        localStorage.setItem("orderId", JSON.stringify(data.orderId));
        setActive((prv) => {
          return prv + 1;
        });
      } else {
        setAlert(" התאריך שלך כבר נתפס בחר תאריך אחר");
      }
    } catch (error) {
      return error.message;
    }
  };

  const handleButton = (setActive) => {
    setActive((prv) => {
      return prv - 1;
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
          אשראי
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={12}>
            <Cards
              number={numberCard}
              expiry={expiry}
              cvc={cvc}
              name={name}
              focused={focused}
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">
                סה"כ לתשלום {dataOrder.order.total_payment} ש"ח
              </Typography>
              <Typography variant="h5">
                דמי מקדמה {dataOrder.invoice.payment} ש"ח לסגירת ההזמנה
              </Typography>
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                label=" מספר כרטיס "
                type="number"
                name="number"
                value={numberCard}
                onChange={(e) => setNumberCard(e.target.value)}
                onFocus={(e) => setFocused(e.target.name)}
                required
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                label=" שם בעל הכרטיס "
                type="text"
                name="name"
                onChange={(e) => setName(e.target.value)}
                onFocus={(e) => setFocused(e.target.name)}
                required
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                label="תוקף"
                type="number"
                name="expiry"
                pattern="\d\d/\d\d"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                onFocus={(e) => setFocused(e.target.name)}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="cvc"
                type="number"
                name="cvc"
                className="form-control"
                placeholder="CVC"
                pattern="\d{3,4}"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                onFocus={(e) => setFocused(e.target.name)}
                required
              />
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
                סיים הזמנה
              </Button>
            </Grid>
          </Grid>
          <PayPalScriptProvider options={{ clientId: "test" }}>
            <PayPalButtons style={{ layout: "horizontal" }} />
          </PayPalScriptProvider>
          {alert && <p style={{ fontSize: 35 }}> {alert}</p>}
        </Box>
      </Box>
    </Container>
  );
}
