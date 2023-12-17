import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import store, { RootState } from '../redux/store';
import { Axe, Claudius, CloseIcon, Dagger, Gertrude, Hamlet, HemlockPoison, Polonius, SharpenedRapier } from './Icons';
import { screensSlice } from '../redux/reducers/screensReducer';
import { getGuess, setGuess, updateNotes } from '../util/detectiveSheet';
import { TextInput } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Colors from '../constants/Colors';
import { auth } from '../app/_layout';
import DefaultButton from './DefaultButton';
import { banPlayer, kickPlayer } from '../util/dismissPlayer';
import CardView from './CardView';

function getName(index: number) {
  const uid = auth.currentUser?.uid
  const state = store.getState().gameState
  if (uid) {
    if (index == 0) {
      if (state.hamlet.user.id === uid) {
        return "Hamlet"
      } else if (state.claudius.user.id === uid) {
        return "Claudius"
      } else if (state.polonius.user.id === uid) {
        return "Polonius"
      } else if (state.gertrude.user.id === uid) {
        return "Gertrude"
      } 
    } else {
      let orderOfPlay = [...state.orderOfPlay]
      orderOfPlay = orderOfPlay.filter((e, item) => {
        if (e === "Hamlet" && state.hamlet.user.id !== uid) {
          return e
        }
        if (e === "Claudius" && state.claudius.user.id !== uid) {
          return e
        }
        if (e === "Polonius" && state.polonius.user.id !== uid) {
          return e
        }
        if (e === "Gertrude" && state.gertrude.user.id !== uid) {
  
          return e
        }
      })
      return orderOfPlay[index - 1]
    }
  }
  return ""
}

function RowItem({item, index}:{item: cardType, index: number}) {
  const gameState = useSelector((state: RootState) => state.gameState);
  const [itemGuess, setItemGuess] = useState<undefined | guessType>(undefined);
  const { width } = useSelector((state: RootState) => state.dimentions);
  useEffect(() => {
    const result = getGuess(item, index)
    setItemGuess(result)
  }, [gameState])
  return (
    <Pressable style={{height: 29, width: width * 0.15, overflow: 'hidden'}} onPress={() => {setGuess(item, index)}}>
      {(itemGuess === undefined) ?
        <View style={{width: (width * 0.15), height: 30, borderLeftWidth: (index !== 0) ? 1:0, borderRightWidth: 1, borderColor: Colors.main, backgroundColor: 'blue'}}/>:
        <>
          {itemGuess.level === "guess" ?
            <View style={{width: (width * 0.15), height: 30, borderLeftWidth: (index !== 0) ? 1:0, borderRightWidth: 1, borderColor: Colors.main, backgroundColor: 'red'}}/>:null
          }
          {itemGuess.level === "likely" ?
            <View style={{width: (width * 0.15), height: 30, borderLeftWidth: (index !== 0) ? 1:0, borderRightWidth: 1, borderColor: Colors.main, backgroundColor: 'orange'}}/>:null
          }
          {itemGuess.level === "known" ?
            <View style={{width: (width * 0.15), height: 30, borderLeftWidth: (index !== 0) ? 1:0, borderRightWidth: 1, borderColor: Colors.main, backgroundColor: "green"}}/>:null
          }
        </>
      }
    </Pressable>
  )
}

function RowImage({item}:{item: cardType}) {
  if (item === "Hamlet") {
    return (
      <Hamlet width={25} height={25} />
    )
  }
  if (item === "Claudius") {
    return (
      <Claudius width={25} height={25} />
    )
  }
  if (item === "Polonius") {
    return (
      <Polonius width={25} height={25} />
    )
  }
  if (item === "Gertrude") {
    return (
      <Gertrude width={25} height={25} />
    )
  }
  if (item === "Hemlock_Poison") {
    return (
      <HemlockPoison width={25} height={25} />
    )
  }
  if (item === "Sharpened_Rapier") {
    return (
      <SharpenedRapier width={25} height={25} />
    )
  }
  if (item === "Dagger") {
    return (
      <Dagger width={25} height={25} />
    )
  }
  if (item === "Axe") {
    return (
      <Axe width={25} height={25} />
    )
  }
  return null
}

