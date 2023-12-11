import { collection, doc, getCountFromServer, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../app/_layout";
import { loadingStateEnum } from "../constants/PiecesLocations";
import store from "../redux/store";
import { usernameSlice } from "../redux/reducers/usernameReducer";


export async function checkIfUserExists(id: string): Promise<boolean> {
  const result = await getDoc(doc(db, "Users", id))
  const exists = result.exists()
  if (exists) {
    store.dispatch(usernameSlice.actions.setUsername(result.data().username))
  }
  return exists
}

//Returns true if avaiable
export async function checkIfUsernameAvaliable(username: string): Promise<boolean> {
  const q = query(collection(db, "Users"), where("username", "==", username));
  const querySnapshot = await getCountFromServer(q);
  if (querySnapshot.data().count >= 1) {
    return false
  }
  return true
}

export async function createUserInfo(uid: string, username: string): Promise<loadingStateEnum> {
  try {
    const avaliable = await checkIfUsernameAvaliable(username)
    if (avaliable && username.length >= 2) {
      await setDoc(doc(db, "Users", uid), {
        username: username,
        games: []
      });
      return loadingStateEnum.success
    }
    return loadingStateEnum.failed
  } catch (e) {
    return loadingStateEnum.failed
  }
}

export async function updateUserInfo(uid: string, username: string): Promise<loadingStateEnum> {
  try {
    const avaliable = await checkIfUsernameAvaliable(username)
    if (avaliable && username.length >= 2) {
      await updateDoc(doc(db, "Users", uid), {
        username: username
      });
      return loadingStateEnum.success
    }
    return loadingStateEnum.failed
  } catch (e) {
    return loadingStateEnum.failed
  }
}

export function getPlayer(): players | undefined {
  const uid = auth.currentUser?.uid
  if (uid) {
    const gameState = store.getState().gameState
    if (gameState.hamlet.user.id === uid) {
      return "Hamlet"
    } else if (gameState.claudius.user.id === uid) {
      return "Claudius"
    } else if (gameState.polonius.user.id === uid) {
      return "Polonius"
    } else if (gameState.gertrude.user.id === uid) {
      return "Gertrude"
    }
  }
}