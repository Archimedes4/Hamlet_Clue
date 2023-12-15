import { doc, getDoc, updateDoc } from "firebase/firestore";
import store from "../redux/store";
import { auth, db } from "../app/_layout";
import { gameStateSlice } from "../redux/reducers/gameStateReducer";

export default async function getGame(id: string): Promise<string> {
  const game = await getDoc(doc(db, "Games", id))
  if (game.exists()) {
    const gameState: gameState = {
      gameId: game.data().gameId,
      master: game.data().master,
      hamlet: game.data().hamlet,
      claudius: game.data().claudius,
      polonius: game.data().polonius,
      gertrude: game.data().gertrude,
      turn: game.data().turn,
      dieOne: game.data().dieOne,
      dieTwo: game.data().dieTwo,
      players: game.data().players,
      history: game.data().history,
      dieCount: game.data().dieCount,
      orderOfPlay: game.data().orderOfPlay,
      answer: game.data().answer,
      promt: game.data().promt,
      gameOver: game.data().gameOver,
      winner: game.data().winner,
      bannedPlayers: game.data().bannedPlayers,
      changeKey: game.data().changeKey
    }
    if (store.getState().gameState.changeKey !== game.data().changeKey) {
      store.dispatch(gameStateSlice.actions.setGameState(gameState)) 
    }
  }
  return store.getState().gameState.changeKey
}

export async function checkIfGameExists(id: string): Promise<boolean> {
  const result = await getDoc(doc(db, "Games", id))
  return result.exists()
}


//Returns true if game full
export async function checkIfGameFull(id: string): Promise<boolean> {
  const uid = auth.currentUser?.uid
  if (uid) {
    const game = await getDoc(doc(db, "Games", id))
    if (game.exists()) {
      let players: userType[] = game.data().players
      if (players.some((e) => {return e.id == uid})) {
        return false
      } else {
        if (players.length >= 4) {
          //Game full
          return true
        } else {
          return false
        }
      }
    } else {
      return true
    }
  } else {
    return true
  }
}

export async function updateGame() {
  await updateDoc(doc(db, "Games", store.getState().gameState.gameId), store.getState().gameState);
}

export async function checkIfBanned(id: string) {
  const uid = auth.currentUser?.uid
  if (uid) {
    const game = await getDoc(doc(db, "Games", id))
    if (game.exists()) {
      let players: string[] = game.data().bannedPlayers
      if (players.includes(id)) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  } else {
    return true
  }
}