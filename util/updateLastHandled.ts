import { auth } from "../app/_layout";
import store from "../redux/store";
import updateGame from "./updateGame";

export default function updateLastHandled() {
  const uid = auth.currentUser?.uid
  if (uid) {
    const state = store.getState().gameState
    if (state.hamlet.user.id === uid) {
      updateGame({
        hamlet: {
          user: state.hamlet.user,
          pos: state.hamlet.pos,
          cards: state.hamlet.cards,
          guesses: state.hamlet.guesses,
          accused: state.hamlet.accused,
          notes: state.hamlet.notes,
          lastDismissed: state.promt.time
        }
      })
    } else if (state.claudius.user.id === uid) {
      updateGame({
        claudius: {
          user: state.claudius.user,
          pos: state.claudius.pos,
          cards: state.claudius.cards,
          guesses: state.claudius.guesses,
          accused: state.claudius.accused,
          notes: state.claudius.notes,
          lastDismissed: state.promt.time
        }
      })
    } else if (state.polonius.user.id === uid) {
      updateGame({
        polonius: {
          user: state.polonius.user,
          pos: state.polonius.pos,
          cards: state.polonius.cards,
          guesses: state.polonius.guesses,
          accused: state.polonius.accused,
          notes: state.polonius.notes,
          lastDismissed: state.promt.time
        }
      })
    } else if (state.gertrude.user.id === uid) {
      updateGame({
        gertrude: {
          user: state.gertrude.user,
          pos: state.gertrude.pos,
          cards: state.gertrude.cards,
          guesses: state.gertrude.guesses,
          accused: state.gertrude.accused,
          notes: state.gertrude.notes,
          lastDismissed: state.promt.time
        }
      })
    }
  }
}