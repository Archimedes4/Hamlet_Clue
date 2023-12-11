import { getRedirectResult } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../app/_layout"
import { router } from "expo-router"

export default function useGoogleRedirect() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  async function load() {
    try {
      const result = await getRedirectResult(auth)
      if (result !== null) {
        router.push("/")
      }
      setIsLoading(false)
    } catch {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    load()
  }, [])
  return isLoading
}