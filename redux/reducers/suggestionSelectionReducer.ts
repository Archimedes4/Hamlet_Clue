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
    },
    setPlayerSuggestion: (state, action: PayloadAction<players>) => {
      return {
        player: action.payload,
        weapon: state.weapon
      }
    },
    setWeaponSuggestion: (state, action: PayloadAction<murderWeapons>) => {
      return {
        player: state.player,
        weapon: action.payload
      }
    },
  },
});

export default suggestionsSlice.reducer;
