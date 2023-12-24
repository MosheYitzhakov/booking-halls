// // import * as React from 'react';
import { FromData } from '../froms/fromData';
import { FromOrder } from '../froms/fromOrder';
import { FromCreditCard } from '../froms/fromCreditCard';







import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import PaymentForm from '../card';

const steps = [
  ' פרטים ',
  ' הזמנה ',
  ' סגירת הזמנה ',
];
export default function FullWidthTabs({ setDate, dateE = null, setDateE, hall }) {
  const [active, setActive] = useState(1)
  const [dataOrder, setDataOrder] =useState()
  const from = [
    <FromData setActive={setActive} setDataOrder={setDataOrder} dataOrder={dataOrder}/>,
    <FromOrder   setDate={setDate} dateE={dateE}  setDateE={setDateE} hall={hall}  setActive={setActive} setDataOrder={setDataOrder} dataOrder={dataOrder}/>,
    // <FromCreditCard setActive={setActive} dataOrder={dataOrder}/>
    <PaymentForm/>

  ]
  // console.log(dataOrder);
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