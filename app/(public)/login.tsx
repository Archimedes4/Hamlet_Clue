import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { GoogleIcon } from '../../components/Icons'
import { GoogleAuthProvider, getAuth, getRedirectResult, signInWithRedirect } from 'firebase/auth';
import { router } from 'expo-router';
import { handleGoogleRedirect, signIn, signInWithGoogle } from '../../util/authentication';
import { loadingStateEnum } from '../../constants/PiecesLocations';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Colors from '../../constants/Colors';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

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

  const [fontsLoaded, fontError] = useFonts({
    'RubikBubbles-Regular': require("../../assets/fonts/RubikBubbles-Regular.ttf"),
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
    <View style={{width: width, height: height, backgroundColor: Colors.main}} onLayout={onLayoutRootView}>
      <Text style={{fontFamily: 'RubikBubbles-Regular', color: "#AB2330", fontSize: height * 0.1, marginTop: 20, marginLeft: 20}}>Hamlet Clue</Text>
      <Text>Login</Text>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail}/>
      <Text>Password</Text>
      <TextInput style={{marginLeft: 'auto', marginRight: 'auto', width: width * 0.6, marginTop: 10, backgroundColor: 'white', borderRadius: 15, padding: 20}} value={password} onChangeText={setPassword}/>
      <Pressable onPress={() => login()}>
        { (loginState === loadingStateEnum.notStarted) ?
          <Text>Login</Text>:null
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
      <Pressable style={{flexDirection: 'row', width: width * 0.6, padding: 20, marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'white', borderRadius: 15}} onPress={() => signInWithGoogle()}>
        <GoogleIcon width={16.4} height={16.4} style={{marginLeft: 'auto'}}/>
        <Text style={{marginRight: 'auto', marginLeft: 5}}>Login With Google</Text>
      </Pressable>
      <Pressable style={{marginLeft: 'auto', marginRight: 'auto', width: width * 0.6, marginTop: 10, backgroundColor: 'white', borderRadius: 15}} onPress={() => {router.push('/create-account')}}>
        <Text style={{padding: 20}}>Create Account</Text>
      </Pressable>
    </View>
  )
}