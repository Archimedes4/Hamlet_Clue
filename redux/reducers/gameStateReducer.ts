import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { roleDie } from '../../util/util';

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
    notes: ''
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
    notes: ''
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
    notes: ''
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
    notes: ''
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
    handledCard: ""
  },
  gameOver: false,
  winner: ""
}

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: initalState,
  reducers: {
    setGameState: (_state, action: PayloadAction<gameState>) => {
      return action.payload
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
          winner: state.winner
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
          winner: state.winner
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
          winner: state.winner
        }
        switch (state.turn) {
          case "Hamlet":
            newGameState.hamlet = {
              user: state.hamlet.user,
              pos: action.payload.pos,
              cards: state.hamlet.cards,
              guesses: state.hamlet.guesses,
              accused: false,
              notes: state.hamlet.notes
            }
          case "Claudius":
            newGameState.claudius = {
              user: state.claudius.user,
              pos: action.payload.pos,
              cards: state.claudius.cards,
              guesses: state.claudius.guesses,
              accused: false,
              notes: state.claudius.notes
            }
          case "Polonius":
            newGameState.polonius = {
              user: state.polonius.user,
              pos: action.payload.pos,
              cards: state.polonius.cards,
              guesses: state.polonius.guesses,
              accused: false,
              notes: state.polonius.notes
            }
          case "Gertrude":
            newGameState.gertrude = {
              user: state.gertrude.user,
              pos: action.payload.pos,
              cards: state.gertrude.cards,
              guesses: state.gertrude.guesses,
              accused: false,
              notes: state.gertrude.notes
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
        winner: state.winner
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
        winner: state.winner
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
        winner: state.winner
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
        winner: state.winner
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
        winner: state.winner
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
        winner: state.winner
      }
      return newGameState
    }
  },
});

export default gameStateSlice.reducer;
