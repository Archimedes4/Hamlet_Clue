import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initalState: {
  width: number;
  height: number;
} = { width: 0, height: 0 };

export const dimentionsSlice = createSlice({
  name: 'dimentions',
  initialState: initalState,
  reducers: {
    setDimentions: (_state, action: PayloadAction<{width: number, height: number}>) => {
      return action.payload;
    },
  },
});

export default dimentionsSlice.reducer;
