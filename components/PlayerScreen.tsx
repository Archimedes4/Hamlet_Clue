import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import store, { RootState } from '../redux/store';
import { screensSlice } from '../redux/reducers/screensReducer';

function PlayerBlock({player, text}:{player: playerInfo, text: string}) {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  if (player.id === "") {
    return (
      <Pressable style={{width: width * 0.15}} onPress={() => {
        
      }}>
        <Text>{text}</Text>
      </Pressable>
    )
  }
  return (
    <View>
      <Text>{text}</Text>
    </View>
  )
}

export default function PlayerScreen() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const gameState = useSelector((state: RootState) => state.gameState);
  return (
    <View style={{position: 'absolute', width: width, height: height}}>
      <View style={{width: width * 0.8, height: height * 0.8, margin: 'auto', backgroundColor: 'white'}}>
        <Pressable onPress={() => {store.dispatch(screensSlice.actions.hideAllScreens())}}>
          <Text>Close</Text>
        </Pressable>
        <Text>To pick or not to pick, that is the question.</Text>
        <View style={{flexDirection: 'row'}}>
          <PlayerBlock player={gameState.hamlet} text={'Hamlet'} />
          <PlayerBlock player={gameState.claudius} text={'Claudius'} />
          <PlayerBlock player={gameState.polonius} text={'Polonius'} />
          <PlayerBlock player={gameState.hamlet} text={'Gertrude'} />
        </View>
      </View>
    </View>
  )
}