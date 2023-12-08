import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initalState: string[] = [];

export const moveableSquaresSlice = createSlice({
  name: 'moveableSquares',
  initialState: initalState,
  reducers: {
    setMoveableSquares: (state, action: PayloadAction<string>) => {
      return { ...state, eventName: action.payload };
    },
  },
});

export default moveableSquaresSlice.reducer;
