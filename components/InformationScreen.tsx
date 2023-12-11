import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function InformationScreen() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
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
      <View onLayout={onLayoutRootView} style={{width: width * 0.8, height: height * 0.8, margin: 'auto', backgroundColor: 'white', borderRadius: 30, borderWidth: 2, borderColor: 'black'}}>
        
      </View>
    </>
  )
}