const initialState = {
  buildings: [], //array of building objects of shape: {id, name}
  rooms: [], //array of rooms of shape: {roomId, name, buildingId, buildingName, floor}
  meetings: [], //array of meetings of shape: {title, date, startTime, endTime, roomId}
  freeRooms: [],
  bookingData: {
    date: "",
    start: "",
    end: "",
    buildingId: "",
    title: "",
  },
};

export default initialState;
