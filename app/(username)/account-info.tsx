import { TextInput } from 'react-native-gesture-handler';
import { MagnifyingGlass } from '../../components/Icons';
import { checkIfUsernameAvaliable, createUserInfo } from '../../util/userInformation';
import DefaultButton from '../../components/DefaultButton';
import { logOut } from '../../util/authentication';
import { auth } from '../_layout';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadingStateEnum } from '../../constants/PiecesLocations';
import { RootState } from '../../redux/store';
import { ActivityIndicator, View, Text } from 'react-native';
import Colors from '../../constants/Colors';
import { router } from 'expo-router';

enum usernameValidation {
  toShort,
  exists,
  loading,
  good,
  failed
}

function getUsernameButtonText(state: usernameValidation) {
  if (state === usernameValidation.good) {
    return "Set Username & Continue"
  }
  if (state === usernameValidation.toShort) {
    return "The Username Is Too Short!"
  }
  if (state === usernameValidation.exists) {
    return "That Username Already Exists"
  }
  if (state === usernameValidation.loading) {
    return undefined
  }
  if (state === usernameValidation.failed) {
    return "Something Went Wrong. ):"
  }
}

export default function PickUserName() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const [username, setUsername] = useState<string>("");
  const [usernameStatus, setUsernameStatus] = useState<usernameValidation>(usernameValidation.toShort);
  const [signOutState, setSignOutState] = useState<loadingStateEnum>(loadingStateEnum.notStarted);
  
  async function signOut() {
    setSignOutState(loadingStateEnum.loading)
    const result = await logOut()
    setSignOutState(result)
  }
  async function createUser() {
    const uid = auth.currentUser?.uid
    if (usernameStatus === usernameValidation.good && uid !== undefined) {
      setUsernameStatus(usernameValidation.loading)
      const result = await createUserInfo(uid, username)
      if (result === loadingStateEnum.success) {
        router.push('/')
      } else {
        setUsernameStatus(usernameValidation.failed)
      }
    }
  }
  async function checkUsername(newName: string) {
    if (newName.length < 2) {
      setUsernameStatus(usernameValidation.toShort)
    } else {
      setUsernameStatus(usernameValidation.loading)
      const result = await checkIfUsernameAvaliable(newName)
      if (result) {
        setUsernameStatus(usernameValidation.good)
      } else {
        setUsernameStatus(usernameValidation.exists)
      }
    }
  }
  useEffect(() => {
    checkUsername(username)
  }, [username])

  return (
    <View style={{width: width, height: height, backgroundColor: Colors.main}}>
      <View style={{flexDirection: 'row', marginTop: 20, marginLeft: 20}}>
        <Text style={{fontFamily: 'RubikBubbles-Regular', color: Colors.royalRed, fontSize: height * 0.1}}>Hamlet Clue</Text>
        <MagnifyingGlass width={height * 0.1} height={height * 0.1} style={{marginLeft: 20, marginTop: 10}}/>
      </View>
      <Text style={{color: 'white', fontFamily: 'Rubik-SemiBold', marginLeft: width * 0.11, fontSize: height * 0.035, marginTop: height * 0.04}}>Please Pick a Username</Text>
      <TextInput style={{marginLeft: 'auto', marginRight: 'auto', width: width * 0.8, marginTop: 10, backgroundColor: 'white', borderRadius: 5, padding: 20, borderWidth: 2, borderColor: 'black'}} value={username} onChangeText={setUsername}/>
      <DefaultButton style={{width: width * 0.8, marginLeft: 'auto', marginRight: 'auto', marginTop: height * 0.04}} onPress={() => createUser()} text={getUsernameButtonText(usernameStatus)}>
        { (usernameStatus === usernameValidation.loading) ?
          <ActivityIndicator  style={{margin: 20}}/>:null
        }
      </DefaultButton>
      <DefaultButton style={{width: width * 0.8, marginLeft: 'auto', marginRight: 'auto', marginTop: height * 0.04}} onPress={() => signOut()} text='Sign Out'/>
    </View>
  )
}