import { Box } from '@mui/material';

import Start from './components/Start';
import Test from './components/Test';
import Finish from './components/Finish';

import { useAppSelector } from './app/hooks';

type Phases = {
  [key: string]: () => JSX.Element;
};

const App = () => {
  const type = useAppSelector((state) => state.test.phase);
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
        alignItems: 'center',
      }}>
      <Phase />
    </Box>
  );
};

export default App;
