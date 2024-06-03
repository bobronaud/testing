import userEvent from '@testing-library/user-event';
import Start from '../components/Start';
import renderWithRedux from './helpers/renderWithRedux';
import { act } from 'react-dom/test-utils';
import { State } from '../types/state';

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
    await act(async () => {
      await userEvent.click(cheker);
    });
    expect(cheker).not.toBeChecked();
  });
});
