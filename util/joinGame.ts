import { doc, getDoc, updateDoc } from "firebase/firestore"
import { auth, db } from "../app/_layout"
import store from "../redux/store"
import { joinStateType } from "../app/(auth)"
import { router } from "expo-router"
import { createUUID } from "./util"

export default async function joinGame(gameId: string) {
  const uid = auth.currentUser?.uid
  const username = store.getState().username
  if (uid !== undefined) {
    try {
      const game = await getDoc(doc(db, "Games", gameId))
      const userAccount = await getDoc(doc(db, "Users", uid))
      if (game.exists() && userAccount.exists()) {
        let userGames: string[] = userAccount.data().games
        let players: userType[] = game.data().players
        if (players.some((e) => {return e.id === uid})) {
          router.push(`/game/${gameId}`)
        } else {
          if (players.length >= 4) {
            //Game full
            return joinStateType.gameFull
          } else {
            userGames.push(gameId)
            players.push({
              id: uid,
              username: username
            })
            await updateDoc(doc(db, "Games", gameId), {
              players: players,
              changeKey: createUUID()
            })
            await updateDoc(doc(db, "Users", uid), {
              games: userGames
            })
            router.push(`/game/${gameId}`)
          }
        }
      } else {
        return joinStateType.notExist
      }
    } catch {
      return joinStateType.failed
    }
  } else {
    return joinStateType.failed
  }
}