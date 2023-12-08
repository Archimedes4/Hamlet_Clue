import React, { useState } from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import Colors from '../constants/Colors';

function roleDie() {
  return Math.floor(Math.random() * (4) + 1)
}

export default function Option() {
  const [dieOne, setDieOne] = useState<number>(roleDie());
  const [dieTwo, setDieTwo] = useState<number>(roleDie());
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'orange'}}>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Text>{dieOne}</Text>
        </View>
        <Text>+</Text>
        <View>
          <Text>{dieTwo}</Text>
        </View>
        <Text>=</Text>
        <View>
          <Text>{dieOne + dieTwo}</Text>
        </View>
      </View>
      <Pressable onPress={() => {

      }}>
        <Text>Role Dice</Text>
      </Pressable>
    </View>
  );
}