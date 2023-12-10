import React, { useState } from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import roleDie from '../util/roleDie';
import { useSelector } from 'react-redux';
import store, { RootState } from '../redux/store';
import { screensSlice } from '../redux/reducers/screensReducer';
import { ChevronLeft } from './Icons';
import { gameStateSlice } from '../redux/reducers/gameStateReducer';
import isPlayersTurn from '../util/isPlayersTurn';
import { router } from 'expo-router';

export default function Option() {
  const gameState = useSelector((state: RootState) => state.gameState);
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'orange'}}>
      <Text>GameId: {gameState.gameId}</Text>
      <Text>Turn: {gameState.turn}</Text>
      <Text>Player Turn: {isPlayersTurn(gameState.hamlet, gameState.claudius, gameState.polonius, gameState.gertrude, gameState.turn)}</Text>
      <Pressable onPress={() => {store.dispatch(screensSlice.actions.hideAllScreens()); store.dispatch(screensSlice.actions.setDetectiveSheetScreen(true))}}>
        <Text>Show Detective Sheet</Text>
      </Pressable>
      <Pressable>
        <Text>Leave Game</Text>
      </Pressable>
      <Pressable onPress={() => {store.dispatch(gameStateSlice.actions.setTurn("Hamlet"))}}>
        <Text>Set Hamlet</Text>
      </Pressable>
      <Pressable style={{flexDirection: 'row'}} onPress={() => {router.push('/')}}>
        <ChevronLeft width={14} height={14}/>
        <Text>Back</Text>
      </Pressable>
    </View>
  );
}