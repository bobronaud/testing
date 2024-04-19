import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Start from './components/Start';
import Test from './components/Test';
import Finish from './components/Finish';

import type { Phase } from './slices/testSlice';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { setDataApp, setPhase } from './slices/testSlice';

type Phases = {
  [key: string]: () => JSX.Element;
};

const App = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isDesktopUsing = useMediaQuery(theme.breakpoints.up('md'));
  const type = useAppSelector((state) => state.test.phase) as Phase;
  const state = useAppSelector((state) => state.test);

  useEffect(() => {
    const data = sessionStorage.getItem('data');
    if (data) {
      dispatch(setDataApp(JSON.parse(data)));
    } else {
      dispatch(setPhase('starting'));
    }
  }, [dispatch]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem('data', JSON.stringify(state));
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  });

  const phases: Phases = {
    starting: Start,
    inProcess: Test,
    finished: Finish,
  };
  const Phase = phases[type];

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: isDesktopUsing ? 'center' : 'start',
      }}
    >
      {type && <Phase />}
    </Box>
  );
};

export default App;
