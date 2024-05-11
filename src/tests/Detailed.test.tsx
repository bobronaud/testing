import userEvent from '@testing-library/user-event';
import Detailed from '../components/question/Detailed';
import { State } from '../store/slices/testSlice';
import { chooseOne, detailed } from './fixtures/questionsData';
import renderWithRedux from './helpers/renderWithRedux';

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
  test('отрисовка вопроса', () => {
    const { getByText } = renderWithRedux(<Detailed />, initialState);
    const question = getByText(detailed.question);
    expect(question).toBeInTheDocument();
  });

  test('работа инпута', async () => {
    const { queryByText, getByText, getByRole } = renderWithRedux(
      <Detailed />,
      initialState,
    );
    const input = getByRole('textbox');
    expect(input).toHaveFocus();

    const btn = getByRole('button');
    await userEvent.click(btn);
    const errorText = getByText(/Необходимо ввести ответ/i);
    expect(errorText).toBeInTheDocument();

    await userEvent.type(input, '\n      ');
    await userEvent.click(btn);
    expect(errorText).toBeInTheDocument();

    await userEvent.clear(input);
    await userEvent.type(input, 'не знаю');
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
    await userEvent.type(input, 'правильный ответ');
    await userEvent.click(btn);
    const prevQuestion = queryByText(detailed.question);
    const nextQuestion = getByText(chooseOne.question);
    expect(prevQuestion).not.toBeInTheDocument();
    expect(nextQuestion).toBeInTheDocument();
  });
});
