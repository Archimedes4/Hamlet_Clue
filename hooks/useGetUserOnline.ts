import { onValue, ref } from "firebase/database";
import { database } from "../app/_layout";
import { useState } from "react";

export default function useGetUserOnline(id: string) {
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const starCountRef = ref(database, 'status/' + id);
  const listenUser = onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    setIsOnline(data.online)
  });
}