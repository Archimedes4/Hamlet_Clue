import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { GoogleIcon } from '../../components/Icons'
import { GoogleAuthProvider, getAuth, getRedirectResult, signInWithRedirect } from 'firebase/auth';
import { router } from 'expo-router';
import { handleGoogleRedirect, signIn, signInWithGoogle } from '../../util/authentication';
import { loadingStateEnum } from '../../constants/PiecesLocations';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Colors from '../../constants/Colors';

export default function login() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [googleHover, setGoogleHover] = useState<boolean>(false)
  const [loginState, setLoginState] = useState<loadingStateEnum>(loadingStateEnum.notStarted);
  async function login() {
    setLoginState(loadingStateEnum.loading)
    const result = await signIn(email, password)
    setLoginState(result);
    if (result === loadingStateEnum.success) {
      router.push('/')
    }
  }
  useEffect(() => {
    handleGoogleRedirect();
  }, [])
  return (
    <View style={{width: width, height: height, backgroundColor: Colors.main}}>
      <Text>Login</Text>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail}/>
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword}/>
      <Pressable onPress={() => login()}>
        { (loginState === loadingStateEnum.notStarted) ?
          <Text>Create</Text>:null
        }
        { (loginState === loadingStateEnum.loading) ?
          <ActivityIndicator />:null
        }
        { (loginState === loadingStateEnum.failed) ?
          <Text>Failed</Text>:null
        }
        { (loginState === loadingStateEnum.success) ?
          <Text>Success!</Text>:null
        }
      </Pressable>
      <Pressable style={{flexDirection: 'row', padding: 20, marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'white'}} onPress={() => signInWithGoogle()}>
        <GoogleIcon width={14} height={14}/>
        <Text>Login With Google</Text>
      </Pressable>
      <Pressable style={{marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'white'}} onPress={() => {router.push('/create-account')}}>
        <Text style={{padding: 10}}>Create Account</Text>
      </Pressable>
    </View>
  )
}