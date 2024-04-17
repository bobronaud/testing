import type { Question as QuestionType } from '../../slices/testSlice';
import { useAppSelector } from '../../app/hooks';

import ChooseOne from './ChooseOne';
import ChooseMany from './ChooseMany';
import Fill from './Fill';
import Detailed from './Detailed';

type Questions = {
  [key: string]: () => JSX.Element;
};

const QuestionRoot = () => {
  const { type } = useAppSelector((state) => state.test.currentQuestion) as QuestionType;
  const questions: Questions = {
    chooseOne: ChooseOne,
    chooseMany: ChooseMany,
    fill: Fill,
    detailed: Detailed,
  };
  const Question = questions[type];
  return <Question />;
};

export default QuestionRoot;
