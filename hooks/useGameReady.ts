import { useEffect } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../redux/store";
import { screensSlice } from "../redux/reducers/screensReducer";
import getUserGameStatus from "../util/getUserGameStatus";

export default function useGameReady() {
  const gameState = useSelector((state: RootState) => state.gameState);
  function checkIfGameReady() {
    if (gameState.hamlet.user.id !== "" && gameState.claudius.user.id !== "" && gameState.polonius.user.id !== "" && gameState.gertrude.user.id !== "" && gameState.players.length === 4) {
      store.dispatch(screensSlice.actions.setPlayerScreen(false))
      getUserGameStatus()
    } else {
      store.dispatch(screensSlice.actions.setPlayerScreen(true))
    }
  }

  useEffect(() => {
    checkIfGameReady()
  }, [gameState.hamlet, gameState.claudius, gameState.polonius, gameState.gertrude, gameState.players, gameState.turn, gameState.promt])
  return null
}