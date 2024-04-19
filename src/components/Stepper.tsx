import Box from '@mui/material/Box';
import { Stepper as StepperMui } from '@mui/material';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useAppSelector } from '../app/hooks';

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
        <Box sx={{ width: '100%', marginLeft: '-8px' }}>
          <StepperMui nonLinear activeStep={currentStep}>
            {steps.map((_, index) => (
              <Step key={index} completed={completedSteps[index]}>
                <StepLabel disabled></StepLabel>
              </Step>
            ))}
          </StepperMui>{' '}
        </Box>
      ) : (
        <Typography variant="body1">{`Вопрос ${currentStep + 1}/${
          questions.length
        }`}</Typography>
      )}
    </>
  );
};

export default Stepper;
