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
        store.dispatch(screensSlice.actions.setRoomScreen(true))
      } else if (gameState.turn === "ClaudiusRoom" && gameState.claudius.user.id === user) {
        store.dispatch(screensSlice.actions.setRoomScreen(true))
      } else if (gameState.turn === "PoloniusRoom" && gameState.polonius.user.id === user) {
        store.dispatch(screensSlice.actions.setRoomScreen(true))
      } else if (gameState.turn === "GertrudeRoom" && gameState.gertrude.user.id === user) {
        store.dispatch(screensSlice.actions.setRoomScreen(true))
      } else if (gameState.turn === "HamletSugget" && gameState.hamlet.user.id === user) {
        store.dispatch(screensSlice.actions.setInformationScreen(true))
      } else if (gameState.turn === "ClaudiusSuggest" && gameState.claudius.user.id === user) {
        store.dispatch(screensSlice.actions.setInformationScreen(true))
      } else if (gameState.turn === "PoloniusSuggest" && gameState.polonius.user.id === user) {
        store.dispatch(screensSlice.actions.setInformationScreen(true))
      } else if (gameState.turn === "GertrudeSuggest" && gameState.gertrude.user.id === user) {
        store.dispatch(screensSlice.actions.setInformationScreen(true))
      } else if (gameState.hamlet.lastDismissed !== gameState.promt.time && gameState.hamlet.user.id === user) {
        console.log("This is promt ham", gameState.promt.time)
        store.dispatch(screensSlice.actions.setInformationScreen(true))
      } else if (gameState.claudius.lastDismissed !== gameState.promt.time && gameState.claudius.user.id === user) {
        console.log("This is promt claud", gameState.promt.time)
        store.dispatch(screensSlice.actions.setInformationScreen(true))
      } else if (gameState.polonius.lastDismissed !== gameState.promt.time && gameState.polonius.user.id === user) {
        console.log("This is promt polo", gameState.promt.time, gameState.polonius.lastDismissed)
        store.dispatch(screensSlice.actions.setInformationScreen(true))
      } else if (gameState.gertrude.lastDismissed !== gameState.promt.time && gameState.gertrude.user.id === user) {
        console.log("This is promt gert", gameState.promt.time)
        store.dispatch(screensSlice.actions.setInformationScreen(true))
      }
    } else {
      store.dispatch(screensSlice.actions.hideAllScreens())
      store.dispatch(screensSlice.actions.setPlayerScreen(true))
    }
  } else {
    //TO DO handle error
  }
}