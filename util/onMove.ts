import { rooms } from "../constants/PiecesLocations";
import { gameStateSlice } from "../redux/reducers/gameStateReducer";
import { screensSlice } from "../redux/reducers/screensReducer";
import store from "../redux/store";
import { roleDie } from "./util";

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
  if (room) {
    newGameState.dieOne = roleDie()
    newGameState.dieTwo = roleDie()
    newGameState.dieCount = 0
    newGameState.history = []
    //Made all moves next player
    if (state.turn === "Hamlet") {
      newGameState.turn = "HamletRoom"
      newGameState.hamlet = {
        user: state.hamlet.user,
        pos: id,
        cards: state.hamlet.cards,
        guesses: state.hamlet.guesses,
        accused: state.hamlet.accused,
        notes: state.hamlet.notes,
        lastDismissed: state.hamlet.lastDismissed
      }
    } else if (state.turn === "Claudius") {
      newGameState.turn = "ClaudiusRoom"
      newGameState.claudius = {
        user: state.claudius.user,
        pos: id,
        cards: state.claudius.cards,
        guesses: state.claudius.guesses,
        accused: state.claudius.accused,
        notes: state.claudius.notes,
        lastDismissed: state.claudius.lastDismissed
      }
    } else if (state.turn === "Polonius") {
      newGameState.turn = "PoloniusRoom"
      newGameState.polonius = {
        user: state.polonius.user,
        pos: id,
        cards: state.polonius.cards,
        guesses: state.polonius.guesses,
        accused: state.polonius.accused,
        notes: state.polonius.notes,
        lastDismissed: state.polonius.lastDismissed
      }
    } else if ( state.turn === "Gertrude") {
      newGameState.turn = "GertrudeRoom"
      newGameState.gertrude = {
        user: state.gertrude.user,
        pos: id,
        cards: state.gertrude.cards,
        guesses: state.gertrude.guesses,
        accused: state.gertrude.accused,
        notes: state.gertrude.notes,
        lastDismissed: state.gertrude.lastDismissed
      }
    }
  } else if (state.dieCount + 1 === state.dieOne + state.dieTwo) {
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
    if (orderOfPlay.length <= 0) {
      //Game Tie
      newGameState.gameOver = true
    } else if (state.turn === "Hamlet") { 
      const hamletIndex = orderOfPlay.indexOf("Hamlet") 
      if ((hamletIndex + 1) > orderOfPlay.length) {
        newGameState.turn = orderOfPlay[0]
      } else {
        newGameState.turn = orderOfPlay[hamletIndex + 1]
      }
      newGameState.hamlet  = {
        user: state.hamlet.user,
        pos: id,
        cards: state.hamlet.cards,
        guesses: state.hamlet.guesses,
        accused: state.hamlet.accused,
        notes: state.hamlet.notes,
        lastDismissed: state.hamlet.lastDismissed
      }
    } else if (state.turn === "Claudius") {
      const claudiusIndex = orderOfPlay.indexOf("Claudius") 
      if ((claudiusIndex + 1) > orderOfPlay.length) {
        newGameState.turn = orderOfPlay[0]
      } else {
        newGameState.turn = orderOfPlay[claudiusIndex + 1]
      }
      newGameState.claudius = {
        user: state.claudius.user,
        pos: id,
        cards: state.claudius.cards,
        guesses: state.claudius.guesses,
        accused: state.claudius.accused,
        notes: state.claudius.notes,
        lastDismissed: state.claudius.lastDismissed
      }
    } else if (state.turn === "Polonius") {
      const poloniusIndex = state.orderOfPlay.indexOf("Polonius")
      if ((poloniusIndex + 1) > orderOfPlay.length) {
        newGameState.turn = orderOfPlay[0]
      } else {
        newGameState.turn = orderOfPlay[poloniusIndex + 1]
      }
      newGameState.polonius = {
        user: state.polonius.user,
        pos: id,
        cards: state.polonius.cards,
        guesses: state.polonius.guesses,
        accused: state.polonius.accused,
        notes: state.polonius.notes,
        lastDismissed: state.polonius.lastDismissed
      }
    } else if (state.turn === "Gertrude") {
      const gertrudeIndex = state.orderOfPlay.indexOf("Gertrude") 
      if ((gertrudeIndex + 1) > orderOfPlay.length) {
        newGameState.turn = orderOfPlay[0]
      } else {
        newGameState.turn = orderOfPlay[gertrudeIndex + 1]
      }
      newGameState.gertrude = {
        user: state.gertrude.user,
        pos: id,
        cards: state.gertrude.cards,
        guesses: state.gertrude.guesses,
        accused: state.gertrude.accused,
        notes: state.gertrude.notes,
        lastDismissed: state.gertrude.lastDismissed
      }
    }
  } else {
    newGameState.dieCount = state.dieCount + 1
    newGameState.history = [...state.history, id]
    if (state.turn === "Hamlet") { 
      newGameState.hamlet = {
        user: state.hamlet.user,
        pos: id,
        cards: state.hamlet.cards,
        guesses: state.hamlet.guesses,
        accused: state.hamlet.accused,
        notes: state.hamlet.notes,
        lastDismissed: state.hamlet.lastDismissed
      }
    } else if (state.turn === "Claudius") {
      newGameState.claudius = {
        user: state.claudius.user,
        pos: id,
        cards: state.claudius.cards,
        guesses: state.claudius.guesses,
        accused: state.claudius.accused,
        notes: state.claudius.notes,
        lastDismissed: state.claudius.lastDismissed
      }
    } else if (state.turn === "Polonius") {
      newGameState.polonius = {
        user: state.polonius.user,
        pos: id,
        cards: state.polonius.cards,
        guesses: state.polonius.guesses,
        accused: state.polonius.accused,
        notes: state.polonius.notes,
        lastDismissed: state.polonius.lastDismissed
      }
    } else if (state.turn === "Gertrude") {
      newGameState.gertrude = {
        user: state.gertrude.user,
        pos: id,
        cards: state.gertrude.cards,
        guesses: state.gertrude.guesses,
        accused: state.gertrude.accused,
        notes: state.gertrude.notes,
        lastDismissed: state.gertrude.lastDismissed
      }
    }
  }
  store.dispatch(gameStateSlice.actions.setGameState(newGameState))
}