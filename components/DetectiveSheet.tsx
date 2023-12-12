import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import store, { RootState } from '../redux/store';
import { CloseIcon } from './Icons';
import { screensSlice } from '../redux/reducers/screensReducer';
import { getGuess, setGuess } from '../util/detectiveSheet';
import { TextInput } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Colors from '../constants/Colors';
import { auth } from '../app/_layout';

function RowItem({item, index}:{item: cardType, index: number}) {
  const gameState = useSelector((state: RootState) => state.gameState);
  const [itemGuess, setItemGuess] = useState<undefined | guessType>(undefined);
  useEffect(() => {
    setItemGuess(getGuess(item, index))
  }, [gameState])
  return (
    <Pressable style={{height: 30, width: 30}} onPress={() => {setGuess(item, index)}}>
      {itemGuess === undefined ?
        <View>
          <Text>No Guess</Text>
        </View>:null
      }
    </Pressable>
  )
}

function Row({item, name}:{item: cardType, name?: string}) {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  return (
    <View style={{height: 30, width: (width * 0.8)-4, borderTopWidth: 1, borderBottomWidth: 1, flexDirection: 'row'}}>
      <View style={{width: width * 0.2, borderRightWidth: 2, borderColor: 'black', height: 30}}>
        <Text selectable={false}>{name ? name:item}</Text>
      </View>
      <RowItem item={item} index={0}/>
      <RowItem item={item} index={1}/>
      <RowItem item={item} index={2}/>
      <RowItem item={item} index={3}/>
    </View>
  )
}

//Main only part. Window part of room or info sheet
export default function DetectiveSheet({role, onClose}:{role: "main", onClose?: undefined} | {role: "window", onClose: () => void}) {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const [notes, setNotes] = useState<string>("");

  function getNotes() {
    const state = store.getState().gameState
    const uid = auth.currentUser?.uid
    if (uid) {
      if (state.hamlet.user.id === uid) {
        setNotes(state.hamlet.notes)
      } else if (state.claudius.user.id === uid) {
        setNotes(state.hamlet.notes)
      } else if (state.polonius.user.id === uid) {
        setNotes(state.hamlet.notes)
      } else if (state.gertrude.user.id === uid) {
        setNotes(state.hamlet.notes)
      }
    }
  }

  useEffect(() => {
    getNotes();
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
      <View onLayout={onLayoutRootView} style={{width: width * 0.8, height: height * 0.8, margin: 'auto', backgroundColor: 'white', borderRadius: 30, borderWidth: 2, overflow: 'hidden'}}>
        <ScrollView>
          <View style={{marginLeft: 15, marginRight: 15, marginTop: 15, flexDirection: 'row'}}>
            <Text style={{marginLeft: 15, fontFamily: 'RubikBubbles-Regular', color: Colors.royalRed, fontSize: 25}}>Detective Notes</Text>
            <Pressable onPress={() => {
              if (role === "window") {
                onClose()
              } else {
                store.dispatch(screensSlice.actions.hideAllScreens())
              }
            }} style={{marginLeft: 'auto', marginTop: 'auto', marginBottom: 'auto'}}>
              <CloseIcon width={20} height={20}/>
            </Pressable>
          </View>
          <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: 15, marginTop: 15, marginBottom: 15}}>Characters</Text>
          <Row item={'Hamlet'}/>
          <Row item={'Claudius'}/>
          <Row item={'Polonius'}/>
          <Row item={'Gertrude'}/>
          <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: 15, marginTop: 15, marginBottom: 15}}>Weapons</Text>
          <Row item={'Hemlock_Poison'} name='Hemlock Poison'/>
          <Row item={'Sharpened_Rapier'} name='Sharpened Rapier'/>
          <Row item={'Axe'}/>
          <Row item={'Dagger'}/>
          <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: 15, marginTop: 15, marginBottom: 15}}>Rooms</Text>
          <Row item={'Gun_Platform'} name='Gun Platform'/>
          <Row item={'Great_Hall'} name='Great Hall'/>
          <Row item={'Fencing_Room'} name='Fencing Room'/>
          <Row item={'Court_Yard'} name='Court Yard'/>
          <Row item={'Royal_Bedroom'} name='Royal Bedroom'/>
          <Row item={'Chapel'}/>
          <Row item={'Throne_Room'} name='Throne Room'/>
          <Row item={'Stair_Well'} name='Stair Well'/>
          <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: 15, marginTop: 15, marginBottom: 15}}>Notes</Text>
          <TextInput value={notes} onChangeText={setNotes} />
          <Pressable>
            <Text>Update Notes</Text>
          </Pressable>
        </ScrollView>
      </View>
    </>
  )
}