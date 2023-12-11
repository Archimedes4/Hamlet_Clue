export enum authState {
  notAuthenticated,
  authenticatedNoAccount,
  authenticatedWithAccount,
  loading,
}

export enum loadingStateEnum {
  notStarted,
  loading,
  failed,
  success,
}

export const rooms: rooms[] = ["Gun_Platform", "Great_Hall", "Fencing_Room", "Court_Yard", "Royal_Bedroom", "Chapel", "Throne_Room", "Stair_Well"]

const squares: positionType[] = [
  {
    id: "SquareX7Y0",
    moves: ["SquareX7Y1"]
  },
  {
    id: "SquareX16Y0",
    moves: []
  },
  {
    id: "SquareX6Y1",
    moves: ["SquareX7Y1", "SquareX6Y2"]
  },
  {
    id:"SquareX7Y1",
    moves:["SquareX6Y1", "SquareX7Y2"]
  },
  {
    id: "SquareX16Y1",
    moves: ["SquareX16Y0", "SquareX17Y1", "SquareX16Y2"]
  },
  {
    id: "SquareX17Y1",
    moves: ["SquareX16Y1", "SquareX17Y2"]
  },
  {
    id:"SquareX6Y2",
    moves: ["SquareX6Y1", "SquareX7Y2", "SquareX6Y3"]
  },
  {
    id:"SquareX7Y2",
    moves: ["SquareX7Y1", "SquareX6Y2", "SquareX7Y3"]
  },
  {
    id: "SquareX16Y2",
    moves: ["SquareX16Y1", "SquareX17Y2", "SquareX16Y3"]
  },
  {
    id: "SquareX17Y2",
    moves: ["SquareX17Y1", "SquareX16Y2", "SquareX17Y3"]
  },
  {
    id:"SquareX6Y3",
    moves: ["SquareX6Y2", "SquareX7Y3", "SquareX6Y4"]
  },
  {
    id:"SquareX7Y3",
    moves: ["SquareX7Y2", "SquareX6Y3", "SquareX7Y4"]
  },
  {
    id:"SquareX16Y3",
    moves: ["SquareX17Y3", "SquareX16Y4"]
  },
  {
    id:"SquareX17Y3",
    moves: ["SquareX16Y3", "SquareX17Y4"]
  },
  {
    id:"SquareX6Y4",
    moves: ["SquareX6Y3", "SquareX7Y4", "SquareX6Y5"]
  },
  {
    id:"SquareX7Y4",
    moves: ["SquareX7Y3", "SquareX6Y4", "SquareX7Y5"]
  },
  {
    id:"SquareX16Y4",
    moves: ["SquareX16Y3", "SquareX17Y4", "SquareX16Y5"]
  },
  {
    id:"SquareX17Y4",
    moves: ["SquareX17Y3", "SquareX16Y4", "SquareX17Y5"]
  },
  {
    id:"SquareX6Y5",
    moves:["SquareX6Y4", "SquareX7Y5", "SquareX6Y6", "Gun_Platform"]
  },
  {
    id:"SquareX7Y5",
    moves:["SquareX7Y4", "SquareX6Y5", "SquareX7Y6"]
  },
  {
    id:"SquareX16Y5",
    moves:["SquareX16Y4", "SquareX17Y5", "SquareX16Y6"]
  },
  {
    id:"SquareX17Y5",
    moves:["SquareX17Y4", "SquareX16Y5", "SquareX18Y5","SquareX17Y6"]
  },
  {
    id:"SquareX18Y5",
    moves:["SquareX17Y5", "SquareX18Y6"]
  },
  {
    id:"SquareX6Y6",
    moves:["SquareX6Y5", "SquareX7Y6", "SquareX6Y7"]
  },
  {
    id:"SquareX7Y6",
    moves:["SquareX7Y5", "SquareX6Y6", "SquareX7Y7"]
  },
  {
    id:"SquareX16Y6",
    moves:["SquareX16Y5", "SquareX17Y6", "SquareX16Y7"]
  },
  {
    id:"SquareX17Y6",
    moves:["SquareX17Y5", "SquareX16Y6", "SquareX18Y6", "SquareX17Y7"]
  },
  {
    id:"SquareX18Y6",
    moves:["SquareX18Y5", "SquareX17Y6", "SquareX19Y6", "SquareX18Y7"]
  },
  {
    id:"SquareX19Y6",
    moves:["SquareX18Y6", "SquareX20Y6", "SquareX19Y7"]
  },
  {
    id:"SquareX20Y6",
    moves:["SquareX19Y6", "SquareX21Y6", "SquareX20Y7", "Fencing_Room"]
  },
  {
    id:"SquareX21Y6",
    moves:["SquareX20Y6", "SquareX22Y6", "SquareX21Y7"]
  },
  {
    id:"SquareX22Y6",
    moves:["SquareX21Y6", "SquareX23Y6", "SquareX22Y7"]
  },
  {
    id:"SquareX23Y6",
    moves:["SquareX22Y6", "SquareX24Y6", "SquareX23Y7", "Fencing_Room"]
  },
  {
    id:"SquareX24Y6",
    moves:["SquareX23Y6", "SquareX24Y7"]
  },
  {
    id:"SquareX6Y7",
    moves:["SquareX6Y6", "SquareX7Y7", "SquareX6Y8"]
  },
  {
    id:"SquareX7Y7",
    moves:["SquareX7Y6", "SquareX6Y7", "SquareX7Y8"]
  },
  {
    id:"SquareX16Y7",
    moves:["SquareX16Y6", "SquareX17Y7", "SquareX16Y8"]
  },
  {
    id:"SquareX17Y7",
    moves:["SquareX17Y6", "SquareX16Y7", "SquareX18Y7", "SquareX17Y8"]
  },
  {
    id:"SquareX18Y7",
    moves:["SquareX18Y6", "SquareX17Y7", "SquareX19Y7", "SquareX18Y8"]
  },
  {
    id:"SquareX19Y7",
    moves:["SquareX19Y6", "SquareX18Y7", "SquareX20Y7", "SquareX19Y8"]
  },
  {
    id:"SquareX20Y7",
    moves: ["SquareX20Y6", "SquareX19Y7", "SquareX21Y7", "SquareX20Y8"]
  },
  {
    id:"SquareX21Y7",
    moves:["SquareX21Y6", "SquareX20Y7", "SquareX22Y7", "SquareX21Y8"]
  },
  {
    id:"SquareX22Y7",
    moves:["SquareX22Y6", "SquareX21Y7", "SquareX23Y7", "SquareX22Y8"]
  },
  {
    id:"SquareX23Y7",
    moves:["SquareX23Y6", "SquareX22Y7", "SquareX24Y7", "SquareX23Y8"]
  },
  {
    id:"SquareX24Y7",
    moves:["SquareX24Y6", "SquareX23Y7", "SquareX25Y7", "SquareX24Y8"]
  },
  {
    id:"SquareX25Y7",
    moves:[ "SquareX24Y7" ]
  },
  {
    id:"SquareX0Y8",
    moves:["SquareX1Y8"]
  },
  {
    id:"SquareX1Y8",
    moves:["SquareX2Y8", "SquareX1Y9"]
  },
  {
    id:"SquareX2Y8",
    moves:["SquareX1Y8", "SquareX3Y8", "SquareX2Y9"]
  },
  {
    id:"SquareX3Y8",
    moves:["SquareX2Y8", "SquareX4Y8", "SquareX3Y9"]
  },
  {
    id:"SquareX4Y8",
    moves:["SquareX3Y8", "SquareX5Y8", "SquareX4Y9", "Gun_Platform"]
  },
  {
    id:"SquareX5Y8",
    moves:["SquareX4Y8", "SquareX6Y8", "SquareX5Y9"]
  },
  {
    id:"SquareX6Y8",
    moves:["SquareX6Y7", "SquareX5Y8", "SquareX7Y8", "SquareX6Y9"]
  },
  {
    id:"SquareX7Y8",
    moves:["SquareX7Y7", "SquareX6Y8", "SquareX8Y8", "SquareX7Y9"]
  },
  {
    id:"SquareX8Y8",
    moves:["SquareX7Y8", "SquareX9Y8", "SquareX8Y9"]
  },
  {
    id:"SquareX9Y8",
    moves:["SquareX8Y8", "SquareX10Y8", "SquareX9Y9", "Great_Hall"]
  },
  {
    id:"SquareX10Y8",
    moves:["SquareX9Y8", "SquareX11Y8", "SquareX10Y9"]
  },
  {
    id:"SquareX11Y8",
    moves:["SquareX10Y8", "SquareX12Y8", "SquareX11Y9"]
  },
  {
    id:"SquareX12Y8",
    moves:["SquareX11Y8", "SquareX13Y8", "SquareX12Y9"]
  },
  {
    id:"SquareX13Y8",
    moves:["SquareX12Y8", "SquareX14Y8", "SquareX13Y9"]
  },
  {
    id:"SquareX14Y8",
    moves:["SquareX13Y8", "SquareX15Y8", "SquareX14Y9", "Great_Hall"]
  },
  {
    id:"SquareX15Y8",
    moves:["SquareX14Y8", "SquareX16Y8", "SquareX15Y9"]
  },
  {
    id:"SquareX16Y8",
    moves:["SquareX16Y7", "SquareX15Y8", "SquareX17Y8", "SquareX16Y9"]
  },
  {
    id:"SquareX17Y8",
    moves:["SquareX17Y7","SquareX16Y8", "SquareX18Y8", "SquareX17Y9"]
  },
  {
    id:"SquareX18Y8",
    moves:["SquareX18Y7","SquareX17Y8", "SquareX19Y8", "SquareX18Y9"]
  },
  {
    id:"SquareX19Y8",
    moves:["SquareX19Y7","SquareX18Y8", "SquareX20Y8", "SquareX19Y9"]
  },
  {
    id:"SquareX20Y8",
    moves:["SquareX20Y7","SquareX19Y8", "SquareX21Y8"]
  },
  {
    id:"SquareX21Y8",
    moves:["SquareX21Y7","SquareX20Y8", "SquareX22Y8"]
  },
  {
    id:"SquareX22Y8",
    moves:["SquareX22Y7","SquareX21Y8", "SquareX23Y8"]
  },
  {
    id:"SquareX23Y8",
    moves:["SquareX23Y7","SquareX22Y8", "SquareX24Y8"]
  },
  {
    id:"SquareX24Y8",
    moves:["SquareX24Y7","SquareX23Y8"]
  },
  {
    id:"SquareX1Y9",
    moves:["SquareX1Y8", "SquareX2Y9"]
  },
  {
    id:"SquareX2Y9",
    moves:["SquareX2Y8", "SquareX1Y9", "SquareX3Y9"]
  },
  {
    id:"SquareX3Y9",
    moves:["SquareX3Y8", "SquareX2Y9", "SquareX4Y9"]
  },
  {
    id:"SquareX4Y9",
    moves:["SquareX4Y8", "SquareX3Y9", "SquareX5Y9"]
  },
  {
    id:"SquareX5Y9",
    moves:["SquareX5Y8", "SquareX4Y9", "SquareX6Y9"]
  },
  {
    id:"SquareX6Y9",
    moves:["SquareX6Y8", "SquareX5Y9", "SquareX7Y9"]
  },
  {
    id:"SquareX7Y9",
    moves:["SquareX7Y8", "SquareX6Y9", "SquareX8Y9", "SquareX7Y10"]
  },
  {
    id:"SquareX8Y9",
    moves:["SquareX8Y8", "SquareX7Y9", "SquareX9Y9", "SquareX8Y10"]
  },
  {
    id:"SquareX9Y9",
    moves:["SquareX9Y8", "SquareX8Y9", "SquareX10Y9"]
  },
  {
    id:"SquareX10Y9",
    moves:["SquareX10Y8", "SquareX9Y9", "SquareX11Y9", "Court_Yard"]
  },
  {
    id:"SquareX11Y9",
    moves:["SquareX11Y8", "SquareX10Y9", "SquareX12Y9"]
  },
  {
    id:"SquareX12Y9",
    moves:["SquareX12Y8", "SquareX11Y9", "SquareX13Y9"]
  },
  {
    id:"SquareX13Y9",
    moves:["SquareX13Y8", "SquareX12Y9", "SquareX14Y9"]
  },
  {
    id:"SquareX14Y9",
    moves:["SquareX14Y8", "SquareX13Y9", "SquareX15Y9"]
  },
  {
    id:"SquareX15Y9",
    moves:["SquareX15Y8", "SquareX14Y9", "SquareX16Y9"]
  },
  {
    id:"SquareX16Y9",
    moves:["SquareX16Y8", "SquareX15Y9", "SquareX17Y9", "Court_Yard"]
  },
  {
    id:"SquareX17Y9",
    moves:["SquareX17Y8", "SquareX16Y9", "SquareX18Y9"]
  },
  {
    id:"SquareX18Y9",
    moves:["SquareX18Y8", "SquareX17Y9", "SquareX19Y9", "SquareX18Y10"]
  },
  {
    id:"SquareX19Y9",
    moves:["SquareX19Y8", "SquareX18Y9", "SquareX19Y10"]
  },
  {
    id:"SquareX7Y10",
    moves:["SquareX7Y9", "SquareX8Y10", "SquareX7Y11"]
  },
  {
    id:"SquareX8Y10",
    moves:["SquareX8Y9", "SquareX7Y10", "SquareX8Y11"]
  },
  {
    id:"SquareX18Y10",
    moves:["SquareX18Y9", "SquareX19Y10", "SquareX18Y11"]
  },
  {
    id:"SquareX19Y10",
    moves:["SquareX19Y9", "SquareX18Y10", "SquareX19Y11"]
  },
  {
    id:"SquareX7Y11",
    moves:["SquareX7Y10", "SquareX8Y11", "SquareX7Y12"]
  },
  {
    id:"SquareX8Y11",
    moves:["SquareX8Y10", "SquareX7Y11", "SquareX8Y12", "Court_Yard"]
  },
  {
    id:"SquareX18Y11",
    moves:["SquareX18Y10", "SquareX19Y11", "SquareX18Y12", "Court_Yard"]
  },
  {
    id:"SquareX19Y11",
    moves:["SquareX19Y10", "SquareX18Y11", "SquareX19Y12", "Royal_Bedroom"]
  },
  {
    id:"SquareX7Y12",
    moves:["SquareX7Y11", "SquareX8Y12", "SquareX7Y13"]
  },
  {
    id:"SquareX8Y12",
    moves:["SquareX8Y11", "SquareX7Y12", "SquareX8Y13"]
  },
  {
    id:"SquareX18Y12",
    moves:["SquareX18Y11", "SquareX19Y12", "SquareX18Y13"]
  },
  {
    id:"SquareX19Y12",
    moves:["SquareX19Y11", "SquareX18Y12", "SquareX19Y13"]
  },
  {
    id:"SquareX7Y13",
    moves:["SquareX7Y12", "SquareX8Y13", "SquareX7Y14"]
  },
  {
    id:"SquareX8Y13",
    moves:["SquareX8Y12", "SquareX7Y13", "SquareX8Y14"]
  },
  {
    id:"SquareX18Y13",
    moves:["SquareX18Y12", "SquareX19Y13", "SquareX18Y14"]
  },
  {
    id:"SquareX19Y13",
    moves:["SquareX19Y12", "SquareX18Y13", "SquareX19Y14"]
  },
  {
    id:"SquareX7Y14",
    moves:["SquareX7Y13", "SquareX8Y14", "SquareX7Y15"]
  },
  {
    id:"SquareX8Y14",
    moves:["SquareX8Y13", "SquareX7Y14", "SquareX8Y15"]
  },
  {
    id:"SquareX18Y14",
    moves:["SquareX18Y13", "SquareX19Y14", "SquareX18Y15"]
  },
  {
    id:"SquareX19Y14",
    moves:["SquareX19Y13", "SquareX18Y14", "SquareX19Y15"]
  },
  {
    id:"SquareX7Y15",
    moves:["SquareX7Y14", "SquareX8Y15", "SquareX7Y16"]
  },
  {
    id:"SquareX8Y15",
    moves:["SquareX8Y14", "SquareX7Y15", "SquareX8Y16", "Court_Yard"]
  },
  {
    id:"SquareX18Y15",
    moves:["SquareX18Y14", "SquareX19Y15", "SquareX18Y16", "Court_Yard"]
  },
  {
    id:"SquareX19Y15",
    moves:["SquareX19Y14", "SquareX18Y15", "SquareX19Y16", "Royal_Bedroom"]
  },
  {
    id:"SquareX7Y16",
    moves:["SquareX7Y15", "SquareX8Y16", "SquareX7Y17"]
  },
  {
    id:"SquareX8Y16",
    moves:["SquareX8Y15", "SquareX7Y16", "SquareX8Y17"]
  },
  {
    id:"SquareX18Y16",
    moves:["SquareX18Y15", "SquareX19Y16", "SquareX18Y17"]
  },
  {
    id:"SquareX19Y16",
    moves: ["SquareX19Y15", "SquareX18Y16", "SquareX19Y17"]
  },
  {
    id:"SquareX7Y17",
    moves: ["SquareX7Y16", "SquareX8Y17", "SquareX7Y18"]
  },
  {
    id:"SquareX8Y17",
    moves: ["SquareX8Y16", "SquareX7Y17", "SquareX9Y17", "SquareX8Y18"]
  },
  {
    id:"SquareX9Y17",
    moves: ["SquareX8Y17", "SquareX10Y17", "SquareX9Y18"]
  },
  {
    id:"SquareX10Y17",
    moves: ["SquareX9Y17", "SquareX11Y17", "SquareX10Y18", "Court_Yard"]
  },
  {
    id:"SquareX11Y17",
    moves: ["SquareX10Y17", "SquareX12Y17", "SquareX11Y18"]
  },
  {
    id:"SquareX12Y17",
    moves: ["SquareX11Y17", "SquareX13Y17", "SquareX12Y18"]
  },
  {
    id:"SquareX13Y17",
    moves: ["SquareX12Y17", "SquareX14Y17", "SquareX13Y18"]
  },
  {
    id:"SquareX14Y17",
    moves: ["SquareX13Y17", "SquareX15Y17", "SquareX14Y18"]
  },
  {
    id:"SquareX15Y17",
    moves: ["SquareX14Y17", "SquareX16Y17", "SquareX15Y18"]
  },
  {
    id:"SquareX16Y17",
    moves: ["SquareX15Y17", "SquareX17Y17", "SquareX16Y18", "Court_Yard"]
  },
  {
    id:"SquareX17Y17",
    moves: ["SquareX16Y17", "SquareX18Y17", "SquareX17Y18"]
  },
  {
    id:"SquareX18Y17",
    moves: ["SquareX18Y16", "SquareX17Y17", "SquareX19Y17", "SquareX18Y18"]
  },
  {
    id:"SquareX19Y17",
    moves: ["SquareX19Y16", "SquareX18Y17", "SquareX20Y17", "SquareX19Y18"]
  },
  {
    id:"SquareX20Y17",
    moves: ["SquareX19Y17", "SquareX20Y18"]
  },
  {
    id:"SquareX7Y18",
    moves: ["SquareX7Y17", "SquareX8Y18"]
  },
  {
    id:"SquareX8Y18",
    moves: ["SquareX8Y17", "SquareX7Y18", "SquareX9Y18", "SquareX8Y19"]
  },
  {
    id:"SquareX9Y18",
    moves: ["SquareX9Y17", "SquareX8Y18", "SquareX10Y18", "SquareX9Y19"]
  },
  {
    id:"SquareX10Y18",
    moves: ["SquareX10Y17", "SquareX9Y18", "SquareX11Y18", "SquareX10Y19"]
  },
  {
    id:"SquareX11Y18",
    moves: ["SquareX11Y17", "SquareX10Y18", "SquareX12Y18", "SquareX11Y19"]
  },
  {
    id:"SquareX12Y18",
    moves: ["SquareX12Y17", "SquareX11Y18", "SquareX13Y18", "SquareX12Y19"]
  },
  {
    id:"SquareX13Y18",
    moves: ["SquareX13Y17", "SquareX12Y18", "SquareX14Y18", "SquareX13Y19"]
  },
  {
    id:"SquareX14Y18",
    moves: ["SquareX14Y17", "SquareX13Y18", "SquareX15Y18", "SquareX14Y19"]
  },
  {
    id:"SquareX15Y18",
    moves: ["SquareX15Y17", "SquareX14Y18", "SquareX16Y18", "SquareX15Y19"]
  },
  {
    id:"SquareX16Y18",
    moves: ["SquareX16Y17", "SquareX15Y18", "SquareX17Y18", "SquareX16Y19"]
  },
  {
    id:"SquareX17Y18",
    moves: ["SquareX17Y17", "SquareX16Y18", "SquareX18Y18", "SquareX17Y19"]
  },
  {
    id:"SquareX18Y18",
    moves: ["SquareX18Y17", "SquareX17Y18", "SquareX19Y18", "SquareX18Y19"]
  },
  {
    id:"SquareX19Y18",
    moves: ["SquareX19Y17", "SquareX18Y18", "SquareX20Y18", "SquareX19Y19"]
  },
  {
    id:"SquareX20Y18",
    moves: ["SquareX20Y17", "SquareX19Y18", "SquareX21Y18", "SquareX20Y19"]
  },
  {
    id:"SquareX21Y18",
    moves: ["SquareX20Y18", "SquareX22Y18", "SquareX21Y19"]
  },
  {
    id:"SquareX22Y18",
    moves: ["SquareX21Y18", "SquareX23Y18", "SquareX22Y19"]
  },
  {
    id:"SquareX23Y18",
    moves: ["SquareX22Y18", "SquareX24Y18"]
  },
  {
    id:"SquareX24Y18",
    moves: ["SquareX23Y18", "SquareX25Y18", "Stair_Well"]
  },
  {
    id:"SquareX25Y18",
    moves: ["SquareX24Y18"]
  },
  {
    id:"SquareX8Y19",
    moves: ["SquareX8Y18", "SquareX9Y19", "SquareX8Y20"]
  },
  {
    id:"SquareX9Y19",
    moves: ["SquareX9Y18", "SquareX8Y19", "SquareX10Y19", "SquareX9Y20"]
  },
  {
    id:"SquareX10Y19",
    moves: ["SquareX10Y18", "SquareX9Y19", "SquareX11Y19"]
  },
  {
    id:"SquareX11Y19",
    moves: ["SquareX11Y18", "SquareX10Y19", "SquareX12Y19", "Throne_Room"]
  },
  {
    id:"SquareX12Y19",
    moves: ["SquareX12Y18", "SquareX11Y19", "SquareX13Y19"]
  },
  {
    id:"SquareX13Y19",
    moves: ["SquareX13Y18", "SquareX12Y19", "SquareX14Y19"]
  },
  {
    id:"SquareX14Y19",
    moves: ["SquareX14Y18", "SquareX13Y19", "SquareX15Y19"]
  },
  {
    id:"SquareX15Y19",
    moves: ["SquareX15Y18", "SquareX14Y19", "SquareX16Y19"]
  },
  {
    id:"SquareX16Y19",
    moves: ["SquareX16Y18", "SquareX15Y19", "SquareX17Y19"]
  },
  {
    id:"SquareX17Y19",
    moves: ["SquareX17Y18", "SquareX16Y19", "SquareX18Y19"]
  },
  {
    id:"SquareX18Y19",
    moves: ["SquareX18Y18", "SquareX17Y19", "SquareX19Y19", "Throne_Room"]
  },
  {
    id:"SquareX19Y19",
    moves: ["SquareX19Y18", "SquareX18Y19", "SquareX20Y19"]
  },
  {
    id:"SquareX20Y19",
    moves: ["SquareX20Y18", "SquareX19Y19", "SquareX21Y19", "SquareX20Y20"]
  },
  {
    id:"SquareX21Y19",
    moves: ["SquareX21Y18", "SquareX20Y19", "SquareX22Y19", "SquareX21Y20"]
  }, 
  {
    id:"SquareX22Y19",
    moves: ["SquareX22Y18", "SquareX21Y19"]
  },
  {
    id:"SquareX8Y20",
    moves: ["SquareX8Y19", "SquareX9Y20", "SquareX8Y21", "Chapel"]
  },
  {
    id:"SquareX9Y20",
    moves: ["SquareX9Y19", "SquareX8Y20", "SquareX9Y21"]
  },
  {
    id:"SquareX20Y20",
    moves: ["SquareX20Y19", "SquareX21Y20", "SquareX20Y21"]
  },
  {
    id:"SquareX21Y20",
    moves: ["SquareX21Y19", "SquareX20Y20", "SquareX21Y21"]
  },
  {
    id:"SquareX8Y21",
    moves: ["SquareX8Y20", "SquareX9Y21", "SquareX8Y22"]
  },
  {
    id:"SquareX9Y21",
    moves: ["SquareX9Y20", "SquareX8Y21", "SquareX9Y22"]
  },
  {
    id:"SquareX20Y21",
    moves: ["SquareX20Y20", "SquareX21Y21", "SquareX20Y22"]
  },
  {
    id:"SquareX21Y21",
    moves: ["SquareX21Y20", "SquareX20Y21", "SquareX21Y22", "Stair_Well"]
  },
  {
    id:"SquareX8Y22",
    moves: ["SquareX8Y21", "SquareX9Y22", "SquareX8Y23"]
  },
  {
    id:"SquareX9Y22",
    moves: ["SquareX9Y21", "SquareX8Y22", "SquareX9Y23", "Throne_Room"]
  },
  {
    id:"SquareX20Y22",
    moves: ["SquareX20Y21", "SquareX21Y22", "SquareX20Y23"]
  },
  {
    id:"SquareX21Y22",
    moves: ["SquareX21Y21", "SquareX20Y22", "SquareX21Y23"]
  },
  {
    id:"SquareX8Y23",
    moves: ["SquareX8Y22", "SquareX9Y23", "SquareX8Y24"]
  },
  {
    id:"SquareX9Y23",
    moves: ["SquareX9Y22", "SquareX8Y23", "SquareX9Y24"]
  },
  {
    id:"SquareX20Y23",
    moves: ["SquareX20Y22", "SquareX21Y23", "SquareX20Y24"]
  },
  {
    id:"SquareX21Y23",
    moves: ["SquareX20Y23", "SquareX21Y24"]
  },
  {
    id:"SquareX8Y24",
    moves: ["SquareX8Y23", "SquareX9Y24"]
  },
  {
    id:"SquareX9Y24",
    moves: ["SquareX9Y23", "SquareX8Y24"]
  },
  {
    id:"SquareX20Y24",
    moves: ["SquareX20Y23", "SquareX21Y24"]
  },
  {
    id:"SquareX21Y24",
    moves: ["SquareX21Y23", "SquareX20Y24"]
  },
]

export default squares;