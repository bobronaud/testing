import userEvent from '@testing-library/user-event';
import Detailed from '../components/question/Detailed';
import { State } from '../store/slices/testSlice';
import { chooseOne, detailed } from './__fixtures__/questionsData';
import renderWithRedux from './helpers/renderWithRedux';
import { act } from 'react-dom/test-utils';

describe('тест компонента Detailed', () => {
  const initialState = {
    test: {
      timer: false,
      time: [5, 0],
      phase: 'inProcess',
      questions: [detailed, chooseOne],
      currentQuestion: detailed,
      currentStep: 0,
      completedSteps: {},
      result: [],
    } as State,
  };
  test('отрисовка', () => {
    const container = renderWithRedux(<Detailed />, initialState);
    expect(container).toMatchSnapshot();
  });

  test('работа инпута', async () => {
    const { queryByText, getByText, getByRole } = renderWithRedux(
      <Detailed />,
      initialState,
    );
    const input = getByRole('textbox');
    expect(input).toHaveFocus();

    const btn = getByRole('button');
    await act(async () => {
      await userEvent.click(btn);
    });
    const errorText = getByText(/Необходимо ввести ответ/i);
    expect(errorText).toBeInTheDocument();

    await act(async () => {
      await userEvent.type(input, '\n      ');
    });
    await act(async () => {
      await userEvent.click(btn);
    });
    expect(errorText).toBeInTheDocument();

    await act(async () => {
      await userEvent.clear(input);
    });
    await act(async () => {
      await userEvent.type(input, 'не знаю');
    });
    const error = queryByText(/Необходимо ввести ответ/i);
    expect(error).not.toBeInTheDocument();
  });

  test('работоспособность сабмита', async () => {
    const { queryByText, getByText, getByRole } = renderWithRedux(
      <Detailed />,
      initialState,
    );
    const input = getByRole('textbox');
    const btn = getByRole('button');
    await act(async () => {
      await userEvent.type(input, 'правильный ответ');
    });
    await act(async () => {
      await userEvent.click(btn);
    });
    const prevQuestion = queryByText(detailed.question);
    const nextQuestion = getByText(chooseOne.question);
    expect(prevQuestion).not.toBeInTheDocument();
    expect(nextQuestion).toBeInTheDocument();
  });
});
