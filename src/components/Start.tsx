import { Box, Button, FormControlLabel, Switch, Typography } from '@mui/material';

import type { Question } from '../slices/testSlice';
import { setPhase, uploadQuestions } from '../slices/testSlice';
import { useAppDispatch } from '../app/hooks';
import data from '../assets/test.json';

const Start = () => {
  const dispatch = useAppDispatch();
  const handleclick = () => {
    dispatch(setPhase('inProcess'));
    dispatch(uploadQuestions(data as Question[]));
  };
  return (
    <Box
      sx={{
        width: '50%',
        height: '50%',
        boxShadow: '0 0 3px 3px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
      }}>
      <Typography variant='h4' component='h1'>
        Тестирование
      </Typography>
      <FormControlLabel
        control={<Switch defaultChecked />}
        label='Ограничение по времени: 5 мин'
      />
      <Button variant='contained' onClick={handleclick}>
        Начать
      </Button>
    </Box>
  );
};

export default Start;
