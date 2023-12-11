import { User, getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../app/_layout"
import { authState } from "../constants/PiecesLocations";
import { checkIfUserExists } from "../util/userInformation";

export default function useIsAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState<authState>(authState.loading);
  async function setUserStatus(user: User | null) {
    if (user !== null) {
      if (await checkIfUserExists(user.uid)) {
        setIsAuthenticated(authState.authenticatedWithAccount)
      } else {
        setIsAuthenticated(authState.authenticatedNoAccount)
      }
    } else {
      setIsAuthenticated(authState.notAuthenticated)
    }
  }
  useEffect(() => {
    setUserStatus(auth.currentUser)
    const sub = onAuthStateChanged(auth, (user) => {
      setUserStatus(user)
    });
    return sub
  }, [])
  return isAuthenticated;
}