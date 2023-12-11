import React, { useState } from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import roleDie from '../util/util';
import { useSelector } from 'react-redux';
import store, { RootState } from '../redux/store';
import { screensSlice } from '../redux/reducers/screensReducer';
import { ChevronLeft, CopiedIcon, CopyIcon, MagnifyingGlass } from './Icons';
import { gameStateSlice } from '../redux/reducers/gameStateReducer';
import isPlayersTurn from '../util/isPlayersTurn';
import { router } from 'expo-router';
import DefaultButton from './DefaultButton';
import * as Clipboard from 'expo-clipboard';

export default function Option({width, height}:{width: number, height: number}) {
  const gameState = useSelector((state: RootState) => state.gameState);
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(gameState.gameId);
    setCopied(true)
  };
  return (
    <View style={{width: width, height: height, backgroundColor: 'orange'}}>
      <View style={{flexDirection: 'row'}}>
        <Text>{gameState.gameId}</Text>
        <Pressable onPress={() => {copyToClipboard()}} style={{marginRight: 'auto', marginLeft: 5}}>
          { copied ?
            <CopiedIcon width={20} height={20}/>:<CopyIcon width={20} height={20}/>
          }
        </Pressable>
      </View>
      <Text>Turn: {gameState.turn}</Text>
      <DefaultButton style={{flexDirection: 'row', width: width * 0.8, padding: 10, marginLeft: 'auto', marginRight: 'auto', marginTop: 5}} textStyle={{margin: 0, fontSize:9, marginTop: 'auto', marginBottom: 'auto', marginLeft: 1}} onPress={() => {store.dispatch(screensSlice.actions.hideAllScreens()); store.dispatch(screensSlice.actions.setDetectiveSheetScreen(true))}} text='Detective Sheet' Icon={({hover}:{hover: boolean}) => <MagnifyingGlass width={14} height={14} color={hover ? 'white':'black'}/>}/>
      <DefaultButton style={{flexDirection: 'row', width: width * 0.8, padding: 10, marginLeft: 'auto', marginRight: 'auto', marginTop: 5}} textStyle={{margin: 0}} onPress={() => router.push('/')} text='Leave Game' Icon={({hover}:{hover: boolean}) => <ChevronLeft width={14} height={14} color={hover ? 'white':'black'}/>}/>
      <DefaultButton style={{flexDirection: 'row', width: width * 0.8, padding: 10, marginLeft: 'auto', marginRight: 'auto', marginTop: 5}} textStyle={{margin: 0}} onPress={() => router.push('/')} text='Back' Icon={({hover}:{hover: boolean}) => <ChevronLeft width={14} height={14} color={hover ? 'white':'black'}/>}>
      </DefaultButton>
    </View>
  );
}