import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../app/_layout"

export default function useIsAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    if (auth.currentUser !== null) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
    const sub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        // User is signed out
        setIsAuthenticated(false)
      }
    });
    return sub
  }, [])
  return isAuthenticated;
}