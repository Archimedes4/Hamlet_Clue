import React, { useState } from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import roleDie from '../util/roleDie';
import { useSelector } from 'react-redux';
import store, { RootState } from '../redux/store';
import { screensSlice } from '../redux/reducers/screensReducer';

export default function Option() {
  const gameState = useSelector((state: RootState) => state.gameState);
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'orange'}}>
      <Text>GameId: {gameState.gameId}</Text>
      <Pressable onPress={() => {store.dispatch(screensSlice.actions.setPlayerScreen(true))}}>
        <Text>Show</Text>
      </Pressable>
    </View>
  );
}