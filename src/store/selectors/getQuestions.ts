import { RootState } from '../store';

export const getQuestions = (state: RootState) => state.test.questions;
