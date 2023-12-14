
import { Slot, SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, View, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { dimentionsSlice } from '../redux/reducers/dimentionsReducer';
import Head from "expo-router/head"

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)/index",
};

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0f3GkWlyhX4oPUE2aVRthXCXk7Nkccek",
  authDomain: "hamlet-clue.firebaseapp.com",
  projectId: "hamlet-clue",
  storageBucket: "hamlet-clue.appspot.com",
  messagingSenderId: "401387562911",
  appId: "1:401387562911:web:56e56448dc5f2245543faa",
  measurementId: "G-WJFSRY3H97"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const database = getDatabase();

// Prevent the splash screen from auto-hiding before asset loading is complete.

function RootLayout() {
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window}) => {
        store.dispatch(dimentionsSlice.actions.setDimentions({width: window.width, height: window.height}))
      },
    );
    return () => subscription?.remove();
  });

  useEffect(() => {
    const window = Dimensions.get('window');
    store.dispatch(dimentionsSlice.actions.setDimentions({width: window.width, height: window.height}))
  }, [])

  return (
    <View style={{overflow: 'hidden'}}>
      <Slot />
    </View>
  );
}

export default function Root() {
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true)
  }, [])
  if (Dimensions.get('window').width === 0 || !mounted) {
    return null
  }
  return (
    <>
      <Head>
        <title>Hamlet Clue</title>
      </Head>
      <Provider store={store}>
        <RootLayout />
      </Provider>
    </>
  );
}
