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
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ClientSideContext } from "../../hooks/useContext";
export function FromCreditCard({ setActive }) {
  const {
    order: [order],
    dateEvent: [dateEvent],
    clients: [clients],
    invoice: [invoice],
  } = useContext(ClientSideContext);

  const [alert, setAlert] = useState(false);
  const [numberCard, setNumberCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [focused, setFocused] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (numberCard < 1000000000000000 || expiry < 101 || !cvc || !name)
      return setAlert("כרטיס אשראי לא תקין");
    try {
      const { data } = await instance.post(`/craeteOrder`, {
        order: order,
        dateEvent: dateEvent,
        clientK: clients.clientK,
        clientC: clients.clientK,
        invoice: invoice,
      });
      // const data = { orderId: "for example" };
      if (Number(data?.orderId)) {
        localStorage.setItem("orderId", JSON.stringify(data.orderId));
        setActive((prv) => {
          return prv + 1;
        });
      } else if (data?.orderId.startsWith("Duplicate entry")) {
        console.error(data?.orderId);
        setAlert(" התאריך שלך כבר נתפס בחר תאריך אחר");
      } else {
        setAlert(data?.orderId);
        console.error(data?.orderId);
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
                סה"כ לתשלום {order.total_payment} ש"ח
              </Typography>
              <Typography variant="h5">
                דמי מקדמה {invoice.payment} ש"ח לסגירת ההזמנה
              </Typography>
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                label=" מספר כרטיס "
                name="number"
                value={numberCard}
                onChange={(e) => {
                  const maxValue = 9999999999999999;
                  const inputValue = e.target.value;
                  if (inputValue <= maxValue) {
                    setNumberCard(inputValue);
                  }
                }}
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
                name="expiry"
                pattern="\d\d/\d\d"
                value={expiry}
                onChange={(e) =>
                  e.target.value <= 9999 && setExpiry(e.target.value)
                }
                onFocus={(e) => setFocused(e.target.name)}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="cvc"
                name="cvc"
                className="form-control"
                placeholder="CVC"
                pattern="\d{3,4}"
                value={cvc}
                onChange={(e) =>
                  e.target.value <= 9999 && setCvc(e.target.value)
                }
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
