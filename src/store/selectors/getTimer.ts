import { RootState } from '../store';

export const getTimer = (state: RootState) => state.test.timer;
