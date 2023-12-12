import { View, ActivityIndicator } from 'react-native'
import React from 'react'
import { Redirect, Slot } from 'expo-router'
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { authState } from '../../constants/PiecesLocations';
import Colors from '../../constants/Colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

export default function AuthHolder() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const isAuth = useIsAuthenticated()
  if (isAuth === authState.authenticatedWithAccount) {
    return <Slot screenOptions={{ title: 'My home' }}/>
  }

  if (isAuth === authState.loading) {
    return (
      <View style={{width: width, height: height, backgroundColor: Colors.main}}>
        <ActivityIndicator color={'white'} size={'large'} style={{margin: 'auto'}}/>
      </View>
    )
  }

  if (isAuth === authState.authenticatedNoAccount) {
    return <Redirect href={"/account-info"}/>
  }


  return <Redirect href={"/login"}/>
}