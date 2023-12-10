import { auth } from "../app/_layout";
import { screensSlice } from "../redux/reducers/screensReducer";
import store from "../redux/store";

export default function getUserGameStatus() {
  const user = auth.currentUser?.uid;
  if (user) {
    const gameState = store.getState().gameState
    const playerIds = [gameState.hamlet.id, gameState.claudius.id, gameState.polonius.id, gameState.gertrude.id]
    if (playerIds.includes(user)) {

    } else {
      store.dispatch(screensSlice.actions.hideAllScreens())
      store.dispatch(screensSlice.actions.setPlayerScreen(true))
    }
  } else {
    //TO DO handle error
  }
}