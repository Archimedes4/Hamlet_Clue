import { dimentionsSlice } from './../redux/reducers/dimentionsReducer';
import { auth } from "../app/_layout"
import { gameStateSlice } from '../redux/reducers/gameStateReducer';
import store from '../redux/store';

export function setSpawnPosition(hamlet: playerInfo, claudius: playerInfo, polonius: playerInfo, gertrude: playerInfo, id: position) {
  const uid = auth.currentUser?.uid
  if (uid) {
    if (uid === hamlet.user.id && "" === hamlet.pos) {
      store.dispatch(gameStateSlice.actions.setHamlet({
        user: hamlet.user,
        pos: id,
        cards: hamlet.cards,
        guesses: hamlet.guesses,
        accused: hamlet.accused,
        notes: hamlet.notes,
        lastDismissed: hamlet.lastDismissed
      }))
    } else if (uid === claudius.user.id && "" === claudius.pos) {
      store.dispatch(gameStateSlice.actions.setClaudius({
        user: claudius.user,
        pos: id,
        cards: claudius.cards,
        guesses: claudius.guesses,
        accused: claudius.accused,
        notes: claudius.notes,
        lastDismissed: claudius.lastDismissed
      }))
    } else if (uid === polonius.user.id && "" === polonius.pos) {
      store.dispatch(gameStateSlice.actions.setPolonius({
        user: polonius.user,
        pos: id,
        cards: polonius.cards,
        guesses: polonius.guesses,
        accused: polonius.accused,
        notes: polonius.notes,
        lastDismissed: polonius.lastDismissed
      }))
    } else if (uid === gertrude.user.id && "" === gertrude.pos) {
      store.dispatch(gameStateSlice.actions.setGertude({
        user: gertrude.user,
        pos: id,
        cards: gertrude.cards,
        guesses: gertrude.guesses,
        accused: gertrude.accused,
        notes: gertrude.notes,
        lastDismissed: gertrude.lastDismissed
      }))
    } 
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