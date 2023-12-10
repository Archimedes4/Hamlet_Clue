import { dimentionsSlice } from './../redux/reducers/dimentionsReducer';
import { auth } from "../app/_layout"
import { gameStateSlice } from '../redux/reducers/gameStateReducer';
import store from '../redux/store';

export function setSpawnPosition(hamlet: playerInfo, claudius: playerInfo, polonius: playerInfo, gertrude: playerInfo, id: position) {
  const uid = auth.currentUser?.uid
  if (uid) {
    if (uid === hamlet.id && "" === hamlet.pos) {
      store.dispatch(gameStateSlice.actions.setHamlet({
        id: hamlet.id,
        pos: id,
        cards: hamlet.cards,
        guesses: hamlet.guesses,
        accused: hamlet.accused
      }))
    } else if (uid === claudius.id && "" === claudius.pos) {
      store.dispatch(gameStateSlice.actions.setClaudius({
        id: claudius.id,
        pos: id,
        cards: claudius.cards,
        guesses: claudius.guesses,
        accused: claudius.accused
      }))
    } else if (uid === polonius.id && "" === polonius.pos) {
      store.dispatch(gameStateSlice.actions.setPolonius({
        id: polonius.id,
        pos: id,
        cards: polonius.cards,
        guesses: polonius.guesses,
        accused: polonius.accused
      }))
    } else if (uid === gertrude.id && "" === gertrude.pos) {
      store.dispatch(gameStateSlice.actions.setGertude({
        id: gertrude.id,
        pos: id,
        cards: gertrude.cards,
        guesses: gertrude.guesses,
        accused: gertrude.accused
      }))
    } 
  }
  //TODO handle error
}

export function checkIfPickingSpawnPosition(hamlet: playerInfo, claudius: playerInfo, polonius: playerInfo, gertrude: playerInfo) {
  const uid = auth.currentUser?.uid
  if (uid) {
    if (uid === hamlet.id && "" === hamlet.pos) {
      return true
    }
    if (uid === claudius.id && "" === claudius.pos) {
      return true
    }
    if (uid === polonius.id && "" === polonius.pos) {
      return true
    }
    if (uid === gertrude.id && "" === gertrude.pos) {
      return true
    }
    return false  
  } else {
    //TODO handle error
    return false
  }
}