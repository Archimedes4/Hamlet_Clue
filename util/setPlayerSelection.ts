import { auth } from "../app/_layout";
import { gameStateSlice } from "../redux/reducers/gameStateReducer";
import store from "../redux/store";

export default function setPlayerSelection(selection: players) {
  const uid = auth.currentUser?.uid
  if (uid !== undefined) {
    const username = store.getState().username
    const state = store.getState().gameState
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
      winner: state.winner
    }
    if (selection === "Hamlet" && (state.hamlet.user.id === "" || state.hamlet.user.id === uid)) {
      newGameState.hamlet = {
        user: {
          id: uid,
          username: username
        },
        pos: state.hamlet.pos,
        cards: state.hamlet.cards,
        guesses: state.hamlet.guesses,
        accused: state.hamlet.accused,
        notes: state.hamlet.notes
      }
      if (newGameState.claudius.user.id === uid) {
        newGameState.claudius = {
          user: {
            id: '',
            username: ''
          },
          pos: state.claudius.pos,
          cards: state.claudius.cards,
          guesses: state.claudius.guesses,
          accused: state.claudius.accused,
          notes: state.claudius.notes
        }
      }
      if (newGameState.polonius.user.id === uid) {
        newGameState.polonius = {
          user: {
            id: '',
            username: ''
          },
          pos: state.polonius.pos,
          cards: state.polonius.cards,
          guesses: state.polonius.guesses,
          accused: state.polonius.accused,
          notes: state.polonius.notes
        }
      }
      if (newGameState.gertrude.user.id === uid) {
        newGameState.gertrude = {
          user: {
            id: '',
            username: ''
          },
          pos: state.gertrude.pos,
          cards: state.gertrude.cards,
          guesses: state.gertrude.guesses,
          accused: state.gertrude.accused,
          notes: state.gertrude.notes
        }
      }
    } else if (selection === "Claudius" && (state.claudius.user.id === "" || state.claudius.user.id === uid)) {
      if (newGameState.hamlet.user.id === uid) {
        newGameState.hamlet = {
          user: {
            id: '',
            username: ''
          },
          pos: state.hamlet.pos,
          cards: state.hamlet.cards,
          guesses: state.hamlet.guesses,
          accused: state.hamlet.accused,
          notes: state.hamlet.notes
        }
      }
      newGameState.claudius = {
        user: {
          id: uid,
          username: username
        },
        pos: state.claudius.pos,
        cards: state.claudius.cards,
        guesses: state.claudius.guesses,
        accused: state.claudius.accused,
        notes: state.claudius.notes
      }
      if (newGameState.polonius.user.id === uid) {
        newGameState.polonius = {
          user: {
            id: '',
            username: ''
          },
          pos: state.polonius.pos,
          cards: state.polonius.cards,
          guesses: state.polonius.guesses,
          accused: state.polonius.accused,
          notes: state.polonius.notes
        }
      }
      if (newGameState.gertrude.user.id === uid) {
        newGameState.gertrude = {
          user: {
            id: '',
            username: ''
          },
          pos: state.gertrude.pos,
          cards: state.gertrude.cards,
          guesses: state.gertrude.guesses,
          accused: state.gertrude.accused,
          notes: state.gertrude.notes
        }
      }
    } else if (selection === "Polonius" && (state.polonius.user.id === "" || state.polonius.user.id === uid)) {
      if (newGameState.hamlet.user.id === uid) {
        newGameState.hamlet = {
          user: {
            id: '',
            username: ''
          },
          pos: state.hamlet.pos,
          cards: state.hamlet.cards,
          guesses: state.hamlet.guesses,
          accused: state.hamlet.accused,
          notes: state.hamlet.notes
        }
      }
      if (newGameState.claudius.user.id === uid) {
        newGameState.claudius = {
          user: {
            id: '',
            username: ''
          },
          pos: state.claudius.pos,
          cards: state.claudius.cards,
          guesses: state.claudius.guesses,
          accused: state.claudius.accused,
          notes: state.claudius.notes
        }
      }
      newGameState.polonius = {
        user: {
          id: uid,
          username: username
        },
        pos: state.polonius.pos,
        cards: state.polonius.cards,
        guesses: state.polonius.guesses,
        accused: state.polonius.accused,
        notes: state.polonius.notes
      }
      if (newGameState.gertrude.user.id === uid) {
        newGameState.gertrude = {
          user: {
            id: '',
            username: ''
          },
          pos: state.gertrude.pos,
          cards: state.gertrude.cards,
          guesses: state.gertrude.guesses,
          accused: state.gertrude.accused,
          notes: state.gertrude.notes
        }
      }
    } else if (selection === "Gertrude" && (state.gertrude.user.id === "" || state.gertrude.user.id === uid)) {
      if (newGameState.hamlet.user.id === uid) {
        newGameState.hamlet = {
          user: {
            id: '',
            username: ''
          },
          pos: state.hamlet.pos,
          cards: state.hamlet.cards,
          guesses: state.hamlet.guesses,
          accused: state.hamlet.accused,
          notes: state.hamlet.notes
        }
      }
      if (newGameState.claudius.user.id === uid) {
        newGameState.claudius = {
          user: {
            id: '',
            username: ''
          },
          pos: state.claudius.pos,
          cards: state.claudius.cards,
          guesses: state.claudius.guesses,
          accused: state.claudius.accused,
          notes: state.claudius.notes
        }
      }
      if (newGameState.polonius.user.id === uid) {
        newGameState.polonius = {
          user: {
            id: '',
            username: ''
          },
          pos: state.polonius.pos,
          cards: state.polonius.cards,
          guesses: state.polonius.guesses,
          accused: state.polonius.accused,
          notes: state.polonius.notes
        }
      }
      newGameState.gertrude = {
        user: {
          id: uid,
          username: username
        },
        pos: state.gertrude.pos,
        cards: state.gertrude.cards,
        guesses: state.gertrude.guesses,
        accused: state.gertrude.accused,
        notes: state.gertrude.notes
      }
    }
    store.dispatch(gameStateSlice.actions.setGameState(newGameState))
  }
}