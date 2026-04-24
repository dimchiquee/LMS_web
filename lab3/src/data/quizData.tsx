export type QuizQuestion = {
  id: number;
  type: "single" | "multiple" | "matching" | "sorting";
  question: string;
  options?: string[];
  correctAnswer?: string;
  correctAnswers?: string[];
  pairs?: {
    left: string;
    right: string;
  }[];
  sortingItems?: string[];
  correctOrder?: string[];
};

export const quizData: QuizQuestion[] = [
  {
    id: 1,
    type: "single",
    question: "Какое оружие относится к скину 'Сланец'?",
    options: ["AWP", "AK-47", "USP-S", "Glock-18"],
    correctAnswer: "AK-47",
  },
  {
    id: 2,
    type: "single",
    question: "К какой редкости относится AWP | Asiimov?",
    options: ["Запрещённое", "Засекреченное", "Тайное", "Базовое"],
    correctAnswer: "Тайное",
  },
  {
    id: 3,
    type: "multiple",
    question: "Выберите скины редкости Тайное.",
    options: [
      "AWP | Asiimov",
      "USP-S | Kill Confirmed",
      "AK-47 | Redline",
      "Glock-18 | Water Elemental",
    ],
    correctAnswers: ["AWP | Asiimov", "USP-S | Kill Confirmed"],
  },
  {
    id: 4,
    type: "multiple",
    question: "Какие поля используются в карточке скина?",
    options: ["Оружие", "Редкость", "Коллекция", "Дата выхода", "Игра"],
    correctAnswers: ["Оружие", "Редкость", "Коллекция"],
  },
  {
    id: 5,
    type: "matching",
    question: "Сопоставьте скин и оружие.",
    pairs: [
      { left: "Сланец", right: "AK-47" },
      { left: "Удар молнии", right: "AWP" },
      { left: "Страж", right: "USP-S" },
    ],
  },
  {
    id: 6,
    type: "sorting",
    question: "Расположите скины по возрастанию цены.",
    sortingItems: [
      "Desert Eagle | Blaze",
      "Glock-18 | Water Elemental",
      "AWP | Asiimov",
    ],
    correctOrder: [
      "Glock-18 | Water Elemental",
      "AWP | Asiimov",
      "Desert Eagle | Blaze",
    ],
  },
];