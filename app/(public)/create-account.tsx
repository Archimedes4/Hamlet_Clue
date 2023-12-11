import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React, { useCallback, useState } from 'react'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { TextInput } from 'react-native-gesture-handler';
import { signIn, signUp } from '../../util/authentication';
import { router } from 'expo-router';
import { loadingStateEnum } from '../../constants/PiecesLocations';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import DefaultButton from '../../components/DefaultButton';

function getCreateText(state: loadingStateEnum): string | undefined {
  if (state  === loadingStateEnum.notStarted) {
    return 'Create Account'
  } else if (state  === loadingStateEnum.failed) {
    return 'Failed to Create'
  } else if (state  === loadingStateEnum.loading) {
    return undefined
  } else if (state  === loadingStateEnum.success) {
    return 'Success'
  }
}

export default function createAccount() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("")
  const [authState, setAuthState] = useState<loadingStateEnum>(loadingStateEnum.notStarted);
  async function createUser() {
    setAuthState(loadingStateEnum.loading)
    setAuthState(await signUp(email, password))
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

  return (
    <View onLayout={onLayoutRootView} style={{width: width, height: height, backgroundColor: Colors.main}}>
      <Text style={{fontFamily: 'RubikBubbles-Regular', color: Colors.royalRed, fontSize: height * 0.1, marginLeft: 20, marginTop: 25}}>Create Account</Text>
      <Text style={{color: 'white', fontFamily: 'Rubik-SemiBold', marginLeft: width * 0.11, fontSize: height * 0.035, marginTop: height * 0.04}}>Email</Text>
      <TextInput style={{marginLeft: 'auto', marginRight: 'auto', width: width * 0.8, marginTop: 10, backgroundColor: 'white', borderRadius: 5, padding: 20, borderWidth: 2, borderColor: 'black'}} value={email} onChangeText={setEmail}/>
      <Text style={{color: 'white', fontFamily: 'Rubik-SemiBold', marginLeft: width * 0.11, fontSize: height * 0.035, marginTop: height * 0.04}}>Password</Text>
      <TextInput style={{marginLeft: 'auto', marginRight: 'auto', width: width * 0.8, marginTop: 10, backgroundColor: 'white', borderRadius: 5, padding: 20, borderWidth: 2, borderColor: 'black'}} value={password} onChangeText={setPassword}/>
      <DefaultButton style={{marginLeft: 'auto', marginRight: 'auto', width: width * 0.8, marginTop: 20}} onPress={() => createUser()} text={getCreateText(authState)}>
        { (authState === loadingStateEnum.loading) ?
          <ActivityIndicator />:null
        }
      </DefaultButton>
      <DefaultButton style={{marginLeft: 'auto', marginRight: 'auto', width: width * 0.8, marginTop: 20}} onPress={() => {router.push('/login')}} text='Back'/>
    </View>
  )
}