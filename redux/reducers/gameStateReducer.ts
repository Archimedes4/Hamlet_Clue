import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import roleDie from '../../util/roleDie';

const initalState: gameState = {
  gameId: '',
  hamlet: {
    id: '',
    pos: '',
    cards: [],
    guesses: [],
    accused: false
  },
  claudius: {
    id: '',
    pos: '',
    cards: [],
    guesses: [],
    accused: false
  },
  polonius: {
    id: '',
    pos: '',
    cards: [],
    guesses: [],
    accused: false
  },
  gertrude: {
    id: '',
    pos: '',
    cards: [],
    guesses: [],
    accused: false
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
  master: ''
}

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: initalState,
  reducers: {
    setGameState: (_state, action: PayloadAction<gameState>) => {
      return action.payload
    },
    movePosition: (state, action: PayloadAction<position>) => {
      if (state.dieCount + 1 === state.dieOne + state.dieTwo) {
        //Made all moves next player
        let newGameState: gameState = {
          gameId: state.gameId,
          master: state.master,
          hamlet: state.hamlet,
          claudius: state.claudius,
          polonius: state.polonius,
          gertrude: state.gertrude,
          turn: state.turn,
          dieOne: roleDie(),
          dieTwo: roleDie(),
          dieCount: 0,
          history: [...state.history, action.payload],
          orderOfPlay: state.orderOfPlay,
          answer: state.answer
        }
        switch (state.turn) {
          case "Hamlet":
            const hamletIndex = state.orderOfPlay.indexOf("Hamlet") 
            if (hamletIndex >= 3) {
              newGameState.turn = state.orderOfPlay[0]
            } else {
              newGameState.turn = state.orderOfPlay[hamletIndex + 1]
            }
          case "Claudius":
            state.orderOfPlay.indexOf("Claudius")
            const claudiusIndex = state.orderOfPlay.indexOf("Hamlet") 
            if (claudiusIndex >= 3) {
              newGameState.turn = state.orderOfPlay[0]
            } else {
              newGameState.turn = state.orderOfPlay[claudiusIndex + 1]
            }
          case "Polonius":
            const poloniusIndex = state.orderOfPlay.indexOf("Polonius")
            if (poloniusIndex >= 3) {
              newGameState.turn = state.orderOfPlay[0]
            } else {
              newGameState.turn = state.orderOfPlay[poloniusIndex + 1]
            }
          case "Gertrude":
            const gertrudeIndex = state.orderOfPlay.indexOf("Gertrude") 
            if (gertrudeIndex >= 3) {
              newGameState.turn = state.orderOfPlay[0]
            } else {
              newGameState.turn = state.orderOfPlay[gertrudeIndex + 1]
            }
        }
        return newGameState
      } else {
        let newGameState: gameState = {
          gameId: state.gameId,
          master: state.master,
          hamlet: state.hamlet,
          claudius: state.claudius,
          polonius: state.polonius,
          gertrude: state.gertrude,
          turn: state.turn,
          dieOne: state.dieOne,
          dieTwo: state.dieTwo,
          dieCount: state.dieCount + 1,
          history: [...state.history, action.payload],
          orderOfPlay: state.orderOfPlay,
          answer: state.answer
        }
        switch (state.turn) {
          case "Hamlet":
            newGameState.hamlet = {
              id: state.hamlet.id,
              pos: action.payload,
              cards: state.hamlet.cards,
              guesses: state.hamlet.guesses,
              accused: false
            }
          case "Claudius":
            newGameState.claudius = {
              id: state.claudius.id,
              pos: action.payload,
              cards: state.claudius.cards,
              guesses: state.claudius.guesses,
              accused: false
            }
          case "Polonius":
            newGameState.polonius = {
              id: state.polonius.id,
              pos: action.payload,
              cards: state.polonius.cards,
              guesses: state.polonius.guesses,
              accused: false
            }
          case "Gertrude":
            newGameState.gertrude = {
              id: state.gertrude.id,
              pos: action.payload,
              cards: state.gertrude.cards,
              guesses: state.gertrude.guesses,
              accused: false
            }
        }
        return newGameState
      }
    },
    setHamlet: (state, action: PayloadAction<playerInfo>) => {
      let newGameState: gameState = {
        gameId: state.gameId,
        master: state.master,
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
        answer: state.answer
      }
      return newGameState
    },
    setClaudius: (state, action: PayloadAction<playerInfo>) => {
      let newGameState: gameState = {
        gameId: state.gameId,
        master: state.master,
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
        answer: state.answer
      }
      return newGameState
    },
    setPolonius: (state, action: PayloadAction<playerInfo>) => {
      let newGameState: gameState = {
        gameId: state.gameId,
        master: state.master,
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
        answer: state.answer
      }
      return newGameState
    },
    setGertude: (state, action: PayloadAction<playerInfo>) => {
      let newGameState: gameState = {
        gameId: state.gameId,
        master: state.master,
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
        answer: state.answer
      }
      return newGameState
    }
  },
});

export default gameStateSlice.reducer;
