import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { TextInput } from 'react-native-gesture-handler';
import { signIn, signUp } from '../../util/authentication';
import { router } from 'expo-router';
import { loadingStateEnum } from '../../constants/PiecesLocations';

export default function createAccount() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("")
  const [authState, setAuthState] = useState<loadingStateEnum>(loadingStateEnum.notStarted);
  async function createUser() {
    setAuthState(loadingStateEnum.loading)
    setAuthState(await signUp(email, password))
  }
  return (
    <View>
      <Pressable onPress={() => {router.push('/login')}}>
        <Text>Back</Text>
      </Pressable>
      <Text>create-account</Text>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail}/>
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword}/>
      <Pressable onPress={() => createUser()}>
        { (authState === loadingStateEnum.notStarted) ?
          <Text>Create</Text>:null
        }
        { (authState === loadingStateEnum.loading) ?
          <ActivityIndicator />:null
        }
        { (authState === loadingStateEnum.failed) ?
          <Text>Failed</Text>:null
        }
        { (authState === loadingStateEnum.success) ?
          <Text>Success!</Text>:null
        }
      </Pressable>
    </View>
  )
}