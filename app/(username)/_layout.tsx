import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { Redirect, Slot } from 'expo-router'
import useIsAuthenticated from '../../hooks/useIsAuthenticated';
import { authState, loadingStateEnum } from '../../constants/PiecesLocations';
import Colors from '../../constants/Colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import useAndReportConnected from '../../hooks/useAndReportConnected';
import { OfflineIcon } from '../../components/Icons';

export default function AuthHolder() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const isAuth = useIsAuthenticated()
  const isConnected = useAndReportConnected();

  if (!isConnected) {
    return (
      <View style={{width: width, height: height, backgroundColor: Colors.main, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
        <OfflineIcon width={16} height={16}/>
      </View>
    )
  }

  if (isAuth === authState.authenticatedWithAccount) {
    return <Redirect href={"/"}/>
  }

  if (isAuth === authState.loading) {
    return (
      <View style={{width: width, height: height, backgroundColor: Colors.main}}>
        <ActivityIndicator color={'white'} size={'large'} style={{margin: 'auto'}}/>
      </View>
    )
  }

  if (isAuth === authState.authenticatedNoAccount) {
    return (
      <Slot />
    )
  }


  return <Redirect href={"/login"}/>
}