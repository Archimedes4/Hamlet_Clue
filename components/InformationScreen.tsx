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

export function PickUserCard() {
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
        {cards.includes(prompt.weapon) ?
          <Pressable onPress={() => {
            pickPromt(prompt.weapon)
          }}>
            <Text>{prompt.weapon}</Text>
          </Pressable>:null
        }
        {cards.includes(prompt.player) ?
          <Pressable onPress={() => {
            pickPromt(prompt.player)
          }}>
            <Text>{prompt.player}</Text>
          </Pressable>:null
        }
        {cards.includes(prompt.room) ?
          <Pressable onPress={() => {
            pickPromt(prompt.room)
          }}>
            <Text>{prompt.room}</Text>
          </Pressable>:null
        }
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
      if (!isShowingDetective) {
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
        if (seconds > 0) {
          setIsShowingDetective(false)
        } else {
          store.dispatch(screensSlice.actions.setInformationScreen(false))
        }
      }}/>
    )
  }
  if (getInformation(state)) {
    return (
      <PickUserCard />
    )
  }

  return (
    <>
      <View style={{width, height, position: 'absolute', backgroundColor: '#a2a3a2', opacity: 0.3}} />
      <View onLayout={onLayoutRootView} style={{width: width * 0.8, height: height * 0.8, margin: 'auto', backgroundColor: 'white', borderRadius: 30, borderWidth: 2, borderColor: 'black'}}>
        { state.promt.accusation ?
          <Text>{state.promt.intiator}, made an accusation. Unfortunatly for {state.promt.intiator}, {state.promt.intiator === "Gertrude" ? "she":"he"} was wrong. They accusestion they chose are as follows.</Text>:
          <Text>{state.promt.intiator}, made a {(state.promt.accusation ? "accusation":"suggestion")}</Text>

        }
        <View>
          <View>
            <Text>Players</Text>
          </View>
          <View>
            <Text>Weapon</Text>
          </View>
          <View>
            <Text>Rooms</Text>
          </View>
        </View>
        <DefaultButton onPress={() => {setIsShowingDetective(true)}} text='Show Detective Sheet'/>
        <DefaultButton onPress={() => {store.dispatch(screensSlice.actions.setInformationScreen(false))}} text='Dismiss'/>
      </View>
    </>
  )
}