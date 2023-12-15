import { PayloadAction, createSlice } from '@reduxjs/toolkit';

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
  bannedPlayers: []
}

export const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: initalState,
  reducers: {
    updateGameState: (state, action: PayloadAction<gameState>) => {
      console.log("MARK ONE")
      if (state === action.payload) {
        return state;
      }
      return action.payload;
    },
    // setHamlet: (state, action: PayloadAction<playerInfo>) => {
    //   let newGameState: gameState = {
    //     gameId: state.gameId,
    //     master: state.master,
    //     players: state.players,
    //     hamlet: action.payload,
    //     claudius: state.claudius,
    //     polonius: state.polonius,
    //     gertrude: state.gertrude,
    //     turn: state.turn,
    //     dieOne: state.dieOne,
    //     dieTwo: state.dieTwo,
    //     dieCount: state.dieCount,
    //     history: state.history,
    //     orderOfPlay: state.orderOfPlay,
    //     answer: state.answer,
    //     promt: state.promt,
    //     gameOver: state.gameOver,
    //     winner: state.winner,
    //     bannedPlayers: state.bannedPlayers
    //   }
    //   if (newGameState === state) {
    //     return state
    //   }
    //   return newGameState
    // },
    // setClaudius: (state, action: PayloadAction<playerInfo>) => {
    //   let newGameState: gameState = {
    //     gameId: state.gameId,
    //     master: state.master,
    //     players: state.players,
    //     hamlet: state.hamlet,
    //     claudius: action.payload,
    //     polonius: state.polonius,
    //     gertrude: state.gertrude,
    //     turn: state.turn,
    //     dieOne: state.dieOne,
    //     dieTwo: state.dieTwo,
    //     dieCount: state.dieCount,
    //     history: state.history,
    //     orderOfPlay: state.orderOfPlay,
    //     answer: state.answer,
    //     promt: state.promt,
    //     gameOver: state.gameOver,
    //     winner: state.winner,
    //     bannedPlayers: state.bannedPlayers
    //   }
    //   if (newGameState === state) {
    //     return state
    //   }
    //   return newGameState
    // },
    // setPolonius: (state, action: PayloadAction<playerInfo>) => {
    //   let newGameState: gameState = {
    //     gameId: state.gameId,
    //     master: state.master,
    //     players: state.players,
    //     hamlet: state.hamlet,
    //     claudius: state.claudius,
    //     polonius: action.payload,
    //     gertrude: state.gertrude,
    //     turn: state.turn,
    //     dieOne: state.dieOne,
    //     dieTwo: state.dieTwo,
    //     dieCount: state.dieCount,
    //     history: state.history,
    //     orderOfPlay: state.orderOfPlay,
    //     answer: state.answer,
    //     promt: state.promt,
    //     gameOver: state.gameOver,
    //     winner: state.winner,
    //     bannedPlayers: state.bannedPlayers
    //   }
    //   if (newGameState === state) {
    //     return state
    //   }
    //   return newGameState
    // },
    // setGertude: (state, action: PayloadAction<playerInfo>) => {
    //   let newGameState: gameState = {
    //     gameId: state.gameId,
    //     master: state.master,
    //     players: state.players,
    //     hamlet: state.hamlet,
    //     claudius: state.claudius,
    //     polonius: state.polonius,
    //     gertrude: action.payload,
    //     turn: state.turn,
    //     dieOne: state.dieOne,
    //     dieTwo: state.dieTwo,
    //     dieCount: state.dieCount,
    //     history: state.history,
    //     orderOfPlay: state.orderOfPlay,
    //     answer: state.answer,
    //     promt: state.promt,
    //     gameOver: state.gameOver,
    //     winner: state.winner,
    //     bannedPlayers: state.bannedPlayers
    //   }
    //   if (newGameState === state) {
    //     return state
    //   }
    //   return newGameState
    // },
    // setTurn: (state, action: PayloadAction<turnType>) => {
    //   let newGameState: gameState = {
    //     gameId: state.gameId,
    //     master: state.master,
    //     players: state.players,
    //     hamlet: state.hamlet,
    //     claudius: state.claudius,
    //     polonius: state.polonius,
    //     gertrude: state.gertrude,
    //     turn: action.payload,
    //     dieOne: state.dieOne,
    //     dieTwo: state.dieTwo,
    //     dieCount: state.dieCount,
    //     history: state.history,
    //     orderOfPlay: state.orderOfPlay,
    //     answer: state.answer,
    //     promt: state.promt,
    //     gameOver: state.gameOver,
    //     winner: state.winner,
    //     bannedPlayers: state.bannedPlayers
    //   }
    //   if (newGameState === state) {
    //     return state
    //   }
    //   return newGameState
    // },
    // setPromtAndTurn: (state, action: PayloadAction<{turn: turnType, prompt: informationPromt}>) => {
    //   let newGameState: gameState = {
    //     gameId: state.gameId,
    //     master: state.master,
    //     players: state.players,
    //     hamlet: state.hamlet,
    //     claudius: state.claudius,
    //     polonius: state.polonius,
    //     gertrude: state.gertrude,
    //     turn: action.payload.turn,
    //     dieOne: state.dieOne,
    //     dieTwo: state.dieTwo,
    //     dieCount: state.dieCount,
    //     history: state.history,
    //     orderOfPlay: state.orderOfPlay,
    //     answer: state.answer,
    //     promt: action.payload.prompt,
    //     gameOver: state.gameOver,
    //     winner: state.winner,
    //     bannedPlayers: state.bannedPlayers
    //   }
    //   if (newGameState === state) {
    //     return state
    //   }
    //   return newGameState
    // },
    // setPromptTurnUser: (state, action: PayloadAction<{turn: turnType, prompt: informationPromt, player: players}>) => {
    //   let hamlet = {
    //     user: state.hamlet.user,
    //     pos: state.hamlet.pos,
    //     cards: state.hamlet.cards,
    //     guesses: state.hamlet.guesses,
    //     accused: state.hamlet.accused,
    //     notes: state.hamlet.notes,
    //     lastDismissed: (action.payload.player === "Hamlet") ? action.payload.prompt.time:state.hamlet.lastDismissed
    //   }
    //   let claudius = {
    //     user: state.claudius.user,
    //     pos: state.claudius.pos,
    //     cards: state.claudius.cards,
    //     guesses: state.claudius.guesses,
    //     accused: state.claudius.accused,
    //     notes: state.claudius.notes,
    //     lastDismissed: (action.payload.player === "Claudius") ? action.payload.prompt.time:state.claudius.lastDismissed
    //   }
    //   let polonius = {
    //     user: state.polonius.user,
    //     pos: state.polonius.pos,
    //     cards: state.polonius.cards,
    //     guesses: state.polonius.guesses,
    //     accused: state.polonius.accused,
    //     notes: state.polonius.notes,
    //     lastDismissed: (action.payload.player === "Polonius") ? action.payload.prompt.time:state.polonius.lastDismissed
    //   }
    //   let gertrude = {
    //     user: state.gertrude.user,
    //     pos: state.gertrude.pos,
    //     cards: state.gertrude.cards,
    //     guesses: state.gertrude.guesses,
    //     accused: state.gertrude.accused,
    //     notes: state.gertrude.notes,
    //     lastDismissed: (action.payload.player === "Gertrude") ? action.payload.prompt.time:state.gertrude.lastDismissed
    //   }
    //   let newGameState: gameState = {
    //     gameId: state.gameId,
    //     master: state.master,
    //     players: state.players,
    //     hamlet: hamlet,
    //     claudius: claudius,
    //     polonius: polonius,
    //     gertrude: gertrude,
    //     turn: action.payload.turn,
    //     dieOne: state.dieOne,
    //     dieTwo: state.dieTwo,
    //     dieCount: state.dieCount,
    //     history: state.history,
    //     orderOfPlay: state.orderOfPlay,
    //     answer: state.answer,
    //     promt: action.payload.prompt,
    //     gameOver: state.gameOver,
    //     winner: state.winner,
    //     bannedPlayers: state.bannedPlayers
    //   }
    //   return newGameState;
    // },
    // setBannedPlayers: (state, action: PayloadAction<string[]>) => {
    //   let newGameState: gameState = {
    //     gameId: state.gameId,
    //     master: state.master,
    //     players: state.players,
    //     hamlet: state.hamlet,
    //     claudius: state.claudius,
    //     polonius: state.polonius,
    //     gertrude: state.gertrude,
    //     turn: state.turn,
    //     dieOne: state.dieOne,
    //     dieTwo: state.dieTwo,
    //     dieCount: state.dieCount,
    //     history: state.history,
    //     orderOfPlay: state.orderOfPlay,
    //     answer: state.answer,
    //     promt: state.promt,
    //     gameOver: state.gameOver,
    //     winner: state.winner,
    //     bannedPlayers: action.payload
    //   }
    //   if (newGameState === state) {
    //     return state
    //   }
    //   return newGameState
    // },
    // setHamletPromptAndTurn: (state, action: PayloadAction<{player: playerInfo, turn: turnType, prompt: informationPromt}>) => {
    //   let newGameState: gameState = {
    //     gameId: state.gameId,
    //     master: state.master,
    //     players: state.players,
    //     hamlet: action.payload.player,
    //     claudius: state.claudius,
    //     polonius: state.polonius,
    //     gertrude: state.gertrude,
    //     turn: action.payload.turn,
    //     dieOne: state.dieOne,
    //     dieTwo: state.dieTwo,
    //     dieCount: state.dieCount,
    //     history: state.history,
    //     orderOfPlay: state.orderOfPlay,
    //     answer: state.answer,
    //     promt: action.payload.prompt,
    //     gameOver: state.gameOver,
    //     winner: state.winner,
    //     bannedPlayers: state.bannedPlayers
    //   }
    //   if (newGameState === state) {
    //     return state
    //   }
    //   return newGameState
    // },
    // setClaudiusPromptAndTurn: (state, action: PayloadAction<{player: playerInfo, turn: turnType, prompt: informationPromt}>) => {
    //   let newGameState: gameState = {
    //     gameId: state.gameId,
    //     master: state.master,
    //     players: state.players,
    //     hamlet: state.hamlet,
    //     claudius: action.payload.player,
    //     polonius: state.polonius,
    //     gertrude: state.gertrude,
    //     turn: action.payload.turn,
    //     dieOne: state.dieOne,
    //     dieTwo: state.dieTwo,
    //     dieCount: state.dieCount,
    //     history: state.history,
    //     orderOfPlay: state.orderOfPlay,
    //     answer: state.answer,
    //     promt: action.payload.prompt,
    //     gameOver: state.gameOver,
    //     winner: state.winner,
    //     bannedPlayers: state.bannedPlayers
    //   }
    //   if (newGameState === state) {
    //     return state
    //   }
    //   return newGameState
    // },
    // setPoloniusPromptAndTurn: (state, action: PayloadAction<{player: playerInfo, turn: turnType, prompt: informationPromt}>) => {
    //   let newGameState: gameState = {
    //     gameId: state.gameId,
    //     master: state.master,
    //     players: state.players,
    //     hamlet: state.hamlet,
    //     claudius: state.claudius,
    //     polonius: action.payload.player,
    //     gertrude: state.gertrude,
    //     turn: action.payload.turn,
    //     dieOne: state.dieOne,
    //     dieTwo: state.dieTwo,
    //     dieCount: state.dieCount,
    //     history: state.history,
    //     orderOfPlay: state.orderOfPlay,
    //     answer: state.answer,
    //     promt: action.payload.prompt,
    //     gameOver: state.gameOver,
    //     winner: state.winner,
    //     bannedPlayers: state.bannedPlayers
    //   }
    //   if (newGameState === state) {
    //     return state
    //   }
    //   return newGameState
    // },
    // setGertrudePromptAndTurn: (state, action: PayloadAction<{player: playerInfo, turn: turnType, prompt: informationPromt}>) => {
    //   let newGameState: gameState = {
    //     gameId: state.gameId,
    //     master: state.master,
    //     players: state.players,
    //     hamlet: state.hamlet,
    //     claudius: state.claudius,
    //     polonius: state.polonius,
    //     gertrude: action.payload.player,
    //     turn: action.payload.turn,
    //     dieOne: state.dieOne,
    //     dieTwo: state.dieTwo,
    //     dieCount: state.dieCount,
    //     history: state.history,
    //     orderOfPlay: state.orderOfPlay,
    //     answer: state.answer,
    //     promt: action.payload.prompt,
    //     gameOver: state.gameOver,
    //     winner: state.winner,
    //     bannedPlayers: state.bannedPlayers
    //   }
    //   if (newGameState === state) {
    //     return state
    //   }
    //   return newGameState
    // },
  },
});

export default gameStateSlice.reducer;
