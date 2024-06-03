export const chooseOne = {
  id: 1,
  type: 'chooseOne',
  question: "Какое домашнее животное издает по ночам звук 'тыгыдык-тыгыдык'?",
  answers: ['Собака', 'Хомяк', 'Кот', 'Попугай'],
  rightAnswer: 'Кот',
};

export const chooseMany = {
  id: 2,
  type: 'chooseMany',
  question: 'Выберите несколько вариантов. Какие поэты относятся к серебрянному веку?',
  answers: ['Анна Ахматова', 'Осип Мандельштам', 'Александр Пушкин', 'Антон Чехов'],
  rightAnswer: ['Анна Ахматова', 'Осип Мандельштам'],
};

export const fill = {
  id: 3,
  type: 'fill',
  question:
    'Вставьте пропущенное слово из пословицы. Не плюй в _____, пригодится воды напиться',
  rightAnswer: 'колодец',
};

export const detailed = {
  id: 4,
  type: 'detailed',
  question: 'Опишите кратко процесс фотосинтеза.',
};
