import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initalState: {
  player: players
  weapon: murderWeapons
  room: rooms
} = { player: "Hamlet", weapon: "Hemlock_Poison", room: "Gun_Platform"};

export const accusationsSlice = createSlice({
  name: 'accusations',
  initialState: initalState,
  reducers: {
    setAccusation: (_state, action: PayloadAction<{
      player: players
      weapon: murderWeapons
      room: rooms
    }>) => {
      return action.payload
    },
    setPlayerAccusation: (state, action: PayloadAction<players>) => {
      return {
        player: action.payload,
        weapon: state.weapon,
        room: state.room
      }
    },
    setWeaponAccusation: (state, action: PayloadAction<murderWeapons>) => {
      return {
        player: state.player,
        weapon: action.payload,
        room: state.room
      }
    },
    setRoomAccusation: (state, action: PayloadAction<rooms>) => {
      return {
        player: state.player,
        weapon: state.weapon,
        room: action.payload
      }
    },
  },
});

export default accusationsSlice.reducer;
