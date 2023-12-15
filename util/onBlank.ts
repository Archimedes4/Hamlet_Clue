
import { gameStateSlice } from "../redux/reducers/gameStateReducer";
import store from "../redux/store";
import { roleDie } from "./util";

export default function onBlank() {
  const state = store.getState().gameState
  //Check if room
  let newGameState: gameState = {
    gameId: state.gameId,
    master: state.master,
    players: state.players,
    hamlet: state.hamlet,
    claudius: state.claudius,
    polonius: state.polonius,
    gertrude: state.gertrude,
    turn: state.turn,
    dieOne: state.dieOne,
    dieTwo: state.dieTwo,
    dieCount: state.dieCount,
    history: state.history,
    orderOfPlay: state.orderOfPlay,
    answer: state.answer,
    promt: state.promt,
    gameOver: state.gameOver,
    winner: state.winner,
    bannedPlayers: state.bannedPlayers,
    changeKey: state.changeKey
  }
  //Made all moves next player
  newGameState.dieOne = roleDie()
  newGameState.dieTwo = roleDie()
  newGameState.dieCount = 0
  newGameState.history = []
  let orderOfPlay = [...state.orderOfPlay].filter((e) => {
    if (e === "Hamlet" && !state.hamlet.accused) {
      return e
    }
    if (e === "Claudius" && !state.claudius.accused) {
      return e
    }
    if (e === "Polonius" && !state.polonius.accused) {
      return e
    }
    if (e === "Gertrude" && !state.gertrude.accused) {
      return e
    }
  })
  if (state.turn === "Hamlet") { 
    const hamletIndex = orderOfPlay.indexOf("Hamlet") 
    if ((hamletIndex + 1) > orderOfPlay.length) {
      newGameState.turn = orderOfPlay[0]
    } else {
      newGameState.turn = orderOfPlay[hamletIndex + 1]
    }
  } else if (state.turn === "Claudius") {
    const claudiusIndex = orderOfPlay.indexOf("Claudius") 
    if ((claudiusIndex + 1) > orderOfPlay.length) {
      newGameState.turn = orderOfPlay[0]
    } else {
      newGameState.turn = orderOfPlay[claudiusIndex + 1]
    }
  } else if (state.turn === "Polonius") {
    const poloniusIndex = state.orderOfPlay.indexOf("Polonius")
    if ((poloniusIndex + 1) > orderOfPlay.length) {
      newGameState.turn = orderOfPlay[0]
    } else {
      newGameState.turn = orderOfPlay[poloniusIndex + 1]
    }
  } else if (state.turn === "Gertrude") {
    const gertrudeIndex = state.orderOfPlay.indexOf("Gertrude") 
    if ((gertrudeIndex + 1) > orderOfPlay.length) {
      newGameState.turn = orderOfPlay[0]
    } else {
      newGameState.turn = orderOfPlay[gertrudeIndex + 1]
    }
  }
  store.dispatch(gameStateSlice.actions.setGameState(newGameState))
}