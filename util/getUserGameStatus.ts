import { auth } from "../app/_layout";
import { screensSlice } from "../redux/reducers/screensReducer";
import store from "../redux/store";

export default function getUserGameStatus() {
  const user = auth.currentUser?.uid;
  if (user) {
    const gameState = store.getState().gameState
    const playerIds = [gameState.hamlet.user.id, gameState.claudius.user.id, gameState.polonius.user.id, gameState.gertrude.user.id]
    if (playerIds.includes(user)) {
      if (gameState.turn === "HamletRoom" && gameState.hamlet.user.id === user) {
        store.dispatch(screensSlice.actions.hideAllScreens())
        store.dispatch(screensSlice.actions.setRoomScreen(true))
      } else if (gameState.turn === "ClaudiusRoom" && gameState.claudius.user.id === user) {
        store.dispatch(screensSlice.actions.hideAllScreens())
        store.dispatch(screensSlice.actions.setRoomScreen(true))
      } else if (gameState.turn === "PoloniusRoom" && gameState.polonius.user.id === user) {
        store.dispatch(screensSlice.actions.hideAllScreens())
        store.dispatch(screensSlice.actions.setRoomScreen(true))
      } else if (gameState.turn === "GertrudeRoom" && gameState.gertrude.user.id === user) {
        store.dispatch(screensSlice.actions.hideAllScreens())
        store.dispatch(screensSlice.actions.setRoomScreen(true))
      }
    } else {
      store.dispatch(screensSlice.actions.hideAllScreens())
      store.dispatch(screensSlice.actions.setPlayerScreen(true))
    }
  } else {
    //TO DO handle error
  }
}