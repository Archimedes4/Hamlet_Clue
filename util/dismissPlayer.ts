import { doc, getDoc, updateDoc } from "firebase/firestore"
import { auth, db } from "../app/_layout"
import { loadingStateEnum } from "../constants/PiecesLocations"
import store from "../redux/store"
import { gameStateSlice } from "../redux/reducers/gameStateReducer"
import { createUUID } from "./util"

export async function kickPlayer(playerId: string, gameId: string) {
  try {
    const game = await getDoc(doc(db, "Games", gameId))
    const userAccount = await getDoc(doc(db, "Users", playerId))
    if (game.exists() && userAccount.exists()) {
      let userGames: string[] = userAccount.data().games
      let players: userType[] = game.data().players
      players = players.filter((e) => {return e.id !== playerId})
      userGames = userGames.filter((e) => {return e !== gameId})
      await updateDoc(doc(db, "Games", gameId), {
        players: players
      })
      await updateDoc(doc(db, "Users", playerId), {
        games: userGames
      })
      return loadingStateEnum.success
    } else {
      return loadingStateEnum.failed
    }
  } catch {
    return loadingStateEnum.failed
  }
}

export async function banPlayer(playerId: string, gameId: string) {
  try {
    const game = await getDoc(doc(db, "Games", gameId))
    const userAccount = await getDoc(doc(db, "Users", playerId))
    if (game.exists() && userAccount.exists()) {
      let userGames: string[] = userAccount.data().games
      let players: userType[] = game.data().players
      players = players.filter((e) => {return e.id !== playerId})
      userGames = userGames.filter((e) => {return e !== gameId})
      
      const changeKey = createUUID()

      let newBandedPlayers = [...store.getState().gameState.bannedPlayers]
      newBandedPlayers = newBandedPlayers.filter((e) => {return e !== playerId});
      store.dispatch(gameStateSlice.actions.setBannedPlayers({ban: newBandedPlayers, key: changeKey}))

      //updateGame
      await updateDoc(doc(db, "Games", gameId), {
        players: players
      })
      await updateDoc(doc(db, "Users", playerId), {
        games: userGames,
        bannedPlayers: newBandedPlayers,
        changeKey: changeKey
      })
      return loadingStateEnum.success
    } else {
      return loadingStateEnum.failed
    }
  } catch {
    return loadingStateEnum.failed
  }
}

export async function unBanPlayer(playerId: string) {
  let newBandedPlayers = [...store.getState().gameState.bannedPlayers]
  newBandedPlayers = newBandedPlayers.filter((e) => {return e !== playerId});
  store.dispatch(gameStateSlice.actions.setBannedPlayers({ban: newBandedPlayers, key: createUUID()}))
}