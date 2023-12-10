import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import store, { RootState } from '../redux/store';
import { CloseIcon } from './Icons';
import { screensSlice } from '../redux/reducers/screensReducer';

export default function DetectiveSheet() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  return (
    <View style={{width: width * 0.8, height: height * 0.8, margin: 'auto', backgroundColor: 'white'}}>
      <Pressable onPress={() => {store.dispatch(screensSlice.actions.hideAllScreens())}}>
        <CloseIcon width={15} height={15}/>
      </Pressable>
      <Text>Detective Notes</Text>
      <Text>Characters</Text>
      <Text>Hamlet</Text>
      <Text>Claudius</Text>
      <Text>Polonius</Text>
      <Text>Gertrude</Text>
      <Text>Weapons</Text>
      <Text>Hemlock Poison</Text>
      <Text>Sharpened Rapier</Text>
      <Text>Axe</Text>
      <Text>Dagger</Text>
      <Text>Rooms</Text>
      <Text>Gun Platform </Text>
      <Text>Great Hall"</Text>
      <Text>Fencing Room</Text>
      <Text>Court Yard"</Text>
      <Text>Royal Bedroom</Text>
      <Text>Chapel</Text>
      <Text>Throne Room</Text>
      <Text>Stair Well</Text>
    </View>
  )
}