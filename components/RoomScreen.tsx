import { View, Text, Pressable } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

function SuggestBlock({item, children}:{item: players | murderWeapons, selected: players | murderWeapons, children: ReactNode}) {
  return (
    <Pressable>
      {children}
      <Text>{item}</Text>
    </Pressable>
  )
}

function SuggestScreen() {
  const [selectedPlayer, setSelectedPlayer] = useState<players>("Hamlet");
  const [selectedWeapon, setSelectedWeapon] = useState<murderWeapons>("Hemlock_Poison");
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  return (
    <>
      <View style={{width, height, position: 'absolute', backgroundColor: '#a2a3a2', opacity: 0.3}} />
      <View style={{width: width * 0.8, height: height * 0.8, margin: 'auto', backgroundColor: 'white', borderRadius: 30, borderWidth: 2, borderColor: 'black'}}>
        <Text>I suggest that,</Text>
        <Text>Players</Text>
        <View style={{flexDirection: 'row'}}>
          <Pressable onPress={() => setSelectedPlayer("Hamlet")}>
            <Text>Hamlet</Text>
          </Pressable>
          <Pressable onPress={() => setSelectedPlayer("Claudius")}>
            <Text>Claudius</Text>
          </Pressable>
          <Pressable onPress={() => setSelectedPlayer("Polonius")}>
            <Text>Polonius</Text>
          </Pressable>
          <Pressable onPress={() => setSelectedPlayer("Gertrude")}>
            <Text>Gertrude</Text>
          </Pressable>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Pressable onPress={() => setSelectedWeapon("Hemlock_Poison")}>
            <Text>Hemlock Poison</Text>
          </Pressable>
          <Pressable onPress={() => setSelectedWeapon("Sharpened_Rapier")}>
            <Text>Sharpened Rapier</Text>
          </Pressable>
          <Pressable onPress={() => setSelectedWeapon("Axe")}>
            <Text>Axe</Text>
          </Pressable>
          <Pressable onPress={() => setSelectedWeapon("Dagger")}>
            <Text>Dagger</Text>
          </Pressable>
        </View>
        <Pressable>
          <Text>Suggest</Text>
        </Pressable>
      </View>
    </>
  )
}

function AccuseScreen() {
  return (
    <View>

    </View>
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
  const [selectedRoomMode, setSelectedRoomMode] = useState<roomMode>(roomMode.home);
  if (selectedRoomMode === roomMode.suggest) {
    return <SuggestScreen />
  }
  if (selectedRoomMode === roomMode.accuse) {
    return <AccuseScreen />
  }
  return (
    <>
      <View style={{width, height, position: 'absolute', backgroundColor: '#a2a3a2', opacity: 0.3}} />
      <View style={{width: width * 0.8, height: height * 0.8, margin: 'auto', backgroundColor: 'white', borderRadius: 30, borderWidth: 2, borderColor: 'black'}}>
        <Text>RoomScreen</Text>
        <Pressable onPress={() => {setSelectedRoomMode(roomMode.suggest)}}>
          <Text>Suggest</Text>
        </Pressable>
        <Pressable onPress={() => {setSelectedRoomMode(roomMode.accuse)}}>
          <Text>Accuse</Text>
        </Pressable>
      </View>
    </>
  )
}