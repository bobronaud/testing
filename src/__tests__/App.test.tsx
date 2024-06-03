import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRedux from './helpers/renderWithRedux';
import { State } from '../types/state';

describe('тест App.tsx', () => {
  test('запуск теста', async () => {
    const initialState = {
      test: {
        timer: true,
        time: [5, 0],
        phase: null,
        questions: [],
        currentQuestion: null,
        currentStep: 0,
        completedSteps: {},
        result: [],
      } as State,
    };
    const container = renderWithRedux(<App />, initialState);
    const btn = container.getByRole('button', { name: /начать/i });
    await userEvent.click(btn);
    const testCard = container.getByTestId('testCard');
    expect(testCard).toBeInTheDocument();
  });
});
