import { RootState } from '../store';

export const getCompletedSteps = (state: RootState) => state.test.completedSteps;
