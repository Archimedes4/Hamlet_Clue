import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../app/_layout";
import store from "../redux/store";
import { loadingStateEnum } from "../constants/PiecesLocations";

export default async function leaveGame(gameId: string): Promise<loadingStateEnum> {
  const uid = auth.currentUser?.uid
  const gameState = store.getState().gameState
  if (uid) {
    try {
      const gameRef = doc(db, "Games", gameId)
      let newPlayers = [...gameState.players]
      newPlayers.filter((e) => {return e.id !== uid})
      if (gameState.hamlet.user.id === uid) {
        let playerData: playerInfo = {
          user: {
            id: "",
            username: ""
          },
          pos: gameState.hamlet.pos,
          cards: gameState.hamlet.cards,
          guesses:gameState.hamlet.guesses,
          accused: gameState.hamlet.accused,
          notes: gameState.hamlet.notes,
          lastDismissed: gameState.hamlet.lastDismissed
        }
        await updateDoc(gameRef, {
          players: newPlayers,
          hamlet: playerData
        })
      }
      if (gameState.claudius.user.id === uid) {
        let playerData: playerInfo = {
          user: {
            id: "",
            username: ""
          },
          pos: gameState.claudius.pos,
          cards: gameState.claudius.cards,
          guesses:gameState.claudius.guesses,
          accused: gameState.claudius.accused,
          notes: gameState.claudius.notes,
          lastDismissed: gameState.claudius.lastDismissed
        }
        await updateDoc(gameRef, {
          players: newPlayers,
          claudius: playerData
        })
      }
      if (gameState.polonius.user.id === uid) {
        let playerData: playerInfo = {
          user: {
            id: "",
            username: ""
          },
          pos: gameState.polonius.pos,
          cards: gameState.polonius.cards,
          guesses:gameState.polonius.guesses,
          accused: gameState.polonius.accused,
          notes: gameState.polonius.notes,
          lastDismissed: gameState.polonius.lastDismissed
        }
        await updateDoc(gameRef, {
          players: newPlayers,
          polonius: playerData
        })
      }
      if (gameState.gertrude.user.id === uid) {
        let playerData: playerInfo = {
          user: {
            id: "",
            username: ""
          },
          pos: gameState.gertrude.pos,
          cards: gameState.gertrude.cards,
          guesses:gameState.gertrude.guesses,
          accused: gameState.gertrude.accused,
          notes: gameState.gertrude.notes,
          lastDismissed: gameState.gertrude.lastDismissed
        }
        await updateDoc(gameRef, {
          players: newPlayers,
          hamlet: playerData
        })
      }
      return loadingStateEnum.success
    } catch {
      return loadingStateEnum.failed
    }
  } else {
    return loadingStateEnum.failed
  }
}