import { router } from "expo-router";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, getRedirectResult, signInWithEmailAndPassword, signInWithRedirect, signOut } from "firebase/auth"
import { loadingStateEnum } from "../constants/PiecesLocations";
import { auth } from "../app/_layout";


//Result returns weather a success or failure
export async function signUp(email: string, password: string): Promise<loadingStateEnum> {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    return loadingStateEnum.success
  } catch (e) {
    console.log(e)
    return loadingStateEnum.failed
  }
}

//Result returns weather a success or failure
export async function signIn(email: string, password: string): Promise<loadingStateEnum> {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    router.push('/')
    return loadingStateEnum.success
  } catch {
    return loadingStateEnum.failed
  }
}

export function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider);
}

export async function logOut(): Promise<loadingStateEnum> {
  try {
    await signOut(auth);
    return loadingStateEnum.success
  } catch {
    return loadingStateEnum.failed
  }
}