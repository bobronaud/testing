import Box from '@mui/material/Box';
import { Stepper as StepperMui } from '@mui/material';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useAppSelector } from '../hooks';

const Stepper = () => {
  const theme = useTheme();
  const isDesktopUsing = useMediaQuery(theme.breakpoints.up('md'));

  const { questions, currentStep, completedSteps } = useAppSelector(
    (state) => state.test,
  );
  const steps = questions.map((_, index) => index + 1);

  return (
    <>
      {isDesktopUsing ? (
        <Box data-testid='stepper' sx={{ width: '100%', marginLeft: '-8px' }}>
          <StepperMui nonLinear activeStep={currentStep}>
            {steps.map((item, index) => (
              <Step key={item} completed={completedSteps[index]}>
                <StepLabel disabled></StepLabel>
              </Step>
            ))}
          </StepperMui>
        </Box>
      ) : (
        <Typography data-testid='stepper' variant='body1'>{`Вопрос ${currentStep + 1}/${
          questions.length
        }`}</Typography>
      )}
    </>
  );
};

export default Stepper;
