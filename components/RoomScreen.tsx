import { View, Text, Pressable } from 'react-native'
import React, { ReactNode, useCallback, useState } from 'react'
import { useSelector } from 'react-redux';
import store, { RootState } from '../redux/store';
import { Axe, Claudius, Dagger, Gertrude, Hamlet, HemlockPoison, Polonius, SharpenedRapier } from './Icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { suggestionsSlice } from '../redux/reducers/suggestionSelectionReducer';
import DefaultButton from './DefaultButton';
import Colors from '../constants/Colors';
import getCurrentRoom from '../util/getCurrentRoom';
import { ScrollView } from 'react-native-gesture-handler';
import { accusationsSlice } from '../redux/reducers/accusationSelectionReducer';
import DetectiveSheet from './DetectiveSheet';
import { makeAccusation, makeSuggestion } from '../util/onRoom';

declare global {
  type weaponBlockProps = {
    name: string;
    item: murderWeapons;
    role: "weapons";
    children: ReactNode;
  }
  type playersBlockProps = {
    name: string;
    item: players;
    role: "players";
    children: ReactNode;
  }
  type roomsBlockProps = {
    name: string;
    item: rooms;
    role: "rooms";
    children: ReactNode;
  }
}

function SuggestBlock({name, item, children, role}:weaponBlockProps | playersBlockProps) {
  const { player, weapon } = useSelector((state: RootState) => state.suggestionsSelection);
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  function onPress() {
    if (role === 'players') {
      store.dispatch(suggestionsSlice.actions.setPlayerSuggestion(item))
    } else {
      store.dispatch(suggestionsSlice.actions.setWeaponSuggestion(item))
    }
  }
  function isSuggestedItem(selectedPlayer: players, selectedWeapon: murderWeapons) {
    if (role === 'players' && selectedPlayer === item) {
      return true
    }
    if (role === "weapons" && selectedWeapon === item) {
      return true
    }
    return false
  }
  return (
    <Pressable onPress={() => onPress()} style={{marginLeft: 'auto', marginRight: 'auto', width: width * 0.15, height: height * 0.19, backgroundColor: isSuggestedItem(player, weapon) ? '#bfbfbf':'white', borderRadius: 15, borderWidth: 2, borderColor: 'black'}}>
      <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 5}}>
        {children}
      </View>
      <Text style={{marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>{name}</Text>
    </Pressable>
  )
}

function SuggestScreen({onBack}:{onBack: () => void}) {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const gameState = useSelector((state: RootState) => state.gameState);
  const [leftMargin, setLeftMargin] = useState<number>(0);

  const [fontsLoaded, fontError] = useFonts({
    'RubikBubbles-Regular': require("../assets/fonts/RubikBubbles-Regular.ttf"),
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

  return (
    <>
      <View style={{width, height, position: 'absolute', backgroundColor: '#a2a3a2', opacity: 0.3}} />
      <View style={{width: width * 0.8, height: height * 0.8, margin: 'auto', backgroundColor: 'white', borderRadius: 30, borderWidth: 2, borderColor: 'black'}} onLayout={onLayoutRootView}>
        <Text style={{marginTop: 15, fontFamily: 'RubikBubbles-Regular', marginLeft: leftMargin, color: Colors.royalRed, fontSize: 25}}>Suggestion</Text>
        <Text style={{fontFamily: 'Rubik-SemiBold', position: 'absolute', right: leftMargin, top: 15, color: 'black', fontSize: 20}}>Room: {getCurrentRoom(gameState)}</Text>
        <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: leftMargin, fontSize: 15}}>Players</Text>
        <View onLayout={(e) => {
          setLeftMargin((e.nativeEvent.layout.width - width * 0.6)/8)
        }} style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
          <SuggestBlock name='Hamlet' item='Hamlet' role='players'>
            <Hamlet width={75} height={75}/>
          </SuggestBlock>
          <SuggestBlock name='Claudius' item='Claudius' role='players'>
            <Claudius width={75} height={75}/>
          </SuggestBlock>
          <SuggestBlock name='Polonius' item='Polonius' role='players'>
            <Polonius width={75} height={75}/>
          </SuggestBlock>
          <SuggestBlock name='Gertrude' item='Gertrude' role='players'>
            <Gertrude width={75} height={75}/>
          </SuggestBlock>
        </View>
        <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: leftMargin, fontSize: 15, paddingBottom: 10}}>Weapons</Text>
        <View style={{flexDirection: 'row'}}>
          <SuggestBlock name='Hemlock Poison' item='Hemlock_Poison' role='weapons'>
            <HemlockPoison width={75} height={75}/>
          </SuggestBlock>
          <SuggestBlock name='Sharpened Rapier' item='Sharpened_Rapier' role='weapons'>
            <SharpenedRapier width={75} height={75}/>
          </SuggestBlock>
          <SuggestBlock name='Axe' item='Axe' role='weapons'>
            <Axe width={75} height={75}/>
          </SuggestBlock>
          <SuggestBlock name='Dagger' item='Dagger' role='weapons'>
            <Dagger width={75} height={75}/>
          </SuggestBlock>
        </View>
        <DefaultButton style={{marginLeft: leftMargin, marginRight: leftMargin, marginTop: 10}} onPress={() => {makeSuggestion()}} text='Suggest'/>
        <DefaultButton style={{marginLeft: leftMargin, marginRight: leftMargin, marginTop: 10}} onPress={() => onBack()} text='Back'/>
      </View>
    </>
  )
}

