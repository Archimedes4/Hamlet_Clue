import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initalState: string = ""

export const usernameSlice = createSlice({
  name: 'username',
  initialState: initalState,
  reducers: {
    setUsername: (_state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export default usernameSlice.reducer;
