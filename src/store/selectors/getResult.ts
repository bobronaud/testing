import { RootState } from '../store';

export const getResult = (state: RootState) => state.test.result;
