import { View, Text, Pressable, NativeSyntheticEvent, TextInputKeyPressEventData, ActivityIndicator } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
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
import DefaultButton from '../../components/DefaultButton';
import { checkIfGameExists, checkIfGameFull } from '../../util/getGame';
import joinGame from '../../util/joinGame';

export enum joinStateType {
  exists,
  invalid,
  loading,
  notExist,
  gameFull,
  failed,
  rejoin
}

function getJoinText(state: joinStateType): string | undefined {
  if (state === joinStateType.exists) {
    return "Join"
  }
  if (state === joinStateType.invalid) {
    return "Invalid Game Id!"
  }
  if (state === joinStateType.loading) {
    return undefined
  }
  if (state === joinStateType.notExist) {
    return "The Game Does Not Exist"
  }
  if (state === joinStateType.gameFull) {
    return "The Game is Full"
  }
  if (state === joinStateType.failed) {
    return "Failed"
  }
}

export default function index() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const [gameId, setGameId] = useState<string>("");
  const [signOutState, setSignOutState] = useState<loadingStateEnum>(loadingStateEnum.notStarted);
  const [createGameState, setCreateGameState] = useState<loadingStateEnum>(loadingStateEnum.notStarted)
  const [joinState, setJoinState] = useState<joinStateType>(joinStateType.invalid);
  const textRef = useRef<TextInput>(null);

  async function updateJoinStatus(id: string) {
    if (id.length === 6) {
      setJoinState(joinStateType.loading)
      const result = await checkIfGameExists(id)
      if (result) {
        const fullResult = await checkIfGameFull(id)
        if (fullResult) {
          setJoinState(joinStateType.gameFull)
        } else {
          setJoinState(joinStateType.exists)
        }
      } else {
        setJoinState(joinStateType.notExist)
      }
    } else {
      setJoinState(joinStateType.invalid)
    }
  }

  function handleKeyPress(e: NativeSyntheticEvent<TextInputKeyPressEventData>) {
    if (e.nativeEvent.key === "0" || e.nativeEvent.key === "1" || e.nativeEvent.key === "2" || e.nativeEvent.key === "3" || e.nativeEvent.key === "4" || e.nativeEvent.key === "5" || e.nativeEvent.key === "6" || e.nativeEvent.key === "7" || e.nativeEvent.key === "8" || e.nativeEvent.key === "9") {
      if ((gameId + ' ').length > 6) {
        setGameId(gameId.substring(1) + e.nativeEvent.key)
        updateJoinStatus(gameId.substring(1) + e.nativeEvent.key)
      } else {
        setGameId(gameId + e.nativeEvent.key)
        updateJoinStatus(gameId + e.nativeEvent.key)
      }
    } else if (e.nativeEvent.key === "Backspace") {
      setGameId(gameId.slice(0, -1))
    }
  }

  async function signOut() {
    setSignOutState(loadingStateEnum.loading)
    const result = await logOut()
    setSignOutState(result)
  }

  async function loadCreateGame() {
    setCreateGameState(loadingStateEnum.loading)
    const uid = auth.currentUser?.uid
    if (uid) {
      const game = await createGame(uid)
      if (game.result === loadingStateEnum.success) {
        store.dispatch(gameStateSlice.actions.setGameState(game.game))
        setCreateGameState(loadingStateEnum.success)
        router.push(`/game/${game.game.gameId}`)
      } else {
        setCreateGameState(loadingStateEnum.failed)
      }
    } else {
      setCreateGameState(loadingStateEnum.failed)
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
    <ScrollView style={{width, height, backgroundColor: Colors.main}} onLayout={onLayoutRootView}>
      <TextInput ref={textRef} onKeyPress={(e) => {console.log(e); handleKeyPress(e)}} style={{position: 'absolute', opacity: 0}}/>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontFamily: 'RubikBubbles-Regular', color: "#AB2330", fontSize: height * 0.1, marginTop: 20, marginLeft: 20}}>Hamlet Clue</Text>
        <MagnifyingGlass height={height * 0.1} width={height * 0.1} style={{marginTop: 25, marginLeft: 20}}/>
      </View>
      <View style={{flexDirection: 'row', width: width * 0.9, marginLeft: 'auto', marginRight: 'auto', marginTop: height * 0.025}}>
        <Pressable onPress={() => {textRef.current?.focus()}} style={{width: width * 0.125, height: height * 0.215, borderWidth: 2, borderColor: 'black', borderRadius: 15, backgroundColor: "white", marginLeft: 'auto', marginRight: 'auto'}}>
          <Text style={{margin: 'auto', fontSize: height * 0.15}}>{gameId[0]}</Text>
        </Pressable>
        <Pressable onPress={() => {textRef.current?.focus()}} style={{width: width * 0.125, height: height * 0.215, borderWidth: 2, borderColor: 'black', borderRadius: 15, backgroundColor: "white", marginLeft: 'auto', marginRight: 'auto'}}>
          <Text style={{margin: 'auto', fontSize: height * 0.15}}>{gameId[1]}</Text> 
        </Pressable>
        <Pressable onPress={() => {textRef.current?.focus()}} style={{width: width * 0.125, height: height * 0.215, borderWidth: 2, borderColor: 'black', borderRadius: 15, backgroundColor: "white", marginLeft: 'auto', marginRight: 'auto'}}>
          <Text style={{margin: 'auto', fontSize: height * 0.15}}>{gameId[2]}</Text> 
        </Pressable>
        <Pressable onPress={() => {textRef.current?.focus()}} style={{width: width * 0.125, height: height * 0.215, borderWidth: 2, borderColor: 'black', borderRadius: 15, backgroundColor: "white", marginLeft: 'auto', marginRight: 'auto'}}>
          <Text style={{margin: 'auto', fontSize: height * 0.15}}>{gameId[3]}</Text> 
        </Pressable>
        <Pressable onPress={() => {textRef.current?.focus()}} style={{width: width * 0.125, height: height * 0.215, borderWidth: 2, borderColor: 'black', borderRadius: 15, backgroundColor: "white", marginLeft: 'auto', marginRight: 'auto'}}>
          <Text style={{margin: 'auto', fontSize: height * 0.15}}>{gameId[4]}</Text> 
        </Pressable>
        <Pressable onPress={() => {textRef.current?.focus()}} style={{width: width * 0.125, height: height * 0.215, borderWidth: 2, borderColor: 'black', borderRadius: 15, backgroundColor: "white", marginLeft: 'auto', marginRight: 'auto'}}>
          <Text style={{margin: 'auto', fontSize: height * 0.15}}>{gameId[5]}</Text>
        </Pressable>
      </View>
      <DefaultButton style={{width: width * 0.8, marginLeft: 'auto', marginRight: 'auto', marginTop: height * 0.04}} onPress={() => {
        if (joinState === joinStateType.exists || joinState == joinStateType.rejoin) {joinGame(gameId)} 
      }} text={getJoinText(joinState)}>
         { (joinState === joinStateType.loading) ?
          <ActivityIndicator color={'white'} style={{marginTop: 'auto', marginBottom: 'auto'}}/>:null
        }
      </DefaultButton>
      <DefaultButton style={{width: width * 0.8, marginLeft: 'auto', marginRight: 'auto', marginTop: height * 0.04}} onPress={() => loadCreateGame()} text='Create Game'/>
      <DefaultButton style={{width: width * 0.8, marginLeft: 'auto', marginRight: 'auto', marginTop: height * 0.04}} onPress={() => router.push('/account')} text='View Account and Game History'/>
      <DefaultButton style={{width: width * 0.8, marginLeft: 'auto', marginRight: 'auto', marginTop: height * 0.04}} onPress={() => signOut()} text='Sign Out'/>
      <Text style={{color: 'white', position: 'absolute', bottom: 0, fontSize: 11}}>2023 Andrew Mainella Diego Bueti</Text>
    </ScrollView>
  )
}