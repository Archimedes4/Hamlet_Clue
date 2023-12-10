import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Redirect, Slot } from 'expo-router'
import useIsAuthenticated from '../../hooks/useIsAuthenticated';

export default function AuthHolder() {
  const isAuth = useIsAuthenticated()
  if (isAuth) {
    return <Slot />
  }
  return <Redirect href={"/login"}/>
}