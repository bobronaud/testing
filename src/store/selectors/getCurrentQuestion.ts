import { RootState } from '../store';

export const getCurrentQuestion = (state: RootState) => state.test.currentQuestion;
