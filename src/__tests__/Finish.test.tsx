import Finish from '../components/Finish';
import { State } from '../types/state';
import result from './__fixtures__/resultData';
import renderWithRedux from './helpers/renderWithRedux';

describe('тест компоннета Finish', () => {
  const initialState = {
    test: {
      timer: false,
      time: [5, 0],
      phase: 'finished',
      questions: [],
      currentQuestion: null,
      currentStep: 0,
      completedSteps: {},
      result,
    } as State,
  };

  test('отрисовка', () => {
    const container = renderWithRedux(<Finish />, initialState);
    expect(container).toMatchSnapshot();
  });
});
