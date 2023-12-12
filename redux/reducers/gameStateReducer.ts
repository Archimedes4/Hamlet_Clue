import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createUUID, roleDie } from '../../util/util';

const initalState: gameState = {
  gameId: '',
  players: [],
  hamlet: {
    user: {
      id: '',
      username: ''
    },
    pos: '',
    cards: [],
    guesses: [],
    accused: false,
    notes: '',
    lastDismissed: ''
  },
  claudius: {
    user: {
      id: '',
      username: ''
    },
    pos: '',
    cards: [],
    guesses: [],
    accused: false,
    notes: '',
    lastDismissed: ''
  },
  polonius: {
    user: {
      id: '',
      username: ''
    },
    pos: '',
    cards: [],
    guesses: [],
    accused: false,
    notes: '',
    lastDismissed: ''
  },
  gertrude: {
    user: {
      id: '',
      username: ''
    },
    pos: '',
    cards: [],
    guesses: [],
    accused: false,
    notes: '',
    lastDismissed: ''
  },
  turn: 'Hamlet',
  dieOne: 0,
  dieTwo: 0,
  history: [],
  dieCount: 0,
  orderOfPlay: [],
  answer: {
    murderWeapon: 'Hemlock_Poison',
    room: 'Gun_Platform',
    player: 'Hamlet'
  },
  master: '',
  promt: {
    room: 'Gun_Platform',
    player: 'Hamlet',
    weapon: 'Hemlock_Poison',
    intiator: 'Hamlet',
    accusation: false,
    time: '',
    timeHandled: "",
    handledCard: "",
    suggester: ''
  },
  gameOver: false,
  winner: "",
  bannedPlayers: [],
  changeKey: createUUID()
}

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: initalState,
  reducers: {
    updateGameState: (_state, action: PayloadAction<gameState>) => {
      let newGameState: gameState = {
        gameId: action.payload.gameId,
        master: action.payload.master,
        hamlet: action.payload.hamlet,
        claudius: action.payload.claudius,
        polonius: action.payload.polonius,
        gertrude: action.payload.gertrude,
        turn: action.payload.turn,
        dieOne: action.payload.dieCount,
        dieTwo: action.payload.dieTwo,
        players: action.payload.players,
        history: action.payload.history,
        dieCount: action.payload.dieCount,
        orderOfPlay: action.payload.orderOfPlay,
        answer: action.payload.answer,
        promt: action.payload.promt,
        gameOver: action.payload.gameOver,
        winner: action.payload.winner,
        bannedPlayers: action.payload.bannedPlayers,
        changeKey: ''
      }
      return newGameState
    },
    setGameState: (_state, action: PayloadAction<gameState>) => {
      let newGameState: gameState = {
        gameId: action.payload.gameId,
        master: action.payload.master,
        hamlet: action.payload.hamlet,
        claudius: action.payload.claudius,
        polonius: action.payload.polonius,
        gertrude: action.payload.gertrude,
        turn: action.payload.turn,
        dieOne: action.payload.dieCount,
        dieTwo: action.payload.dieTwo,
        players: action.payload.players,
        history: action.payload.history,
        dieCount: action.payload.dieCount,
        orderOfPlay: action.payload.orderOfPlay,
        answer: action.payload.answer,
        promt: action.payload.promt,
        gameOver: action.payload.gameOver,
        winner: action.payload.winner,
        bannedPlayers: action.payload.bannedPlayers,
        changeKey: createUUID()
      }
      return newGameState
    },
    movePosition: (state, action: PayloadAction<{pos: position, room: boolean}>) => {
      //Check if room
      if (action.payload.room) {
        //Made all moves next player
        let newGameState: gameState = {
          gameId: state.gameId,
          master: state.master,
          players: state.players,
          hamlet: state.hamlet,
          claudius: state.claudius,
          polonius: state.polonius,
          gertrude: state.gertrude,
          turn: state.turn,
          dieOne: roleDie(),
          dieTwo: roleDie(),
          dieCount: 0,
          history: [...state.history, action.payload.pos],
          orderOfPlay: state.orderOfPlay,
          answer: state.answer,
          promt: state.promt,
          gameOver: state.gameOver,
          winner: state.winner,
          bannedPlayers: state.bannedPlayers,
          changeKey: createUUID()
        }
        switch (state.turn) {
          case "Hamlet":
            newGameState.turn = "HamletRoom"
            newGameState.hamlet.pos = action.payload.pos
          case "Claudius":
            newGameState.turn = "ClaudiusRoom"
            newGameState.claudius.pos = action.payload.pos
          case "Polonius":
            newGameState.turn = "PoloniusRoom"
            newGameState.polonius.pos = action.payload.pos
          case "Gertrude":
            newGameState.turn = "GertrudeRoom"
            newGameState.gertrude.pos = action.payload.pos
        }
        return newGameState
      } else if (state.dieCount + 1 === state.dieOne + state.dieTwo) {
        //Made all moves next player
        let newGameState: gameState = {
          gameId: state.gameId,
          master: state.master,
          players: state.players,
          hamlet: state.hamlet,
          claudius: state.claudius,
          polonius: state.polonius,
          gertrude: state.gertrude,
          turn: state.turn,
          dieOne: roleDie(),
          dieTwo: roleDie(),
          dieCount: 0,
          history: [],
          orderOfPlay: state.orderOfPlay,
          answer: state.answer,
          promt: state.promt,
          gameOver: state.gameOver,
          winner: state.winner,
          bannedPlayers: state.bannedPlayers,
          changeKey: createUUID()
        }
        switch (state.turn) {
          case "Hamlet":
            const hamletIndex = state.orderOfPlay.indexOf("Hamlet") 
            if (hamletIndex >= 3) {
              newGameState.turn = state.orderOfPlay[0]
            } else {
              newGameState.turn = state.orderOfPlay[hamletIndex + 1]
            }
            newGameState.hamlet.pos = action.payload.pos
          case "Claudius":
            state.orderOfPlay.indexOf("Claudius")
            const claudiusIndex = state.orderOfPlay.indexOf("Hamlet") 
            if (claudiusIndex >= 3) {
              newGameState.turn = state.orderOfPlay[0]
            } else {
              newGameState.turn = state.orderOfPlay[claudiusIndex + 1]
            }
            newGameState.claudius.pos = action.payload.pos
          case "Polonius":
            const poloniusIndex = state.orderOfPlay.indexOf("Polonius")
            if (poloniusIndex >= 3) {
              newGameState.turn = state.orderOfPlay[0]
            } else {
              newGameState.turn = state.orderOfPlay[poloniusIndex + 1]
            }
            newGameState.polonius.pos = action.payload.pos
          case "Gertrude":
            const gertrudeIndex = state.orderOfPlay.indexOf("Gertrude") 
            if (gertrudeIndex >= 3) {
              newGameState.turn = state.orderOfPlay[0]
            } else {
              newGameState.turn = state.orderOfPlay[gertrudeIndex + 1]
            }
            newGameState.gertrude.pos = action.payload.pos
        }
        return newGameState
      } else {
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
          dieCount: state.dieCount + 1,
          history: [...state.history, action.payload.pos],
          orderOfPlay: state.orderOfPlay,
          answer: state.answer,
          promt: state.promt,
          gameOver: state.gameOver,
          winner: state.winner,
          bannedPlayers: state.bannedPlayers,
          changeKey: createUUID()
        }
        switch (state.turn) {
          case "Hamlet":
            newGameState.hamlet = {
              user: state.hamlet.user,
              pos: action.payload.pos,
              cards: state.hamlet.cards,
              guesses: state.hamlet.guesses,
              accused: false,
              notes: state.hamlet.notes,
              lastDismissed: state.hamlet.lastDismissed
            }
          case "Claudius":
            newGameState.claudius = {
              user: state.claudius.user,
              pos: action.payload.pos,
              cards: state.claudius.cards,
              guesses: state.claudius.guesses,
              accused: false,
              notes: state.claudius.notes,
              lastDismissed: state.claudius.lastDismissed
            }
          case "Polonius":
            newGameState.polonius = {
              user: state.polonius.user,
              pos: action.payload.pos,
              cards: state.polonius.cards,
              guesses: state.polonius.guesses,
              accused: false,
              notes: state.polonius.notes,
              lastDismissed: state.polonius.lastDismissed
            }
          case "Gertrude":
            newGameState.gertrude = {
              user: state.gertrude.user,
              pos: action.payload.pos,
              cards: state.gertrude.cards,
              guesses: state.gertrude.guesses,
              accused: false,
              notes: state.gertrude.notes,
              lastDismissed: state.gertrude.lastDismissed
            }
        }
        return newGameState
      }
    },
    setHamlet: (state, action: PayloadAction<playerInfo>) => {
      let newGameState: gameState = {
        gameId: state.gameId,
        master: state.master,
        players: state.players,
        hamlet: action.payload,
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
        bannedPlayers: state.bannedPlayers,
        changeKey: createUUID()
      }
      return newGameState
    },
    setClaudius: (state, action: PayloadAction<playerInfo>) => {
      let newGameState: gameState = {
        gameId: state.gameId,
        master: state.master,
        players: state.players,
        hamlet: state.hamlet,
        claudius: action.payload,
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
        bannedPlayers: state.bannedPlayers,
        changeKey: createUUID()
      }
      return newGameState
    },
    setPolonius: (state, action: PayloadAction<playerInfo>) => {
      let newGameState: gameState = {
        gameId: state.gameId,
        master: state.master,
        players: state.players,
        hamlet: state.hamlet,
        claudius: state.claudius,
        polonius: action.payload,
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
        bannedPlayers: state.bannedPlayers,
        changeKey: createUUID()
      }
      return newGameState
    },
    setGertude: (state, action: PayloadAction<playerInfo>) => {
      let newGameState: gameState = {
        gameId: state.gameId,
        master: state.master,
        players: state.players,
        hamlet: state.hamlet,
        claudius: state.claudius,
        polonius: state.polonius,
        gertrude: action.payload,
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
        bannedPlayers: state.bannedPlayers,
        changeKey: createUUID()
      }
      return newGameState
    },
    setTurn: (state, action: PayloadAction<turnType>) => {
      let newGameState: gameState = {
        gameId: state.gameId,
        master: state.master,
        players: state.players,
        hamlet: state.hamlet,
        claudius: state.claudius,
        polonius: state.polonius,
        gertrude: state.gertrude,
        turn: action.payload,
        dieOne: state.dieOne,
        dieTwo: state.dieTwo,
        dieCount: state.dieCount,
        history: state.history,
        orderOfPlay: state.orderOfPlay,
        answer: state.answer,
        promt: state.promt,
        gameOver: state.gameOver,
        winner: state.winner,
        bannedPlayers: state.bannedPlayers,
        changeKey: createUUID()
      }
      return newGameState
    },
    setPromtAndTurn: (state, action: PayloadAction<{turn: turnType, prompt: informationPromt}>) => {
      let newGameState: gameState = {
        gameId: state.gameId,
        master: state.master,
        players: state.players,
        hamlet: state.hamlet,
        claudius: state.claudius,
        polonius: state.polonius,
        gertrude: state.gertrude,
        turn: action.payload.turn,
        dieOne: state.dieOne,
        dieTwo: state.dieTwo,
        dieCount: state.dieCount,
        history: state.history,
        orderOfPlay: state.orderOfPlay,
        answer: state.answer,
        promt: action.payload.prompt,
        gameOver: state.gameOver,
        winner: state.winner,
        bannedPlayers: state.bannedPlayers,
        changeKey: createUUID()
      }
      return newGameState
    },
    setBannedPlayers: (state, action: PayloadAction<{ban: string[], key: string}>) => {
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
        bannedPlayers: action.payload.ban,
        changeKey: action.payload.key
      }
      return newGameState
    }
  },
});

export default gameStateSlice.reducer;
