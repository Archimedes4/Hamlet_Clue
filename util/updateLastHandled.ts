import { auth } from "../app/_layout";
import { gameStateSlice } from "../redux/reducers/gameStateReducer";
import store from "../redux/store";

export default function updateLastHandled() {
  const uid = auth.currentUser?.uid
  if (uid) {
    const state = store.getState().gameState
    if (state.hamlet.user.id === uid) {
      const newPlayer: playerInfo = {
        user: state.hamlet.user,
        pos: state.hamlet.pos,
        cards: state.hamlet.cards,
        guesses: state.hamlet.guesses,
        accused: state.hamlet.accused,
        notes: state.hamlet.notes,
        lastDismissed: state.promt.time
      }
      store.dispatch(gameStateSlice.actions.setHamlet(newPlayer))
    } else if (state.claudius.user.id === uid) {
      const newPlayer: playerInfo = {
        user: state.hamlet.user,
        pos: state.hamlet.pos,
        cards: state.hamlet.cards,
        guesses: state.hamlet.guesses,
        accused: state.hamlet.accused,
        notes: state.hamlet.notes,
        lastDismissed: state.promt.time
      }
      store.dispatch(gameStateSlice.actions.setClaudius(newPlayer))
    } else if (state.polonius.user.id === uid) {
      const newPlayer: playerInfo = {
        user: state.hamlet.user,
        pos: state.hamlet.pos,
        cards: state.hamlet.cards,
        guesses: state.hamlet.guesses,
        accused: state.hamlet.accused,
        notes: state.hamlet.notes,
        lastDismissed: state.promt.time
      }
      store.dispatch(gameStateSlice.actions.setPolonius(newPlayer))
    } else if (state.gertrude.user.id === uid) {
      const newPlayer: playerInfo = {
        user: state.hamlet.user,
        pos: state.hamlet.pos,
        cards: state.hamlet.cards,
        guesses: state.hamlet.guesses,
        accused: state.hamlet.accused,
        notes: state.hamlet.notes,
        lastDismissed: state.promt.time
      }
      store.dispatch(gameStateSlice.actions.setGertude(newPlayer))
    }
  }
}