import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../app/_layout";
import store, { RootState } from "../redux/store";
import { gameStateSlice } from "../redux/reducers/gameStateReducer";
import getGame, { updateGame } from "../util/getGame";
import { useSelector } from "react-redux";

export default function useGameSubscribe(id: string) {
  const gameState = useSelector((state: RootState) => state.gameState);
  const [mounted, setMounted] = useState<boolean>(false)
  async function loadGetGame(id: string) {
    await getGame(id)
  }
  useEffect(() => {
    if (id !== "") {
      loadGetGame(id)
      const unsub = onSnapshot(doc(db, "Games", id), (doc) => {
        if (doc.exists()) {
          const gameState: gameState = {
            gameId: doc.data().gameId,
            master: doc.data().master,
            hamlet: doc.data().hamlet,
            claudius: doc.data().claudius,
            polonius: doc.data().polonius,
            gertrude: doc.data().gertrude,
            turn: doc.data().turn,
            dieOne: doc.data().dieOne,
            dieTwo: doc.data().dieTwo,
            players: doc.data().players,
            history: doc.data().history,
            dieCount: doc.data().dieCount,
            orderOfPlay: doc.data().orderOfPlay,
            answer: doc.data().answer,
            promt: doc.data().promt,
            gameOver: doc.data().gameOver,
            winner: doc.data().winner,
            changeKey: '',
            bannedPlayers: doc.data().bannedPlayers
          }
          store.dispatch(gameStateSlice.actions.updateGameState(gameState)) 
      
        }
      });
      return unsub
    }
  }, [id])
  useEffect(() => {
    if (mounted) {
      const uid = auth.currentUser?.uid
      if (uid === gameState.master && gameState.turn === "Selecting") {
        if (gameState.hamlet.pos !== "" && gameState.claudius.pos !== "" && gameState.polonius.pos !== "" && gameState.gertrude.pos !== "") {
          store.dispatch(gameStateSlice.actions.setTurn(gameState.orderOfPlay[0]))
        }
      }
      updateGame() 
    } else {
      setMounted(true)
    }
  }, [gameState])
  return null
}