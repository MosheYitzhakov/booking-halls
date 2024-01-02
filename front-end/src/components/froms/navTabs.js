// // import * as React from 'react';
import { FromData } from '../froms/fromData';
import { FromOrder } from '../froms/fromOrder';
import { FromCreditCard } from '../froms/fromCreditCard';







import React, { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Order } from '../../hooks/useContext';

const steps = [
  ' פרטים ',
  ' הזמנה ',
  ' סגירת הזמנה ',
];
export default function FullWidthTabs({  hall }) {
  const [active, setActive] = useState(1)
  const [dataOrder, setDataOrder] = useContext(Order);
  useEffect(() => {
    if (hall) {
      setDataOrder((prv)=>{
        return {
          ...prv,
          order:{...prv.order,
            id_hall:hall.id_hall,
          },
          dateEvent:{...prv.dateEvent,id_hall:hall.id_hall}
        }
      })
    }
}, [hall])
  const from = [
    <FromData setActive={setActive} />,
    <FromOrder   hall={hall}  setActive={setActive} />,
    <FromCreditCard setActive={setActive} />
  ]
  return (
    <Box sx={{ width: '100%'}}>
      <Stepper activeStep={active} alternativeLabel sx={{ background: "#E6E6FA" }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box>{from[active - 1]}</Box>
    </Box>
  );
}