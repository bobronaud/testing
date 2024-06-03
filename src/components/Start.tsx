import { useState, ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { setPhase, uploadQuestions } from '../store/slices/testSlice';
import { useAppDispatch } from '../hooks';
import data from '../assets/test.json';
import { setTimer } from '../store/slices/testSlice';
import { Question } from '../types/state';

const Start = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isDesktopUsing = useMediaQuery(theme.breakpoints.up('md'));
  const [checked, setChecked] = useState(true);

  const handleclick = () => {
    dispatch(setTimer(checked));
    dispatch(setPhase('inProcess'));
    dispatch(uploadQuestions(data as Question[]));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Box
      sx={{
        width: isDesktopUsing ? '40%' : null,
        height: isDesktopUsing ? '40%' : null,
        boxShadow: isDesktopUsing ? '0 0 3px 3px rgba(0, 0, 0, 0.2)' : null,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        padding: 5,
      }}>
      <Typography variant='h4' component='h1'>
        Тестирование
      </Typography>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label='Ограничение по времени: 5мин'
      />
      <Button variant='contained' onClick={handleclick}>
        Начать
      </Button>
    </Box>
  );
};

export default Start;
