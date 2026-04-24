import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ListsState {
  lists: string[][];
}


const initialState: ListsState = {
  lists: [],
};

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setDraggedItems: (
      state,
      action: PayloadAction<{ index: number; items: string[] }>
    ) => {
      const { index, items } = action.payload;
      state.lists[index] = items;
    },

    clearLists: (state) => {
      state.lists = [];
    },
  },
});

export const { setDraggedItems, clearLists } = listsSlice.actions;
export default listsSlice.reducer;