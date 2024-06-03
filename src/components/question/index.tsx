import ChooseOne from './ChooseOne';
import ChooseMany from './ChooseMany';
import Fill from './Fill';
import Detailed from './Detailed';

import { useAppSelector } from '../../hooks';
import { getQuestionType } from '../../store/selectors/getQuestionType';

type Questions = {
  [key: string]: () => JSX.Element;
};

const QuestionRoot = () => {
  const type = useAppSelector(getQuestionType);
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
