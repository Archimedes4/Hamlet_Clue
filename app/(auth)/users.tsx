import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function users() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  return (
    <View>
      <Text>users</Text>
    </View>
  )
}