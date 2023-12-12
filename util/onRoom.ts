import { auth } from "../app/_layout"
import { gameStateSlice } from "../redux/reducers/gameStateReducer"
import store from "../redux/store"

export function makeAccusation() {
  const { player, weapon, room } = store.getState().accusationsSelection
  const state = store.getState().gameState
  let newGameState: gameState = {
    gameId: state.gameId,
    master: state.master,
    players: state.players,
    hamlet: state.hamlet,
    claudius: state.claudius,
    polonius: state.polonius,
    gertrude: state.gertrude,
    turn: state.turn,
    dieOne: state.dieOne,
    dieTwo: state.dieTwo,
    dieCount: state.dieCount,
    history: state.history,
    orderOfPlay: state.orderOfPlay,
    answer: state.answer,
    promt: state.promt,
    gameOver: state.gameOver,
    winner: state.winner
  }
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
      handledCard: "",
      suggester: ''
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

    console.log(result.intiator)
    if (gameState.answer.room === room && gameState.answer.murderWeapon === weapon && gameState.answer.player) {
      //Game over
      console.log("game over")
      newGameState.gameOver = true
      newGameState.winner = result.intiator
    } else {
      if (result.intiator === "Hamlet") {
        newGameState.hamlet = {
          user: state.hamlet.user,
          pos: state.hamlet.pos,
          cards: state.hamlet.cards,
          guesses: state.hamlet.guesses,
          accused: true,
          notes: state.hamlet.notes,
          lastDismissed: result.time
        }
      } else if (result.intiator === "Claudius") {
        newGameState.claudius.accused = true
        newGameState.claudius = {
          user: state.claudius.user,
          pos: state.claudius.pos,
          cards: state.claudius.cards,
          guesses: state.claudius.guesses,
          accused: true,
          notes: state.claudius.notes,
          lastDismissed: result.time
        }
      } else if (result.intiator === "Polonius") {
        newGameState.polonius = {
          user: state.polonius.user,
          pos: state.polonius.pos,
          cards: state.polonius.cards,
          guesses: state.polonius.guesses,
          accused: true,
          notes: state.polonius.notes,
          lastDismissed: result.time
        }
      } else if (result.intiator === "Gertrude") {
        newGameState.gertrude = {
          user: state.gertrude.user,
          pos: state.gertrude.pos,
          cards: state.gertrude.cards,
          guesses: state.gertrude.guesses,
          accused: true,
          notes: state.gertrude.notes,
          lastDismissed: result.time
        }
      }
      if (newGameState.hamlet.accused && newGameState.claudius.accused && newGameState.polonius.accused && newGameState.gertrude.accused) {
        //Game Tie
        newGameState.gameOver = true
      }
    }

    //Finding next turn
    if (newGameState.gameOver === false) {
      let orderOfPlay = [...state.orderOfPlay].filter((e) => {
        if (e === "Hamlet" && !state.hamlet.accused) {
          return e
        }
        if (e === "Claudius" && !state.claudius.accused) {
          return e
        }
        if (e === "Polonius" && !state.polonius.accused) {
          return e
        }
        if (e === "Gertrude" && !state.gertrude.accused) {
          return e
        }
      })
      //This works b/c accusation state of people before this one. Thus the accusation of the current user has not registered yet.
      const index = orderOfPlay.indexOf(result.intiator)
      newGameState.turn = orderOfPlay[(index < orderOfPlay.length) ? index+1:0]
    }
    console.log(newGameState)
    store.dispatch(gameStateSlice.actions.setGameState(newGameState))
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
      handledCard: "",
      suggester: ""
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
    let nextTurn: turnType = orderOfPlay[0]

    orderOfPlay.filter((e) => {return e !== result.intiator})

    if (orderOfPlay.length === 4) {
      //This should always be true
      if (orderOfPlay[0] === "Hamlet" && (gameState.hamlet.cards.includes(weapon) || gameState.hamlet.cards.includes(room) || gameState.hamlet.cards.includes(player))) {
        nextTurn = "HamletSugget"
        result.suggester = "Hamlet"
      } else if (orderOfPlay[0] === "Claudius" && (gameState.claudius.cards.includes(weapon) || gameState.claudius.cards.includes(room) || gameState.claudius.cards.includes(player))) {
        nextTurn = "ClaudiusSuggest"
        result.suggester = "Claudius"
      } else if (orderOfPlay[0] === "Polonius" && (gameState.polonius.cards.includes(weapon) || gameState.polonius.cards.includes(room) || gameState.polonius.cards.includes(player))) {
        nextTurn = "PoloniusSuggest"
        result.suggester = "Polonius"
      } else if (orderOfPlay[0] === "Gertrude" && (gameState.gertrude.cards.includes(weapon) || gameState.gertrude.cards.includes(room) || gameState.gertrude.cards.includes(player))) {
        nextTurn = "GertrudeSuggest"
        result.suggester = "Gertrude"
      } else if (orderOfPlay[1] === "Hamlet" && (gameState.hamlet.cards.includes(weapon) || gameState.hamlet.cards.includes(room) || gameState.hamlet.cards.includes(player))) {
        nextTurn = "HamletSugget"
        result.suggester = "Hamlet"
      } else if (orderOfPlay[1] === "Claudius" && (gameState.claudius.cards.includes(weapon) || gameState.claudius.cards.includes(room) || gameState.claudius.cards.includes(player))) {
        nextTurn = "ClaudiusSuggest"
        result.suggester = "Claudius"
      } else if (orderOfPlay[1] === "Polonius" && (gameState.polonius.cards.includes(weapon) || gameState.polonius.cards.includes(room) || gameState.polonius.cards.includes(player))) {
        nextTurn = "PoloniusSuggest"
        result.suggester = "Polonius"
      } else if (orderOfPlay[1] === "Gertrude" && (gameState.gertrude.cards.includes(weapon) || gameState.gertrude.cards.includes(room) || gameState.gertrude.cards.includes(player))) {
        nextTurn = "GertrudeSuggest"
        result.suggester = "Gertrude"
      } else if (orderOfPlay[2] === "Hamlet" && (gameState.hamlet.cards.includes(weapon) || gameState.hamlet.cards.includes(room) || gameState.hamlet.cards.includes(player))) {
        nextTurn = "HamletSugget"
        result.suggester = "Hamlet"
      } else if (orderOfPlay[2] === "Claudius" && (gameState.claudius.cards.includes(weapon) || gameState.claudius.cards.includes(room) || gameState.claudius.cards.includes(player))) {
        nextTurn = "ClaudiusSuggest"
        result.suggester = "Claudius"
      } else if (orderOfPlay[2] === "Polonius" && (gameState.polonius.cards.includes(weapon) || gameState.polonius.cards.includes(room) || gameState.polonius.cards.includes(player))) {
        nextTurn = "PoloniusSuggest"
        result.suggester = "Polonius"
      } else if (orderOfPlay[2] === "Gertrude" && (gameState.gertrude.cards.includes(weapon) || gameState.gertrude.cards.includes(room) || gameState.gertrude.cards.includes(player))) {
        nextTurn = "GertrudeSuggest"
        result.suggester = "Gertrude"
      } else {
        result.suggester = ""
        //No one has cards next turn
        let orderOfPlay = [...gameState.orderOfPlay].filter((e) => {
          if (e === "Hamlet" && !gameState.hamlet.accused) {
            return e
          }
          if (e === "Claudius" && !gameState.claudius.accused) {
            return e
          }
          if (e === "Polonius" && !gameState.polonius.accused) {
            return e
          }
          if (e === "Gertrude" && !gameState.gertrude.accused) {
            return e
          }
        });
        const hamletIndex = orderOfPlay.indexOf(result.intiator) 
        if ((hamletIndex + 1) > orderOfPlay.length) {
          nextTurn = orderOfPlay[0]
        } else {
          nextTurn = orderOfPlay[hamletIndex + 1]
        }
      }
      if (uid === gameState.hamlet.user.id) {
        const newUser: playerInfo = {
          user: gameState.hamlet.user,
          pos: gameState.hamlet.pos,
          cards: gameState.hamlet.cards,
          guesses: gameState.hamlet.guesses,
          accused: gameState.hamlet.accused,
          notes: gameState.hamlet.notes,
          lastDismissed: result.time
        }
        store.dispatch(gameStateSlice.actions.setHamlet(newUser))
      } else if (uid === gameState.claudius.user.id) {
        const newUser: playerInfo = {
          user: gameState.claudius.user,
          pos: gameState.claudius.pos,
          cards: gameState.claudius.cards,
          guesses: gameState.claudius.guesses,
          accused: gameState.claudius.accused,
          notes: gameState.claudius.notes,
          lastDismissed: result.time
        }
        store.dispatch(gameStateSlice.actions.setClaudius(newUser))
      } else if (uid === gameState.polonius.user.id) {
        const newUser: playerInfo = {
          user: gameState.polonius.user,
          pos: gameState.polonius.pos,
          cards: gameState.polonius.cards,
          guesses: gameState.polonius.guesses,
          accused: gameState.polonius.accused,
          notes: gameState.polonius.notes,
          lastDismissed: result.time
        }
        store.dispatch(gameStateSlice.actions.setPolonius(newUser))
      } else if (uid === gameState.gertrude.user.id) {
        const newUser: playerInfo = {
          user: gameState.gertrude.user,
          pos: gameState.gertrude.pos,
          cards: gameState.gertrude.cards,
          guesses: gameState.gertrude.guesses,
          accused: gameState.gertrude.accused,
          notes: gameState.gertrude.notes,
          lastDismissed: result.time
        }
        store.dispatch(gameStateSlice.actions.setGertude(newUser))
      }
      store.dispatch(gameStateSlice.actions.setPromtAndTurn({turn: nextTurn, prompt: result}))
    }
    //TODO game very broke
  }
}