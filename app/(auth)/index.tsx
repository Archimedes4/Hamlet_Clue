import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { router } from 'expo-router';
import { logOut } from '../../util/authentication';
import { loadingStateEnum } from '../../constants/PiecesLocations';
import createGame from '../../util/createGame';
import { auth } from '../_layout';
import store from '../../redux/store';
import { gameStateSlice } from '../../redux/reducers/gameStateReducer';

export default function index() {
  const [gameId, setGameId] = useState<string>();
  const [singOutState, setSignOutState] = useState<loadingStateEnum>(loadingStateEnum.notStarted);
  async function signOut() {
    setSignOutState(loadingStateEnum.loading)
    const result = await logOut()
    setSignOutState(result)
  }
  async function TEMPCODE() {
    console.log("HERE")
    const uid = auth.currentUser?.uid
    if (uid) {
      console.log("HERE One")
      const game = createGame(uid)
      console.log("HERE Two")
      store.dispatch(gameStateSlice.actions.setGameState(game))
      console.log("HERE Three")
      router.push("/game/232564")
    } else {
      console.log('NO UID')
    }
  }
  return (
    <View>
      <TextInput />
      <Pressable onPress={() => {TEMPCODE()}}>
        <Text>Create Game</Text>
      </Pressable>
      <Pressable onPress={() => signOut()}>
        <Text>Sign Out</Text>
      </Pressable>
    </View>
  )
}