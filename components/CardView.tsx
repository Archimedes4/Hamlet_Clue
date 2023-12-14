import { View, Text, Image } from "react-native";
import { Axe, Claudius, Dagger, Gertrude, Hamlet, HemlockPoison, Polonius, SharpenedRapier } from "./Icons";
import Colors from "../constants/Colors";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from "react";

export default function CardView({card, width, height}:{card: cardType, width: number, height: number}) {
  const [fontsLoaded, fontError] = useFonts({
    'RubikBubbles-Regular': require("../assets/fonts/RubikBubbles-Regular.ttf"),
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
    <View style={{width: width, height: height, paddingTop: 2}} onLayout={onLayoutRootView}>
      { (card === "Hamlet") ?
        <Hamlet width={width} height={height * 0.8}/>:null
      }
      { (card === "Claudius") ?
        <Claudius width={width} height={height * 0.8}/>:null
      }
      { (card === "Polonius") ?
        <Polonius width={width} height={height * 0.8}/>:null
      }
      { (card === "Gertrude") ?
        <Gertrude width={width} height={height * 0.8}/>:null
      }
      { (card === "Hemlock_Poison") ?
        <HemlockPoison width={width} height={height * 0.8}/>:null
      }
      { (card === "Sharpened_Rapier") ?
        <SharpenedRapier width={width} height={height * 0.8}/>:null
      }
      { (card === "Axe") ?
        <Axe width={width} height={height * 0.8}/>:null
      }
      { (card === "Dagger") ?
        <Dagger width={width} height={height * 0.8}/>:null
      }
      { (card === "Gun_Platform") ?
        <Image source={require('../assets/roomIcons/Gun_Platform.jpg')} style={{width, height: height * 0.8 + 4, position: 'absolute', top: -2}}/>:null
      }
      { (card === "Great_Hall") ?
        <Image source={require('../assets/roomIcons/Great_Hall.png')} style={{width, height: height * 0.8 + 4, position: 'absolute', top: -2}}/>:null
      }
      { (card === "Fencing_Room") ?
        <Image source={require('../assets/roomIcons/Fencing_Room.png')} style={{width, height: height * 0.8 + 4, position: 'absolute', top: -2}}/>:null
      }
      { (card === "Court_Yard") ?
        <Image source={require('../assets/roomIcons/Court_Yard.png')} style={{width, height: height * 0.8+ 4, position: 'absolute', top: -2}}/>:null
      }
      { (card === "Royal_Bedroom") ?
        <Image source={require('../assets/roomIcons/Royal_Bedroom.png')} style={{width, height: height * 0.8 + 4, position: 'absolute', top: -2}}/>:null
      }
      { (card === "Chapel") ?
        <Image source={require('../assets/roomIcons/Chapel.png')} style={{width, height: height * 0.8 + 4, position: 'absolute', top: -2}}/>:null
      }
      { (card === "Throne_Room") ?
        <Image source={require('../assets/roomIcons/Throne_Room.jpg')} style={{width, height: height * 0.8 + 2}}/>:null
      }
      { (card === "Stair_Well") ?
        <Image source={require('../assets/roomIcons/Stair_Well.png')} style={{width, height: height * 0.8 + 2}}/>:null
      }
      <View style={{width: width, height: height * 0.2 - 2, backgroundColor: Colors.main, position: 'absolute', top: height * 0.8 + 2}}>
        <Text style={{margin: 'auto', color: 'white', fontFamily: 'RubikBubbles-Regular'}}>{card.replace("_", " ")}</Text>
      </View>
    </View>
  )
}