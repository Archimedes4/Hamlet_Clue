
import { Slot, SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { Dimensions, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { dimentionsSlice } from '../redux/reducers/dimentionsReducer';


// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function Root() {
  return (
    <Provider store={store}>
      <RootLayout />
    </Provider>
  );
}

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
    <Slot />
  );
}
