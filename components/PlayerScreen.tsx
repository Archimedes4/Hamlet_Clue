import { View, Text, Pressable } from 'react-native'
import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux';
import store, { RootState } from '../redux/store';
import { screensSlice } from '../redux/reducers/screensReducer';
import { gameStateSlice } from '../redux/reducers/gameStateReducer';
import { auth } from '../app/_layout';
import setPlayerSelection from '../util/setPlayerSelection';
import { Claudius, Gertrude, Hamlet, Polonius } from './Icons';

//Get with and height for icon
function getPlayerDimensions(width: number, height: number): number {
  if (width * 0.3 < height * 0.25) {
    return width * 0.2
  } else {
    return height * 0.2
  }
}

function PlayerBlock({player, text, onSelect, children}:{player: playerInfo, text: string, onSelect: () => void, children: ReactNode}) {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  if (player.id === "") {
    return (
      <Pressable style={{width: width * 0.3, height: height * 0.25, margin: 'auto', borderWidth: 2, borderRadius: 15, borderColor: 'black'}} onPress={() => {
        onSelect()
      }}>
        <View style={{marginTop: 2, marginLeft: 'auto', marginRight: 'auto'}}>
          {children}
        </View>
        <Text>{text}</Text>
      </Pressable>
    )
  }
  return (
    <View style={{width: width * 0.3, height: height * 0.25, margin: 'auto', borderWidth: 2, borderRadius: 15, borderColor: 'black', backgroundColor: '#dce0dd'}}>
      <View style={{marginTop: 2, marginLeft: 'auto', marginRight: 'auto'}}>
        {children}
      </View>
      <Text>{text}</Text>
    </View>
  )
}

export default function PlayerScreen() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const gameState = useSelector((state: RootState) => state.gameState);
  return (
    <>
      <View style={{width, height, position: 'absolute', backgroundColor: '#a2a3a2', opacity: 0.3}} />
      <View style={{width: width * 0.8, height: height * 0.8, margin: 'auto', backgroundColor: 'white', borderRadius: 30, borderWidth: 2, borderColor: 'black'}}>
        <Pressable onPress={() => {store.dispatch(screensSlice.actions.hideAllScreens())}}>
          <Text>Close</Text>
        </Pressable>
        <Text>To pick or not to pick, that is the question.</Text>
        <View style={{width: width * 0.8, height: height * 0.7, position: 'absolute', bottom: 0}}>
          <View style={{flexDirection: 'row', marginTop: 'auto', marginBottom: 'auto'}}>
            <PlayerBlock player={gameState.hamlet} text={'Hamlet'} onSelect={() => {
              setPlayerSelection('Hamlet')
            }}>
              <Hamlet width={getPlayerDimensions(width, height)} height={getPlayerDimensions(width, height)}/>
            </PlayerBlock>
            <PlayerBlock player={gameState.claudius} text={'Claudius'} onSelect={() => {
              setPlayerSelection('Claudius')
            }}>
              <Claudius width={getPlayerDimensions(width, height)} height={getPlayerDimensions(width, height)}/>
            </PlayerBlock>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 'auto'}}>
            <PlayerBlock player={gameState.polonius} text={'Polonius'} onSelect={() => {
              setPlayerSelection('Polonius')
            }}>
              <Polonius width={getPlayerDimensions(width, height)} height={getPlayerDimensions(width, height)}/>
            </PlayerBlock>
            <PlayerBlock player={gameState.gertrude} text={'Gertrude'} onSelect={() => {
              setPlayerSelection('Gertrude')
            }}>
                <Gertrude width={getPlayerDimensions(width, height)} height={getPlayerDimensions(width, height)}/>
            </PlayerBlock>
          </View>
        </View>
      </View>
    </>
  )
}