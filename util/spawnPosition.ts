import { dimentionsSlice } from './../redux/reducers/dimentionsReducer';
import { auth } from "../app/_layout"
import { gameStateSlice } from '../redux/reducers/gameStateReducer';
import store from '../redux/store';
import updateGame from './updateGame';

export function setSpawnPosition(hamlet: playerInfo, claudius: playerInfo, polonius: playerInfo, gertrude: playerInfo, id: position) {
  const uid = auth.currentUser?.uid
  if (uid) {
    let call: any = {}
    const gameState = store.getState().gameState
    let count = 0;
    if (gameState.hamlet.pos !== '') {
      count++
    }
    if (gameState.claudius.pos !== '') {
      count++
    }
    if (gameState.polonius.pos !== '') {
      count++
    }
    if (gameState.gertrude.pos !== '') {
      count++
    }
    if (gameState.turn === "Selecting" && count >= 3) {
      call["turn"] = gameState.orderOfPlay[0]
    }
    if (uid === hamlet.user.id && "" === hamlet.pos) {
      call["hamlet"] = {
        user: hamlet.user,
        pos: id,
        cards: hamlet.cards,
        guesses: hamlet.guesses,
        accused: hamlet.accused,
        notes: hamlet.notes,
        lastDismissed: hamlet.lastDismissed
      }
    } else if (uid === claudius.user.id && "" === claudius.pos) {
      call["claudius"] = {
        user: claudius.user,
        pos: id,
        cards: claudius.cards,
        guesses: claudius.guesses,
        accused: claudius.accused,
        notes: claudius.notes,
        lastDismissed: claudius.lastDismissed
      }
    } else if (uid === polonius.user.id && "" === polonius.pos) {
      call["polonius"] = {
        user: polonius.user,
        pos: id,
        cards: polonius.cards,
        guesses: polonius.guesses,
        accused: polonius.accused,
        notes: polonius.notes,
        lastDismissed: polonius.lastDismissed
      }
    } else if (uid === gertrude.user.id && "" === gertrude.pos) {
      call['gertrude'] = {
        user: gertrude.user,
        pos: id,
        cards: gertrude.cards,
        guesses: gertrude.guesses,
        accused: gertrude.accused,
        notes: gertrude.notes,
        lastDismissed: gertrude.lastDismissed
      }
    }
    console.log(call)
    updateGame(call)
  }
  //TODO handle error
}

export function checkIfPickingSpawnPosition(hamlet: playerInfo, claudius: playerInfo, polonius: playerInfo, gertrude: playerInfo) {
  const uid = auth.currentUser?.uid
  if (uid) {
    if (uid === hamlet.user.id && "" === hamlet.pos) {
      return true
    }
    if (uid === claudius.user.id && "" === claudius.pos) {
      return true
    }
    if (uid === polonius.user.id && "" === polonius.pos) {
      return true
    }
    if (uid === gertrude.user.id && "" === gertrude.pos) {
      return true
    }
    return false  
  } else {
    //TODO handle error
    return false
  }
}