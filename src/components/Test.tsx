import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Stepper from './Stepper';
import Timer from './Timer';
import QuestionRoot from './question';

import { useAppSelector } from '../store/hooks';

const Test = () => {
  const theme = useTheme();
  const isDesktopUsing = useMediaQuery(theme.breakpoints.up('md'));
  const { timer } = useAppSelector((state) => state.test);

  const style = {
    width: isDesktopUsing ? '60%' : null,
    height: isDesktopUsing ? '60%' : null,
    boxShadow: isDesktopUsing ? '0 0 3px 3px rgba(0, 0, 0, 0.2)' : null,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space',
    alignItems: 'start',
    gap: 3,
    padding: isDesktopUsing ? '50px' : '10px',
  };

  return (
    <Box sx={style}>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Typography variant="h4" component="h1">
          Тестирование
        </Typography>
        {timer && <Timer />}
      </Box>
      <Stepper />
      <QuestionRoot />
    </Box>
  );
};

export default Test;
