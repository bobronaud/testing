export type QuestionType = 'chooseOne' | 'chooseMany' | 'fill' | 'detailed';

export type Question = {
  id: number;
  type: QuestionType;
  question: string;
  answers?: string[];
  rightAnswer?: string | string[];
};

export type Answer = Question & {
  userAnswer: string;
};

export type Phase = 'starting' | 'inProcess' | 'finished';

export type Completed = {
  [key: number]: boolean;
};

export type State = {
  timer: boolean;
  time: [number, number];
  phase: Phase | null;
  questions: Question[];
  currentQuestion: Question | null;
  currentStep: number;
  completedSteps: Completed;
  result: Answer[];
};
