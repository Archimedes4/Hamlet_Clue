import { auth } from "../app/_layout";
import { gameStateSlice } from "../redux/reducers/gameStateReducer";
import store from "../redux/store";

export default function setPlayerSelection(selection: players) {
  const uid = auth.currentUser?.uid
  if (uid !== undefined) {
    const state = store.getState().gameState
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
    if (selection === "Hamlet" && (state.hamlet.id === "" || state.hamlet.id === uid)) {
      newGameState.hamlet = {
        id: uid,
        pos: state.hamlet.pos,
        cards: state.hamlet.cards,
        guesses: state.hamlet.guesses,
        accused: state.hamlet.accused
      }
      if (newGameState.claudius.id === uid) {
        newGameState.claudius = {
          id: "",
          pos: state.claudius.pos,
          cards: state.claudius.cards,
          guesses: state.claudius.guesses,
          accused: state.claudius.accused
        }
      }
      if (newGameState.polonius.id === uid) {
        newGameState.polonius = {
          id: "",
          pos: state.polonius.pos,
          cards: state.polonius.cards,
          guesses: state.polonius.guesses,
          accused: state.polonius.accused
        }
      }
      if (newGameState.gertrude.id === uid) {
        newGameState.gertrude = {
          id: "",
          pos: state.gertrude.pos,
          cards: state.gertrude.cards,
          guesses: state.gertrude.guesses,
          accused: state.gertrude.accused
        }
      }
    } else if (selection === "Claudius" && (state.claudius.id === "" || state.claudius.id === uid)) {
      if (newGameState.hamlet.id === uid) {
        newGameState.hamlet = {
          id: "",
          pos: state.hamlet.pos,
          cards: state.hamlet.cards,
          guesses: state.hamlet.guesses,
          accused: state.hamlet.accused
        }
      }
      newGameState.claudius = {
        id: uid,
        pos: state.claudius.pos,
        cards: state.claudius.cards,
        guesses: state.claudius.guesses,
        accused: state.claudius.accused
      }
      if (newGameState.polonius.id === uid) {
        newGameState.polonius = {
          id: "",
          pos: state.polonius.pos,
          cards: state.polonius.cards,
          guesses: state.polonius.guesses,
          accused: state.polonius.accused
        }
      }
      if (newGameState.gertrude.id === uid) {
        newGameState.gertrude = {
          id: "",
          pos: state.gertrude.pos,
          cards: state.gertrude.cards,
          guesses: state.gertrude.guesses,
          accused: state.gertrude.accused
        }
      }
    } else if (selection === "Polonius" && (state.polonius.id === "" || state.polonius.id === uid)) {
      if (newGameState.hamlet.id === uid) {
        newGameState.hamlet = {
          id: "",
          pos: state.hamlet.pos,
          cards: state.hamlet.cards,
          guesses: state.hamlet.guesses,
          accused: state.hamlet.accused
        }
      }
      if (newGameState.claudius.id === uid) {
        newGameState.claudius = {
          id: "",
          pos: state.claudius.pos,
          cards: state.claudius.cards,
          guesses: state.claudius.guesses,
          accused: state.claudius.accused
        }
      }
      newGameState.polonius = {
        id: uid,
        pos: state.polonius.pos,
        cards: state.polonius.cards,
        guesses: state.polonius.guesses,
        accused: state.polonius.accused
      }
      if (newGameState.claudius.id === uid) {
        newGameState.gertrude = {
          id: "",
          pos: state.gertrude.pos,
          cards: state.gertrude.cards,
          guesses: state.gertrude.guesses,
          accused: state.gertrude.accused
        }
      }
    } else if (selection === "Gertrude" && (state.gertrude.id === "" || state.gertrude.id === uid)) {
      if (newGameState.hamlet.id === uid) {
        newGameState.hamlet = {
          id: "",
          pos: state.hamlet.pos,
          cards: state.hamlet.cards,
          guesses: state.hamlet.guesses,
          accused: state.hamlet.accused
        }
      }
      if (newGameState.claudius.id === uid) {
        newGameState.claudius = {
          id: "",
          pos: state.claudius.pos,
          cards: state.claudius.cards,
          guesses: state.claudius.guesses,
          accused: state.claudius.accused
        }
      }
      if (newGameState.polonius.id === uid) {
        newGameState.polonius = {
          id: "",
          pos: state.polonius.pos,
          cards: state.polonius.cards,
          guesses: state.polonius.guesses,
          accused: state.polonius.accused
        }
      }
      newGameState.gertrude = {
        id: uid,
        pos: state.gertrude.pos,
        cards: state.gertrude.cards,
        guesses: state.gertrude.guesses,
        accused: state.gertrude.accused
      }
    }
    store.dispatch(gameStateSlice.actions.setGameState(newGameState))
  }
}