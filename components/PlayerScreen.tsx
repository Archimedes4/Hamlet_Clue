import { View, Text, Pressable, FlatList } from 'react-native'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import store, { RootState } from '../redux/store';
import { screensSlice } from '../redux/reducers/screensReducer';
import setPlayerSelection from '../util/setPlayerSelection';
import { Claudius, CopiedIcon, CopyIcon, Gertrude, Hamlet, Polonius } from './Icons';
import Colors from '../constants/Colors';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { ScrollView } from 'react-native-gesture-handler';
import DefaultButton from './DefaultButton';
import { router } from 'expo-router';
import { auth } from '../app/_layout';
import * as Clipboard from 'expo-clipboard';
import leaveGame from '../util/leaveGame';
import { loadingStateEnum } from '../constants/PiecesLocations';
import { kickPlayer } from '../util/dismissPlayer';

function BannedPlayers() {

}

//Get with and height for icon
function getPlayerDimensions(width: number, height: number): number {
  if (width * 0.3 < height * 0.25) {
    return width * 0.2
  } else {
    return height * 0.2
  }
}

function PlayerBlock({player, text, onSelect, children}:{player: playerInfo, text: players, onSelect: () => void, children: ReactNode}) {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const gameState = useSelector((state: RootState) => state.gameState);

  function checkIfUsers(hamlet: playerInfo, claudius: playerInfo, polonius: playerInfo, gertrude: playerInfo): boolean {
    const uid = auth.currentUser?.uid
    if (uid) {
      if (text === "Hamlet" && uid === hamlet.user.id) {
        return true
      }
      if (text === 'Claudius' && uid === claudius.user.id) {
        return true
      }
      if (text === 'Polonius' && uid === polonius.user.id) {
        return true
      }
      if (text === "Gertrude" && uid === gertrude.user.id) {
        return true
      }
    }
    return false
  }

  const [fontsLoaded, fontError] = useFonts({
    'Rubik-SemiBold': require("../assets/fonts/Rubik-SemiBold.ttf")
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (player.user.id === "") {
    return (
      <Pressable onLayout={onLayoutRootView} style={{width: width * 0.3, height: height * 0.25 - 2, margin: 'auto', borderWidth: 2, borderRadius: 15, borderColor: 'black', overflow: 'hidden'}} onPress={() => {
        onSelect()
      }}>
        <View style={{marginTop: 2, marginLeft: 'auto', marginRight: 'auto'}}>
          {children}
        </View>
        <View style={{backgroundColor: Colors.main, position: 'absolute', width: width * 0.3 - 4, height: height * 0.25 - getPlayerDimensions(width, height) - 4, top: getPlayerDimensions(width, height)}}>
          <Text selectable={false} style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto', color: 'white', fontFamily: 'Rubik-SemiBold'}}>{text}</Text>
        </View>
      </Pressable>
    )
  }
  return (
    <View onLayout={onLayoutRootView} style={{width: width * 0.3, height: height * 0.25 - 2, margin: 'auto', borderWidth: 2, borderRadius: 15, borderColor: 'black', backgroundColor: checkIfUsers(gameState.hamlet, gameState.claudius, gameState.polonius, gameState.gertrude) ? '#fcba03':'#dce0dd', overflow: 'hidden'}}>
      <View style={{marginTop: 2, marginLeft: 'auto', marginRight: 'auto'}}>
        {children}
      </View>
      <View style={{backgroundColor: Colors.main, position: 'absolute', width: width * 0.3 - 4, height: height * 0.25 - getPlayerDimensions(width, height) - 4, top: getPlayerDimensions(width, height)}}>
        <Text selectable={false} style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto', color: 'white', fontFamily: 'Rubik-SemiBold'}}>{text}</Text>
      </View>
    </View>
  )
}

function UserBlock({index}:{index: number}) {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const players = useSelector((state: RootState) => state.gameState.players);
  const master = useSelector((state: RootState) => state.gameState.master);
  const gameId = useSelector((state: RootState) => state.gameState.gameId);
  const [userId, setUserId] = useState<string>("");

  function checkIfUserMaster() {
    const uid = auth.currentUser?.uid
    if (uid !== undefined) {
      setUserId(uid)
    }
  }

  useEffect(() => {
    checkIfUserMaster()
  }, [master])

  if (index < players.length) {
    return (
      <View style={{width: (width * 0.8) - ((((width * 0.8) - (getPlayerDimensions(width, height) * 2))/8) * 2), borderWidth: 2, borderColor: 'black', borderRadius: 15, marginLeft: 'auto', marginRight: 'auto', flexDirection: 'row', marginBottom: 10}}>
        <Text style={{padding: 20, fontFamily: 'Rubik-SemiBold'}}>{players[index].username}</Text>
        { (userId === master && players[index].id !== userId) ? 
          <Pressable onPress={() => {kickPlayer(players[index].id, gameId)}} style={{borderRadius: 15, backgroundColor: 'red', marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 20}}>
            <Text style={{margin: 10, color: 'white'}}>Kick</Text>
          </Pressable>:null
        }
        { (userId === master && players[index].id !== userId) ? 
          <Pressable onPress={() => {kickPlayer(players[index].id, gameId)}} style={{borderRadius: 15, backgroundColor: 'red', marginTop: 'auto', marginBottom: 'auto', marginLeft: 'auto', marginRight: 20}}>
            <Text style={{margin: 10, color: 'white'}}>Ban</Text>
          </Pressable>:null
        }
      </View>
    )
  }
  return (
    <View style={{width: (width * 0.8) - ((((width * 0.8) - (getPlayerDimensions(width, height) * 2))/8) * 2), borderWidth: 2, borderColor: 'black', borderRadius: 15, marginLeft: 'auto', marginRight: 'auto', marginBottom: 10}}>
      <Text style={{padding: 20, fontFamily: 'Rubik-SemiBold'}}>WAITING FOR USER TO JOIN</Text>
    </View>
  )
}

export default function PlayerScreen() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const gameState = useSelector((state: RootState) => state.gameState);
  const [copied, setCopied] = useState<boolean>(false);
  const [leaveState, setLeaveState] = useState<loadingStateEnum>(loadingStateEnum.notStarted);
  const [userId, setUserId] = useState<string>("");

  async function loadLeaveGame() {
    setLeaveState(loadingStateEnum.loading)
    const result = await leaveGame(gameState.gameId)
    setLeaveState(result)
  }

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(gameState.gameId);
    setCopied(true)
  };

  useEffect(() => {
    const uid = auth.currentUser?.uid
    if (uid) {
      setUserId(uid);
    }
  }, [])

  const [fontsLoaded, fontError] = useFonts({
    'RubikBubbles-Regular': require("../assets/fonts/RubikBubbles-Regular.ttf"),
    'Rubik-SemiBold': require("../assets/fonts/Rubik-SemiBold.ttf"),
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
    <>
      <View style={{width, height, position: 'absolute', backgroundColor: '#a2a3a2', opacity: 0.3}} />
      <View onLayout={onLayoutRootView} style={{width: width * 0.8, height: height * 0.8, margin: 'auto', backgroundColor: 'white', borderRadius: 30, borderWidth: 2, borderColor: 'black'}}>
        <ScrollView>
          <View style={{marginTop: 20, flexDirection: 'row'}}>
            <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: "auto", fontSize: 25}}>{gameState.gameId}</Text>
            <Pressable onPress={() => {copyToClipboard()}} style={{marginRight: 'auto', marginLeft: 5}}>
              { copied ?
                <CopiedIcon width={25} height={ 25}/>:<CopyIcon width={25} height={ 25}/>
              }
            </Pressable>
          </View>
          <Text selectable={false} style={{fontFamily: 'RubikBubbles-Regular', color: Colors.royalRed, marginLeft: ((width * 0.8) - (getPlayerDimensions(width, height) * 2))/8, marginTop: 15, fontSize: 20, marginBottom: 10}}>To pick or not to pick, that is the question.</Text>
          <View style={{flexDirection: 'row', marginTop: 'auto', marginBottom: 10}}>
            <PlayerBlock player={gameState.hamlet} text={'Hamlet'}onSelect={() => {
              setPlayerSelection('Hamlet')
            }}>
              <Hamlet width={getPlayerDimensions(width, height)} height={getPlayerDimensions(width, height)}/>
            </PlayerBlock>
            <PlayerBlock player={gameState.claudius} text={'Claudius'} onSelect={() => {
              setPlayerSelection('Claudius')
            }}>
              <Claudius width={getPlayerDimensions(width, height)} height={getPlayerDimensions(width, height)}/>
            </PlayerBlock>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 'auto'}}>
            <PlayerBlock player={gameState.polonius} text={'Polonius'} onSelect={() => {
              setPlayerSelection('Polonius')
            }}>
              <Polonius width={getPlayerDimensions(width, height)} height={getPlayerDimensions(width, height)}/>
            </PlayerBlock>
            <PlayerBlock player={gameState.gertrude} text={'Gertrude'} onSelect={() => {
              setPlayerSelection('Gertrude')
            }}>
                <Gertrude width={getPlayerDimensions(width, height)} height={getPlayerDimensions(width, height)}/>
            </PlayerBlock>
          </View>
          <View>
            <Text style={{fontFamily: 'Rubik-SemiBold', color: 'black', fontSize: 15, marginTop: 20, marginLeft: ((width * 0.8) - (getPlayerDimensions(width, height) * 2))/8}}>Players</Text>
            <UserBlock index={0}/>
            <UserBlock index={1}/>
            <UserBlock index={2}/>
            <UserBlock index={3}/>
          </View>
          <DefaultButton style={{width: (width * 0.8) - ((((width * 0.8) - (getPlayerDimensions(width, height) * 2))/8) * 2), marginLeft: 'auto', marginRight: 'auto', marginBottom: 10}} onPress={() => {loadLeaveGame()}} text='Leave Game'/>
          <DefaultButton style={{width: (width * 0.8) - ((((width * 0.8) - (getPlayerDimensions(width, height) * 2))/8) * 2), marginLeft: 'auto', marginRight: 'auto', marginBottom: 10}}onPress={() => {router.push('/')}} text='Back'/>
          { (userId === gameState.master && gameState.bannedPlayers.length >= 1) ? 
            <View>
              <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: 15, marginTop: 15, marginBottom: 15}}>Banned Players</Text>
              <FlatList data={gameState.bannedPlayers} renderItem={(e) => (
                <View>
                  <Text>{e.item}</Text>
                </View>
              )}/>
            </View>:null
          }
        </ScrollView>
      </View>
    </>
  )
}