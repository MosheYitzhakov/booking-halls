import { FromData } from "./fromData";
import { FromOrder } from "./fromOrder";
import { FromCreditCard } from "./from-credit-card";

import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { SumOrder } from "./summaryOrder";
import { ClientSideContext } from "../../hooks/useContext";
import { isMinMeals } from "../../functions/is-min-meals";

const steps = [" הזמנה ", " פרטים ", " סגירת הזמנה "];

const orderFormCheck = (allDataOrder) => {
  for (const i in allDataOrder) {
    for (const key in allDataOrder[i]) {
      if (!allDataOrder[i][key]) {
        return false;
      }
    }
  }
  return true;
};
export default function NavTabs({ hall }) {
  const [active, setActive] = useState(1);
  const [fullData, setFullData] = useState(false);
  const {
    clients: [clients],
    order: [order, setOrder],
    dateEvent: [dateEvent, setDateEvent],
  } = useContext(ClientSideContext);
  useEffect(() => {
    if (hall) {
      setOrder((prv) => {
        return {
          ...prv,
          id_hall: hall.id_hall,
        };
      });
      setDateEvent((prv) => {
        return {
          ...prv,
          id_hall: hall.id_hall,
        };
      });
    }
  }, [hall, setOrder, setDateEvent]);

  const sumMeals =
    (isMinMeals(order.num_m_adults, order.num_m_children, hall.min_meals) &&
      orderFormCheck(order) &&
      orderFormCheck(dateEvent) &&
      orderFormCheck(clients.clientC) &&
      orderFormCheck(clients.clientK)) ||
    active < 3;
  if (!sumMeals) {
    setFullData(true);
    setActive((prv) => prv - 1);
  }
  const from = [
    <FromOrder hall={hall} setActive={setActive} />,
    <FromData setActive={setActive} />,
    <FromCreditCard setActive={setActive} />,
    <SumOrder hall={hall} />,
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={active}
        alternativeLabel
        sx={{ background: "#E6E6FA" }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ marginBottom: "5%" }}>{from[active - 1]}</Box>
      <Box>
        {fullData && active < 3 && (
          <p style={{ fontSize: 25 }}> לא מלאת את כל הפרטים </p>
        )}
      </Box>
    </Box>
  );
}
