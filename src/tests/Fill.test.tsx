import userEvent from '@testing-library/user-event';
import Fill from '../components/question/Fill';
import { State } from '../store/slices/testSlice';
import { chooseMany, fill } from './fixtures/questionsData';
import renderWithRedux from './helpers/renderWithRedux';

describe('тест компонента Fill', () => {
  const initialState = {
    test: {
      timer: false,
      time: [5, 0],
      phase: 'inProcess',
      questions: [fill, chooseMany],
      currentQuestion: fill,
      currentStep: 0,
      completedSteps: {},
      result: [],
    } as State,
  };

  test('отрисовка', () => {
    const container = renderWithRedux(<Fill />, initialState);
    expect(container).toMatchSnapshot();
  });

  test('работа инпута', async () => {
    const { queryByText, getByText, getByRole } = renderWithRedux(<Fill />, initialState);
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
    await userEvent.type(input, 'ответ');
    const error = queryByText(/Необходимо ввести ответ/i);
    expect(error).not.toBeInTheDocument();
  });

  test('работоспособность сабмита', async () => {
    const { queryByText, getByText, getByRole } = renderWithRedux(<Fill />, initialState);
    const input = getByRole('textbox');
    const btn = getByRole('button');
    await userEvent.type(input, 'правильный ответ');
    await userEvent.click(btn);
    const prevQuestion = queryByText(fill.question);
    const nextQuestion = getByText(chooseMany.question);
    expect(prevQuestion).not.toBeInTheDocument();
    expect(nextQuestion).toBeInTheDocument();
  });
});
