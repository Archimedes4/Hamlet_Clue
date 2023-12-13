import { View, Text, Pressable, Modal, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import store, { RootState } from '../../../redux/store';
import Options from '../../../components/Options';
import PiecesLocations from '../../../constants/PiecesLocations';
import PlayerScreen from '../../../components/PlayerScreen';
import { checkIfPickingSpawnPosition, setSpawnPosition } from '../../../util/spawnPosition';
import DetectiveSheet from '../../../components/DetectiveSheet';
import isPlayersTurn from '../../../util/isPlayersTurn';
import onMove from '../../../util/onMove';
import RoomScreen from '../../../components/RoomScreen';
import Colors from '../../../constants/Colors';
import { useGlobalSearchParams } from 'expo-router';
import useGameSubscribe from '../../../hooks/useGameSubscribe';
import useGameReady from '../../../hooks/useGameReady';
import InformationScreen from '../../../components/InformationScreen';
import { Claudius, Gertrude, Hamlet, Polonius } from '../../../components/Icons';

//26 by 26 grid

declare global {
  type squarePos = "" | "SquareX7Y0" | "SquareX16Y0" | "SquareX6Y1" | "SquareX7Y1" | "SquareX16Y1" | "SquareX17Y1" | "SquareX6Y2" | "SquareX7Y2" | "SquareX16Y2" | "SquareX17Y2" | "SquareX6Y3" | "SquareX7Y3" | "SquareX16Y3" | "SquareX17Y3" | "SquareX6Y4" | "SquareX7Y4" | "SquareX16Y4" | "SquareX17Y4" | "SquareX6Y5" | "SquareX7Y5" | "SquareX16Y5" | "SquareX17Y5" | "SquareX18Y5" | "SquareX6Y6" | "SquareX7Y6" | "SquareX16Y6" | "SquareX17Y6" | "SquareX18Y6" | "SquareX19Y6" | "SquareX20Y6" | "SquareX21Y6" | "SquareX22Y6" | "SquareX23Y6" | "SquareX24Y6" | "SquareX6Y7" | "SquareX7Y7" | "SquareX16Y7" | "SquareX17Y7" | "SquareX18Y7" | "SquareX19Y7" | "SquareX20Y7" | "SquareX21Y7" | "SquareX22Y7" | "SquareX23Y7" | "SquareX24Y7" | "SquareX25Y7" | "SquareX0Y8" | "SquareX1Y8" | "SquareX2Y8" | "SquareX3Y8" | "SquareX4Y8" | "SquareX5Y8" | "SquareX6Y8" | "SquareX7Y8" | "SquareX8Y8" | "SquareX9Y8" | "SquareX10Y8" | "SquareX11Y8" | "SquareX12Y8" | "SquareX13Y8" | "SquareX14Y8" | "SquareX15Y8" | "SquareX16Y8" | "SquareX17Y8" | "SquareX18Y8" | "SquareX19Y8" | "SquareX20Y8" | "SquareX21Y8" | "SquareX22Y8" | "SquareX23Y8" | "SquareX24Y8" | "SquareX1Y9" | "SquareX2Y9" | "SquareX3Y9" | "SquareX4Y9" | "SquareX5Y9" | "SquareX6Y9" | "SquareX7Y9" | "SquareX8Y9" | "SquareX9Y9" | "SquareX10Y9" | "SquareX11Y9" | "SquareX12Y9" | "SquareX13Y9" | "SquareX14Y9" | "SquareX15Y9" | "SquareX16Y9" | "SquareX17Y9" | "SquareX18Y9" | "SquareX19Y9" | "SquareX7Y10" | "SquareX8Y10" | "SquareX18Y10" | "SquareX19Y10" | "SquareX7Y11" | "SquareX8Y11" | "SquareX18Y11" | "SquareX19Y11" | "SquareX7Y12" | "SquareX8Y12" | "SquareX18Y12" | "SquareX19Y12" | "SquareX7Y13" | "SquareX8Y13" | "SquareX18Y13" | "SquareX19Y13" | "SquareX7Y14" | "SquareX8Y14" | "SquareX18Y14" | "SquareX19Y14" | "SquareX7Y15" | "SquareX8Y15" | "SquareX18Y15" | "SquareX19Y15" | "SquareX7Y16" | "SquareX8Y16" | "SquareX18Y16" | "SquareX19Y16" | "SquareX7Y17" | "SquareX8Y17" | "SquareX9Y17" | "SquareX10Y17" | "SquareX11Y17" | "SquareX12Y17" | "SquareX13Y17" | "SquareX14Y17" | "SquareX15Y17" | "SquareX16Y17" | "SquareX17Y17" | "SquareX18Y17" | "SquareX19Y17" | "SquareX20Y17" | "SquareX7Y18" | "SquareX8Y18" | "SquareX9Y18" | "SquareX10Y18" | "SquareX11Y18" | "SquareX12Y18" | "SquareX13Y18" | "SquareX14Y18" | "SquareX15Y18" | "SquareX16Y18" | "SquareX17Y18" | "SquareX18Y18" | "SquareX19Y18" | "SquareX20Y18" | "SquareX21Y18" | "SquareX22Y18" | "SquareX23Y18" | "SquareX24Y18" | "SquareX25Y18" | "SquareX8Y19" | "SquareX9Y19" | "SquareX10Y19" | "SquareX11Y19" | "SquareX12Y19" | "SquareX13Y19" | "SquareX14Y19" | "SquareX15Y19" | "SquareX16Y19" | "SquareX17Y19" | "SquareX18Y19" | "SquareX19Y19" | "SquareX20Y19" | "SquareX21Y19" | "SquareX22Y19" | "SquareX8Y20" | "SquareX9Y20" | "SquareX20Y20" | "SquareX21Y20" | "SquareX8Y21" | "SquareX9Y21" | "SquareX20Y21" | "SquareX21Y21" | "SquareX8Y22" | "SquareX9Y22" | "SquareX20Y22" | "SquareX21Y22" | "SquareX8Y23" | "SquareX9Y23" | "SquareX20Y23" | "SquareX21Y23" | "SquareX8Y24" | "SquareX9Y24" | "SquareX20Y24" | "SquareX21Y24" | "SquareX9Y25" | "SquareX20Y25"
  type positionType = {
    id: position,
    moves: position[]
  }

  type murderWeapons = "Hemlock_Poison" | "Sharpened_Rapier" | "Axe" |'Dagger'
  type rooms = "Gun_Platform" | "Great_Hall" | "Fencing_Room" | "Court_Yard" | "Royal_Bedroom" | "Chapel" | "Throne_Room" | "Stair_Well"
  type players = "Hamlet" | "Claudius" | "Polonius" | "Gertrude"
  type cardType = murderWeapons | rooms | players
  type position = squarePos | rooms
  type turnType = players | "HamletRoom" | "ClaudiusRoom" | "PoloniusRoom" | "GertrudeRoom" | "HamletSugget" | "ClaudiusSuggest" | "PoloniusSuggest" | "GertrudeSuggest" | "Selecting"

  type levelType = "known" | "likely" | "guess"
  type guessType = {
    level: levelType
    card: cardType
    player: players //Used to show which player has which cards
  }

  type userType = {
    id: string,
    username: string
  }

  type playerInfo = {
    user: userType;
    pos: position;
    cards: cardType[];
    guesses: guessType[];
    accused: boolean;
    notes: string;
    lastDismissed: string;
  }

  type answerType = {
    murderWeapon: murderWeapons,
    room: rooms,
    player: players
  }
  type informationPromt = {
    //Room player and weapn are the information
    room: rooms;
    player: players;
    weapon: murderWeapons;
    //Who made the suggestion/acusation
    intiator: players;
    accusation: boolean;
    //At what time did they make suggest/accusatiom.
    time: string
    //At what time did the person responding to the turn respond.
    timeHandled: string | "";
    handledCard: cardType | "";
    suggester: players | "";
  }

  type gameState = {
    gameId: string;
    master: string; //just the id of the master
    hamlet: playerInfo;
    claudius: playerInfo;
    polonius: playerInfo;
    gertrude: playerInfo;
    turn: turnType;
    dieOne: number;
    dieTwo: number;
    players: userType[]
    history: position[]; //The history of the person with the turn
    dieCount: number //Number of moves the person with the turn has used
    orderOfPlay: players[];
    answer: answerType;
    promt: informationPromt;
    gameOver: boolean;
    winner: players | "";
    bannedPlayers: string[];
    changeKey: string
  };
  interface squarePieceProps {
    id: position;
    moveIds?: string[];
    imageUrl?: undefined;
    color?: string | undefined;
    xPos: number;
    yPos: number;
    role: "square" | "spawnSquare"
    roomWidth?: undefined;
    roomHeight?: undefined;
  }
  interface roomPieceProps {
    id: position;
    moveIds?: string[];
    imageUrl?: string | undefined;
    color?: string | undefined;
    xPos: number;
    yPos: number;
    roomWidth: number;
    roomHeight: number;
    role: "room"
  }
  interface optionsPieceProps {
    id: position;
    moveIds?: undefined;
    imageUrl?: undefined;
    color?: undefined;
    xPos: number;
    yPos: number;
    roomWidth: number;
    roomHeight: number;
    role: "options"
  }
}

function getSize(width: number, height: number) {
  if (width < height) {
    return width/28
  } else {
    return height/28
  }
}

function GamePiece({id, color, role, roomWidth, roomHeight, xPos, yPos}:(roomPieceProps | squarePieceProps | optionsPieceProps)) {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const hamlet = useSelector((state: RootState) => state.gameState.hamlet);
  const claudius = useSelector((state: RootState) => state.gameState.claudius);
  const polonius = useSelector((state: RootState) => state.gameState.polonius);
  const gertrude = useSelector((state: RootState) => state.gameState.gertrude);
  const turn = useSelector((state: RootState) => state.gameState.turn);
  const history = useSelector((state: RootState) => state.gameState.history);
  const [movableSquares, setMoveableSquares] = useState<position[]>([]);

  useEffect(() => {
    if (turn === 'Hamlet') {
      const hamletPiece = PiecesLocations.find((e) => {return e.id === hamlet.pos})
      if (hamletPiece !== undefined) {
        setMoveableSquares(hamletPiece.moves);
      }
    } else if (turn == "Claudius") {
      const cladiusPiece = PiecesLocations.find((e) => {return e.id === claudius.pos})
      if (cladiusPiece !== undefined) {
        setMoveableSquares(cladiusPiece.moves);
      }
    } else if (turn === "Polonius") {
      const poloniusPiece = PiecesLocations.find((e) => {return e.id === polonius.pos})
      if (poloniusPiece !== undefined) {
        setMoveableSquares(poloniusPiece.moves);
      }
    } else if (turn === "Gertrude") {
      const gertrudePiece = PiecesLocations.find((e) => {return e.id === gertrude.pos})
      if (gertrudePiece !== undefined) {
        setMoveableSquares(gertrudePiece.moves);
      }
    }
  }, [hamlet.pos, claudius.pos, polonius.pos, gertrude.pos, turn])

  if (role === "options") {
    return (
      <View id={id} style={{width: getSize(width, height) * 7, height: getSize(width, height) * 9, position: 'absolute', left: getSize(width, height) * xPos, top: getSize(width, height) * yPos}}>
        <Options width={getSize(width, height) * 7} height={getSize(width, height) * 9}/>
      </View>
    )
  }

  if (role === "room" && movableSquares.includes(id) && isPlayersTurn(hamlet, claudius, polonius, gertrude, turn)) {
    return (
      <Pressable onPress={() => {
        onMove(id)
      }} id={id} style={{width: getSize(width, height) * roomWidth, height: getSize(width, height) * roomHeight, backgroundColor: color, position: 'absolute', left: getSize(width, height) * xPos, top: getSize(width, height) * yPos}}>
        <Text>{id}</Text>
        { (id === hamlet.pos) ?
          <View style={{width: getSize(width, height), height: getSize(width, height), backgroundColor: Colors.main, borderRadius: getSize(width, height)/2, overflow: 'hidden'}}>
            <Hamlet width={getSize(width, height)} height={getSize(width, height)}/>
          </View>:null
        }
        { (id === claudius.pos) ?
          <View style={{width: getSize(width, height), height: getSize(width, height), backgroundColor: Colors.main, borderRadius: getSize(width, height)/2, overflow: 'hidden'}}>
            <Claudius width={getSize(width, height)} height={getSize(width, height)}/>
          </View>:null
        }
        { (id === polonius.pos) ?
          <View style={{width: getSize(width, height), height: getSize(width, height), backgroundColor: Colors.main, borderRadius: getSize(width, height)/2, overflow: 'hidden'}}>
            <Polonius width={getSize(width, height)} height={getSize(width, height)}/>
          </View>:null
        }
        { (id === gertrude.pos) ?
          <View style={{width: getSize(width, height), height: getSize(width, height), backgroundColor: Colors.main, borderRadius: getSize(width, height)/2, overflow: 'hidden'}}>
            <Gertrude width={getSize(width, height)} height={getSize(width, height)}/>
          </View>:null
        }
      </Pressable>
    )
  }

  if (role === "room") {
    return (
      <View id={id} style={{width: getSize(width, height) * roomWidth, height: getSize(width, height) * roomHeight, backgroundColor: color, position: 'absolute', left: getSize(width, height) * xPos, top: getSize(width, height) * yPos}}>
        { (id === "Throne_Room") ?
          <Image source={require('../../../assets/rooms/Throne_Room.png')} style={{width: getSize(width, height) * roomWidth, height: getSize(width, height) * roomHeight, overflow: 'hidden'}}/>:<Text>{id}</Text>
        }
        { (id === hamlet.pos) ?
          <View style={{width: getSize(width, height), height: getSize(width, height), backgroundColor: Colors.main, borderRadius: getSize(width, height)/2, overflow: 'hidden'}}>
            <Hamlet width={getSize(width, height)} height={getSize(width, height)}/>
          </View>:null
        }
        { (id === claudius.pos) ?
          <View style={{width: getSize(width, height), height: getSize(width, height), backgroundColor: Colors.main, borderRadius: getSize(width, height)/2, overflow: 'hidden'}}>
            <Claudius width={getSize(width, height)} height={getSize(width, height)}/>
          </View>:null
        }
        { (id === polonius.pos) ?
          <View style={{width: getSize(width, height), height: getSize(width, height), backgroundColor: Colors.main, borderRadius: getSize(width, height)/2, overflow: 'hidden'}}>
            <Polonius width={getSize(width, height)} height={getSize(width, height)}/>
          </View>:null
        }
        { (id === gertrude.pos) ?
          <View style={{width: getSize(width, height), height: getSize(width, height), backgroundColor: Colors.main, borderRadius: getSize(width, height)/2, overflow: 'hidden'}}>
            <Gertrude width={getSize(width, height)} height={getSize(width, height)}/>
          </View>:null
        }
      </View>
    )
  }

  //A pickable spawn sqaure
  if (checkIfPickingSpawnPosition(hamlet, claudius, polonius, gertrude) && role === "spawnSquare"  && id !== hamlet.pos && id !== claudius.pos && id !== polonius.pos && id !== gertrude.pos) {
    return (
      <Pressable onPress={() => {
        setSpawnPosition(hamlet, claudius, polonius, gertrude, id)
      }} id={id} style={{width: getSize(width, height), height: getSize(width, height), backgroundColor: color, position: 'absolute', left: getSize(width, height) * xPos, top: getSize(width, height) * yPos}} />
    )
  }

  //A moveable square
  if (movableSquares.includes(id) && id !== hamlet.pos && id !== claudius.pos && id !== polonius.pos && id !== gertrude.pos && isPlayersTurn(hamlet, claudius, polonius, gertrude, turn) && !history.includes(id)) {
    return (
      <Pressable onPress={() => {
        onMove(id)
      }} id={id} style={{width: getSize(width, height), height: getSize(width, height), backgroundColor: movableSquares.includes(id) ? "red":color, position: 'absolute', left: getSize(width, height) * xPos, top: getSize(width, height) * yPos}}>
      </Pressable>
    )
  }

  //General square
  return (
    <View id={id} style={{width: getSize(width, height), height: getSize(width, height), backgroundColor: color, position: 'absolute', left: getSize(width, height) * xPos, top: getSize(width, height) * yPos}}>
      { (id === hamlet.pos) ?
        <View style={{width: getSize(width, height), height: getSize(width, height), backgroundColor: Colors.main, borderRadius: getSize(width, height)/2, overflow: 'hidden'}}>
          <Hamlet width={getSize(width, height)} height={getSize(width, height)}/>
        </View>:null
      }
      { (id === claudius.pos) ?
        <View style={{width: getSize(width, height), height: getSize(width, height), backgroundColor: Colors.main, borderRadius: getSize(width, height)/2, overflow: 'hidden'}}>
          <Claudius width={getSize(width, height)} height={getSize(width, height)}/>
        </View>:null
      }
      { (id === polonius.pos) ?
        <View style={{width: getSize(width, height), height: getSize(width, height), backgroundColor: Colors.main, borderRadius: getSize(width, height)/2, overflow: 'hidden'}}>
          <Polonius width={getSize(width, height)} height={getSize(width, height)}/>
        </View>:null
      }
      { (id === gertrude.pos) ?
        <View style={{width: getSize(width, height), height: getSize(width, height), backgroundColor: Colors.main, borderRadius: getSize(width, height)/2, overflow: 'hidden'}}>
          <Gertrude width={getSize(width, height)} height={getSize(width, height)}/>
        </View>:null
      }
    </View>
  )
}

export default function index() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  const screens = useSelector((state: RootState) => state.screens);
  const id = useGlobalSearchParams();
  const [gameId, setGameId] = useState<string>("");
  useEffect(() => {
    if (typeof id.id === 'string') {
      setGameId(id.id)
    }
  }, [id])
  useGameSubscribe(gameId)
  useGameReady();
  return (
    <View style={{width: width, height: height, overflow: 'hidden', backgroundColor: Colors.main}}>
      <View style={{width: getSize(width, height) * 26, height: getSize(width, height) * 26, margin: 'auto', backgroundColor: Colors.main}}>
        {/* Options */}
        <GamePiece id='' xPos={0} yPos={10} roomWidth={10} roomHeight={10} role='options'/>

        {/* Rooms */}
        <GamePiece id="Gun_Platform" color='yellow' xPos={0} yPos={0} roomWidth={6} roomHeight={8} role='room'/>
        <GamePiece id="Great_Hall" color='red' xPos={8} yPos={0} roomWidth={8} roomHeight={8} role='room'/>
        <GamePiece id="Fencing_Room" color='orange' xPos={18} yPos={0} roomWidth={8} roomHeight={6} role='room'/>
        <GamePiece id="Court_Yard" color='blue' xPos={9} yPos={10} roomWidth={9} roomHeight={7} role='room'/>
        <GamePiece id="Royal_Bedroom" color='purple' xPos={20} yPos={9} roomWidth={6} roomHeight={9} role='room'/>
        <GamePiece id="Chapel" color='yellow' xPos={0} yPos={19} roomWidth={8} roomHeight={7} role='room'/>
        <GamePiece id="Throne_Room" color='white' xPos={10} yPos={20} roomWidth={10} roomHeight={6} role='room'/>
        <GamePiece id="Stair_Well" color='orange' xPos={22} yPos={19} roomWidth={4} roomHeight={7} role='room'/>

        {/* Squares */}
        <GamePiece id="SquareX7Y0" color='blue' xPos={7} yPos={0} role='spawnSquare'/>
        <GamePiece id="SquareX16Y0" color='blue' xPos={16} yPos={0} role='spawnSquare'/>

        <GamePiece id="SquareX6Y1" color='black' xPos={6} yPos={1} role='square'/>
        <GamePiece id="SquareX7Y1" color='white' xPos={7} yPos={1} role='square'/>
        <GamePiece id="SquareX16Y1" color='black' xPos={16} yPos={1} role='square'/>
        <GamePiece id="SquareX17Y1" color='white' xPos={17} yPos={1} role='square'/>    

        <GamePiece id="SquareX6Y2" color='white' xPos={6} yPos={2} role='square'/>
        <GamePiece id="SquareX7Y2" color='black' xPos={7} yPos={2} role='square'/>
        <GamePiece id="SquareX16Y2" color='white' xPos={16} yPos={2} role='square'/>
        <GamePiece id="SquareX17Y2" color='black' xPos={17} yPos={2} role='square'/>

        <GamePiece id="SquareX6Y3" moveIds={["SquareX6Y2", "SquareX7Y3", "SquareX6Y4"]} color='black' xPos={6} yPos={3} role='square'/>
        <GamePiece id="SquareX7Y3" moveIds={["SquareX7Y2", "SquareX6Y3", "SquareX7Y4"]} color='white' xPos={7} yPos={3} role='square'/>
        <GamePiece id="SquareX16Y3" moveIds={["SquareX16Y2", "SquareX17Y3", "SquareX16Y4"]} color='black' xPos={16} yPos={3} role='square'/>
        <GamePiece id="SquareX17Y3" moveIds={["SquareX17Y2", "SquareX16Y3", "SquareX17Y4"]} color='white' xPos={17} yPos={3} role='square'/>

        <GamePiece id="SquareX6Y4" moveIds={["SquareX6Y3", "SquareX7Y4", "SquareX6Y5"]} color='white' xPos={6} yPos={4} role='square'/>
        <GamePiece id="SquareX7Y4" moveIds={["SquareX7Y3", "SquareX6Y4", "SquareX7Y5"]} color='black' xPos={7} yPos={4} role='square'/>
        <GamePiece id="SquareX16Y4" moveIds={["SquareX16Y3", "SquareX17Y4", "SquareX16Y5"]} color='white' xPos={16} yPos={4} role='square'/>
        <GamePiece id="SquareX17Y4" moveIds={["SquareX17Y3", "SquareX16Y4", "SquareX17Y5"]} color='black' xPos={17} yPos={4} role='square'/>

        <GamePiece id="SquareX6Y5" moveIds={["SquareX6Y4", "SquareX7Y5", "SquareX6Y6"]} color='black' xPos={6} yPos={5} role='square'/>
        <GamePiece id="SquareX7Y5" moveIds={["SquareX7Y4", "SquareX6Y5", "SquareX7Y6"]} color='white' xPos={7} yPos={5} role='square'/>
        <GamePiece id="SquareX16Y5" moveIds={["SquareX16Y4", "SquareX17Y5", "SquareX16Y6"]} color='black' xPos={16} yPos={5} role='square'/>
        <GamePiece id="SquareX17Y5" moveIds={["SquareX17Y4", "SquareX16Y5", "SquareX18Y5","SquareX17Y6"]} color='white' xPos={17} yPos={5} role='square'/>
        <GamePiece id="SquareX18Y5" moveIds={["SquareX17Y5", "SquareX18Y6"]} color='black' xPos={18} yPos={5} role='square'/>

        <GamePiece id="SquareX6Y6" moveIds={["SquareX6Y5", "SquareX7Y6", "SquareX6Y7"]} color='white' xPos={6} yPos={6} role='square'/>
        <GamePiece id="SquareX7Y6" moveIds={["SquareX7Y5", "SquareX6Y6", "SquareX7Y7"]} color='black' xPos={7} yPos={6} role='square'/>
        <GamePiece id="SquareX16Y6" moveIds={["SquareX16Y5", "SquareX17Y6", "SquareX16Y7"]} color='white' xPos={16} yPos={6} role='square'/>
        <GamePiece id="SquareX17Y6" moveIds={["SquareX17Y5", "SquareX16Y6", "SquareX18Y6", "SquareX17Y7"]} color='black' xPos={17} yPos={6} role='square'/>
        <GamePiece id="SquareX18Y6" moveIds={["SquareX18Y5", "SquareX17Y6", "SquareX19Y6", "SquareX18Y7"]} color='white' xPos={18} yPos={6} role='square'/>
        <GamePiece id="SquareX19Y6" moveIds={["SquareX18Y6", "SquareX20Y6", "SquareX19Y7"]} color='black' xPos={19} yPos={6} role='square'/>
        <GamePiece id="SquareX20Y6" moveIds={["SquareX19Y6", "SquareX21Y6", "SquareX20Y7"]} color='white' xPos={20} yPos={6} role='square'/>
        <GamePiece id="SquareX21Y6" moveIds={["SquareX20Y6", "SquareX22Y6", "SquareX21Y7"]} color='black' xPos={21} yPos={6} role='square'/>
        <GamePiece id="SquareX22Y6" moveIds={["SquareX21Y6", "SquareX23Y6", "SquareX22Y7"]} color='white' xPos={22} yPos={6} role='square'/>
        <GamePiece id="SquareX23Y6" moveIds={["SquareX22Y6", "SquareX24Y6", "SquareX23Y7"]} color='black' xPos={23} yPos={6} role='square'/>
        <GamePiece id="SquareX24Y6" moveIds={["SquareX23Y6", "SquareX25Y6", "SquareX24Y7"]} color='white' xPos={24} yPos={6} role='square'/>

        <GamePiece id="SquareX6Y7" color='black' xPos={6} yPos={7} role='square'/>
        <GamePiece id="SquareX7Y7" color='white' xPos={7} yPos={7} role='square'/>
        <GamePiece id="SquareX16Y7" color='black' xPos={16} yPos={7} role='square'/>
        <GamePiece id="SquareX17Y7" color='white' xPos={17} yPos={7} role='square'/>
        <GamePiece id="SquareX18Y7" color='black' xPos={18} yPos={7} role='square'/>
        <GamePiece id="SquareX19Y7" color='white' xPos={19} yPos={7} role='square'/>
        <GamePiece id="SquareX20Y7" color='black' xPos={20} yPos={7} role='square'/>
        <GamePiece id="SquareX21Y7" color='white' xPos={21} yPos={7} role='square'/>
        <GamePiece id="SquareX22Y7" color='black' xPos={22} yPos={7} role='square'/>
        <GamePiece id="SquareX23Y7" color='white' xPos={23} yPos={7} role='square'/>
        <GamePiece id="SquareX24Y7" color='black' xPos={24} yPos={7} role='square'/>
        <GamePiece id="SquareX25Y7" color='red' xPos={25} yPos={7} role='spawnSquare'/>

        <GamePiece id="SquareX0Y8" color='pink' xPos={0} yPos={8} role='spawnSquare'/>
        <GamePiece id="SquareX1Y8" moveIds={["SquareX2Y8", "SquareX1Y9"]} color='black' xPos={1} yPos={8} role='square'/>
        <GamePiece id="SquareX2Y8" color='white' xPos={2} yPos={8} role='square'/>
        <GamePiece id="SquareX3Y8" color='black' xPos={3} yPos={8} role='square'/>
        <GamePiece id="SquareX4Y8" color='white' xPos={4} yPos={8} role='square'/>
        <GamePiece id="SquareX5Y8" color='black' xPos={5} yPos={8} role='square'/>
        <GamePiece id="SquareX6Y8" moveIds={["SquareX6Y7", "SquareX5Y8", "SquareX7Y8", "SquareX6Y9"]} color='white' xPos={6} yPos={8} role='square'/>
        <GamePiece id="SquareX7Y8" moveIds={["SquareX7Y7", "SquareX6Y8", "SquareX8Y8", "SquareX7Y9"]} color='black' xPos={7} yPos={8} role='square'/>
        <GamePiece id="SquareX8Y8" moveIds={["SquareX7Y8", "SquareX9Y8", "SquareX8Y9"]} color='white' xPos={8} yPos={8} role='square'/>
        <GamePiece id="SquareX9Y8" moveIds={["SquareX8Y8", "SquareX10Y8", "SquareX9Y9"]} color='black' xPos={9} yPos={8} role='square'/>
        <GamePiece id="SquareX10Y8" moveIds={["SquareX9Y8", "SquareX11Y8", "SquareX10Y9"]} color='white' xPos={10} yPos={8} role='square'/>
        <GamePiece id="SquareX11Y8" moveIds={["SquareX10Y8", "SquareX12Y8", "SquareX11Y9"]} color='black' xPos={11} yPos={8} role='square'/>
        <GamePiece id="SquareX12Y8" moveIds={["SquareX11Y8", "SquareX13Y8", "SquareX12Y9"]} color='white' xPos={12} yPos={8} role='square'/>
        <GamePiece id="SquareX13Y8" moveIds={["SquareX12Y8", "SquareX14Y8", "SquareX13Y9"]} color='black' xPos={13} yPos={8} role='square'/>
        <GamePiece id="SquareX14Y8" moveIds={["SquareX13Y8", "SquareX15Y8", "SquareX14Y9"]} color='white' xPos={14} yPos={8} role='square'/>
        <GamePiece id="SquareX15Y8" moveIds={["SquareX14Y8", "SquareX16Y8", "SquareX15Y9"]} color='black' xPos={15} yPos={8} role='square'/>
        <GamePiece id="SquareX16Y8" moveIds={["SquareX16Y7", "SquareX15Y8", "SquareX17Y8", "SquareX16Y9"]} color='white' xPos={16} yPos={8} role='square'/>
        <GamePiece id="SquareX17Y8" moveIds={["SquareX17Y7","SquareX16Y8", "SquareX18Y8", "SquareX17Y9"]} color='black' xPos={17} yPos={8} role='square'/>
        <GamePiece id="SquareX18Y8" moveIds={["SquareX18Y7","SquareX17Y8", "SquareX19Y8", "SquareX18Y9"]} color='white' xPos={18} yPos={8} role='square'/>
        <GamePiece id="SquareX19Y8" moveIds={["SquareX19Y7","SquareX18Y8", "SquareX20Y8", "SquareX19Y9"]} color='black' xPos={19} yPos={8} role='square'/>
        <GamePiece id="SquareX20Y8" moveIds={["SquareX20Y7","SquareX19Y8", "SquareX21Y8"]} color='white' xPos={20} yPos={8} role='square'/>
        <GamePiece id="SquareX21Y8" moveIds={["SquareX21Y7","SquareX20Y8", "SquareX22Y8"]} color='black' xPos={21} yPos={8} role='square'/>
        <GamePiece id="SquareX22Y8" moveIds={["SquareX22Y7","SquareX21Y8", "SquareX23Y8"]} color='white' xPos={22} yPos={8} role='square'/>
        <GamePiece id="SquareX23Y8" moveIds={["SquareX23Y7","SquareX22Y8", "SquareX24Y8"]} color='black' xPos={23} yPos={8} role='square'/>
        <GamePiece id="SquareX24Y8" moveIds={["SquareX24Y7","SquareX23Y8", "SquareX25Y8"]} color='white' xPos={24} yPos={8} role='square'/>

        <GamePiece id="SquareX1Y9" moveIds={["SquareX1Y8", "SquareX2Y9"]} color='white' xPos={1} yPos={9} role='square'/>
        <GamePiece id="SquareX2Y9" moveIds={["SquareX2Y8", "SquareX1Y9", "SquareX3Y9"]} color='black' xPos={2} yPos={9} role='square'/>
        <GamePiece id="SquareX3Y9" moveIds={["SquareX3Y8", "SquareX2Y9", "SquareX4Y9"]} color='white' xPos={3} yPos={9} role='square'/>
        <GamePiece id="SquareX4Y9" moveIds={["SquareX4Y8", "SquareX3Y9", "SquareX5Y9"]} color='black' xPos={4} yPos={9} role='square'/>
        <GamePiece id="SquareX5Y9" moveIds={["SquareX5Y8", "SquareX4Y9", "SquareX6Y9"]} color='white' xPos={5} yPos={9} role='square'/>
        <GamePiece id="SquareX6Y9" moveIds={["SquareX6Y8", "SquareX5Y9", "SquareX7Y9"]} color='black' xPos={6} yPos={9} role='square'/>
        <GamePiece id="SquareX7Y9" moveIds={["SquareX7Y8", "SquareX6Y9", "SquareX8Y9", "SquareX7Y10"]} color='white' xPos={7} yPos={9} role='square'/>
        <GamePiece id="SquareX8Y9" moveIds={["SquareX8Y8", "SquareX7Y9", "SquareX9Y9", "SquareX8Y10"]} color='black' xPos={8} yPos={9} role='square'/>
        <GamePiece id="SquareX9Y9" moveIds={["SquareX9Y8", "SquareX8Y9", "SquareX10Y9"]} color='white' xPos={9} yPos={9} role='square'/>
        <GamePiece id="SquareX10Y9" moveIds={["SquareX10Y8", "SquareX9Y9", "SquareX11Y9"]} color='black' xPos={10} yPos={9} role='square'/>
        <GamePiece id="SquareX11Y9" moveIds={["SquareX11Y8", "SquareX10Y9", "SquareX12Y9"]} color='white' xPos={11} yPos={9} role='square'/>
        <GamePiece id="SquareX12Y9" moveIds={["SquareX12Y8", "SquareX11Y9", "SquareX13Y9"]} color='black' xPos={12} yPos={9} role='square'/>
        <GamePiece id="SquareX13Y9" moveIds={["SquareX13Y8", "SquareX12Y9", "SquareX14Y9"]} color='white' xPos={13} yPos={9} role='square'/>
        <GamePiece id="SquareX14Y9" moveIds={["SquareX14Y8", "SquareX13Y9", "SquareX15Y9"]} color='black' xPos={14} yPos={9} role='square'/>
        <GamePiece id="SquareX15Y9" moveIds={["SquareX15Y8", "SquareX14Y9", "SquareX16Y9"]} color='white' xPos={15} yPos={9} role='square'/>
        <GamePiece id="SquareX16Y9" moveIds={["SquareX16Y8", "SquareX15Y9", "SquareX17Y9"]} color='black' xPos={16} yPos={9} role='square'/>
        <GamePiece id="SquareX17Y9" moveIds={["SquareX17Y8", "SquareX16Y9", "SquareX18Y9"]} color='white' xPos={17} yPos={9} role='square'/>
        <GamePiece id="SquareX18Y9" moveIds={["SquareX18Y8", "SquareX17Y9", "SquareX19Y9", "SquareX18Y10"]} color='black' xPos={18} yPos={9} role='square'/>
        <GamePiece id="SquareX19Y9" moveIds={["SquareX19Y8", "SquareX18Y9", "SquareX19Y10"]} color='white' xPos={19} yPos={9} role='square'/>

        <GamePiece id="SquareX7Y10" moveIds={["SquareX7Y9", "SquareX8Y10", "SquareX7Y11"]} color='black' xPos={7} yPos={10} role='square'/>
        <GamePiece id="SquareX8Y10" moveIds={["SquareX8Y9", "SquareX7Y10", "SquareX8Y11"]} color='white' xPos={8} yPos={10} role='square'/>
        <GamePiece id="SquareX18Y10" moveIds={["SquareX18Y9", "SquareX19Y10", "SquareX18Y11"]} color='white' xPos={18} yPos={10} role='square'/>
        <GamePiece id="SquareX19Y10" moveIds={["SquareX19Y9", "SquareX18Y10", "SquareX19Y11"]} color='black' xPos={19} yPos={10} role='square'/>

        <GamePiece id="SquareX7Y11" moveIds={["SquareX7Y10", "SquareX8Y11", "SquareX7Y12"]} color='white' xPos={7} yPos={11} role='square'/>
        <GamePiece id="SquareX8Y11" moveIds={["SquareX8Y10", "SquareX7Y11", "SquareX8Y12"]} color='black' xPos={8} yPos={11} role='square'/>
        <GamePiece id="SquareX18Y11" moveIds={["SquareX18Y10", "SquareX19Y11", "SquareX18Y12"]} color='black' xPos={18} yPos={11} role='square'/>
        <GamePiece id="SquareX19Y11" moveIds={["SquareX19Y10", "SquareX18Y11", "SquareX19Y12"]} color='white' xPos={19} yPos={11} role='square'/>

        <GamePiece id="SquareX7Y12" color='black' xPos={7} yPos={12} role='square'/>
        <GamePiece id="SquareX8Y12" color='white' xPos={8} yPos={12} role='square'/>
        <GamePiece id="SquareX18Y12" color='white' xPos={18} yPos={12} role='square'/>
        <GamePiece id="SquareX19Y12" color='black' xPos={19} yPos={12} role='square'/>

        <GamePiece id="SquareX7Y13" moveIds={["SquareX7Y12", "SquareX8Y13", "SquareX7Y14"]} color='white' xPos={7} yPos={13} role='square'/>
        <GamePiece id="SquareX8Y13" moveIds={["SquareX8Y12", "SquareX7Y13", "SquareX8Y14"]} color='black' xPos={8} yPos={13} role='square'/>
        <GamePiece id="SquareX18Y13" moveIds={["SquareX18Y12", "SquareX19Y13", "SquareX18Y14"]} color='black' xPos={18} yPos={13} role='square'/>
        <GamePiece id="SquareX19Y13" moveIds={["SquareX19Y12", "SquareX18Y13", "SquareX19Y14"]} color='white' xPos={19} yPos={13} role='square'/>

        <GamePiece id="SquareX7Y14" moveIds={["SquareX7Y13", "SquareX8Y14", "SquareX7Y15"]} color='black' xPos={7} yPos={14} role='square'/>
        <GamePiece id="SquareX8Y14" moveIds={["SquareX8Y13", "SquareX7Y14", "SquareX8Y15"]} color='white' xPos={8} yPos={14} role='square'/>
        <GamePiece id="SquareX18Y14" moveIds={["SquareX18Y13", "SquareX19Y14", "SquareX18Y15"]} color='white' xPos={18} yPos={14} role='square'/>
        <GamePiece id="SquareX19Y14" moveIds={["SquareX19Y13", "SquareX18Y14", "SquareX19Y15"]} color='black' xPos={19} yPos={14} role='square'/>

        <GamePiece id="SquareX7Y15" moveIds={["SquareX7Y14", "SquareX8Y15", "SquareX7Y16"]} color='white' xPos={7} yPos={15} role='square'/>
        <GamePiece id="SquareX8Y15" moveIds={["SquareX8Y14", "SquareX7Y15", "SquareX8Y16"]} color='black' xPos={8} yPos={15} role='square'/>
        <GamePiece id="SquareX18Y15" moveIds={["SquareX18Y14", "SquareX19Y15", "SquareX18Y16"]} color='black' xPos={18} yPos={15} role='square'/>
        <GamePiece id="SquareX19Y15" moveIds={["SquareX19Y14", "SquareX18Y15", "SquareX19Y16"]} color='white' xPos={19} yPos={15} role='square'/>

        <GamePiece id="SquareX7Y16" moveIds={["SquareX7Y15", "SquareX8Y16", "SquareX7Y17"]} color='black' xPos={7} yPos={16} role='square'/>
        <GamePiece id="SquareX8Y16" moveIds={["SquareX8Y15", "SquareX7Y16", "SquareX8Y17"]} color='white' xPos={8} yPos={16} role='square'/>
        <GamePiece id="SquareX18Y16" moveIds={["SquareX18Y15", "SquareX19Y16", "SquareX18Y17"]} color='white' xPos={18} yPos={16} role='square'/>
        <GamePiece id="SquareX19Y16" moveIds={["SquareX19Y15", "SquareX18Y16", "SquareX19Y17"]} color='black' xPos={19} yPos={16} role='square'/>
      
        <GamePiece id="SquareX7Y17" moveIds={["SquareX7Y16", "SquareX8Y17", "SquareX7Y18"]} color='white' xPos={7} yPos={17} role='square'/>
        <GamePiece id="SquareX8Y17" moveIds={["SquareX8Y16", "SquareX7Y17", "SquareX9Y17", "SquareX8Y18"]} color='black' xPos={8} yPos={17} role='square'/>
        <GamePiece id="SquareX9Y17" moveIds={["SquareX8Y17", "SquareX10Y17", "SquareX9Y18"]} color='white' xPos={9} yPos={17} role='square'/>
        <GamePiece id="SquareX10Y17" moveIds={["SquareX9Y17", "SquareX11Y17", "SquareX10Y18"]} color='black' xPos={10} yPos={17} role='square'/>
        <GamePiece id="SquareX11Y17" moveIds={["SquareX10Y17", "SquareX12Y17", "SquareX11Y18"]} color='white' xPos={11} yPos={17} role='square'/>
        <GamePiece id="SquareX12Y17" moveIds={["SquareX11Y17", "SquareX13Y17", "SquareX12Y18"]} color='black' xPos={12} yPos={17} role='square'/>
        <GamePiece id="SquareX13Y17" moveIds={["SquareX12Y17", "SquareX14Y17", "SquareX13Y18"]} color='white' xPos={13} yPos={17} role='square'/>
        <GamePiece id="SquareX14Y17" moveIds={["SquareX13Y17", "SquareX15Y17", "SquareX14Y18"]} color='black' xPos={14} yPos={17} role='square'/>
        <GamePiece id="SquareX15Y17" moveIds={["SquareX14Y17", "SquareX16Y17", "SquareX15Y18"]} color='white' xPos={15} yPos={17} role='square'/>
        <GamePiece id="SquareX16Y17" moveIds={["SquareX15Y17", "SquareX17Y17", "SquareX16Y18"]} color='black' xPos={16} yPos={17} role='square'/>
        <GamePiece id="SquareX17Y17" moveIds={["SquareX16Y17", "SquareX18Y17", "SquareX17Y18"]} color='white' xPos={17} yPos={17} role='square'/>
        <GamePiece id="SquareX18Y17" moveIds={["SquareX18Y16", "SquareX17Y17", "SquareX19Y17", "SquareX18Y18"]} color='black' xPos={18} yPos={17} role='square'/>
        <GamePiece id="SquareX19Y17" color='white' xPos={19} yPos={17} role='square'/>
        <GamePiece id="SquareX20Y17" color='black' xPos={20} yPos={17} role='square'/>

        <GamePiece id="SquareX7Y18" color='black' xPos={7} yPos={18} role='square'/>
        <GamePiece id="SquareX8Y18" moveIds={["SquareX8Y17", "SquareX7Y18", "SquareX9Y18", "SquareX8Y19"]} color='white' xPos={8} yPos={18} role='square'/>
        <GamePiece id="SquareX9Y18" moveIds={["SquareX9Y17", "SquareX8Y18", "SquareX10Y18", "SquareX9Y19"]} color='black' xPos={9} yPos={18} role='square'/>
        <GamePiece id="SquareX10Y18" moveIds={["SquareX10Y17", "SquareX9Y18", "SquareX11Y18", "SquareX10Y19"]} color='white' xPos={10} yPos={18} role='square'/>
        <GamePiece id="SquareX11Y18" moveIds={["SquareX11Y17", "SquareX10Y18", "SquareX12Y18", "SquareX11Y19"]} color='black' xPos={11} yPos={18} role='square'/>
        <GamePiece id="SquareX12Y18" moveIds={["SquareX12Y17", "SquareX11Y18", "SquareX13Y18", "SquareX12Y19"]} color='white' xPos={12} yPos={18} role='square'/>
        <GamePiece id="SquareX13Y18" moveIds={["SquareX13Y17", "SquareX12Y18", "SquareX14Y18", "SquareX13Y19"]} color='black' xPos={13} yPos={18} role='square'/>
        <GamePiece id="SquareX14Y18" moveIds={["SquareX14Y17", "SquareX13Y18", "SquareX15Y18", "SquareX14Y19"]} color='white' xPos={14} yPos={18} role='square'/>
        <GamePiece id="SquareX15Y18" moveIds={["SquareX15Y17", "SquareX14Y18", "SquareX16Y18", "SquareX15Y19"]} color='black' xPos={15} yPos={18} role='square'/>
        <GamePiece id="SquareX16Y18" moveIds={["SquareX16Y17", "SquareX15Y18", "SquareX17Y18", "SquareX16Y19"]} color='white' xPos={16} yPos={18} role='square'/>
        <GamePiece id="SquareX17Y18" moveIds={["SquareX17Y17", "SquareX16Y18", "SquareX18Y18", "SquareX17Y19"]} color='black' xPos={17} yPos={18} role='square'/>
        <GamePiece id="SquareX18Y18" moveIds={["SquareX18Y17", "SquareX17Y18", "SquareX19Y18", "SquareX18Y19"]} color='white' xPos={18} yPos={18} role='square'/>
        <GamePiece id="SquareX19Y18" moveIds={["SquareX19Y17", "SquareX18Y18", "SquareX20Y18", "SquareX19Y19"]} color='black' xPos={19} yPos={18} role='square'/>
        <GamePiece id="SquareX20Y18" moveIds={["SquareX20Y17", "SquareX19Y18", "SquareX21Y18", "SquareX20Y19"]} color='white' xPos={20} yPos={18} role='square'/>
        <GamePiece id="SquareX21Y18" moveIds={["SquareX21Y17", "SquareX20Y18", "SquareX22Y18", "SquareX21Y19"]} color='black' xPos={21} yPos={18} role='square'/>
        <GamePiece id="SquareX22Y18" moveIds={["SquareX21Y18", "SquareX23Y18"]} color='white' xPos={22} yPos={18} role='square'/>
        <GamePiece id="SquareX23Y18" moveIds={["SquareX22Y18", "SquareX24Y18"]} color='black' xPos={23} yPos={18} role='square'/>
        <GamePiece id="SquareX24Y18" moveIds={["SquareX23Y18", "SquareX25Y18"]} color='white' xPos={24} yPos={18} role='square'/>
        <GamePiece id="SquareX25Y18" moveIds={["SquareX24Y18", "SquareX26Y18"]} color='black' xPos={25} yPos={18} role='square'/>
      
        <GamePiece id="SquareX8Y19" moveIds={["SquareX8Y18", "SquareX9Y19", "SquareX8Y20"]} color='black' xPos={8} yPos={19} role='square'/>
        <GamePiece id="SquareX9Y19" moveIds={["SquareX9Y18", "SquareX8Y19", "SquareX10Y19", "SquareX9Y20"]} color='white' xPos={9} yPos={19} role='square'/>
        <GamePiece id="SquareX10Y19" moveIds={["SquareX10Y18", "SquareX9Y19", "SquareX11Y19"]} color='black' xPos={10} yPos={19} role='square'/>
        <GamePiece id="SquareX11Y19" moveIds={["SquareX11Y18", "SquareX10Y19", "SquareX12Y19"]} color='white' xPos={11} yPos={19} role='square'/>
        <GamePiece id="SquareX12Y19" moveIds={["SquareX12Y18", "SquareX11Y19", "SquareX13Y19"]} color='black' xPos={12} yPos={19} role='square'/>
        <GamePiece id="SquareX13Y19" moveIds={["SquareX13Y18", "SquareX12Y19", "SquareX14Y19"]} color='white' xPos={13} yPos={19} role='square'/>
        <GamePiece id="SquareX14Y19" moveIds={["SquareX14Y18", "SquareX13Y19", "SquareX15Y19"]} color='black' xPos={14} yPos={19} role='square'/>
        <GamePiece id="SquareX15Y19" moveIds={["SquareX15Y18", "SquareX14Y19", "SquareX16Y19"]} color='white' xPos={15} yPos={19} role='square'/>
        <GamePiece id="SquareX16Y19" moveIds={["SquareX16Y18", "SquareX15Y19", "SquareX17Y19"]} color='black' xPos={16} yPos={19} role='square'/>
        <GamePiece id="SquareX17Y19" moveIds={["SquareX17Y18", "SquareX16Y19", "SquareX18Y19"]} color='white' xPos={17} yPos={19} role='square'/>
        <GamePiece id="SquareX18Y19" moveIds={["SquareX18Y18", "SquareX17Y19", "SquareX19Y19"]} color='black' xPos={18} yPos={19} role='square'/>
        <GamePiece id="SquareX19Y19" moveIds={["SquareX19Y18", "SquareX18Y19", "SquareX20Y19"]} color='white' xPos={19} yPos={19} role='square'/>
        <GamePiece id="SquareX20Y19" moveIds={["SquareX20Y18", "SquareX19Y19", "SquareX21Y19", "SquareX20Y20"]} color='black' xPos={20} yPos={19} role='square'/>
        <GamePiece id="SquareX21Y19" moveIds={["SquareX21Y18", "SquareX20Y19", "SquareX21Y20"]} color='white' xPos={21} yPos={19} role='square'/>
        <GamePiece id="SquareX22Y19" color='black' xPos={22} yPos={19} role='square'/>

        <GamePiece id="SquareX8Y20" moveIds={["SquareX8Y19", "SquareX9Y20", "SquareX8Y21"]} color='white' xPos={8} yPos={20} role='square'/>
        <GamePiece id="SquareX9Y20" moveIds={["SquareX9Y19", "SquareX8Y20", "SquareX9Y21"]} color='black' xPos={9} yPos={20} role='square'/>
        <GamePiece id="SquareX20Y20" moveIds={["SquareX20Y19", "SquareX21Y20", "SquareX20Y21"]} color='white' xPos={20} yPos={20} role='square'/>
        <GamePiece id="SquareX21Y20" moveIds={["SquareX21Y19", "SquareX20Y20", "SquareX21Y21"]} color='black' xPos={21} yPos={20} role='square'/>

        <GamePiece id="SquareX8Y21" moveIds={["SquareX8Y20", "SquareX9Y21", "SquareX8Y22"]} color='black' xPos={8} yPos={21} role='square'/>
        <GamePiece id="SquareX9Y21" moveIds={["SquareX9Y20", "SquareX8Y21", "SquareX9Y22"]} color='white' xPos={9} yPos={21} role='square'/>
        <GamePiece id="SquareX20Y21" moveIds={["SquareX20Y20", "SquareX21Y21", "SquareX20Y22"]} color='black' xPos={20} yPos={21} role='square'/>
        <GamePiece id="SquareX21Y21" moveIds={["SquareX21Y20", "SquareX20Y21", "SquareX21Y22"]} color='white' xPos={21} yPos={21} role='square'/>

        <GamePiece id="SquareX8Y22" moveIds={["SquareX8Y21", "SquareX9Y22", "SquareX8Y23"]} color='white' xPos={8} yPos={22} role='square'/>
        <GamePiece id="SquareX9Y22" moveIds={["SquareX9Y21", "SquareX8Y22", "SquareX9Y23"]} color='black' xPos={9} yPos={22} role='square'/>
        <GamePiece id="SquareX20Y22" moveIds={["SquareX20Y21", "SquareX21Y22", "SquareX20Y23"]} color='white' xPos={20} yPos={22} role='square'/>
        <GamePiece id="SquareX21Y22" moveIds={["SquareX21Y21", "SquareX20Y22", "SquareX21Y23"]} color='black' xPos={21} yPos={22} role='square'/>

        <GamePiece id="SquareX8Y23" moveIds={["SquareX8Y22", "SquareX9Y23", "SquareX8Y24"]} color='black' xPos={8} yPos={23} role='square'/>
        <GamePiece id="SquareX9Y23" moveIds={["SquareX9Y22", "SquareX8Y23", "SquareX9Y24"]} color='white' xPos={9} yPos={23} role='square'/>
        <GamePiece id="SquareX20Y23" moveIds={["SquareX20Y22", "SquareX21Y23", "SquareX20Y24"]} color='black' xPos={20} yPos={23} role='square'/>
        <GamePiece id="SquareX21Y23" color='white' xPos={21} yPos={23} role='square'/>

        <GamePiece id="SquareX8Y24" color='white' xPos={8} yPos={24} role='square'/>
        <GamePiece id="SquareX9Y24" color='black' xPos={9} yPos={24} role='square'/>
        <GamePiece id="SquareX20Y24" color='white' xPos={20} yPos={24} role='square'/>
        <GamePiece id="SquareX21Y24" color='black' xPos={21} yPos={24} role='square'/>

        <GamePiece id="SquareX9Y25" color='blue' xPos={9} yPos={25} role='spawnSquare'/>
        <GamePiece id="SquareX20Y25" color='red' xPos={20} yPos={25} role='spawnSquare'/>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={screens.playerPicker}>
        <PlayerScreen />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={screens.detectiveSheet}>
          <DetectiveSheet role='main'/>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={screens.room}>
          <RoomScreen />
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={screens.information}>
          <InformationScreen />
      </Modal>
    </View>
  )
}