function Row({item, name, end}:{item: cardType, name?: string, end?: 'top' | 'bottom'}) {
  const width = useSelector((state: RootState) => state.dimentions.width);
  return (
    <View style={{height: 30, width: (width * 0.8)-4, borderTopWidth: (end === 'top') ? 2:1, borderBottomWidth: (end === 'bottom') ? 2:1, flexDirection: 'row', overflow: 'hidden'}}>
      <View style={{width: width * 0.2, borderRightWidth: 2, borderColor: 'black', height: 29, flexDirection: 'row'}}>
        <View style={{marginTop: 'auto', marginBottom: 'auto', marginLeft: 5}}>
          <RowImage item={item} />
        </View>
        <Text adjustsFontSizeToFit numberOfLines={1} selectable={false} style={{fontFamily: 'Rubik-SemiBold', marginTop: 'auto', marginBottom: 'auto', marginLeft: 3}}>{name ? name:item}</Text>
      </View>
      <RowItem item={item} index={0}/>
      <RowItem item={item} index={1}/>
      <RowItem item={item} index={2}/>
      <RowItem item={item} index={3}/>
    </View>
  )
}

function Players() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const [userId, setUserId] = useState<string>("");
  const gameState = useSelector((state: RootState) => state.gameState);

  function getUserId() {
    const uid = auth.currentUser?.uid
    if (uid !== undefined) {
      setUserId(uid)
    }
  }

  useEffect(() => {
    getUserId();
  }, [gameState.master])

  return (
    <View>
      <View style={{backgroundColor: (userId === gameState.hamlet.user.id) ? '#dce0dd':"white", borderRadius: 15, borderWidth: 2, borderColor: 'black', width: width * 0.8 - 30, marginLeft: 'auto', marginRight: 'auto', marginBottom: 10}}>
        <View style={{margin: 15, flexDirection: 'row'}}>
          <View style={{width: 40}}>
            <Hamlet width={16.4} height={16.4} style={{margin: 'auto'}}/>
            <Text style={{fontSize: 8, marginLeft: 'auto', marginRight: 'auto'}}>Hamlet</Text>
          </View>
          <Text style={{marginTop: 'auto', marginBottom: 'auto', fontFamily: 'Rubik-SemiBold', marginLeft: 5}}>{gameState.hamlet.user.username}</Text>
          <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
            { gameState.hamlet.user.id === gameState.master ?
              <View style={{borderRadius: 15, backgroundColor: 'blue'}}>
                <Text style={{margin: 5, color: 'white'}}>Master</Text>
              </View>:null
            }
            { (userId === gameState.master && userId !== gameState.hamlet.user.id) ?
              <Pressable onPress={() => kickPlayer(gameState.claudius.user.id, gameState.gameId)} style={{borderRadius: 15, backgroundColor: 'red'}}>
                <Text style={{margin: 5, color: 'white'}}>Kick</Text>
              </Pressable>:null
            }
            { (userId === gameState.master && userId !== gameState.hamlet.user.id) ?
              <Pressable onPress={() => banPlayer(gameState.claudius.user.id, gameState.gameId)} style={{borderRadius: 15, backgroundColor: 'red'}}>
                <Text style={{margin: 5, color: 'white'}}>Ban</Text>
              </Pressable>:null
            }
          </View>
        </View>
      </View>
      <View style={{backgroundColor: (userId === gameState.claudius.user.id) ? '#dce0dd':"white",borderRadius: 15, borderWidth: 2, borderColor: 'black', width: width * 0.8 - 30, marginLeft: 'auto', marginRight: 'auto', marginBottom: 10}}>
        <View style={{margin: 15, flexDirection: 'row'}}>
          <View style={{width: 40}}>
            <Claudius width={16.4} height={16.4} style={{margin: 'auto'}}/>
            <Text style={{fontSize: 8, marginLeft: 'auto', marginRight: 'auto'}}>Claudius</Text>
          </View>
          <Text style={{marginTop: 'auto', marginBottom: 'auto', fontFamily: 'Rubik-SemiBold', marginLeft: 5}}>{gameState.claudius.user.username}</Text>
          <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
            { gameState.claudius.user.id === gameState.master ?
              <View style={{borderRadius: 15, backgroundColor: 'blue'}}>
                <Text selectable={false} style={{margin: 5, color: 'white'}}>Master</Text>
              </View>:null
            }
            { (userId === gameState.master && userId !== gameState.claudius.user.id) ?
              <Pressable onPress={() => kickPlayer(gameState.claudius.user.id, gameState.gameId)} style={{borderRadius: 15, backgroundColor: 'red', marginRight: 5}}>
                <Text selectable={false} style={{margin: 5, color: 'white'}}>Kick</Text>
              </Pressable>:null
            }
            { (userId === gameState.master && userId !== gameState.claudius.user.id) ?
              <Pressable onPress={() => banPlayer(gameState.claudius.user.id, gameState.gameId)} style={{borderRadius: 15, backgroundColor: 'red'}}>
                <Text selectable={false} style={{margin: 5, color: 'white'}}>Ban</Text>
              </Pressable>:null
            }
          </View>
        </View>
      </View>
      <View style={{backgroundColor: (userId === gameState.polonius.user.id) ? '#dce0dd':"white",borderRadius: 15, borderWidth: 2, borderColor: 'black', width: width * 0.8 - 30, marginLeft: 'auto', marginRight: 'auto', marginBottom: 10}}>
        <View style={{margin: 15, flexDirection: 'row'}}>
          <View style={{width: 40}}>
            <Polonius width={16.4} height={16.4} style={{margin: 'auto'}}/>
            <Text style={{fontSize: 8, marginLeft: 'auto', marginRight: 'auto'}}>Polonius</Text>
          </View>
          <Text style={{marginTop: 'auto', marginBottom: 'auto', fontFamily: 'Rubik-SemiBold', marginLeft: 5}}>{gameState.polonius.user.username}</Text>
          <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
            { gameState.polonius.user.id === gameState.master ?
              <View style={{borderRadius: 15, backgroundColor: 'blue'}}>
                <Text selectable={false} style={{margin: 5, color: 'white'}}>Master</Text>
              </View>:null
            }
            { (userId === gameState.master && userId !== gameState.polonius.user.id) ?
              <Pressable onPress={() => kickPlayer(gameState.claudius.user.id, gameState.gameId)} style={{borderRadius: 15, backgroundColor: 'red', marginRight: 5}}>
                <Text selectable={false} style={{margin: 5, color: 'white'}}>Kick</Text>
              </Pressable>:null
            }
            { (userId === gameState.master && userId !== gameState.polonius.user.id) ?
              <Pressable onPress={() => banPlayer(gameState.claudius.user.id, gameState.gameId)} style={{borderRadius: 15, backgroundColor: 'red'}}>
                <Text selectable={false} style={{margin: 5, color: 'white'}}>Ban</Text>
              </Pressable>:null
            }
          </View>
        </View>
      </View>
      <View style={{backgroundColor: (userId === gameState.gertrude.user.id) ? '#dce0dd':"white",borderRadius: 15, borderWidth: 2, borderColor: 'black', width: width * 0.8 - 30, marginLeft: 'auto', marginRight: 'auto', marginBottom: 10}}>
        <View style={{margin: 15, flexDirection: 'row'}}>
          <View style={{width: 40}}>
            <Gertrude width={16.4} height={16.4} style={{margin: 'auto'}}/>
            <Text style={{fontSize: 8, marginLeft: 'auto', marginRight: 'auto'}}>Gertrude</Text>
          </View>
          <Text style={{marginTop: 'auto', marginBottom: 'auto', fontFamily: 'Rubik-SemiBold', marginLeft: 5}}>{gameState.gertrude.user.username}</Text>
          <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
            { gameState.gertrude.user.id === gameState.master ?
              <View style={{borderRadius: 15, backgroundColor: 'blue'}}>
                <Text selectable={false} style={{margin: 5, color: 'white'}}>Master</Text>
              </View>:null
            }
            { (userId === gameState.master && userId !== gameState.gertrude.user.id) ?
              <Pressable onPress={() => kickPlayer(gameState.claudius.user.id, gameState.gameId)} style={{borderRadius: 15, backgroundColor: 'red', marginRight: 5}}>
                <Text selectable={false} style={{margin: 5, color: 'white'}}>Kick</Text>
              </Pressable>:null
            }
            { (userId === gameState.master && userId !== gameState.gertrude.user.id) ?
              <Pressable onPress={() => banPlayer(gameState.claudius.user.id, gameState.gameId)} style={{borderRadius: 15, backgroundColor: 'red'}}>
                <Text selectable={false} style={{margin: 5, color: 'white'}}>Ban</Text>
              </Pressable>:null
            }
          </View>
        </View>
      </View>
    </View>
  )
}

