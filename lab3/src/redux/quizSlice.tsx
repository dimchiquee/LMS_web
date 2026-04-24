import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type QuizState = {
  answers: Record<number, string | string[]>;
  result: number | null;
};

const initialState: QuizState = {
  answers: {},
  result: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setAnswer: (
      state,
      action: PayloadAction<{ questionId: number; answer: string | string[] }>
    ) => {
      state.answers[action.payload.questionId] = action.payload.answer;
    },

    setResult: (state, action: PayloadAction<number>) => {
      state.result = action.payload;
    },

    resetQuiz: (state) => {
      state.answers = {};
      state.result = null;
    },
  },
});

export const { setAnswer, setResult, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;