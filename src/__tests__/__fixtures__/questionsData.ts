export const chooseOne = {
  type: 'chooseOne',
  question: "Какое домашнее животное издает по ночам звук 'тыгыдык-тыгыдык'?",
  answers: ['Собака', 'Хомяк', 'Кот', 'Попугай'],
  rightAnswer: 'Кот',
};

export const chooseMany = {
  type: 'chooseMany',
  question: 'Выберите несколько вариантов. Какие поэты относятся к серебрянному веку?',
  answers: ['Анна Ахматова', 'Осип Мандельштам', 'Александр Пушкин', 'Антон Чехов'],
  rightAnswer: ['Анна Ахматова', 'Осип Мандельштам'],
};

export const fill = {
  type: 'fill',
  question:
    'Вставьте пропущенное слово из пословицы. Не плюй в _____, пригодится воды напиться',
  answers: null,
  rightAnswer: 'колодец',
};

export const detailed = {
  type: 'detailed',
  question: 'Опишите кратко процесс фотосинтеза.',
  answers: null,
  rightAnswer: null,
};
