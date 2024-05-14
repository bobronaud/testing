import { chooseMany, chooseOne, fill, detailed } from './questionsData';

export default [
  { ...chooseMany, userAnswer: chooseMany.answers[0] },
  { ...chooseOne, userAnswer: chooseOne.answers[0] },
  { ...fill, userAnswer: 'короткий ответ' },
  { ...detailed, userAnswer: 'длинный ответ' },
];
