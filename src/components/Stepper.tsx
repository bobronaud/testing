import * as React from 'react';
import Box from '@mui/material/Box';
import { Stepper as StepperMui } from '@mui/material';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setCurrentStep } from '../slices/testSlice';

const Stepper = () => {
  const dispatch = useAppDispatch();
  const { questions, currentStep } = useAppSelector((state) => state.test);
  const steps = questions.map((_, index) => index + 1);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleStep = (step: number) => () => {
    dispatch(setCurrentStep(step));
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  return (
    <Box sx={{ width: '100%', marginLeft: '-8px' }}>
      <StepperMui nonLinear activeStep={currentStep}>
        {steps.map((_, index) => (
          <Step key={index} completed={completed[index]}>
            <StepButton color='inherit' onClick={handleStep(index)}></StepButton>
          </Step>
        ))}
      </StepperMui>
      <div>
        {/* {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography variant='caption' sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )} */}
      </div>
    </Box>
  );
};

export default Stepper;
