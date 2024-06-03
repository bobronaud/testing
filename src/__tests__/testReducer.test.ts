import testSlice, {
  finishStep,
  resetProgress,
  setDataApp,
  setPhase,
  setTime,
  setTimer,
  uploadQuestions,
  writeAnswer,
} from '../store/slices/testSlice';
import { chooseMany, chooseOne, detailed, fill } from './__fixtures__/questionsData';
import { Question, State } from '../types/state';

describe('тест редьюсера', () => {
  const state = {
    timer: false,
    time: [5, 0],
    phase: 'starting',
    questions: [],
    currentQuestion: null,
    currentStep: 0,
    completedSteps: {},
    result: [],
  } as State;

  test('writeAnswer', () => {
    const currentState = {
      timer: false,
      time: [5, 0],
      phase: 'inProcess',
      questions: [fill],
      currentQuestion: fill,
      currentStep: 0,
      completedSteps: {},
      result: [],
    } as State;

    const userAnswer = 'короткий ответ';
    const result = [{ ...currentState.currentQuestion, userAnswer }];
    const expected = { ...currentState, result };

    expect(testSlice(currentState, writeAnswer(userAnswer))).toEqual(expected);
  });

  test('finishStep on middle question', () => {
    const currentState = {
      timer: false,
      time: [5, 0],
      phase: 'inProcess',
      questions: [chooseMany, chooseOne, fill, detailed],
      currentQuestion: chooseMany,
      currentStep: 0,
      completedSteps: {},
      result: [],
    } as State;

    const expected = {
      ...currentState,
      currentQuestion: chooseOne,
      currentStep: 1,
      completedSteps: { 0: true },
      result: [],
    };
    expect(testSlice(currentState, finishStep())).toEqual(expected);
  });
  test('finishStep on last question', () => {
    const currentState = {
      timer: false,
      time: [5, 0],
      phase: 'inProcess',
      questions: [chooseMany, chooseOne, fill, detailed],
      currentQuestion: detailed,
      currentStep: 3,
      completedSteps: { 0: true, 1: true, 2: true },
      result: [],
    } as State;

    const expected = {
      ...currentState,
      phase: 'finished',
    };
    expect(testSlice(currentState, finishStep())).toEqual(expected);
  });

  test('setPhase', () => {
    const expected = { ...state, phase: 'finished' };
    expect(testSlice(state, setPhase('finished'))).toEqual(expected);
  });

  test('setTimer', () => {
    const expected = { ...state, timer: true };
    expect(testSlice(state, setTimer(true))).toEqual(expected);
  });

  test('setTime', () => {
    const expected = { ...state, time: [4, 55] };
    expect(testSlice(state, setTime([4, 55]))).toEqual(expected);
  });

  test('uploadQuestions', () => {
    const questions = [chooseMany, chooseOne, fill] as Question[];
    const expected = { ...state, questions, currentQuestion: questions[0] };
    expect(testSlice(state, uploadQuestions(questions))).toEqual(expected);
  });

  test('setDataApp', () => {
    const newState = {
      timer: false,
      time: [5, 0],
      phase: 'inProcess',
      questions: [chooseMany, chooseOne, fill, detailed],
      currentQuestion: fill,
      currentStep: 3,
      completedSteps: {
        0: true,
        1: true,
        2: false,
        3: false,
      },
      result: [],
    } as State;
    const expected = newState;
    expect(testSlice(state, setDataApp(newState))).toEqual(expected);
  });

  test('resetProgress', () => {
    const initialState = {
      timer: true,
      time: [5, 0],
      phase: null,
      questions: [],
      currentQuestion: null,
      currentStep: 0,
      completedSteps: {},
      result: [],
    };
    expect(testSlice(state, resetProgress())).toEqual(initialState);
  });
});
