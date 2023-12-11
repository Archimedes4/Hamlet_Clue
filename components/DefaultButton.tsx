import { View, Text, Pressable, StyleProp, ViewStyle, TextStyle } from 'react-native'
import React, { ReactNode, useCallback, useState } from 'react'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function DefaultButton({onPress, children, style, text, textStyle, Icon}:{onPress: () => void, children?: ReactNode, style?: StyleProp<ViewStyle>, text?: string, textStyle?: StyleProp<TextStyle>, Icon?: ({hover}:{hover: boolean}) => ReactNode}) {
  const [isHover, setIsHover] = useState<boolean>(false)
  const [fontsLoaded, fontError] = useFonts({
    'Rubik-SemiBold': require("../assets/fonts/Rubik-SemiBold.ttf")
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
    <Pressable onLayout={onLayoutRootView} onPress={() => onPress()} style={[{borderRadius: 15, borderWidth: 2, borderColor: 'black', backgroundColor: isHover ? 'black':'white', height: 56.4}, style]} onHoverIn={() => setIsHover(true)} onHoverOut={() => setIsHover(false)}>
      {(Icon !== undefined) ?
        <Icon hover={isHover} />:null
      }
      {children}
      { (text !== undefined) ?
        <Text selectable={false} style={[{fontFamily: 'Rubik-SemiBold', margin: 20, color: isHover ? 'white':'black'}, textStyle]}>{text}</Text>:null
      }
    </Pressable>
  )
}