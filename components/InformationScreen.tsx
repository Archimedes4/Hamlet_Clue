import { View, Text, Pressable } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import store, { RootState } from '../redux/store';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { auth } from '../app/_layout';
import { gameStateSlice } from '../redux/reducers/gameStateReducer';
import DefaultButton from './DefaultButton';
import DetectiveSheet from './DetectiveSheet';
import { screensSlice } from '../redux/reducers/screensReducer';
import CardView from './CardView';
import Colors from '../constants/Colors';
import updateLastHandled from '../util/updateLastHandled';

function getUserCards(): cardType[] {
  const uid = auth.currentUser?.uid
  if (uid) {
    const hamelet = store.getState().gameState.hamlet
    const claudius = store.getState().gameState.claudius
    const polonius = store.getState().gameState.polonius
    const gertrude = store.getState().gameState.gertrude
    if (hamelet.user.id === uid) {
      return hamelet.cards
    } else if (claudius.user.id === uid) {
      return claudius.cards
    } else if (polonius.user.id === uid) {
      return polonius.cards
    } else if (gertrude.user.id === uid) {
      return gertrude.cards
    }
  }
  return []
}

export function PickUserCard({setIsShowingDetective}:{setIsShowingDetective: (item: boolean) => void}) {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const prompt = useSelector((state: RootState) => state.gameState.promt);
  const cards = getUserCards();
  function pickPromt(card: cardType) {
    const state = store.getState().gameState
    const newPromt: informationPromt = {
      room: prompt.room,
      player: prompt.player,
      weapon: prompt.weapon,
      intiator: prompt.intiator,
      accusation: prompt.accusation,
      time: prompt.time,
      timeHandled: new Date().toISOString(),
      handledCard: card,
      suggester: prompt.suggester
    }
    //Find next turn
    let orderOfPlay = [...state.orderOfPlay]
    orderOfPlay = orderOfPlay.filter((e) => {
      if (e === "Hamlet" && !state.hamlet.accused) {
        return e
      }
      if (e === "Claudius" && !state.claudius.accused) {
        return e
      }
      if (e === "Polonius" && !state.polonius.accused) {
        return e
      }
      if (e === "Gertrude" && !state.gertrude.accused) {
        return e
      }
    })

    const uid = auth.currentUser?.uid
    if (uid) {
      const gameState = store.getState().gameState;
      if (uid === gameState.hamlet.user.id) {
        const newUser: playerInfo = {
          user: gameState.hamlet.user,
          pos: gameState.hamlet.pos,
          cards: gameState.hamlet.cards,
          guesses: gameState.hamlet.guesses,
          accused: gameState.hamlet.accused,
          notes: gameState.hamlet.notes,
          lastDismissed: prompt.time
        }
        store.dispatch(gameStateSlice.actions.setHamlet(newUser))
      } else if (uid === gameState.claudius.user.id) {
        const newUser: playerInfo = {
          user: gameState.claudius.user,
          pos: gameState.claudius.pos,
          cards: gameState.claudius.cards,
          guesses: gameState.claudius.guesses,
          accused: gameState.claudius.accused,
          notes: gameState.claudius.notes,
          lastDismissed: prompt.time
        }
        store.dispatch(gameStateSlice.actions.setClaudius(newUser))
      } else if (uid === gameState.polonius.user.id) {
        const newUser: playerInfo = {
          user: gameState.polonius.user,
          pos: gameState.polonius.pos,
          cards: gameState.polonius.cards,
          guesses: gameState.polonius.guesses,
          accused: gameState.polonius.accused,
          notes: gameState.polonius.notes,
          lastDismissed: prompt.time
        }
        store.dispatch(gameStateSlice.actions.setPolonius(newUser))
      } else if (uid === gameState.gertrude.user.id) {
        const newUser: playerInfo = {
          user: gameState.gertrude.user,
          pos: gameState.gertrude.pos,
          cards: gameState.gertrude.cards,
          guesses: gameState.gertrude.guesses,
          accused: gameState.gertrude.accused,
          notes: gameState.gertrude.notes,
          lastDismissed: prompt.time
        }
        store.dispatch(gameStateSlice.actions.setGertude(newUser))
      }
    }

    const index = orderOfPlay.indexOf(prompt.intiator) 
    if ((index + 1) >= orderOfPlay.length) {
      store.dispatch(gameStateSlice.actions.setPromtAndTurn({prompt: newPromt, turn: orderOfPlay[0]}))
    } else {
      console.log(orderOfPlay[index + 1])
      store.dispatch(gameStateSlice.actions.setPromtAndTurn({prompt: newPromt, turn: orderOfPlay[index + 1]}))
    }
  }
  return (
    <>
      <View style={{width, height, position: 'absolute', backgroundColor: '#a2a3a2', opacity: 0.3}} />
      <View style={{width: width * 0.8, height: height * 0.8, margin: 'auto', backgroundColor: 'white', borderRadius: 30, borderWidth: 2, borderColor: 'black'}}>
        <View style={{flexDirection: 'row', marginTop: 20, flexWrap: 'wrap', width: width * 0.6, marginLeft: width * 0.1, marginBottom: 20}}>
          <Text style={{fontFamily: 'Rubik-SemiBold', fontSize: 15}}>{prompt.intiator}</Text><Text style={{fontFamily: 'Rubik-SemiBold', marginTop: 'auto'}}> has </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontFamily: 'RubikBubbles-Regular', marginTop: 'auto', color: Colors.royalRed}}>suggested</Text>
            <Text style={{fontFamily: 'Rubik-SemiBold', marginTop: 'auto'}}>, </Text>
          </View>
          <Text style={{fontFamily: 'Rubik-SemiBold', marginTop: 'auto'}}>that {prompt.player} killed Ophelia in the {prompt.room.replace("_", " ")} with {prompt.weapon.replace("_", " ")}.</Text>
        </View>
        <Text style={{fontFamily: 'RubikBubbles-Regular', fontSize: 25, color: Colors.royalRed, marginLeft: 'auto', marginRight: 'auto', marginBottom: 10}}>Choose Card To Show {prompt.intiator}</Text>
        <View style={{flexDirection: 'row', width: width * 0.8, marginTop: 10, marginBottom: 10}}>
          {cards.includes(prompt.weapon) ?
            <Pressable onPress={() => {
              pickPromt(prompt.weapon)
            }} style={{borderRadius: 15, borderWidth: 2, borderColor: 'black', marginLeft: 'auto', marginRight: 'auto', overflow: 'hidden'}}>
              <CardView card={prompt.weapon} width={width * 0.25} height={height * 0.25}/>
            </Pressable>:null
          }
          {cards.includes(prompt.player) ?
            <Pressable onPress={() => {
              pickPromt(prompt.player)
            }} style={{borderRadius: 15, borderWidth: 2, borderColor: 'black', marginLeft: 'auto', marginRight: 'auto', overflow: 'hidden'}}>
              <CardView card={prompt.player} width={width * 0.25} height={height * 0.25}/>
            </Pressable>:null
          }
          {cards.includes(prompt.room) ?
            <Pressable onPress={() => {
              pickPromt(prompt.room)
            }} style={{borderRadius: 15, borderWidth: 2, borderColor: 'black', marginLeft: 'auto', marginRight: 'auto', overflow: 'hidden'}}>
              <CardView card={prompt.room} width={width * 0.255} height={height * 0.25}/>
            </Pressable>:null
          }
        </View>
        <DefaultButton style={{width: width * 0.6, marginLeft: 'auto', marginRight: 'auto', marginTop: 25}} onPress={() => {setIsShowingDetective(true)}} text='Show Detective Sheet'/>
      </View>
    </>
  )
}

