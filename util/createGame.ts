import { doc, setDoc } from "firebase/firestore"
import { db } from "../app/_layout"
import { loadingStateEnum } from "../constants/PiecesLocations"
import {createUUID, roleDie, shuffle} from "./util"
import store from "../redux/store"

export default async function createGame(uid: string): Promise<{ result: loadingStateEnum.success; game: gameState } | { result: loadingStateEnum.failed }> {
  const username = store.getState().username
  let murderWeapons: murderWeapons[] = ["Hemlock_Poison", "Sharpened_Rapier", "Axe",'Dagger']
  let rooms: rooms[] = ["Gun_Platform", "Great_Hall", "Fencing_Room", "Court_Yard", "Royal_Bedroom", "Chapel", "Throne_Room", "Stair_Well"]
  let players: players[] = ["Hamlet", "Claudius", "Polonius", "Gertrude"]
  murderWeapons = shuffle(murderWeapons);
  rooms = shuffle(rooms);
  players = shuffle(players);
  const answer: answerType = {
    murderWeapon: murderWeapons[0],
    room: rooms[0],
    player: players[0]
  }
  const orderOfPlay: players[] = shuffle([...players]);
  murderWeapons.shift();
  rooms.shift();
  players.shift();
  let cards: cardType[] = [...murderWeapons, ...rooms, ...players];
  cards = shuffle(cards);
  let hamletCards: cardType[] = [];
  let claudiusCards: cardType[] = [];
  let poloniusCards: cardType[] = [];
  let gertrudeCards: cardType[] = [];
  
  function addCard(player: players, index: number) {
    if (player === "Hamlet") {
      hamletCards.push(cards[index]);
    } else if (player === "Claudius") {
      claudiusCards.push(cards[index]);
    } else if (player === "Polonius") {
      poloniusCards.push(cards[index]);
    } else if (player === "Gertrude") {
      gertrudeCards.push(cards[index]);
    }
  }
  const searchOrder = [...orderOfPlay]
  for (let index = 0; index < cards.length; index += 1) {
    if ((index % 4) === 0) {
      addCard(searchOrder[3], index)
    } else if ((index + 1) % 4 === 0) {
      addCard(searchOrder[2], index)
    } else if ((index + 2) % 4 === 0) {
      addCard(searchOrder[1], index)
    } else if ((index + 3) % 4 === 0) {
      addCard(searchOrder[0], index)
    }
  }

  const gameId = Math.floor(100000 + Math.random() * 900000).toString()
  const game: gameState = {
    gameId: gameId,
    hamlet: {
      user: {
        id: '',
        username: ''
      },
      pos: "",
      cards: hamletCards,
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
      pos: "",
      cards: claudiusCards,
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
      pos: "",
      cards: poloniusCards,
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
      pos: "",
      cards: gertrudeCards,
      guesses: [],
      accused: false,
      notes: '',
      lastDismissed: ''
    },
    master: uid,
    players: [{
      id: uid,
      username: username
    }],
    turn: "Selecting",
    dieOne: roleDie(),
    dieTwo: roleDie(),
    history: [],
    dieCount: 0,
    orderOfPlay: orderOfPlay,
    answer: answer,
    promt: {
      room: "Gun_Platform",
      player: "Hamlet",
      weapon: "Hemlock_Poison",
      intiator: "Hamlet",
      accusation: false,
      time: "",
      timeHandled: "",
      handledCard: "",
      suggester: ""
    },
    gameOver: false,
    winner: "",
    bannedPlayers: [],
    changeKey: createUUID()
  }
  try {
    await setDoc(doc(db, "Games", gameId), game);
    return {result: loadingStateEnum.success, game: game}
  } catch {
    return {result: loadingStateEnum.failed}
  }
}