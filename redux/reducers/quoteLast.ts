import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initalState: string = ""

export const quoteLastSlice = createSlice({
  name: 'username',
  initialState: initalState,
  reducers: {
    setQuoteLast: (_state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export default quoteLastSlice.reducer;
