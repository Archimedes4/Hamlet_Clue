import { View, Text, ScrollView } from 'react-native'
import React, { useCallback } from 'react'
import DefaultButton from '../../components/DefaultButton'
import { router } from 'expo-router'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Colors from '../../constants/Colors';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function rules() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const [fontsLoaded, fontError] = useFonts({
    'RubikBubbles-Regular': require("../../assets/fonts/RubikBubbles-Regular.ttf"),
    'Rubik-SemiBold': require("../../assets/fonts/Rubik-SemiBold.ttf"),
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
    <ScrollView style={{width, height, backgroundColor: Colors.main}} onLayout={onLayoutRootView}>
      <DefaultButton style={{marginLeft: 10, marginTop: 10}} onPress={() => {router.push("/")}} text='Back'/>
      <Text style={{fontFamily: 'RubikBubbles-Regular', margin: 15, width: width -30, color: Colors.royalRed, fontSize: 25}}>Clue: A Hamlet History Rule Set</Text>
      <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: 15, marginTop: 15, marginBottom: 15, color: 'white'}}>Objective</Text>
      <View style={{width: width - 30, marginLeft: 'auto', marginRight: 'auto'}}>
        <Text style={{color: 'white'}}>The objective of the game is to determine who killed Ophelia, with which weapon, and in which room.</Text>
      </View>
      <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: 15, marginTop: 15, marginBottom: 15, color: 'white'}}>Setup</Text>
      <View style={{width: width - 30, marginLeft: 'auto', marginRight: 'auto'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 5, height: 5, borderRadius: 2.5, marginTop: 5.7, backgroundColor: 'white', marginRight: 5}}/>
          <Text style={{color: 'white', marginBottom: 2}}>Place the game board in the center of the table.</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 5, height: 5, borderRadius: 2.5, marginTop: 5.7, backgroundColor: 'white', marginRight: 5}}/>
          <Text style={{color: 'white', marginBottom: 2}}>Each player chooses a character (Hamlet, Gertrude, Claudius, or Polonius) and takes the corresponding-coloured pawn.</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 5, height: 5, borderRadius: 2.5, marginTop: 5.7, backgroundColor: 'white', marginRight: 5}}/>
          <Text style={{color: 'white', marginBottom: 2}}>Each player receives a detective notepad.</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 5, height: 5, borderRadius: 2.5, marginTop: 5.7, backgroundColor: 'white', marginRight: 5}}/>
          <Text style={{color: 'white', marginBottom: 2}}>The weapon cards (Hemlock Poison, Sharpened Rapier, Axe, Dagger) are separated from the suspect and room cards.</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 5, height: 5, borderRadius: 2.5, marginTop: 5.7, backgroundColor: 'white', marginRight: 5}}/>
          <Text style={{color: 'white', marginBottom: 2}}>Shuffle the three decks (suspects, weapons, and rooms) separately, and randomly select one card from each deck without looking at them.</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 5, height: 5, borderRadius: 2.5, marginTop: 5.7, backgroundColor: 'white', marginRight: 5}}/>
          <Text style={{color: 'white'}}>Place the three chosen cards into the murder envelope. The envelope is placed in the center of the board.</Text>
        </View>
      </View>
      <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: 15, marginTop: 15, marginBottom: 15, color: 'white'}}>Gameplay</Text>
      <View style={{width: width - 30, marginLeft: 'auto', marginRight: 'auto'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 5, height: 5, borderRadius: 2.5, marginTop: 5.7, backgroundColor: 'white', marginRight: 5}}/>
          <Text style={{color: 'white', marginBottom: 2}}>Players take turns clockwise.</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 5, height: 5, borderRadius: 2.5, marginTop: 5.7, backgroundColor: 'white', marginRight: 5}}/>
          <Text style={{color: 'white', marginBottom: 2}}>Roll the dice and move your pawn around the board.</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 5, height: 5, borderRadius: 2.5, marginTop: 5.7, backgroundColor: 'white', marginRight: 5}}/>
          <Text style={{color: 'white', marginBottom: 2}}>Enter a room by moving into a doorway. Once in a room, make a suggestion regarding the suspect, weapon, and room to the other players. The room that is suggested is the room entered. For example, "I suggest it was Colonel Mustard with the candlestick in the library."</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 5, height: 5, borderRadius: 2.5, marginTop: 5.7, backgroundColor: 'white', marginRight: 5}}/>
          <Text style={{color: 'white', marginBottom: 2}}>The player to the left must show you one of the suggested cards if it is in their hand. If they have more than one, they choose which to show. If a player has none of the suggested cards, the next player in turn order shows a card.</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 5, height: 5, borderRadius: 2.5, marginTop: 5.7, backgroundColor: 'white', marginRight: 5}}/>
          <Text style={{color: 'white', marginBottom: 2}}>Mark the information on your detective notepad.</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 5, height: 5, borderRadius: 2.5, marginTop: 5.7, backgroundColor: 'white', marginRight: 5}}/>
          <Text style={{color: 'white', marginBottom: 2}}>The game continues clockwise with the next player's turn.</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 5, height: 5, borderRadius: 2.5, marginTop: 5.7, backgroundColor: 'white', marginRight: 5}}/>
          <Text style={{color: 'white'}}>Players can make an accusation at any time during their turn by stating the solution (suspect, weapon, and room). They can suggest any room even a room that they are not in. If correct, they win the game. If incorrect, they are out of the game, and play continues without them.</Text>
        </View>
      </View>
      <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: 15, marginTop: 15, marginBottom: 15, color: 'white'}}>Winning</Text>
      <View style={{width: width - 30, marginLeft: 'auto', marginRight: 'auto'}}>
        <Text style={{color: 'white'}}>To win, a player must correctly guess the suspect, weapon, and room by making an accusation. The player who correctly accuses wins the game.</Text>
      </View>
      <Text style={{fontFamily: 'Rubik-SemiBold', marginLeft: 15, marginTop: 15, marginBottom: 15, color: 'white'}}>Notes</Text>
      <View style={{width: width - 30, marginLeft: 'auto', marginRight: 'auto', marginBottom: 15}}>
        <Text style={{color: 'white'}}>Players must keep their cards secret and only reveal them when showing a card in response to a suggestion. The game combines deduction and strategy as players work to eliminate possibilities and solve the murder mystery.</Text>
      </View>
    </ScrollView>
  )
}