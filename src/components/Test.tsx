import { Box, Typography, Button } from '@mui/material';

import Stepper from './Stepper';
import Timer from './Timer';
import Question from './question';

const Test = () => {
  return (
    <Box
      sx={{
        width: '70%',
        height: '70%',
        padding: '30px',
        boxShadow: '0 0 3px 3px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space',
        alignItems: 'start',
        gap: 3,
      }}>
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Typography variant='h4' component='h1'>
          Тестирование
        </Typography>
        <Timer />
      </Box>
      <Stepper />
      <Question />
    </Box>
  );
};

export default Test;
