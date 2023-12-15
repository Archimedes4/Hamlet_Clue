import { auth } from "../app/_layout"
import store from "../redux/store"
import updateGame from "./updateGame"

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
    winner: state.winner,
    bannedPlayers: state.bannedPlayers
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

    if (gameState.answer.room === room && gameState.answer.murderWeapon === weapon && gameState.answer.player) {
      //Game over
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
    updateGame(newGameState)
  }
}

function isRoom(pet: position | rooms): pet is rooms {
  return (pet as rooms) !== undefined;
}

export function makeSuggestion() {
  const { player, weapon } = store.getState().suggestionsSelection
  const uid = auth.currentUser?.uid
  if (uid) {
    let room: rooms = "Chapel";
    const gameState = store.getState().gameState
    if (uid === gameState.hamlet.user.id) {
      const pos = gameState.hamlet.pos
      if (isRoom(pos)) {
        room = pos;
      }
    } else if (uid === gameState.claudius.user.id) {
      const pos = gameState.claudius.pos
      if (isRoom(pos)) {
        room = pos;
      }
    } else if (uid === gameState.polonius.user.id) {
      const pos = gameState.polonius.pos
      if (isRoom(pos)) {
        room = pos;
      }
    } else if (uid === gameState.gertrude.user.id) {
      const pos = gameState.gertrude.pos
      if (isRoom(pos)) {
        room = pos;
      }
    }
    
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
    

    if (player === "Hamlet" && !gameState.hamlet.accused && gameState.hamlet.user.id !== uid) {
      const newUser: playerInfo = {
        user: gameState.hamlet.user,
        pos: room,
        cards: gameState.hamlet.cards,
        guesses: gameState.hamlet.guesses,
        accused: gameState.hamlet.accused,
        notes: gameState.hamlet.notes,
        lastDismissed: result.time
      }
      updateGame({
        hamlet: newUser
      })
    } else if (player === "Claudius" && !gameState.claudius.accused && gameState.claudius.user.id !== uid) {
      const newUser: playerInfo = {
        user: gameState.claudius.user,
        pos: room,
        cards: gameState.claudius.cards,
        guesses: gameState.claudius.guesses,
        accused: gameState.claudius.accused,
        notes: gameState.claudius.notes,
        lastDismissed: result.time
      }
      updateGame({
        claudius: newUser
      })
    } else if (player === "Polonius" && !gameState.polonius.accused && gameState.polonius.user.id !== uid) {
      const newUser: playerInfo = {
        user: gameState.polonius.user,
        pos: room,
        cards: gameState.polonius.cards,
        guesses: gameState.polonius.guesses,
        accused: gameState.polonius.accused,
        notes: gameState.polonius.notes,
        lastDismissed: result.time
      }
      updateGame({
        polonius: newUser
      })
    } else if (player === "Gertrude" && !gameState.gertrude.accused && gameState.gertrude.user.id !== uid) {
      const newUser: playerInfo = {
        user: gameState.gertrude.user,
        pos: room,
        cards: gameState.gertrude.cards,
        guesses: gameState.gertrude.guesses,
        accused: gameState.gertrude.accused,
        notes: gameState.gertrude.notes,
        lastDismissed: result.time
      }
      updateGame({
        gertrude: newUser
      })
    }

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
    //Finding next tur

    orderOfPlay = orderOfPlay.filter((e) => {return e !== result.intiator})
    console.log(orderOfPlay)
    let nextTurn: turnType = orderOfPlay[0]

    if (orderOfPlay.length === 3) {
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
      console.log("This is next turn", nextTurn)
      console.log("This is result", result)
      if (uid === gameState.hamlet.user.id) {
        const newUser: playerInfo = {
          user: gameState.hamlet.user,
          pos: (player === "Hamlet" && !gameState.hamlet.accused) ? room:gameState.hamlet.pos,
          cards: gameState.hamlet.cards,
          guesses: gameState.hamlet.guesses,
          accused: gameState.hamlet.accused,
          notes: gameState.hamlet.notes,
          lastDismissed: result.time
        }
        updateGame({
          hamlet: newUser,
          turn: nextTurn,
          promt: result
        })
      } else if (uid === gameState.claudius.user.id) {
        const newUser: playerInfo = {
          user: gameState.claudius.user,
          pos: (player === "Claudius" && !gameState.claudius.accused) ? room:gameState.claudius.pos,
          cards: gameState.claudius.cards,
          guesses: gameState.claudius.guesses,
          accused: gameState.claudius.accused,
          notes: gameState.claudius.notes,
          lastDismissed: result.time
        }
        updateGame({
          claudius: newUser,
          turn: nextTurn,
          promt: result
        })
      } else if (uid === gameState.polonius.user.id) {
        const newUser: playerInfo = {
          user: gameState.polonius.user,
          pos: (player === "Polonius" && !gameState.polonius.accused) ? room:gameState.polonius.pos,
          cards: gameState.polonius.cards,
          guesses: gameState.polonius.guesses,
          accused: gameState.polonius.accused,
          notes: gameState.polonius.notes,
          lastDismissed: result.time
        }
        updateGame({
          polonius: newUser,
          turn: nextTurn,
          promt: result
        })
      } else if (uid === gameState.gertrude.user.id) {
        const newUser: playerInfo = {
          user: gameState.gertrude.user,
          pos: (player === "Gertrude" && !gameState.gertrude.accused) ? room:gameState.gertrude.pos,
          cards: gameState.gertrude.cards,
          guesses: gameState.gertrude.guesses,
          accused: gameState.gertrude.accused,
          notes: gameState.gertrude.notes,
          lastDismissed: result.time
        }
        updateGame({
          gertrude: newUser,
          turn: nextTurn,
          promt: result
        })
      }
    }
    //TODO game very broke
  }
}