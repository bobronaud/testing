import Box from '@mui/material/Box';
import { Stepper as StepperMui } from '@mui/material';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepButton';

import { useAppSelector } from '../app/hooks';

const Stepper = () => {
  const { questions, currentStep, completedSteps } = useAppSelector(
    (state) => state.test,
  );
  const steps = questions.map((_, index) => index + 1);

  return (
    <Box sx={{ width: '100%', marginLeft: '-8px' }}>
      <StepperMui nonLinear activeStep={currentStep}>
        {steps.map((_, index) => (
          <Step key={index} completed={completedSteps[index]}>
            <StepLabel disabled></StepLabel>
          </Step>
        ))}
      </StepperMui>
    </Box>
  );
};

export default Stepper;
