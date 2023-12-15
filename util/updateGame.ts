import { doc, updateDoc } from "firebase/firestore";
import store from "../redux/store";
import { db } from "../app/_layout";

export default async function updateGame(update: object) {
  updateDoc(doc(db, "Games", store.getState().gameState.gameId), update)
}