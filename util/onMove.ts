import { rooms } from "../constants/PiecesLocations";
import { gameStateSlice } from "../redux/reducers/gameStateReducer";
import { screensSlice } from "../redux/reducers/screensReducer";
import store from "../redux/store";
import roleDie from "./roleDie";

export default function onMove(id: position) {
  const room = rooms.some((e) => {return e === id})
  const state = store.getState().gameState
  if (room) {
    store.dispatch(screensSlice.actions.setRoomScreen(true))
  }
  //Check if room
  let newGameState: gameState = {
    gameId: state.gameId,
    master: state.master,
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
    answer: state.answer
  }
  if (room) {
    newGameState.dieOne = roleDie()
    newGameState.dieTwo = roleDie()
    newGameState.dieCount = 0
    newGameState.history = [...state.history, id]
    //Made all moves next player
    if (state.turn === "Hamlet") {
      newGameState.turn = "HamletRoom"
      newGameState.hamlet  = {
        id: state.hamlet.id,
        pos: id,
        cards: state.hamlet.cards,
        guesses: state.hamlet.guesses,
        accused: state.hamlet.accused
      }
    } else if (state.turn === "Claudius") {
      newGameState.turn = "ClaudiusRoom"
      newGameState.claudius = {
        id: state.claudius.id,
        pos: id,
        cards: state.claudius.cards,
        guesses: state.claudius.guesses,
        accused: state.claudius.accused
      }
    } else if (state.turn === "Polonius") {
      newGameState.turn = "PoloniusRoom"
      newGameState.polonius = {
        id: state.polonius.id,
        pos: id,
        cards: state.polonius.cards,
        guesses: state.polonius.guesses,
        accused: state.polonius.accused
      }
    } else if ( state.turn === "Gertrude") {
      newGameState.turn = "GertrudeRoom"
      newGameState.gertrude = {
        id: state.gertrude.id,
        pos: id,
        cards: state.gertrude.cards,
        guesses: state.gertrude.guesses,
        accused: state.gertrude.accused
      }
    }
  } else if (state.dieCount + 1 === state.dieOne + state.dieTwo) {
    //Made all moves next player
    newGameState.dieOne = roleDie()
    newGameState.dieTwo = roleDie()
    newGameState.dieCount = 0
    newGameState.history = []
    if (state.turn === "Hamlet") {
      const hamletIndex = state.orderOfPlay.indexOf("Hamlet") 
      if (hamletIndex >= 3) {
        newGameState.turn = state.orderOfPlay[0]
      } else {
        newGameState.turn = state.orderOfPlay[hamletIndex + 1]
      }
      newGameState.hamlet  = {
        id: state.hamlet.id,
        pos: id,
        cards: state.hamlet.cards,
        guesses: state.hamlet.guesses,
        accused: state.hamlet.accused
      }
    } else if (state.turn === "Claudius") {
      state.orderOfPlay.indexOf("Claudius")
      const claudiusIndex = state.orderOfPlay.indexOf("Hamlet") 
      if (claudiusIndex >= 3) {
        newGameState.turn = state.orderOfPlay[0]
      } else {
        newGameState.turn = state.orderOfPlay[claudiusIndex + 1]
      }
      newGameState.claudius = {
        id: state.claudius.id,
        pos: id,
        cards: state.claudius.cards,
        guesses: state.claudius.guesses,
        accused: state.claudius.accused
      }
    } else if (state.turn === "Polonius") {
      const poloniusIndex = state.orderOfPlay.indexOf("Polonius")
      if (poloniusIndex >= 3) {
        newGameState.turn = state.orderOfPlay[0]
      } else {
        newGameState.turn = state.orderOfPlay[poloniusIndex + 1]
      }
      newGameState.polonius = {
        id: state.polonius.id,
        pos: id,
        cards: state.polonius.cards,
        guesses: state.polonius.guesses,
        accused: state.polonius.accused
      }
    } else if (state.turn === "Gertrude") {
      const gertrudeIndex = state.orderOfPlay.indexOf("Gertrude") 
      if (gertrudeIndex >= 3) {
        newGameState.turn = state.orderOfPlay[0]
      } else {
        newGameState.turn = state.orderOfPlay[gertrudeIndex + 1]
      }
      newGameState.gertrude = {
        id: state.gertrude.id,
        pos: id,
        cards: state.gertrude.cards,
        guesses: state.gertrude.guesses,
        accused: state.gertrude.accused
      }
    }
  } else {
    newGameState.dieCount = state.dieCount + 1
    newGameState.history = [...state.history, id]
    if (state.turn === "Hamlet") { 
      newGameState.hamlet = {
        id: state.hamlet.id,
        pos: id,
        cards: state.hamlet.cards,
        guesses: state.hamlet.guesses,
        accused: state.hamlet.accused
      }
    } else if (state.turn === "Claudius") {
      newGameState.claudius = {
        id: state.claudius.id,
        pos: id,
        cards: state.claudius.cards,
        guesses: state.claudius.guesses,
        accused: state.claudius.accused
      }
    } else if (state.turn === "Polonius") {
      newGameState.polonius = {
        id: state.polonius.id,
        pos: id,
        cards: state.polonius.cards,
        guesses: state.polonius.guesses,
        accused: state.polonius.accused
      }
    } else if (state.turn === "Gertrude") {
      newGameState.gertrude = {
        id: state.gertrude.id,
        pos: id,
        cards: state.gertrude.cards,
        guesses: state.gertrude.guesses,
        accused: state.gertrude.accused
      }
    }
  }
  console.log(newGameState)
  store.dispatch(gameStateSlice.actions.setGameState(newGameState))
}