function getUserCards() {
  const uid = auth.currentUser?.uid
  if (uid) {
    const state = store.getState().gameState
    if (state.hamlet.user.id === uid) {
      return state.hamlet.cards
    } else if (state.claudius.user.id === uid) {
      return state.claudius.cards
    } else if (state.polonius.user.id === uid) {
      return state.polonius.cards
    } else if (state.gertrude.user.id === uid) {
      return state.gertrude.cards
    }
  }
  return []
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
        setNotes(state.claudius.notes)
      } else if (state.polonius.user.id === uid) {
        setNotes(state.polonius.notes)
      } else if (state.gertrude.user.id === uid) {
        setNotes(state.gertrude.notes)
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
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: 15, marginTop: 15, marginBottom: 15}}>Characters</Text>
            <View style={{marginBottom: 2, marginTop: 'auto', flexDirection: 'row', marginLeft: 'auto'}}>
              <Text style={{width: width * 0.15, textAlign: 'center'}}>{getName(0)}</Text>
              <Text style={{width: width * 0.15, textAlign: 'center'}}>{getName(1)}</Text>
              <Text style={{width: width * 0.15, textAlign: 'center'}}>{getName(2)}</Text>
              <Text style={{width: width * 0.15, textAlign: 'center'}}>{getName(3)}</Text>
            </View>
          </View>
          <Row item={'Hamlet'} end='top'/>
          <Row item={'Claudius'}/>
          <Row item={'Polonius'}/>
          <Row item={'Gertrude'} end='bottom'/>
          <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: 15, marginTop: 15, marginBottom: 15}}>Weapons</Text>
          <Row item={'Hemlock_Poison'} name='Hemlock Poison' end='top'/>
          <Row item={'Sharpened_Rapier'} name='Sharpened Rapier'/>
          <Row item={'Axe'}/>
          <Row item={'Dagger'} end='bottom'/>
          <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: 15, marginTop: 15, marginBottom: 15}}>Rooms</Text>
          <Row item={'Gun_Platform'} name='Gun Platform' end='top'/>
          <Row item={'Great_Hall'} name='Great Hall'/>
          <Row item={'Fencing_Room'} name='Fencing Room'/>
          <Row item={'Court_Yard'} name='Court Yard'/>
          <Row item={'Royal_Bedroom'} name='Royal Bedroom'/>
          <Row item={'Chapel'}/>
          <Row item={'Throne_Room'} name='Throne Room'/>
          <Row item={'Stair_Well'} name='Stair Well' end='bottom'/>
          <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: 15, marginTop: 15, marginBottom: 15}}>Your Cards</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            { getUserCards().map((e) => (
              <View key={e} style={{marginBottom: 10, marginLeft: 'auto', marginRight: 'auto', overflow: 'hidden', borderRadius: 15, borderWidth: 2, borderColor: 'black'}}>
                <CardView card={e} width={width * 0.2} height={height * 0.2}/>
              </View>
            ))}
          </View>
          <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: 15, marginTop: 15, marginBottom: 15}}>Notes</Text>
          <TextInput numberOfLines={10} style={{marginLeft: "auto", marginRight: "auto", width: width * 0.75, marginBottom: 10, padding: 8, borderWidth: 2, borderColor: "black", borderRadius: 15}} multiline value={notes} onChangeText={setNotes} />
          <DefaultButton onPress={() => {
            updateNotes(notes)
          }} style={{width: width * 0.6, marginLeft: 'auto', marginRight: 'auto', marginBottom: 15}} text='Update Notes'/>
          <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: 15, marginTop: 15, marginBottom: 15}}>Players</Text>
          <Players />
        </ScrollView>
      </View>
    </>
  )
}