function AccuseBlock({name, item, children, role}:weaponBlockProps | playersBlockProps | roomsBlockProps) {
  const { player, weapon, room } = useSelector((state: RootState) => state.accusationsSelection);
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  function onPress() {
    if (role === 'players') {
      store.dispatch(accusationsSlice.actions.setPlayerAccusation(item))
    } else if (role === 'weapons') {
      store.dispatch(accusationsSlice.actions.setWeaponAccusation(item))
    } else {
      store.dispatch(accusationsSlice.actions.setRoomAccusation(item))
    }
  }
  function isSuggestedItem(selectedPlayer: players, selectedWeapon: murderWeapons, selectedRoom: rooms) {
    if (role === 'players' && selectedPlayer === item) {
      return true
    }
    if (role === "weapons" && selectedWeapon === item) {
      return true
    }
    if (role === "rooms" && selectedRoom === item) {
      return true
    }
    return false
  }
  return (
    <Pressable onPress={() => onPress()} style={{marginLeft: 'auto', marginRight: 'auto', width: width * 0.15, height: height * 0.19, backgroundColor: isSuggestedItem(player, weapon, room) ? '#bfbfbf':'white', borderRadius: 15, borderWidth: 2, borderColor: 'black'}}>
      <View style={{marginLeft: 'auto', marginRight: 'auto', marginTop: 5}}>
        {children}
      </View>
      <Text style={{marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>{name}</Text>
    </Pressable>
  )
}

function AccuseScreen({onBack}:{onBack: () => void}) {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const gameState = useSelector((state: RootState) => state.gameState);
  const [leftMargin, setLeftMargin] = useState<number>(0);

  const [fontsLoaded, fontError] = useFonts({
    'RubikBubbles-Regular': require("../assets/fonts/RubikBubbles-Regular.ttf"),
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

  return (
    <>
      <View style={{width, height, position: 'absolute', backgroundColor: '#a2a3a2', opacity: 0.3}} />
      <View style={{width: width * 0.8, height: height * 0.8, margin: 'auto', backgroundColor: 'white', borderRadius: 30, borderWidth: 2, borderColor: 'black', overflow: 'hidden'}} onLayout={onLayoutRootView}>
        <ScrollView>
          <Text style={{marginTop: 15, fontFamily: 'RubikBubbles-Regular', marginLeft: leftMargin, color: Colors.royalRed, fontSize: 25}}>Accuse</Text>
          <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: leftMargin, fontSize: 15}}>Players</Text>
          <View onLayout={(e) => {
            setLeftMargin((e.nativeEvent.layout.width - width * 0.6)/8)
          }} style={{flexDirection: 'row', marginTop: 10, marginBottom: 10}}>
            <AccuseBlock name='Hamlet' item='Hamlet' role='players'>
              <Hamlet width={75} height={75}/>
            </AccuseBlock>
            <AccuseBlock name='Claudius' item='Claudius' role='players'>
              <Claudius width={75} height={75}/>
            </AccuseBlock>
            <AccuseBlock name='Polonius' item='Polonius' role='players'>
              <Polonius width={75} height={75}/>
            </AccuseBlock>
            <AccuseBlock name='Gertrude' item='Gertrude' role='players'>
              <Gertrude width={75} height={75}/>
            </AccuseBlock>
          </View>
          <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: leftMargin, fontSize: 15, paddingBottom: 10}}>Weapons</Text>
          <View style={{flexDirection: 'row'}}>
            <AccuseBlock name='Hemlock Poison' item='Hemlock_Poison' role='weapons'>
              <HemlockPoison width={75} height={75}/>
            </AccuseBlock>
            <AccuseBlock name='Sharpened Rapier' item='Sharpened_Rapier' role='weapons'>
              <SharpenedRapier width={75} height={75}/>
            </AccuseBlock>
            <AccuseBlock name='Axe' item='Axe' role='weapons'>
              <Axe width={75} height={75}/>
            </AccuseBlock>
            <AccuseBlock name='Dagger' item='Dagger' role='weapons'>
              <Dagger width={75} height={75}/>
            </AccuseBlock>
          </View>
          <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: leftMargin, fontSize: 15, paddingBottom: 10}}>Rooms</Text>
          <View style={{flexDirection: 'row'}}>
            <AccuseBlock name='Gun Platform' item="Gun_Platform" role='rooms'>
              <HemlockPoison width={75} height={75}/>
            </AccuseBlock>
            <AccuseBlock name='Great Hall' item="Great_Hall" role='rooms'>
              <SharpenedRapier width={75} height={75}/>
            </AccuseBlock>
            <AccuseBlock name='Fencing Room' item="Fencing_Room" role='rooms'>
              <Axe width={75} height={75}/>
            </AccuseBlock>
            <AccuseBlock name='Court Yard' item="Court_Yard" role='rooms'>
              <Dagger width={75} height={75}/>
            </AccuseBlock>
          </View>
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <AccuseBlock name='Royal Bedroom' item="Royal_Bedroom" role='rooms'>
              <HemlockPoison width={75} height={75}/>
            </AccuseBlock>
            <AccuseBlock name='Chapel' item="Chapel" role='rooms'>
              <SharpenedRapier width={75} height={75}/>
            </AccuseBlock>
            <AccuseBlock name='Throne Room' item='Throne_Room' role='rooms'>
              <Axe width={75} height={75}/>
            </AccuseBlock>
            <AccuseBlock name='Stair Well' item='Stair_Well' role='rooms'>
              <Dagger width={75} height={75}/>
            </AccuseBlock>
          </View>
          <DefaultButton style={{marginLeft: leftMargin, marginRight: leftMargin, marginTop: 10}} onPress={() => {makeAccusation()}} text='Accuse'/>
          <DefaultButton style={{marginLeft: leftMargin, marginRight: leftMargin, marginTop: 10, marginBottom: 10}} onPress={() => onBack()} text='Back'/>
        </ScrollView>
      </View>
    </>
  )
}

