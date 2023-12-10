import { auth } from "../app/_layout";

export default function isPlayersTurn(hamlet: playerInfo, claudius: playerInfo, polonius: playerInfo, gertrude: playerInfo, turn: turnType): boolean {
  const uid = auth.currentUser?.uid;
  if (uid) {
    if (uid === hamlet.id && turn === "Hamlet") {
      //hamlet
      return true
    }
    if (uid === claudius.id && turn === "Claudius") {
      //Claudius
      return true
    }
    if (uid === polonius.id && turn === "Polonius") {
      //Polonius 
      return true
    }
    if (uid === gertrude.id && turn === "Gertrude") {
      //Gertrude
      return true
    }
    return false
  } 
  return false
}