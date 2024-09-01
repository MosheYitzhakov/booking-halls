import { FromData } from "../froms/fromData";
import { FromOrder } from "../froms/fromOrder";
import { FromCreditCard } from "../froms/fromCreditCard";

import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Order } from "../../hooks/useContext";
import { SumOrder } from "./summaryOrder";

const steps = [" הזמנה ", " פרטים ", " סגירת הזמנה "];

const orderFormCheck = (dataOrder) => {
  for (const i in dataOrder) {
    for (const key in dataOrder[i]) {
      if (!dataOrder[i][key]) {
        return false;
      }
    }
  }
  return true;
};
export default function FullWidthTabs({ hall = null }) {
  const [active, setActive] = useState(1);
  const [fullData, setFullData] = useState(false);

  const [dataOrder, setDataOrder] = useContext(Order);
  useEffect(() => {
    if (hall) {
      setDataOrder((prv) => {
        return {
          ...prv,
          order: {
            ...prv.order,
            id_hall: hall.id_hall,
          },
          dateEvent: { ...prv.dateEvent, id_hall: hall.id_hall },
        };
      });
    }
  }, [hall, setDataOrder]);
  const sumMeals =
    (Number(dataOrder.order.num_m_adults) +
      Number(dataOrder.order.num_m_children) >=
      hall?.min_meals &&
      orderFormCheck(dataOrder)) ||
    active < 3;
  // console.log(dataOrder);
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
