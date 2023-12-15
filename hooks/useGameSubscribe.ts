import { set } from 'firebase/database';
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../app/_layout";
import store, { RootState } from "../redux/store";
import { gameStateSlice } from "../redux/reducers/gameStateReducer";
import getGame from "../util/getGame";
import { useSelector } from "react-redux";

export default function useGameSubscribe(id: string) {
  const gameState = useSelector((state: RootState) => state.gameState);
  const [mounted, setMounted] = useState<boolean>(false)
  const [updating, setUpdating] = useState<Date>(new Date())
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
            bannedPlayers: doc.data().bannedPlayers
          }
          console.log(gameState)
          store.dispatch(gameStateSlice.actions.updateGameState(gameState)) 
        }
      });
      return unsub
    }
  }, [id])
  // useEffect(() => {
  //   console.log(gameState)
  //   if (mounted) {
  //     if ((new Date().getTime() - updating.getTime()) >= 300) {
  //       updateGame()
  //     }
  //   } else {
  //     setMounted(true)
  //   }
  // }, [gameState])
  return null
}