import { useSelector } from "react-redux";
import useIsAuthenticated from "../../hooks/useIsAuthenticated";
import { RootState } from "../../redux/store";
import { Redirect, Slot } from "expo-router";
import { authState } from "../../constants/PiecesLocations";
import { ActivityIndicator, View } from "react-native";
import Colors from "../../constants/Colors";

export default function AuthHolder() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const isAuth = useIsAuthenticated()
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
    return <Redirect href={"/account-info"}/>
  }


  return <Slot />
}