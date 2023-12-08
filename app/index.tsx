import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Options from '../components/Options';

//26 by 26 grid
declare global {
  interface squarePieceProps {
    id: string;
    moveIds: string[];
    imageUrl?: string | undefined;
    color?: string | undefined;
    xPos: number;
    yPos: number;
    role: "square"
    roomWidth?: undefined;
    roomHeight?: undefined;
  }
  interface roomPieceProps {
    id: string;
    moveIds: string[];
    imageUrl?: string | undefined;
    color?: string | undefined;
    xPos: number;
    yPos: number;
    roomWidth: number;
    roomHeight: number;
    role: "room"
  }
  interface optionsPieceProps {
    id: string;
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
  if (role === "options") {
    <View id={id} style={{backgroundColor: 'red', width: getSize(width, height) * 10, height: getSize(width, height) * 10, position: 'absolute', left: getSize(width, height) * xPos, top: getSize(width, height) * yPos, zIndex: 100}}>
      <Text>Here</Text>
    </View>
  }

  if (role === "room") {
    return (
      <Pressable id={id} style={{width: getSize(width, height) * roomWidth, height: getSize(width, height) * roomHeight, backgroundColor: color, position: 'absolute', left: getSize(width, height) * xPos, top: getSize(width, height) * yPos}}>
        <Text>{id}</Text>
      </Pressable>
    )
  }

  return (
    <Pressable id={id} style={{width: getSize(width, height), height: getSize(width, height), backgroundColor: color, position: 'absolute', left: getSize(width, height) * xPos, top: getSize(width, height) * yPos}}>

    </Pressable>
  )
}

export default function index() {
  const { width, height } = useSelector((state: RootState) => state.dimentions);
  return (
    <View style={{width: width, height: height}}>
      <View style={{width: getSize(width, height) * 26, height: getSize(width, height) * 26, margin: 'auto', backgroundColor: 'green'}}>
        {/* Options */}
        <GamePiece id="Options_Pane" xPos={0} yPos={10} roomWidth={10} roomHeight={10} role='options'/>

        {/* Rooms */}
        <GamePiece id="Gun_Platform" moveIds={["SqaureX5Y9"]} color='yellow' xPos={0} yPos={0} roomWidth={6} roomHeight={8} role='room'/>
        <GamePiece id="Great_Hall" moveIds={["SqaureX5Y9"]} color='red' xPos={8} yPos={0} roomWidth={8} roomHeight={8} role='room'/>
        <GamePiece id="Fencing_Room" moveIds={["SqaureX5Y9"]} color='orange' xPos={18} yPos={0} roomWidth={8} roomHeight={6} role='room'/>
        <GamePiece id="Court_Yard" moveIds={["SqaureX5Y9"]} color='blue' xPos={9} yPos={10} roomWidth={9} roomHeight={7} role='room'/>
        <GamePiece id="Royal_Bedroom" moveIds={["SqaureX5Y9"]} color='purple' xPos={20} yPos={9} roomWidth={6} roomHeight={9} role='room'/>
        <GamePiece id="Chapel" moveIds={["SqaureX5Y9"]} color='yellow' xPos={0} yPos={19} roomWidth={8} roomHeight={7} role='room'/>
        <GamePiece id="Throne_Room" moveIds={["SqaureX5Y9"]} color='white' xPos={10} yPos={20} roomWidth={10} roomHeight={6} role='room'/>
        <GamePiece id="Stair_Well" moveIds={["SqaureX5Y9"]} color='orange' xPos={22} yPos={19} roomWidth={4} roomHeight={7} role='room'/>

        {/* Squares */}
        <GamePiece id="SquareX6Y1" moveIds={["SqaureX7Y1", "SqaureX6Y2"]} color='black' xPos={6} yPos={1} role='square'/>
        <GamePiece id="SquareX7Y1" moveIds={["SqaureX5Y9"]} color='white' xPos={7} yPos={1} role='square'/>
        
        <GamePiece id="SquareX6Y2" moveIds={["SqaureX5Y9"]} color='white' xPos={6} yPos={2} role='square'/>
        <GamePiece id="SquareX7Y2" moveIds={["SqaureX5Y9"]} color='black' xPos={7} yPos={2} role='square'/>

        <GamePiece id="SquareX6Y3" moveIds={["SqaureX5Y9"]} color='black' xPos={6} yPos={3} role='square'/>
        <GamePiece id="SquareX7Y3" moveIds={["SqaureX5Y9"]} color='white' xPos={7} yPos={3} role='square'/>
        <GamePiece id="SquareX16Y3" moveIds={["SqaureX5Y9"]} color='black' xPos={16} yPos={3} role='square'/>
        <GamePiece id="SquareX17Y3" moveIds={["SqaureX5Y9"]} color='white' xPos={17} yPos={3} role='square'/>

        <GamePiece id="SquareX6Y4" moveIds={["SqaureX5Y9"]} color='white' xPos={6} yPos={4} role='square'/>
        <GamePiece id="SquareX7Y4" moveIds={["SqaureX5Y9"]} color='black' xPos={7} yPos={4} role='square'/>
        <GamePiece id="SquareX16Y4" moveIds={["SqaureX5Y9"]} color='white' xPos={16} yPos={4} role='square'/>
        <GamePiece id="SquareX17Y4" moveIds={["SqaureX5Y9"]} color='black' xPos={17} yPos={4} role='square'/>

        <GamePiece id="SquareX6Y5" moveIds={["SqaureX5Y9"]} color='black' xPos={6} yPos={5} role='square'/>
        <GamePiece id="SquareX7Y5" moveIds={["SqaureX5Y9"]} color='white' xPos={7} yPos={5} role='square'/>
        <GamePiece id="SquareX16Y5" moveIds={["SqaureX5Y9"]} color='black' xPos={16} yPos={5} role='square'/>
        <GamePiece id="SquareX17Y5" moveIds={["SqaureX5Y9"]} color='white' xPos={17} yPos={5} role='square'/>
        <GamePiece id="SquareX18Y5" moveIds={["SqaureX5Y9"]} color='black' xPos={18} yPos={5} role='square'/>

        <GamePiece id="SquareX6Y6" moveIds={["SqaureX5Y9"]} color='white' xPos={6} yPos={6} role='square'/>
        <GamePiece id="SquareX7Y6" moveIds={["SqaureX5Y9"]} color='black' xPos={7} yPos={6} role='square'/>
        <GamePiece id="SquareX16Y6" moveIds={["SqaureX5Y9"]} color='white' xPos={16} yPos={6} role='square'/>
        <GamePiece id="SquareX17Y6" moveIds={["SqaureX5Y9"]} color='black' xPos={17} yPos={6} role='square'/>
        <GamePiece id="SquareX18Y6" moveIds={["SqaureX5Y9"]} color='white' xPos={18} yPos={6} role='square'/>
        <GamePiece id="SquareX19Y6" moveIds={["SqaureX5Y9"]} color='black' xPos={19} yPos={6} role='square'/>
        <GamePiece id="SquareX20Y6" moveIds={["SqaureX5Y9"]} color='white' xPos={20} yPos={6} role='square'/>
        <GamePiece id="SquareX21Y6" moveIds={["SqaureX5Y9"]} color='black' xPos={21} yPos={6} role='square'/>
        <GamePiece id="SquareX22Y6" moveIds={["SqaureX5Y9"]} color='white' xPos={22} yPos={6} role='square'/>
        <GamePiece id="SquareX23Y6" moveIds={["SqaureX5Y9"]} color='black' xPos={23} yPos={6} role='square'/>
        <GamePiece id="SquareX24Y6" moveIds={["SqaureX5Y9"]} color='white' xPos={24} yPos={6} role='square'/>
        <GamePiece id="SquareX25Y6" moveIds={["SqaureX5Y9"]} color='black' xPos={25} yPos={6} role='square'/>

        <GamePiece id="SquareX6Y7" moveIds={["SqaureX5Y9"]} color='black' xPos={6} yPos={7} role='square'/>
        <GamePiece id="SquareX7Y7" moveIds={["SqaureX5Y9"]} color='white' xPos={7} yPos={7} role='square'/>
        <GamePiece id="SquareX16Y7" moveIds={["SqaureX5Y9"]} color='black' xPos={16} yPos={7} role='square'/>
        <GamePiece id="SquareX17Y7" moveIds={["SqaureX5Y9"]} color='white' xPos={17} yPos={7} role='square'/>
        <GamePiece id="SquareX18Y7" moveIds={["SqaureX5Y9"]} color='black' xPos={18} yPos={7} role='square'/>
        <GamePiece id="SquareX19Y7" moveIds={["SqaureX5Y9"]} color='white' xPos={19} yPos={7} role='square'/>
        <GamePiece id="SquareX20Y7" moveIds={["SqaureX5Y9"]} color='black' xPos={20} yPos={7} role='square'/>
        <GamePiece id="SquareX21Y7" moveIds={["SqaureX5Y9"]} color='white' xPos={21} yPos={7} role='square'/>
        <GamePiece id="SquareX22Y7" moveIds={["SqaureX5Y9"]} color='black' xPos={22} yPos={7} role='square'/>
        <GamePiece id="SquareX23Y7" moveIds={["SqaureX5Y9"]} color='white' xPos={23} yPos={7} role='square'/>
        <GamePiece id="SquareX24Y7" moveIds={["SqaureX5Y9"]} color='black' xPos={24} yPos={7} role='square'/>
        <GamePiece id="SquareX25Y7" moveIds={["SqaureX5Y9"]} color='white' xPos={25} yPos={7} role='square'/>

        <GamePiece id="SquareX0Y8" moveIds={["SqaureX1Y8"]} color='pink' xPos={0} yPos={8} role='square'/>
        <GamePiece id="SquareX1Y8" moveIds={["SqaureX2Y8", "SqaureX1Y9"]} color='black' xPos={1} yPos={8} role='square'/>
        <GamePiece id="SquareX2Y8" moveIds={["SqaureX1Y8", "SqaureX3Y8", "SqaureX2Y9"]} color='white' xPos={2} yPos={8} role='square'/>
        <GamePiece id="SquareX3Y8" moveIds={["SqaureX3Y8"]} color='black' xPos={3} yPos={8} role='square'/>
        <GamePiece id="SquareX4Y8" moveIds={["SqaureX4Y8"]} color='white' xPos={4} yPos={8} role='square'/>
        <GamePiece id="SquareX5Y8" moveIds={["SqaureX5Y8"]} color='black' xPos={5} yPos={8} role='square'/>
        <GamePiece id="SquareX6Y8" moveIds={["SqaureX5Y9"]} color='white' xPos={6} yPos={8} role='square'/>
        <GamePiece id="SquareX7Y8" moveIds={["SqaureX5Y9"]} color='black' xPos={7} yPos={8} role='square'/>
        <GamePiece id="SquareX8Y8" moveIds={["SqaureX5Y9"]} color='white' xPos={8} yPos={8} role='square'/>
        <GamePiece id="SquareX9Y8" moveIds={["SqaureX5Y9"]} color='black' xPos={9} yPos={8} role='square'/>
        <GamePiece id="SquareX10Y8" moveIds={["SqaureX5Y9"]} color='white' xPos={10} yPos={8} role='square'/>
        <GamePiece id="SquareX11Y8" moveIds={["SqaureX5Y9"]} color='black' xPos={11} yPos={8} role='square'/>
        <GamePiece id="SquareX12Y8" moveIds={["SqaureX5Y9"]} color='white' xPos={12} yPos={8} role='square'/>
        <GamePiece id="SquareX13Y8" moveIds={["SqaureX5Y9"]} color='black' xPos={13} yPos={8} role='square'/>
        <GamePiece id="SquareX14Y8" moveIds={["SqaureX5Y9"]} color='white' xPos={14} yPos={8} role='square'/>
        <GamePiece id="SquareX15Y8" moveIds={["SqaureX5Y9"]} color='black' xPos={15} yPos={8} role='square'/>
        <GamePiece id="SquareX16Y8" moveIds={["SqaureX5Y9"]} color='white' xPos={16} yPos={8} role='square'/>
        <GamePiece id="SquareX17Y8" moveIds={["SqaureX5Y9"]} color='black' xPos={17} yPos={8} role='square'/>
        <GamePiece id="SquareX18Y8" moveIds={["SqaureX5Y9"]} color='white' xPos={18} yPos={8} role='square'/>
        <GamePiece id="SquareX19Y8" moveIds={["SqaureX5Y9"]} color='black' xPos={19} yPos={8} role='square'/>
        <GamePiece id="SquareX20Y8" moveIds={["SqaureX5Y9"]} color='white' xPos={20} yPos={8} role='square'/>
        <GamePiece id="SquareX21Y8" moveIds={["SqaureX5Y9"]} color='black' xPos={21} yPos={8} role='square'/>
        <GamePiece id="SquareX22Y8" moveIds={["SqaureX5Y9"]} color='white' xPos={22} yPos={8} role='square'/>
        <GamePiece id="SquareX23Y8" moveIds={["SqaureX5Y9"]} color='black' xPos={23} yPos={8} role='square'/>
        <GamePiece id="SquareX24Y8" moveIds={["SqaureX5Y9"]} color='white' xPos={24} yPos={8} role='square'/>
        <GamePiece id="SquareX25Y8" moveIds={["SqaureX5Y9"]} color='black' xPos={25} yPos={8} role='square'/>

        <GamePiece id="SquareX1Y9" moveIds={["SqaureX1Y9"]} color='white' xPos={1} yPos={9} role='square'/>
        <GamePiece id="SquareX2Y9" moveIds={["SqaureX2Y9"]} color='black' xPos={2} yPos={9} role='square'/>
        <GamePiece id="SquareX3Y9" moveIds={["SqaureX3Y9"]} color='white' xPos={3} yPos={9} role='square'/>
        <GamePiece id="SquareX4Y9" moveIds={["SqaureX4Y9"]} color='black' xPos={4} yPos={9} role='square'/>
        <GamePiece id="SquareX5Y9" moveIds={["SqaureX5Y9"]} color='white' xPos={5} yPos={9} role='square'/>
        <GamePiece id="SquareX6Y9" moveIds={["SqaureX5Y9"]} color='black' xPos={6} yPos={9} role='square'/>
        <GamePiece id="SquareX7Y9" moveIds={["SqaureX5Y9"]} color='white' xPos={7} yPos={9} role='square'/>
        <GamePiece id="SquareX8Y9" moveIds={["SqaureX5Y9"]} color='black' xPos={8} yPos={9} role='square'/>
        <GamePiece id="SquareX9Y9" moveIds={["SqaureX5Y9"]} color='white' xPos={9} yPos={9} role='square'/>
        <GamePiece id="SquareX10Y9" moveIds={["SqaureX5Y9"]} color='black' xPos={10} yPos={9} role='square'/>
        <GamePiece id="SquareX11Y9" moveIds={["SqaureX5Y9"]} color='white' xPos={11} yPos={9} role='square'/>
        <GamePiece id="SquareX12Y9" moveIds={["SqaureX5Y9"]} color='black' xPos={12} yPos={9} role='square'/>
        <GamePiece id="SquareX13Y9" moveIds={["SqaureX5Y9"]} color='white' xPos={13} yPos={9} role='square'/>
        <GamePiece id="SquareX14Y9" moveIds={["SqaureX5Y9"]} color='black' xPos={14} yPos={9} role='square'/>
        <GamePiece id="SquareX15Y9" moveIds={["SqaureX5Y9"]} color='white' xPos={15} yPos={9} role='square'/>
        <GamePiece id="SquareX16Y9" moveIds={["SqaureX5Y9"]} color='black' xPos={16} yPos={9} role='square'/>
        <GamePiece id="SquareX17Y9" moveIds={["SqaureX5Y9"]} color='white' xPos={17} yPos={9} role='square'/>
        <GamePiece id="SquareX18Y9" moveIds={["SqaureX5Y9"]} color='black' xPos={18} yPos={9} role='square'/>
        <GamePiece id="SquareX19Y9" moveIds={["SqaureX5Y9"]} color='white' xPos={19} yPos={9} role='square'/>

        <GamePiece id="SquareX7Y10" moveIds={["SqaureX5Y9"]} color='black' xPos={7} yPos={10} role='square'/>
        <GamePiece id="SquareX8Y10" moveIds={["SqaureX5Y9"]} color='white' xPos={8} yPos={10} role='square'/>
        <GamePiece id="SquareX18Y10" moveIds={["SqaureX5Y9"]} color='white' xPos={18} yPos={10} role='square'/>
        <GamePiece id="SquareX19Y10" moveIds={["SqaureX5Y9"]} color='black' xPos={19} yPos={10} role='square'/>

        <GamePiece id="SquareX7Y11" moveIds={["SqaureX5Y9"]} color='white' xPos={7} yPos={11} role='square'/>
        <GamePiece id="SquareX8Y11" moveIds={["SqaureX5Y9"]} color='black' xPos={8} yPos={11} role='square'/>
        <GamePiece id="SquareX18Y11" moveIds={["SqaureX5Y9"]} color='black' xPos={18} yPos={11} role='square'/>
        <GamePiece id="SquareX19Y11" moveIds={["SqaureX5Y9"]} color='white' xPos={19} yPos={11} role='square'/>

        <GamePiece id="SquareX7Y12" moveIds={["SqaureX5Y9"]} color='black' xPos={7} yPos={12} role='square'/>
        <GamePiece id="SquareX8Y12" moveIds={["SqaureX5Y9"]} color='white' xPos={8} yPos={12} role='square'/>
        <GamePiece id="SquareX18Y12" moveIds={["SqaureX5Y9"]} color='white' xPos={18} yPos={12} role='square'/>
        <GamePiece id="SquareX19Y12" moveIds={["SqaureX5Y9"]} color='black' xPos={19} yPos={12} role='square'/>

        <GamePiece id="SquareX7Y13" moveIds={["SqaureX5Y9"]} color='white' xPos={7} yPos={13} role='square'/>
        <GamePiece id="SquareX8Y13" moveIds={["SqaureX5Y9"]} color='black' xPos={8} yPos={13} role='square'/>
        <GamePiece id="SquareX18Y13" moveIds={["SqaureX5Y9"]} color='black' xPos={18} yPos={13} role='square'/>
        <GamePiece id="SquareX19Y13" moveIds={["SqaureX5Y9"]} color='white' xPos={19} yPos={13} role='square'/>

        <GamePiece id="SquareX7Y14" moveIds={["SqaureX5Y9"]} color='black' xPos={7} yPos={14} role='square'/>
        <GamePiece id="SquareX8Y14" moveIds={["SqaureX5Y9"]} color='white' xPos={8} yPos={14} role='square'/>
        <GamePiece id="SquareX18Y14" moveIds={["SqaureX5Y9"]} color='white' xPos={18} yPos={14} role='square'/>
        <GamePiece id="SquareX19Y14" moveIds={["SqaureX5Y9"]} color='black' xPos={19} yPos={14} role='square'/>

        <GamePiece id="SquareX7Y15" moveIds={["SqaureX5Y9"]} color='white' xPos={7} yPos={15} role='square'/>
        <GamePiece id="SquareX8Y15" moveIds={["SqaureX5Y9"]} color='black' xPos={8} yPos={15} role='square'/>
        <GamePiece id="SquareX18Y15" moveIds={["SqaureX5Y9"]} color='black' xPos={18} yPos={15} role='square'/>
        <GamePiece id="SquareX19Y15" moveIds={["SqaureX5Y9"]} color='white' xPos={19} yPos={15} role='square'/>

        <GamePiece id="SquareX7Y16" moveIds={["SqaureX5Y9"]} color='black' xPos={7} yPos={16} role='square'/>
        <GamePiece id="SquareX8Y16" moveIds={["SqaureX5Y9"]} color='white' xPos={8} yPos={16} role='square'/>
        <GamePiece id="SquareX18Y16" moveIds={["SqaureX5Y9"]} color='white' xPos={18} yPos={16} role='square'/>
        <GamePiece id="SquareX19Y16" moveIds={["SqaureX5Y9"]} color='black' xPos={19} yPos={16} role='square'/>
      
        <GamePiece id="SquareX7Y17" moveIds={["SqaureX0Y8"]} color='white' xPos={7} yPos={17} role='square'/>
        <GamePiece id="SquareX8Y17" moveIds={["SqaureX1Y8"]} color='black' xPos={8} yPos={17} role='square'/>
        <GamePiece id="SquareX9Y17" moveIds={["SqaureX2Y8"]} color='white' xPos={9} yPos={17} role='square'/>
        <GamePiece id="SquareX10Y17" moveIds={["SqaureX3Y8"]} color='black' xPos={10} yPos={17} role='square'/>
        <GamePiece id="SquareX11Y17" moveIds={["SqaureX4Y8"]} color='white' xPos={11} yPos={17} role='square'/>
        <GamePiece id="SquareX12Y17" moveIds={["SqaureX5Y8"]} color='black' xPos={12} yPos={17} role='square'/>
        <GamePiece id="SquareX13Y17" moveIds={["SqaureX5Y9"]} color='white' xPos={13} yPos={17} role='square'/>
        <GamePiece id="SquareX14Y17" moveIds={["SqaureX5Y9"]} color='black' xPos={14} yPos={17} role='square'/>
        <GamePiece id="SquareX15Y17" moveIds={["SqaureX5Y9"]} color='white' xPos={15} yPos={17} role='square'/>
        <GamePiece id="SquareX16Y17" moveIds={["SqaureX5Y9"]} color='black' xPos={16} yPos={17} role='square'/>
        <GamePiece id="SquareX17Y17" moveIds={["SqaureX5Y9"]} color='white' xPos={17} yPos={17} role='square'/>
        <GamePiece id="SquareX18Y17" moveIds={["SqaureX5Y9"]} color='black' xPos={18} yPos={17} role='square'/>
        <GamePiece id="SquareX19Y17" moveIds={["SqaureX5Y9"]} color='white' xPos={19} yPos={17} role='square'/>
        <GamePiece id="SquareX20Y17" moveIds={["SqaureX5Y9"]} color='black' xPos={20} yPos={17} role='square'/>

        <GamePiece id="SquareX7Y18" moveIds={["SqaureX0Y8"]} color='black' xPos={7} yPos={18} role='square'/>
        <GamePiece id="SquareX8Y18" moveIds={["SqaureX1Y8"]} color='white' xPos={8} yPos={18} role='square'/>
        <GamePiece id="SquareX9Y18" moveIds={["SqaureX2Y8"]} color='black' xPos={9} yPos={18} role='square'/>
        <GamePiece id="SquareX10Y18" moveIds={["SqaureX3Y8"]} color='white' xPos={10} yPos={18} role='square'/>
        <GamePiece id="SquareX11Y18" moveIds={["SqaureX4Y8"]} color='black' xPos={11} yPos={18} role='square'/>
        <GamePiece id="SquareX12Y18" moveIds={["SqaureX5Y8"]} color='white' xPos={12} yPos={18} role='square'/>
        <GamePiece id="SquareX13Y18" moveIds={["SqaureX5Y9"]} color='black' xPos={13} yPos={18} role='square'/>
        <GamePiece id="SquareX14Y18" moveIds={["SqaureX5Y9"]} color='white' xPos={14} yPos={18} role='square'/>
        <GamePiece id="SquareX15Y18" moveIds={["SqaureX5Y9"]} color='black' xPos={15} yPos={18} role='square'/>
        <GamePiece id="SquareX16Y18" moveIds={["SqaureX5Y9"]} color='white' xPos={16} yPos={18} role='square'/>
        <GamePiece id="SquareX17Y18" moveIds={["SqaureX5Y9"]} color='black' xPos={17} yPos={18} role='square'/>
        <GamePiece id="SquareX18Y18" moveIds={["SqaureX5Y9"]} color='white' xPos={18} yPos={18} role='square'/>
        <GamePiece id="SquareX19Y18" moveIds={["SqaureX5Y9"]} color='black' xPos={19} yPos={18} role='square'/>
        <GamePiece id="SquareX20Y18" moveIds={["SqaureX5Y9"]} color='white' xPos={20} yPos={18} role='square'/>
        <GamePiece id="SquareX21Y18" moveIds={["SqaureX5Y9"]} color='black' xPos={21} yPos={18} role='square'/>
        <GamePiece id="SquareX22Y18" moveIds={["SqaureX5Y9"]} color='white' xPos={22} yPos={18} role='square'/>
        <GamePiece id="SquareX23Y18" moveIds={["SqaureX5Y9"]} color='black' xPos={23} yPos={18} role='square'/>
        <GamePiece id="SquareX24Y18" moveIds={["SqaureX5Y9"]} color='white' xPos={24} yPos={18} role='square'/>
        <GamePiece id="SquareX25Y18" moveIds={["SqaureX5Y9"]} color='black' xPos={25} yPos={18} role='square'/>
      
        <GamePiece id="SquareX8Y19" moveIds={["SqaureX1Y8"]} color='black' xPos={8} yPos={19} role='square'/>
        <GamePiece id="SquareX9Y19" moveIds={["SqaureX2Y8"]} color='white' xPos={9} yPos={19} role='square'/>
        <GamePiece id="SquareX10Y19" moveIds={["SqaureX3Y8"]} color='black' xPos={10} yPos={19} role='square'/>
        <GamePiece id="SquareX11Y19" moveIds={["SqaureX4Y8"]} color='white' xPos={11} yPos={19} role='square'/>
        <GamePiece id="SquareX12Y19" moveIds={["SqaureX5Y8"]} color='black' xPos={12} yPos={19} role='square'/>
        <GamePiece id="SquareX13Y19" moveIds={["SqaureX5Y9"]} color='white' xPos={13} yPos={19} role='square'/>
        <GamePiece id="SquareX14Y19" moveIds={["SqaureX5Y9"]} color='black' xPos={14} yPos={19} role='square'/>
        <GamePiece id="SquareX15Y19" moveIds={["SqaureX5Y9"]} color='white' xPos={15} yPos={19} role='square'/>
        <GamePiece id="SquareX16Y19" moveIds={["SqaureX5Y9"]} color='black' xPos={16} yPos={19} role='square'/>
        <GamePiece id="SquareX17Y19" moveIds={["SqaureX5Y9"]} color='white' xPos={17} yPos={19} role='square'/>
        <GamePiece id="SquareX18Y19" moveIds={["SqaureX5Y9"]} color='black' xPos={18} yPos={19} role='square'/>
        <GamePiece id="SquareX19Y19" moveIds={["SqaureX5Y9"]} color='white' xPos={19} yPos={19} role='square'/>
        <GamePiece id="SquareX20Y19" moveIds={["SqaureX5Y9"]} color='black' xPos={20} yPos={19} role='square'/>
        <GamePiece id="SquareX21Y19" moveIds={["SqaureX0Y8"]} color='white' xPos={21} yPos={19} role='square'/>

        <GamePiece id="SquareX8Y20" moveIds={["SqaureX5Y9"]} color='white' xPos={8} yPos={20} role='square'/>
        <GamePiece id="SquareX9Y20" moveIds={["SqaureX5Y9"]} color='black' xPos={9} yPos={20} role='square'/>
        <GamePiece id="SquareX20Y20" moveIds={["SqaureX5Y9"]} color='white' xPos={20} yPos={20} role='square'/>
        <GamePiece id="SquareX21Y20" moveIds={["SqaureX5Y9"]} color='black' xPos={21} yPos={20} role='square'/>

        <GamePiece id="SquareX8Y21" moveIds={["SqaureX5Y9"]} color='black' xPos={8} yPos={21} role='square'/>
        <GamePiece id="SquareX9Y21" moveIds={["SqaureX5Y9"]} color='white' xPos={9} yPos={21} role='square'/>
        <GamePiece id="SquareX20Y21" moveIds={["SqaureX5Y9"]} color='black' xPos={20} yPos={21} role='square'/>
        <GamePiece id="SquareX21Y21" moveIds={["SqaureX5Y9"]} color='white' xPos={21} yPos={21} role='square'/>

        <GamePiece id="SquareX8Y22" moveIds={["SqaureX5Y9"]} color='white' xPos={8} yPos={22} role='square'/>
        <GamePiece id="SquareX9Y22" moveIds={["SqaureX5Y9"]} color='black' xPos={9} yPos={22} role='square'/>
        <GamePiece id="SquareX20Y22" moveIds={["SqaureX5Y9"]} color='white' xPos={20} yPos={22} role='square'/>
        <GamePiece id="SquareX21Y22" moveIds={["SqaureX5Y9"]} color='black' xPos={21} yPos={22} role='square'/>

        <GamePiece id="SquareX8Y23" moveIds={["SqaureX5Y9"]} color='black' xPos={8} yPos={23} role='square'/>
        <GamePiece id="SquareX9Y23" moveIds={["SqaureX5Y9"]} color='white' xPos={9} yPos={23} role='square'/>
        <GamePiece id="SquareX20Y23" moveIds={["SqaureX5Y9"]} color='black' xPos={20} yPos={23} role='square'/>
        <GamePiece id="SquareX21Y23" moveIds={["SqaureX5Y9"]} color='white' xPos={21} yPos={23} role='square'/>

        <GamePiece id="SquareX8Y24" moveIds={["SqaureX5Y9"]} color='white' xPos={8} yPos={24} role='square'/>
        <GamePiece id="SquareX9Y24" moveIds={["SqaureX5Y9"]} color='black' xPos={9} yPos={24} role='square'/>
        <GamePiece id="SquareX20Y24" moveIds={["SqaureX5Y9"]} color='white' xPos={20} yPos={24} role='square'/>
        <GamePiece id="SquareX21Y24" moveIds={["SqaureX5Y9"]} color='black' xPos={21} yPos={24} role='square'/>
      </View>
    </View>
  )
}