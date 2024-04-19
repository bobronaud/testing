import { Box } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../app/hooks';

const Finish = () => {
  const dispatch = useAppDispatch();
  const { result } = useAppSelector((state) => state.test);
  return <p>Finish</p>;
};

export default Finish;
