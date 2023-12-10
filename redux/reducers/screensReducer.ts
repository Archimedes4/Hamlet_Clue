import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initalState: {
  playerPicker: boolean;
  detectiveSheet: boolean;
  accuse: boolean;
  suggest: boolean;
} = { playerPicker: false, detectiveSheet: false, accuse: false, suggest: false };

export const screensSlice = createSlice({
  name: 'screens',
  initialState: initalState,
  reducers: {
    setPlayerScreen: (state, action: PayloadAction<boolean>) => {
      return {
        playerPicker: action.payload,
        detectiveSheet: state.detectiveSheet,
        accuse: state.accuse,
        suggest: state.suggest
      }
    },
    setDetectiveSheetScreen: (state, action: PayloadAction<boolean>) => {
      return {
        playerPicker: state.playerPicker,
        detectiveSheet: action.payload,
        accuse: state.accuse,
        suggest: state.suggest
      }
    },
    setAccuseScreen: (state, action: PayloadAction<boolean>) => {
      return {
        playerPicker: state.playerPicker,
        detectiveSheet: state.detectiveSheet,
        accuse: action.payload,
        suggest: state.suggest
      }
    },
    setSuggestScreen: (state, action: PayloadAction<boolean>) => {
      return {
        playerPicker: state.playerPicker,
        detectiveSheet: state.detectiveSheet,
        accuse: state.accuse,
        suggest: action.payload
      }
    },
    hideAllScreens: (_state, _action: PayloadAction<undefined>) => {
      return {
        playerPicker: false,
        detectiveSheet: false,
        accuse: false,
        suggest: false
      }
    }
  },
});

export default screensSlice.reducer;
