import userEvent from '@testing-library/user-event';
import Start from '../components/Start';
import { State } from '../store/slices/testSlice';
import renderWithRedux from './helpers/renderWithRedux';
import { chooseMany, chooseOne } from './fixtures/questionsData';
import { getByTestId } from '@testing-library/react';

describe('тест компонента Start', () => {
  const initialState = {
    test: {
      timer: true,
      time: [5, 0],
      phase: 'starting',
      questions: [],
      currentQuestion: null,
      currentStep: 0,
      completedSteps: {},
      result: [],
    } as State,
  };
  test('отрисовка', () => {
    const container = renderWithRedux(<Start />, initialState);
    expect(container).toMatchSnapshot();
  });

  test('работоспособность чекера', async () => {
    const { getByRole } = renderWithRedux(<Start />, initialState);
    const cheker = getByRole('checkbox');
    expect(cheker).toBeChecked();
    await userEvent.click(cheker);
    expect(cheker).not.toBeChecked();
  });
});
