import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export type Question = {
  type: string;
  question: string;
  answers: string[] | null;
  rightAnswer: string | null;
};

type Answer = Question & {
  userAnswer: string;
};

type Phase = 'starting' | 'inProcess' | 'finished';

interface state {
  phase: Phase;
  questions: Question[];
  currentQuestion: Question | null;
  currentStep: number;
  result: Answer[];
}
const initialState: state = {
  phase: 'starting',
  questions: [],
  currentQuestion: null,
  currentStep: 0,
  result: [],
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    writeAnswer: (state, action: PayloadAction<string>) => {
      const userAnswer = action.payload;
      const answer = Object.assign(state.currentQuestion as Question, {
        userAnswer,
      }) as Answer;
      state.result = [...state.result, answer];
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      const newStep = action.payload;
      state.currentStep = newStep;
      state.currentQuestion = state.questions[newStep];
    },
    setPhase: (state, action: PayloadAction<Phase>) => {
      const newPhase = action.payload;
      state.phase = newPhase;
    },
    uploadQuestions: (state, action: PayloadAction<Question[]>) => {
      const questions = action.payload;
      state.questions = questions;
      state.currentQuestion = questions[0];
    },
  },
});

export default testSlice.reducer;
export const selectCards = (state: RootState) => state.test;
export const { writeAnswer, setCurrentStep, setPhase, uploadQuestions } =
  testSlice.actions;
