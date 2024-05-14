import userEvent from '@testing-library/user-event';
import ChooseOne from '../components/question/ChooseOne';
import { Question, State } from '../store/slices/testSlice';
import { chooseMany, chooseOne } from './fixtures/questionsData';
import renderWithRedux from './helpers/renderWithRedux';

describe('тест компонента ChooseOne', () => {
  const initialState = {
    test: {
      timer: false,
      time: [5, 0],
      phase: 'inProcess',
      questions: [chooseOne, chooseMany],
      currentQuestion: chooseOne,
      currentStep: 0,
      completedSteps: {},
      result: [],
    } as State,
  };

  test('отрисовка', () => {
    const container = renderWithRedux(<ChooseOne />, initialState);
    expect(container).toMatchSnapshot();
  });

  test('ошибка при сабмите без выбора ответа', async () => {
    const { getByText, getByRole } = renderWithRedux(<ChooseOne />, initialState);
    const btn = getByRole('button');
    await userEvent.click(btn);
    const errorText = getByText(/необходимо выбрать ответ/i);
    expect(errorText).toBeInTheDocument();
  });

  test('работоспоосбность радиокнопок', async () => {
    const { getByRole } = renderWithRedux(<ChooseOne />, initialState);
    const radio = getByRole('radio', { name: /кот/i });
    await userEvent.click(radio);
    const radioAfterClick = getByRole('radio', { name: /кот/i });
    expect(radioAfterClick).toBeChecked();
  });

  test('работоспособность сабмита', async () => {
    const { queryByText, getByText, getByRole } = renderWithRedux(
      <ChooseOne />,
      initialState,
    );
    const btn = getByRole('button');
    const radio = getByRole('radio', { name: /кот/i });
    await userEvent.click(radio);
    await userEvent.click(btn);
    const prevQuestion = queryByText(chooseOne.question);
    const nextQuestion = getByText(chooseMany.question);
    expect(prevQuestion).not.toBeInTheDocument();
    expect(nextQuestion).toBeInTheDocument();
  });
});
