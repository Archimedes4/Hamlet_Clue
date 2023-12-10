import { View, Text, Pressable } from 'react-native'
import React, { useCallback, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { router } from 'expo-router';
import { logOut } from '../../util/authentication';
import { loadingStateEnum } from '../../constants/PiecesLocations';
import createGame from '../../util/createGame';
import { auth } from '../_layout';
import store, { RootState } from '../../redux/store';
import { gameStateSlice } from '../../redux/reducers/gameStateReducer';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { MagnifyingGlass } from '../../components/Icons';

export default function index() {
  const [gameId, setGameId] = useState<string>("");
  const [signOutState, setSignOutState] = useState<loadingStateEnum>(loadingStateEnum.notStarted);
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  async function signOut() {
    setSignOutState(loadingStateEnum.loading)
    const result = await logOut()
    setSignOutState(result)
  }
  //TODO fix this
  async function TEMPCODE() {
    console.log("HERE")
    const uid = auth.currentUser?.uid
    if (uid) {
      const game = createGame(uid)
      store.dispatch(gameStateSlice.actions.setGameState(game))
      router.push(`/game/${game.gameId}`)
    } else {
      console.log('NO UID')
    }
  }
  
  const [fontsLoaded, fontError] = useFonts({
    'RubikBubbles-Regular': require("../../assets/fonts/RubikBubbles-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={{width, height, backgroundColor: Colors.main}} onLayout={onLayoutRootView}>
      <TextInput style={{position: 'absolute', opacity: 0}}/>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontFamily: 'RubikBubbles-Regular', color: "#AB2330", fontSize: height * 0.1, marginTop: 20, marginLeft: 20}}>Hamlet Clue</Text>
        <MagnifyingGlass height={height * 0.1} width={height * 0.1} style={{marginTop: 25, marginLeft: 20}}/>
      </View>
      <View style={{flexDirection: 'row', width: width * 0.9, marginLeft: 'auto', marginRight: 'auto', marginTop: height * 0.025}}>
        <Pressable style={{width: width * 0.125, height: height * 0.215, borderWidth: 2, borderColor: 'black', borderRadius: 15, backgroundColor: "white", marginLeft: 'auto', marginRight: 'auto'}}>
          {gameId[0]} 
        </Pressable>
        <Pressable style={{width: width * 0.125, height: height * 0.215, borderWidth: 2, borderColor: 'black', borderRadius: 15, backgroundColor: "white", marginLeft: 'auto', marginRight: 'auto'}}>
          {gameId[0]} 
        </Pressable>
        <Pressable style={{width: width * 0.125, height: height * 0.215, borderWidth: 2, borderColor: 'black', borderRadius: 15, backgroundColor: "white", marginLeft: 'auto', marginRight: 'auto'}}>
          {gameId[0]} 
        </Pressable>
        <Pressable style={{width: width * 0.125, height: height * 0.215, borderWidth: 2, borderColor: 'black', borderRadius: 15, backgroundColor: "white", marginLeft: 'auto', marginRight: 'auto'}}>
          {gameId[0]} 
        </Pressable>
        <Pressable style={{width: width * 0.125, height: height * 0.215, borderWidth: 2, borderColor: 'black', borderRadius: 15, backgroundColor: "white", marginLeft: 'auto', marginRight: 'auto'}}>
          {gameId[0]} 
        </Pressable>
        <Pressable style={{width: width * 0.125, height: height * 0.215, borderWidth: 2, borderColor: 'black', borderRadius: 15, backgroundColor: "white", marginLeft: 'auto', marginRight: 'auto'}}>
          {gameId[0]} 
        </Pressable>
      </View>
      <Pressable>
        <Text style={{padding: 10}}>Join</Text>
      </Pressable>
      <Pressable style={{padding: 10}} onPress={() => {TEMPCODE()}}>
        <Text>Create Game</Text>
      </Pressable>
      <Pressable onPress={() => signOut()}>
        <Text style={{padding: 10}}>Sign Out</Text>
      </Pressable>
      <Text style={{color: 'white', position: 'absolute', bottom: 0, fontSize: 11}}>2023 Andrew Mainella Deigo Bueti</Text>
    </View>
  )
}