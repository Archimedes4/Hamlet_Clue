import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initalState: {
  player: players
  weapon: murderWeapons
} = { player: "Hamlet", weapon: "Hemlock_Poison"};

export const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState: initalState,
  reducers: {
    setSuggestions: (_state, action: PayloadAction<{
      player: players
      weapon: murderWeapons
    }>) => {
      return action.payload
    }
  },
});

export default suggestionsSlice.reducer;
