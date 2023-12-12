/*
  Andrew Mainella
  Hamlet Clue
*/
import { auth } from "../app/_layout";

export function convertRoomIdToText(room: position): string {
  if (room === "Gun_Platform") {
    return "Gun Platform"
  }
  if (room === "Great_Hall") {
    return "Great Hall"
  }
  if (room === "Fencing_Room") {
    return "Fencing Room"
  }
  if (room === "Court_Yard") {
    return "Court Yard"
  }
  if (room === "Royal_Bedroom") {
    return "Royal Bedroom"
  }
  if (room === "Chapel") {
    return "Chapel"
  }
  if (room === "Throne_Room") {
    return "Throne Room"
  }
  if (room == "Stair_Well") {
    return "Stair Well"
  }
  return ""
}

export default function getCurrentRoom(gameState: gameState): string {
  const uid = auth.currentUser?.uid
  if (uid) {
    if (gameState.hamlet.user.id == uid) {
      //Hamlet
      return convertRoomIdToText(gameState.hamlet.pos)
    }
    if (gameState.claudius.user.id == uid) {
      //Claudius
      return convertRoomIdToText(gameState.claudius.pos)
    }
    if (gameState.polonius.user.id == uid) {
      //Polonius
      return convertRoomIdToText(gameState.polonius.pos)
    }
    if (gameState.gertrude.user.id == uid) {
      //Gertrude
      return convertRoomIdToText(gameState.gertrude.pos)
    }
  }
  return ""
}