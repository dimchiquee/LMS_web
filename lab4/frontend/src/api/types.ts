export type Skin = {
  id: number;
  name: string;
  weapon: string;
  weaponType: string;
  rarity: string;
  collection: string;
  price: number;
  wear: string;
  source: string;
  releaseYear: number;
  image: string;
  description: string;
};

export type PaginatedSkins = {
  items: Skin[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

export type GroupedSkinRow = {
  id: number;
  group: string;
  count: number;
  minPrice: number;
  avgPrice: number;
  maxPrice: number;
};

export type QuizPair = {
  left: string;
  right: string;
};

export type QuizQuestion = {
  id: number;
  question: string;
  type: "single" | "multiple" | "matching" | "sorting";
  options?: string[];
  correctAnswer?: string;
  correctAnswers?: string[];
  pairs?: QuizPair[];
  sortingItems?: string[];
  correctOrder?: string[];
};
