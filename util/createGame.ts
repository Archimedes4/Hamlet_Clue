import { auth } from "../app/_layout"
import createUUID from "./createUUID"
import roleDie from "./roleDie"
import shuffle from "./shuffle"

export default function createGame(uid: string): gameState {
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
  const orderOfPlay: players[] = shuffle(players)
  murderWeapons.shift();
  rooms.shift();
  players.shift();
  let cards: cardType[] = [...murderWeapons, ...rooms, ...players];
  cards = shuffle(cards);
  let hamletCards: cardType[] = [];
  let claudiusCards: cardType[] = [];
  let poloniusCards: cardType[] = [];
  let gertrudeCards: cardType[] = [];
  
  for (let index = 0; index < cards.length; index += 1) {
    if (index % 4) {
      switch (orderOfPlay[3]) {
        case "Hamlet":
          hamletCards.push(cards[index]);
        case "Claudius":
          claudiusCards.push(cards[index]);
        case "Polonius":
          poloniusCards.push(cards[index]);
        case "Gertrude":
          gertrudeCards.push(cards[index]);
      }
    } else if ((index + 1) % 4) {
      switch (orderOfPlay[2]) {
        case "Hamlet":
          hamletCards.push(cards[index]);
        case "Claudius":
          claudiusCards.push(cards[index]);
        case "Polonius":
          poloniusCards.push(cards[index]);
        case "Gertrude":
          gertrudeCards.push(cards[index]);
      }
    } else if ((index + 2) % 4) {
      switch (orderOfPlay[1]) {
        case "Hamlet":
          hamletCards.push(cards[index]);
        case "Claudius":
          claudiusCards.push(cards[index]);
        case "Polonius":
          poloniusCards.push(cards[index]);
        case "Gertrude":
          gertrudeCards.push(cards[index]);
      }
    } else if ((index + 3) % 4) {
      switch (orderOfPlay[0]) {
        case "Hamlet":
          hamletCards.push(cards[index]);
        case "Claudius":
          claudiusCards.push(cards[index]);
        case "Polonius":
          poloniusCards.push(cards[index]);
        case "Gertrude":
          gertrudeCards.push(cards[index]);
      }
    }
  }

  return {
    gameId: Math.floor(100000 + Math.random() * 900000).toString(),
    hamlet: {
      id: "",
      pos: "",
      cards: hamletCards,
      guesses: [],
      accused: false
    },
    claudius: {
      id: "",
      pos: "",
      cards: claudiusCards,
      guesses: [],
      accused: false
    },
    polonius: {
      id: "",
      pos: "",
      cards: poloniusCards,
      guesses: [],
      accused: false
    },
    gertrude: {
      id: "",
      pos: "",
      cards: gertrudeCards,
      guesses: [],
      accused: false
    },
    master: uid,
    turn: orderOfPlay[0],
    dieOne: roleDie(),
    dieTwo: roleDie(),
    history: [],
    dieCount: 0,
    orderOfPlay: orderOfPlay,
    answer: answer
  }
}