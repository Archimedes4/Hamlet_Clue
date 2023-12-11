import { auth } from "../app/_layout"
import { gameStateSlice } from "../redux/reducers/gameStateReducer"
import store from "../redux/store"

export function makeAccusation() {
  const { player, weapon, room } = store.getState().accusationsSelection

  const uid = auth.currentUser?.uid
  if (uid) {
    //Find who has next turn
    let result: informationPromt = {
      room: room,
      player: player,
      weapon: weapon,
      intiator: "Hamlet",
      accusation: true,
      time: new Date().toISOString(),
      timeHandled: "",
      handledCard: ""
    }
    const gameState = store.getState().gameState
    if (gameState.hamlet.user.id === uid) {
      result.intiator = "Hamlet"
    } else if (gameState.claudius.user.id === uid) {
      result.intiator = "Claudius"
    } else if (gameState.polonius.user.id === uid) {
      result.intiator = "Polonius"
    } else if (gameState.gertrude.user.id === uid) {
      result.intiator = "Gertrude"
    }
    let orderOfPlay = [...gameState.orderOfPlay];
    //Finding next turn
    const index = orderOfPlay.indexOf(result.intiator)
    let nextTurn: turnType = orderOfPlay[(index < orderOfPlay.length) ? index+1:0]

    if (gameState.answer.room === room && gameState.answer.murderWeapon === weapon && gameState.answer.player) {
      //Game over
    } 

    if (orderOfPlay.length === 3) {
      store.dispatch(gameStateSlice.actions.setPromtAndTurn({turn: nextTurn, prompt: result}))
    }
    //TODO game very broke
  }
}

export function makeSuggestion() {
  const { player, weapon, room } = store.getState().accusationsSelection
  const uid = auth.currentUser?.uid
  if (uid) {
    //Find who has next turn
    let result: informationPromt = {
      room: room,
      player: player,
      weapon: weapon,
      intiator: "Hamlet",
      accusation: false,
      time: new Date().toISOString(),
      timeHandled: "",
      handledCard: ""
    }
    const gameState = store.getState().gameState
    if (gameState.hamlet.user.id === uid) {
      result.intiator = "Hamlet"
    } else if (gameState.claudius.user.id === uid) {
      result.intiator = "Claudius"
    } else if (gameState.polonius.user.id === uid) {
      result.intiator = "Polonius"
    } else if (gameState.gertrude.user.id === uid) {
      result.intiator = "Gertrude"
    }
    let orderOfPlay = [...gameState.orderOfPlay];
    //Finding next turn
    const index = orderOfPlay.indexOf(result.intiator)
    let nextTurn: turnType = orderOfPlay[(index < orderOfPlay.length) ? index+1:0]

    orderOfPlay.filter((e) => {return e !== result.intiator})

    if (orderOfPlay.length === 3) {
      //This should always be true
      if (orderOfPlay[0] === "Hamlet") {
        nextTurn = "HamletSugget"
      } else if (orderOfPlay[0] === "Claudius") {
        nextTurn = "ClaudiusSuggest"
      } else if (orderOfPlay[0] === "Polonius") {
        nextTurn = "PoloniusSuggest"
      } else if (orderOfPlay[0] === "Gertrude") {
        nextTurn = "GertrudeSuggest"
      } else if (orderOfPlay[1] === "Hamlet") {
        nextTurn = "HamletSugget"
      } else if (orderOfPlay[1] === "Claudius") {
        nextTurn = "ClaudiusSuggest"
      } else if (orderOfPlay[1] === "Polonius") {
        nextTurn = "PoloniusSuggest"
      } else if (orderOfPlay[1] === "Gertrude") {
        nextTurn = "GertrudeSuggest"
      } else if (orderOfPlay[2] === "Hamlet") {
        nextTurn = "HamletSugget"
      } else if (orderOfPlay[2] === "Claudius") {
        nextTurn = "ClaudiusSuggest"
      } else if (orderOfPlay[2] === "Polonius") {
        nextTurn = "PoloniusSuggest"
      } else if (orderOfPlay[2] === "Gertrude") {
        nextTurn = "GertrudeSuggest"
      }
      store.dispatch(gameStateSlice.actions.setPromtAndTurn({turn: nextTurn, prompt: result}))
    }
    //TODO game very broke
  }
}