import { auth } from "../app/_layout";
import { gameStateSlice } from "../redux/reducers/gameStateReducer";
import store from "../redux/store";

function getPlayer(index: number): players | undefined {
  const uid = auth.currentUser?.uid
  const gameState = store.getState().gameState
  if (uid) {
    let orderOfPlay = gameState.orderOfPlay
    if (gameState.hamlet.user.id === uid) {
      if (index === 0) {
        return "Hamlet"
      }
      orderOfPlay.filter((e) => {return e !== "Hamlet"})
      return orderOfPlay[index]
    }
    if (gameState.claudius.user.id === uid) {
      if (index === 0) {
        return "Claudius"
      }
      orderOfPlay.filter((e) => {return e !== "Claudius"})
      return orderOfPlay[index]
    }
    if (gameState.polonius.user.id === uid) {
      if (index === 0) {
        return "Polonius"
      }
      orderOfPlay.filter((e) => {return e !== "Polonius"})
      return orderOfPlay[index]
    }
    if (gameState.gertrude.user.id === uid) {
      if (index === 0) {
        return "Gertrude"
      }
      orderOfPlay.filter((e) => {return e !== "Gertrude"})
      return orderOfPlay[index]
    }
  }
}

function getGuessType(card: cardType, index: number): levelType | undefined {
  const uid = auth.currentUser?.uid
  const gameState = store.getState().gameState
  const player = getPlayer(index)
  if (uid && player) {
    if (gameState.hamlet.user.id === uid) {
      const result = gameState.hamlet.guesses.find((e) => {return e.card === card && e.player === player})
      if (result) {
        return result.level
      }
      return
    }
    if (gameState.claudius.user.id === uid) {
      const result = gameState.claudius.guesses.find((e) => {return e.card === card && e.player === player})
      if (result) {
        return result.level
      }
      return
    }
    if (gameState.polonius.user.id === uid) {
      const result = gameState.polonius.guesses.find((e) => {return e.card === card && e.player === player})
      if (result) {
        return result.level
      }
      return
    }
    if (gameState.gertrude.user.id === uid) {
      const result= gameState.gertrude.guesses.find((e) => {return e.card === card && e.player === player})
      if (result) {
        return result.level
      }
      return
    }
  }
}

function getUsersGuesses(): guessType[] | undefined {
  const uid = auth.currentUser?.uid
  if (uid) {
    const gameState = store.getState().gameState
    if (gameState.hamlet.user.id === uid) {
      return gameState.hamlet.guesses
    }
    if (gameState.claudius.user.id === uid) {
      return gameState.claudius.guesses
    }
    if (gameState.polonius.user.id === uid) {
      return gameState.polonius.guesses
    }
    if (gameState.gertrude.user.id === uid) {
      return gameState.gertrude.guesses
    }
  }
}

export function setGuess(card: cardType, index: number) {
  const uid = auth.currentUser?.uid
  const player = getPlayer(index);
  if (player !== undefined && uid) {
    const guessType = getGuessType(card, index);
    let userGuesses = getUsersGuesses()
    if (userGuesses) {
      const gameState = store.getState().gameState
      userGuesses = userGuesses.filter((e) => {return e.card !== card || e.player !== player})
      if (guessType === undefined) {
        userGuesses.push({
          level: "known",
          card: card,
          player: player
        })
      } else if (guessType === 'known') {
        userGuesses.push({
          level: 'likely',
          card: card,
          player: player
        })
      } else if (guessType === 'likely') {
        userGuesses.push({
          level: 'guess',
          card: card,
          player: player
        })
      }
      if (gameState.hamlet.user.id === uid) {
        store.dispatch(gameStateSlice.actions.setHamlet({
          user: gameState.hamlet.user,
          pos: gameState.hamlet.pos,
          cards: gameState.hamlet.cards,
          guesses: userGuesses,
          accused: gameState.hamlet.accused,
          notes: gameState.hamlet.notes,
          lastDismissed: gameState.hamlet.lastDismissed
        }))
      } else if (gameState.claudius.user.id === uid) {
        store.dispatch(gameStateSlice.actions.setClaudius({
          user: gameState.claudius.user,
          pos: gameState.claudius.pos,
          cards: gameState.claudius.cards,
          guesses: userGuesses,
          accused: gameState.claudius.accused,
          notes: gameState.claudius.notes,
          lastDismissed: gameState.claudius.lastDismissed
        }))
      } else if (gameState.polonius.user.id === uid) {
        store.dispatch(gameStateSlice.actions.setPolonius({
          user: gameState.polonius.user,
          pos: gameState.polonius.pos,
          cards: gameState.polonius.cards,
          guesses: userGuesses,
          accused: gameState.polonius.accused,
          notes: gameState.polonius.notes,
          lastDismissed: gameState.polonius.lastDismissed
        }))
      } else if (gameState.gertrude.user.id === uid) {
        store.dispatch(gameStateSlice.actions.setGertude({
          user: gameState.gertrude.user,
          pos: gameState.gertrude.pos,
          cards: gameState.gertrude.cards,
          guesses: userGuesses,
          accused: gameState.gertrude.accused,
          notes: gameState.gertrude.notes,
          lastDismissed: gameState.gertrude.lastDismissed
        }))
      }
    }
  }
}

export function getGuess(card: cardType, index: number): guessType | undefined {
  const userGuesses = getUsersGuesses()
  const player = getPlayer(index)
  const find = userGuesses?.find((e) => {return e.card === card && e.player === player})
  return find
}

export function updateNotes(notes: string) {
  const uid = auth.currentUser?.uid
  const state = store.getState().gameState
  if (uid) {
    if (uid === state.hamlet.user.id) {
      //hamlet
      const newPlayer: playerInfo = {
        user: state.hamlet.user,
        pos: state.hamlet.pos,
        cards: state.hamlet.cards,
        guesses: state.hamlet.guesses,
        accused: state.hamlet.accused,
        notes: notes,
        lastDismissed: state.hamlet.lastDismissed
      }
      store.dispatch(gameStateSlice.actions.setHamlet(newPlayer))
    } else if (uid === state.claudius.user.id) {
      //Claudius
      const newPlayer: playerInfo = {
        user: state.claudius.user,
        pos: state.claudius.pos,
        cards: state.claudius.cards,
        guesses: state.claudius.guesses,
        accused: state.claudius.accused,
        notes: notes,
        lastDismissed: state.claudius.lastDismissed
      }
      store.dispatch(gameStateSlice.actions.setClaudius(newPlayer))
    } else if (uid === state.polonius.user.id) {
      //Polonius 
      const newPlayer: playerInfo = {
        user: state.polonius.user,
        pos: state.polonius.pos,
        cards: state.polonius.cards,
        guesses: state.polonius.guesses,
        accused: state.polonius.accused,
        notes: notes,
        lastDismissed: state.polonius.lastDismissed
      }
      store.dispatch(gameStateSlice.actions.setPolonius(newPlayer))
    } else if (uid === state.gertrude.user.id) {
      //Gertrude
      const newPlayer: playerInfo = {
        user: state.gertrude.user,
        pos: state.gertrude.pos,
        cards: state.gertrude.cards,
        guesses: state.gertrude.guesses,
        accused: state.gertrude.accused,
        notes: notes,
        lastDismissed: state.gertrude.lastDismissed
      }
      store.dispatch(gameStateSlice.actions.setGertude(newPlayer))
    }
  }
}