enum roomMode {
  home,
  suggest,
  accuse,
  detective
}

export default function RoomScreen() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const gameState = useSelector((state: RootState) => state.gameState);
  const [selectedRoomMode, setSelectedRoomMode] = useState<roomMode>(roomMode.home);
  const [fontsLoaded, fontError] = useFonts({
    'RubikBubbles-Regular': require("../assets/fonts/RubikBubbles-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (selectedRoomMode === roomMode.suggest) {
    return <SuggestScreen onBack={() => setSelectedRoomMode(roomMode.home)}/>
  }
  if (selectedRoomMode === roomMode.accuse) {
    return <AccuseScreen onBack={() => setSelectedRoomMode(roomMode.home)}/>
  }
  if (selectedRoomMode === roomMode.detective) {
    return <DetectiveSheet />
  }
  return (
    <>
      <View style={{width, height, position: 'absolute', backgroundColor: '#a2a3a2', opacity: 0.3}} />
      <View onLayout={onLayoutRootView} style={{width: width * 0.8, height: height * 0.8, margin: 'auto', backgroundColor: 'white', borderRadius: 30, borderWidth: 2, borderColor: 'black'}}>
        <Text style={{fontFamily: 'RubikBubbles-Regular', color: Colors.royalRed}}>You Entered The {getCurrentRoom(gameState)}!</Text>
        <DefaultButton style={{width: width * 0.6, marginLeft: 'auto', marginRight: 'auto'}} onPress={() => {setSelectedRoomMode(roomMode.suggest)}} text='Suggest'/>
        <DefaultButton style={{width: width * 0.6, marginLeft: 'auto', marginRight: 'auto'}} onPress={() => {setSelectedRoomMode(roomMode.accuse)}} text='Accuse'/>
        <DefaultButton style={{width: width * 0.6, marginLeft: 'auto', marginRight: 'auto'}} onPress={() => {setSelectedRoomMode(roomMode.detective)}} text='Detective'/>
      </View>
    </>
  )
}