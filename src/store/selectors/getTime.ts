import { RootState } from '../store';

export const getTime = (state: RootState) => state.test.time;
