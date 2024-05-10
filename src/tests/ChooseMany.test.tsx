import userEvent from '@testing-library/user-event';
import ChooseMany from '../components/question/ChooseMany';
import { chooseMany, chooseOne } from './fixtures/questionsData';
import renderWithRedux from './helpers/renderWithRedux';
import { State } from '../store/slices/testSlice';

describe('тест компонента ChooseMany', () => {
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

  test('отрисовка вопроса и ответов', () => {
    const { getByText } = renderWithRedux(<ChooseMany />, initialState);

    expect(getByText(chooseMany.question)).toBeInTheDocument();

    chooseMany.answers.forEach((answer) => {
      expect(getByText(answer)).toBeInTheDocument();
    });
  });

  test('ошибка при сабмите без выбранного ответа', async () => {
    const { getByText, getByRole } = renderWithRedux(<ChooseMany />, initialState);

    const btn = getByRole('button');
    await userEvent.click(btn);
    const errorText = getByText(/Необходимо выбрать ответ/i);
    expect(errorText).toBeInTheDocument();
  });

  test('работоспособность чекеров', async () => {
    const { getByRole } = renderWithRedux(<ChooseMany />, initialState);
    const checkbox = getByRole('checkbox', { name: /анна ахматова/i });
    await userEvent.click(checkbox);
    const checkBoxAfterClick = getByRole('checkbox', { name: /анна ахматова/i });
    expect(checkBoxAfterClick).toBeChecked();
  });

  test('работоспособность сабмита', async () => {
    const initialState = {
      test: {
        timer: false,
        time: [5, 0],
        phase: 'inProcess',
        questions: [chooseMany, chooseOne],
        currentQuestion: chooseMany,
        currentStep: 0,
        completedSteps: {},
        result: [],
      } as State,
    };

    const { getByRole, getByText, queryByText } = renderWithRedux(
      <ChooseMany />,
      initialState,
    );
    const checkbox = getByRole('checkbox', { name: /анна ахматова/i });
    await userEvent.click(checkbox);
    const btn = getByRole('button');
    await userEvent.click(btn);
    const prevQuestion = queryByText(chooseMany.question);
    const nextQuestion = getByText(chooseOne.question);
    expect(prevQuestion).not.toBeInTheDocument();
    expect(nextQuestion).toBeInTheDocument();
  });
});