export default function InformationScreen() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const state = useSelector((state: RootState) => state.gameState);
  const [seconds, setSeconds] = useState<number>(10)
  const [isShowingDetective, setIsShowingDetective] = useState<boolean>(false)
  const [fontsLoaded, fontError] = useFonts({
    'RubikBubbles-Regular': require("../assets/fonts/RubikBubbles-Regular.ttf"),
    'Rubik-SemiBold': require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  function getInformation(gameState: gameState) {
    const uid = auth.currentUser?.uid
    if (uid) {
      if ((gameState.promt.suggester === "Hamlet" && gameState.claudius.user.id === uid) || (gameState.promt.suggester === "Claudius" && gameState.claudius.user.id === uid) || (gameState.promt.suggester === "Polonius" && gameState.polonius.user.id === uid) || (gameState.promt.suggester === "Gertrude" && gameState.gertrude.user.id === uid)) {
        //User Needs to pick a card
        if (gameState.promt.handledCard === "") {
          return true
        }
        return false
      }
    }
    return false
  }

  useEffect(() => {
    // Exit early if countdown is finished
    if (seconds <= 0) {
      if (!isShowingDetective && !getInformation(state)) {
        updateLastHandled()
        store.dispatch(screensSlice.actions.setInformationScreen(false))
      }
      return;
    }
    
    // Set up the timer
    const timer = setInterval(() => {
      seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000);
    }, 1000);
    
    // Clean up the timer
    return () => clearInterval(timer);
  }, [seconds]);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (isShowingDetective) {
    return (
      <DetectiveSheet role='window' onClose={() => {
        if (seconds > 0 || getInformation(state)) {
          setIsShowingDetective(false)
        } else {
          updateLastHandled()
          store.dispatch(screensSlice.actions.setInformationScreen(false))
        }
      }}/>
    )
  }
  if (getInformation(state)) {
    return (
      <PickUserCard setIsShowingDetective={setIsShowingDetective}/>
    )
  }

  return (
    <>
      <View style={{width, height, position: 'absolute', backgroundColor: '#a2a3a2', opacity: 0.3}} />
      <View onLayout={onLayoutRootView} style={{width: width * 0.8, height: height * 0.8, margin: 'auto', backgroundColor: 'white', borderRadius: 30, borderWidth: 2, borderColor: 'black'}}>
        <View style={{marginLeft: 15, marginTop: 10, marginBottom: 10}}>
          { state.promt.accusation ?
            <Text style={{fontFamily: 'RubikBubbles-Regular'}}>{state.promt.intiator}, made an accusation. Unfortunatly for {state.promt.intiator}, {state.promt.intiator === "Gertrude" ? "she":"he"} was wrong. They accusestion they chose are as follows.</Text>:
            <Text style={{fontFamily: 'RubikBubbles-Regular'}}>{state.promt.intiator}, made a {(state.promt.accusation ? "accusation":"suggestion")}</Text>
          }
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{borderRadius: 15, borderWidth: 2, borderColor: 'black', overflow: 'hidden', marginLeft: 'auto', marginRight: 'auto'}}>
            <Text style={{marginLeft: 'auto', marginRight: 'auto', fontFamily: 'RubikBubbles-Regular'}}>Player</Text>
            <CardView card={state.promt.player} width={width * 0.2} height={height * 0.15}/>
          </View>
          <View style={{borderRadius: 15, borderWidth: 2, borderColor: 'black', overflow: 'hidden', marginLeft: 'auto', marginRight: 'auto'}}>
            <Text style={{marginLeft: 'auto', marginRight: 'auto', fontFamily: 'RubikBubbles-Regular'}}>Weapon</Text>
            <CardView card={state.promt.weapon} width={width * 0.2} height={height * 0.15}/>
          </View>
          <View style={{borderRadius: 15, borderWidth: 2, borderColor: 'black', overflow: 'hidden', marginLeft: 'auto', marginRight: 'auto'}}>
            <Text style={{marginLeft: 'auto', marginRight: 'auto', fontFamily: 'RubikBubbles-Regular'}}>Room</Text>
            <CardView card={state.promt.room} width={width * 0.2} height={height * 0.15}/>
          </View>
        </View>
        <DefaultButton style={{width: width * 0.6, marginLeft: 'auto', marginRight: 'auto', marginTop: 10}} onPress={() => {setIsShowingDetective(true)}} text='Show Detective Sheet'/>
        <DefaultButton style={{width: width * 0.6, marginLeft: 'auto', marginRight: 'auto', marginTop: 10}} onPress={() => {updateLastHandled(); store.dispatch(screensSlice.actions.setInformationScreen(false))}} text='Dismiss'/>
        <Text style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 10, fontFamily: 'Rubik-SemiBold', color: 'white'}}>Time's sonnet counts down, each moment a fleeting verse. {seconds}</Text>
      </View>
    </>
  )
}