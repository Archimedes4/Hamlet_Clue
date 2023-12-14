import { useSelector } from "react-redux";
import useIsAuthenticated from "../../hooks/useIsAuthenticated";
import { RootState } from "../../redux/store";
import { Redirect, Slot } from "expo-router";
import { authState } from "../../constants/PiecesLocations";
import { ActivityIndicator, View } from "react-native";
import Colors from "../../constants/Colors";
import useAndReportConnected from "../../hooks/useAndReportConnected";
import { OfflineIcon } from "../../components/Icons";

export default function AuthHolder() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const isAuth = useIsAuthenticated()
  const isConnected = useAndReportConnected();

  if (!isConnected) {
    return (
      <View style={{width: width, height: height, backgroundColor: Colors.main, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
        <OfflineIcon width={25} height={25} style={{margin: 'auto'}}/>
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
    return <Redirect href={"/account-info"}/>
  }


  return <Slot />
}