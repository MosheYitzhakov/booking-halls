// // import * as React from 'react';
import { FromData } from '../froms/fromData';
import { FromOrder } from '../froms/fromOrder';
import { FromCreditCard } from '../froms/fromCreditCard';







import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  ' פרטים ',
  ' הזמנה ',
  ' סגירת הזמנה ',
];
export default function HorizontalLinearAlternativeLabelStepper() {
  const [active, setActive] = useState(1)
  const from = [
    <FromData setActive={setActive} />,
    <FromOrder setActive={setActive} />,
    <FromCreditCard setActive={setActive} />

  ]
  return (
    <Box sx={{ width: '100%' }}>
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