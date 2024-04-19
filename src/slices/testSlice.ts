import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export type Question = {
  type: string;
  question: string;
  answers: string[] | null;
  rightAnswer: string | string[] | null;
};

type Answer = Question & {
  userAnswer: string;
};

type Phase = 'starting' | 'inProcess' | 'finished';

type Completed = {
  [key: number]: boolean;
};

interface state {
  phase: Phase;
  questions: Question[];
  currentQuestion: Question | null;
  currentStep: number;
  completedSteps: Completed;
  result: Answer[];
}
const initialState: state = {
  phase: 'starting',
  questions: [],
  currentQuestion: null,
  currentStep: 0,
  completedSteps: {},
  result: [],
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    writeAnswer: (state, action: PayloadAction<string | string[]>) => {
      const userAnswer = action.payload;
      const answer = Object.assign(state.currentQuestion as Question, {
        userAnswer,
      }) as Answer;
      state.result = [...state.result, answer];
    },
    finishStep: (state) => {
      const isLastStep = state.currentStep + 1 === state.questions.length;
      if (isLastStep) {
        state.phase = 'finished';
      } else {
        state.completedSteps[state.currentStep] = true;
        state.currentStep += 1;
        state.currentQuestion = state.questions[state.currentStep];
      }
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
export const { writeAnswer, finishStep, setPhase, uploadQuestions } = testSlice.actions;
