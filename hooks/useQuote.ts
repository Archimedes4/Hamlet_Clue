import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { set } from "firebase/database";
import { auth } from "../app/_layout";

//https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const quotes = ["Methinks the lady doth protest too much",
  "Something is rotten in the state of Denmark",
  "I must be cruel, only to be kind. Thus bad begins and worse remains behind.",
  "Though this be madness, yet there is method in't",
  "That one may smile and smile and be a villain",
  "God hath given you one face, and you make yourself another"]

export default function useQuote(id: string) {
  const [quote, setQuote] = useState<string>("");
  const gameState = useSelector((state: RootState) => state.gameState);
  useEffect(() => {
    const interval = setInterval(() => {
      if (id !== gameState.hamlet.pos && id !== gameState.claudius.pos && id !== gameState.polonius.pos && id !== gameState.gertrude.pos) {
        return () => clearInterval(interval);
      }
      let eligiblePlayers: players[] = []
      if (gameState.turn !== "Hamlet" && gameState.turn !== "HamletRoom" && gameState.turn !== "HamletSugget") {
        eligiblePlayers.push("Hamlet")
      } 
      if (gameState.turn !== "Claudius" && gameState.turn !== "ClaudiusRoom" && gameState.turn !== "ClaudiusSuggest") {
        eligiblePlayers.push("Claudius")
      }
      if (gameState.turn !== "Polonius" && gameState.turn !== "PoloniusRoom" && gameState.turn !== "PoloniusSuggest") {
        eligiblePlayers.push("Polonius")
      }
      if (gameState.turn !== "Gertrude" && gameState.turn !== "GertrudeRoom" && gameState.turn !== "GertrudeSuggest") {
        eligiblePlayers.push("Gertrude")
      }
      const uid = auth.currentUser?.uid
      if ((gameState.turn === "Hamlet" || gameState.turn === "HamletRoom" || gameState.turn === "HamletSugget") && gameState.hamlet.user.id === uid) {
        return
      } 
      if ((gameState.turn === "Claudius" || gameState.turn === "ClaudiusRoom" || gameState.turn === "ClaudiusSuggest") && gameState.claudius.user.id === uid) {
        return
      }
      if ((gameState.turn === "Polonius" || gameState.turn === "PoloniusRoom" || gameState.turn === "PoloniusSuggest") && gameState.polonius.user.id === uid) {
        return
      }
      if ((gameState.turn === "Gertrude" || gameState.turn === "GertrudeRoom" || gameState.turn === "GertrudeSuggest") && gameState.gertrude.user.id === uid) {
        return
      }

      const player = eligiblePlayers[randomIntFromInterval(0, eligiblePlayers.length)]
      if (player === "Hamlet" && id === gameState.hamlet.pos) {
        setQuote(quotes[randomIntFromInterval(0, 5)])
      } else if (player === "Claudius" && id === gameState.claudius.pos) {
        setQuote(quotes[randomIntFromInterval(0, 5)])
      } else if (player === "Polonius" && id === gameState.polonius.pos) {
        setQuote(quotes[randomIntFromInterval(0, 5)])
      } else if (player === "Gertrude" && id === gameState.gertrude.pos) {
        setQuote(quotes[randomIntFromInterval(0, 5)])
      } else {
        setQuote("")
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [gameState.turn]);
  return quote
}