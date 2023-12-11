import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initalState: {
  playerPicker: boolean;
  detectiveSheet: boolean;
  room: boolean; //This is for both suggesting and accuesing
  information: boolean;
} = { playerPicker: false, detectiveSheet: false, room: false, information: false};

export const screensSlice = createSlice({
  name: 'screens',
  initialState: initalState,
  reducers: {
    setPlayerScreen: (state, action: PayloadAction<boolean>) => {
      return {
        playerPicker: action.payload,
        detectiveSheet: state.detectiveSheet,
        room: state.room,
        information: state.information
      }
    },
    setDetectiveSheetScreen: (state, action: PayloadAction<boolean>) => {
      return {
        playerPicker: state.playerPicker,
        detectiveSheet: action.payload,
        room: state.room,
        information: state.information
      }
    },
    setRoomScreen: (state, action: PayloadAction<boolean>) => {
      return {
        playerPicker: state.playerPicker,
        detectiveSheet: state.detectiveSheet,
        room: action.payload,
        information: state.information
      }
    },
    setInformationScreen: (state, action: PayloadAction<boolean>) => {
      return {
        playerPicker: state.playerPicker,
        detectiveSheet: state.detectiveSheet,
        room: state.room,
        information: action.payload
      }
    },
    hideAllScreens: (_state, _action: PayloadAction<undefined>) => {
      return {
        playerPicker: false,
        detectiveSheet: false,
        room: false,
        information: false
      }
    }
  },
});

export default screensSlice.reducer;
