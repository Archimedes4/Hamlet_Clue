/*
  Hamlet Clue
  Andrew Mainella
  account.tsx
  Holds main account information with games played and the possiblity to update the users username.
*/
import { View, Text, TextInput, ActivityIndicator, FlatList, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import store, { RootState } from '../../redux/store';
import Colors from '../../constants/Colors';
import DefaultButton from '../../components/DefaultButton';
import { router } from 'expo-router';
import { loadingStateEnum } from '../../constants/PiecesLocations';
import { logOut } from '../../util/authentication';
import { checkIfUsernameAvaliable, getPlayerGames, updateUserInfo } from '../../util/userInformation';
import { MagnifyingGlass } from '../../components/Icons';
import { auth } from '../_layout';
import joinGame from '../../util/joinGame';

enum usernameValidation {
  toShort,
  exists,
  loading,
  good,
  failed,
  success,
  original
}

function getUsernameButtonText(state: usernameValidation) {
  if (state === usernameValidation.good) {
    return "Set Username & Continue"
  }
  if (state === usernameValidation.toShort) {
    return "The Username Is Too Short!"
  }
  if (state === usernameValidation.exists) {
    return "That Username Already Exists"
  }
  if (state === usernameValidation.loading) {
    return undefined
  }
  if (state === usernameValidation.failed) {
    return "Something Went Wrong. ):"
  }
  if (state === usernameValidation.success) {
    return "Username Changed!"
  }
  if (state === usernameValidation.original) {
    return "Username Unchanged."
  }
}

export default function Account() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const [username, setUsername] = useState<string>(store.getState().username);
  const [usernameStatus, setUsernameStatus] = useState<usernameValidation>(usernameValidation.toShort);
  const [signOutState, setSignOutState] = useState<loadingStateEnum>(loadingStateEnum.notStarted);
  const [data, setData] = useState<string[]>([]);

  async function signOut() {
    setSignOutState(loadingStateEnum.loading)
    const result = await logOut()
    setSignOutState(result)
  }
  async function createUser() {
    const uid = auth.currentUser?.uid
    if (usernameStatus === usernameValidation.good && uid !== undefined) {
      setUsernameStatus(usernameValidation.loading)
      const result = await updateUserInfo(uid, username)
      if (result === loadingStateEnum.success) {
        setUsernameStatus(usernameValidation.success)
      } else {
        setUsernameStatus(usernameValidation.failed)
      }
    }
  }
  async function checkUsername(newName: string) {
    if (newName.length < 2) {
      setUsernameStatus(usernameValidation.toShort)
    } else {
      setUsernameStatus(usernameValidation.loading)
      const result = await checkIfUsernameAvaliable(newName)
      if (result) {
        setUsernameStatus(usernameValidation.good)
      } else {
        if (username === store.getState().username) {
          setUsernameStatus(usernameValidation.original)
        } else {
          setUsernameStatus(usernameValidation.exists)
        }
      }
    }
  }

  async function getPlayerData() {
    const result = await getPlayerGames()
    setData(result)
  }

  useEffect(() => {
    getPlayerData();
  }, [])

  useEffect(() => {
    checkUsername(username)
  }, [username])

  return (
    <ScrollView style={{width: width, height: height, backgroundColor: Colors.main}}>
      <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 20}}>
        <Text style={{fontFamily: 'RubikBubbles-Regular', color: Colors.royalRed, fontSize: height * 0.1}}>Hamlet Clue</Text>
        <MagnifyingGlass width={height * 0.1} height={height * 0.1} style={{marginLeft: 20, marginTop: 10}}/>
      </View>
      <Text style={{color: 'white', fontFamily: 'Rubik-SemiBold', marginLeft: width * 0.11, fontSize: height * 0.035, marginTop: height * 0.04}}>Please Pick a Username</Text>
      <TextInput style={{marginLeft: 'auto', marginRight: 'auto', width: width * 0.8, marginTop: 10, backgroundColor: 'white', borderRadius: 5, padding: 20, borderWidth: 2, borderColor: 'black'}} value={username} onChangeText={setUsername}/>
      <DefaultButton style={{width: width * 0.8, marginLeft: 'auto', marginRight: 'auto', marginTop: height * 0.04}} onPress={() => createUser()} text={getUsernameButtonText(usernameStatus)}>
        { (usernameStatus === usernameValidation.loading) ?
          <ActivityIndicator  style={{margin: 20}}/>:null
        }
      </DefaultButton>
      <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: width * 0.11, marginTop: 15, marginBottom: 15, color: 'white'}}>Past Games</Text>
      { (data.length === 0) ? 
        <View style={{height: height * 0.3, width}}>
          <Text style={{margin: 'auto', fontFamily: 'RubikBubbles-Regular', color: 'white'}}>Your past games will appear here.</Text>
        </View>:
        <FlatList style={{height: height * 0.3}} data={data} renderItem={(e) => (
          <Pressable onPress={() => joinGame(e.item)} style={{borderWidth: 2, borderColor: 'black', borderRadius: 25, marginLeft: 'auto', marginRight: 'auto', width: width * 0.8, backgroundColor: 'white', marginBottom: 5}}>
            <Text style={{margin: 10}}>{e.item}</Text>
          </Pressable>
        )}/>
      }
      <DefaultButton style={{width: width * 0.8, marginLeft: 'auto', marginRight: 'auto', marginTop: height * 0.04}} onPress={() => signOut()} text='Sign Out'/>
      <DefaultButton style={{width: width * 0.8, marginLeft: 'auto', marginRight: 'auto', marginTop: height * 0.04, marginBottom: 5}} onPress={() => router.push('/')} text='Back'/>
    </ScrollView>
  )
}