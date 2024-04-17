import { Box } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { writeAnswer } from '../../slices/testSlice';

const ChooseOne = () => {
  const dispatch = useAppDispatch();
  const { currentQuestion } = useAppSelector((state) => state.test);
  return <Box></Box>;
};

export default ChooseOne;
