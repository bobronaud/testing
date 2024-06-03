import userEvent from '@testing-library/user-event';
import ChooseMany from '../components/question/ChooseMany';
import { chooseMany, chooseOne } from './__fixtures__/questionsData';
import renderWithRedux from './helpers/renderWithRedux';
import { act } from 'react-dom/test-utils';
import { State } from '../types/state';

describe('тест компонента ChooseMany', () => {
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

  test('отрисовка', () => {
    const container = renderWithRedux(<ChooseMany />, initialState);
    expect(container).toMatchSnapshot();
  });

  test('ошибка при сабмите без выбранного ответа', async () => {
    const { getByText, getByRole } = renderWithRedux(<ChooseMany />, initialState);

    const btn = getByRole('button');
    await act(async () => {
      await userEvent.click(btn);
    });
    const errorText = getByText(/Необходимо выбрать ответ/i);
    expect(errorText).toBeInTheDocument();
  });

  test('работоспособность чекеров', async () => {
    const { getByRole } = renderWithRedux(<ChooseMany />, initialState);
    const checkbox = getByRole('checkbox', { name: /анна ахматова/i });
    await act(async () => {
      await userEvent.click(checkbox);
    });
    const checkBoxAfterClick = getByRole('checkbox', { name: /анна ахматова/i });
    expect(checkBoxAfterClick).toBeChecked();
  });

  test('работоспособность сабмита', async () => {
    const { getByRole, getByText, queryByText } = renderWithRedux(
      <ChooseMany />,
      initialState,
    );
    const checkbox = getByRole('checkbox', { name: /анна ахматова/i });
    await act(async () => {
      await userEvent.click(checkbox);
    });
    const btn = getByRole('button');
    await act(async () => {
      await userEvent.click(btn);
    });
    const prevQuestion = queryByText(chooseMany.question);
    const nextQuestion = getByText(chooseOne.question);
    expect(prevQuestion).not.toBeInTheDocument();
    expect(nextQuestion).toBeInTheDocument();
  });
});
