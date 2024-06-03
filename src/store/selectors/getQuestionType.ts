import { QuestionType } from '../../types/state';
import { RootState } from '../store';

export const getQuestionType = (state: RootState) =>
  state.test.currentQuestion?.type as QuestionType;
