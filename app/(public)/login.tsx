import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { GoogleIcon, MagnifyingGlass } from '../../components/Icons'
import { GoogleAuthProvider, getAuth, getRedirectResult, signInWithRedirect } from 'firebase/auth';
import { router } from 'expo-router';
import { signIn, signInWithGoogle } from '../../util/authentication';
import { loadingStateEnum } from '../../constants/PiecesLocations';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Colors from '../../constants/Colors';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import useGoogleRedirect from '../../hooks/useGoogleRedirect';
import DefaultButton from '../../components/DefaultButton';

SplashScreen.preventAutoHideAsync();

function getLoginText(state: loadingStateEnum): string | undefined {
  if (state  === loadingStateEnum.notStarted) {
    return 'login'
  } else if (state  === loadingStateEnum.failed) {
    return 'failed'
  } else if (state  === loadingStateEnum.loading) {
    return undefined
  } else if (state  === loadingStateEnum.success) {
    return 'success'
  }
}

export default function login() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [googleHover, setGoogleHover] = useState<boolean>(false)
  const [loginState, setLoginState] = useState<loadingStateEnum>(loadingStateEnum.notStarted);
  const isLoading = useGoogleRedirect();
  
  async function login() {
    setLoginState(loadingStateEnum.loading)
    const result = await signIn(email, password)
    setLoginState(result);
    if (result === loadingStateEnum.success) {
      router.push('/')
    }
  }

  const [fontsLoaded, fontError] = useFonts({
    'RubikBubbles-Regular': require("../../assets/fonts/RubikBubbles-Regular.ttf"),
    'Rubik-Regular': require("../../assets/fonts/Rubik-Regular.ttf"),
    'Rubik-SemiBold': require("../../assets/fonts/Rubik-SemiBold.ttf")
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  
  if (isLoading) {
    return (
      <View style={{width: width, height: height, backgroundColor: Colors.main}}>
        <ActivityIndicator color={'white'} size={'large'} style={{margin: 'auto'}}/>
      </View>
    )
  }

  return (
    <View style={{width: width, height: height, backgroundColor: Colors.main}} onLayout={onLayoutRootView}>
      <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 20}}>
        <Text style={{fontFamily: 'RubikBubbles-Regular', color: Colors.royalRed, fontSize: height * 0.1}}>Hamlet Clue</Text>
        <MagnifyingGlass width={height * 0.1} height={height * 0.1} style={{marginLeft: 20, marginTop: 10}}/>
      </View>
      <Text style={{fontFamily: 'Rubik-Regular', color: 'white', marginLeft: 25, fontSize: height * 0.025}}>By Andrew Mainella & Diego Bueti</Text>
      <Text style={{color: 'white', fontFamily: 'Rubik-SemiBold', marginLeft: width * 0.11, fontSize: height * 0.035, marginTop: height * 0.04}}>Email</Text>
      <TextInput style={{marginLeft: 'auto', marginRight: 'auto', width: width * 0.8, marginTop: 10, backgroundColor: 'white', borderRadius: 5, padding: 20, borderWidth: 2, borderColor: 'black'}} value={email} onChangeText={setEmail}/>
      <Text style={{color: 'white', fontFamily: 'Rubik-SemiBold', marginLeft: width * 0.11, fontSize: height * 0.035, marginTop: height * 0.04}}>Password</Text>
      <TextInput style={{marginLeft: 'auto', marginRight: 'auto', width: width * 0.8, marginTop: 10, backgroundColor: 'white', borderRadius: 5, padding: 20, borderWidth: 2, borderColor: 'black'}} value={password} onChangeText={setPassword}/>
      <DefaultButton onPress={() => login()} style={{marginLeft: 'auto', marginRight: 'auto', width: width * 0.8, marginTop: 20}} text={getLoginText(loginState)}>
        { (loginState === loadingStateEnum.loading) ?
          <ActivityIndicator color={'white'} style={{marginTop: 'auto', marginBottom: 'auto'}}/>:null
        }
      </DefaultButton>
      <DefaultButton style={{marginLeft: 'auto', marginRight: 'auto', width: width * 0.8, marginTop: 20}} onPress={() => {router.push('/create-account')}} text='Create Account' />
      <DefaultButton onPress={() => signInWithGoogle()} style={{marginLeft: 'auto', marginRight: 'auto', width: width * 0.8, marginTop: 20, flexDirection: 'row'}} text='Login With Google' textStyle={{marginRight: 'auto', marginLeft: 5}}>
        <GoogleIcon width={20} height={20} style={{marginLeft: 'auto', paddingTop: 18.2}}/>
      </DefaultButton>
    </View>
  )
}