
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from 'react'

const steps = [
    'Shipping Address',
    'Payment Method',
    'Place Order',
  ];


function StepperContainer(props) {
    const theme = createTheme();
  return (
    <>
    <ThemeProvider theme={theme}>
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={props.step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
    </ThemeProvider>
    {props.children}
    </>
  )
}

export default StepperContainer