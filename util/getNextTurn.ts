import store from "../redux/store";

export default function getNextTurn() {
  const game = store.getState().gameState
  const orderOfPlayer = [...game.orderOfPlay]
  let turnOrder: turnType[] = []
  for (let index = 0; index < orderOfPlayer.length; index += 1) {
    if (orderOfPlayer[index] === "Hamlet" && !game.hamlet.accused) {
      turnOrder.push("Hamlet")
      turnOrder.push("HamletRoom")
      turnOrder.push("HamletSugget")
    } else if (orderOfPlayer[index] === "Claudius" && !game.claudius.accused) {
      turnOrder.push("Claudius")
      turnOrder.push("ClaudiusRoom")
      turnOrder.push("ClaudiusSuggest")
    } else if (orderOfPlayer[index] === "Polonius" && !game.gertrude.accused) {
      turnOrder.push("Polonius")
      turnOrder.push("PoloniusRoom")
      turnOrder.push("PoloniusSuggest")
    } else if (orderOfPlayer[index] === "Gertrude" && !game.gertrude.accused) {
      turnOrder.push("Gertrude");
      turnOrder.push("GertrudeRoom");
      turnOrder.push("GertrudeSuggest");
    }
  }
  const index = turnOrder.indexOf(game.turn)
  
}