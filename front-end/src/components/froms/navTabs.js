// // import * as React from 'react';
// // import PropTypes from 'prop-types';
// // // import SwipeableViews from 'react-swipeable-views';
// // import { useTheme } from '@mui/material/styles';
// // import AppBar from '@mui/material/AppBar';
// // import Tabs from '@mui/material/Tabs';
// // import Tab from '@mui/material/Tab';
// // import Typography from '@mui/material/Typography';
// // import Box from '@mui/material/Box';
import { FromData } from '../froms/fromData';
import { FromOrder } from '../froms/fromOrder';
import { FromCreditCard } from '../froms/fromCreditCard';
// // import { FromOrder } from './fromOrder';
// // import { FromCreditCard } from './fromCreditCard';


// // function TabPanel(props) {
// //   const { children, value, index, ...other } = props;

// //   return (
// //     <div
// //       role="tabpanel"
// //       hidden={value !== index}
// //       id={`full-width-tabpanel-${index}`}
// //       aria-labelledby={`full-width-tab-${index}`}
// //       {...other}
// //     >
// //       {value === index && (
// //         <Box sx={{ p: 3,background:"coral" }}>
// //        {children}
// //         </Box>
// //       )}
// //     </div>
// //   );
// // }

// // TabPanel.propTypes = {
// //   children: PropTypes.node,
// //   index: PropTypes.number.isRequired,
// //   value: PropTypes.number.isRequired,
// // };

// // function a11yProps(index) {
// //   return {
// //     id: `full-width-tab-${index}`,
// //     'aria-controls': `full-width-tabpanel-${index}`,
// //   };
// // }

// // export default function FullWidthTabs() {
// //   const theme = useTheme();
// //   const [value, setValue] = React.useState(0);
// //   const [auth, setAuth] = React.useState(false);

// //   const handleChange = (event, newValue) => {
// //     setValue(newValue);
// //   };

// // //   const handleChangeIndex = (index) => {
// // //     setValue(index);
// // //   };

// //   return (


// //       <Box sx={{ bgcolor: 'background.paper'}}>
// //       <AppBar position="static">
// //         <Tabs
// //           value={value}
// //           onChange={handleChange}
// //           indicatorColor="secondary"
// //           textColor="inherit"
// //           variant="fullWidth"
// //           aria-label="full width tabs example"
// //           >
// //           <Tab label="פריטי מזמינים" {...a11yProps(0)} />
// //           <Tab label="פריטי הזמנה" { ...a11yProps(1)} />
// //           <Tab label="תשלום מקדמה" {...a11yProps(2)} />
// //         </Tabs>
// //       </AppBar>
// //       {/* <SwipeableViews
// //         axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
// //         index={value}
// //         onChangeIndex={handleChangeIndex}
// //     > */}
// //      <Typography variant="h4" component="p"> לסגירת הזמנה</Typography>

// //         <TabPanel value={value} index={0} dir={theme.direction}>

// //           <FromData/>

// //         </TabPanel>
// //         <TabPanel value={value} index={1} dir={theme.direction}>

// //         <FromOrder/>

// //         </TabPanel>
// //         <TabPanel value={value} index={2} dir={theme.direction}>

// //          <FromCreditCard/>

// //         </TabPanel>
// //       {/* </SwipeableViews> */}
// //     </Box>

// //   );
// // }
// import {
//   Box,
//   ChakraProvider,
//   Step,
//   StepDescription,
//   StepIcon,
//   StepIndicator,
//   StepNumber,
//   StepSeparator,
//   StepStatus,
//   StepTitle,
//   Stepper,
//   useSteps,
// } from '@chakra-ui/react'

// const steps = [
//   { title: 'First', description: 'Contact Info' },
//   { title: 'Second', description: 'Date & Time' },
//   { title: 'Third', description: 'Select Rooms' },

// ]
// export default function FullWidthTabs() {
//   const { activeStep } = useSteps({
//     index: 1,
//     count: steps.length,
//   })
//   const from = [
//      <FromData activeStep={activeStep}/> ,
//      <FromOrder/>,
//           <FromCreditCard/> 

//   ]

//   return (
//     <ChakraProvider >
//     <Stepper index={activeStep} style={{backgroundColor:"#E6E6FA"}}>
//       {steps.map((step, index) => (
//         <Step key={index}>
//           <StepIndicator>
//             <StepStatus
//               complete={<StepIcon />}
//               incomplete={<StepNumber />}
//               active={<StepNumber />}
//             />
//           </StepIndicator>

//           <Box flexShrink='0'>
//             <StepTitle>{step.title}</StepTitle>
//             <StepDescription>{step.description}</StepDescription>
//           </Box>
//           <StepSeparator />
//         </Step>
//       ))}
//     </Stepper>

//       <Box flexShrink='0'>
//         {console.log(activeStep)};
//       {from[activeStep-1]}
//         {/* <FromData/>
//         <FromOrder/>
//         <FromCreditCard/> */}
//       </Box>
//     </ChakraProvider>
//   )
// }

// // render(<Example />)

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