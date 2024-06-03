import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { State, Answer, Phase, Question } from '../../types/state';

const initialState: State = {
  timer: true,
  time: [5, 0],
  phase: null,
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
      const answer = { ...state.currentQuestion, userAnswer } as Answer;
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
    setTimer: (state, action: PayloadAction<boolean>) => {
      const value = action.payload;
      state.timer = value;
    },
    setTime: (state, action: PayloadAction<[number, number]>) => {
      const time = action.payload;
      state.time = time;
    },
    uploadQuestions: (state, action: PayloadAction<Question[]>) => {
      const questions = action.payload;
      state.questions = questions;
      state.currentQuestion = questions[0];
    },
    setDataApp: (state, action: PayloadAction<State>) => {
      const data = action.payload;
      const newState = Object.assign(state, data);
      state = newState;
    },
    resetProgress: (state) => {
      const newState = Object.assign(state, initialState);
      state = newState;
    },
  },
});

export default testSlice.reducer;
export const {
  writeAnswer,
  finishStep,
  setPhase,
  setTimer,
  setTime,
  setDataApp,
  uploadQuestions,
  resetProgress,
} = testSlice.actions;
