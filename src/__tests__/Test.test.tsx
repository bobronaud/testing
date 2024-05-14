import Test from '../components/Test';
import { State } from '../store/slices/testSlice';
import { chooseMany } from './__fixtures__/questionsData';
import renderWithRedux from './helpers/renderWithRedux';

describe('тест компонента Test.tsx', () => {
  const initialState = {
    test: {
      timer: true,
      time: [5, 0],
      phase: 'inProcess',
      questions: [chooseMany],
      currentQuestion: chooseMany,
      currentStep: 0,
      completedSteps: {},
      result: [],
    } as State,
  };

  test('отрисовка с таймером', () => {
    const container = renderWithRedux(<Test />, initialState);
    expect(container).toMatchSnapshot();
  });

  test('отрисовка без таймера', () => {
    const initialState = {
      test: {
        timer: false,
        time: [5, 0],
        phase: 'inProcess',
        questions: [chooseMany],
        currentQuestion: chooseMany,
        currentStep: 0,
        completedSteps: {},
        result: [],
      } as State,
    };

    const { queryByTestId } = renderWithRedux(<Test />, initialState);
    const timer = queryByTestId('timer');
    expect(timer).not.toBeInTheDocument();
  });
});
