import ACTIONS from "./actions";
import { formatDate, formatTime } from "../utils/dateTimeUtils";
import { isAvailableForBooking } from "../utils/helper";
import { createMeeting } from "./api";

function updateRoomsAndMeetings(state, payload) {
  console.log(
    payload.data.MeetingRooms.filter((room) => {
      const date = new Date();
      const currDate = formatDate(date); // dd/mm/yyyy format
      const currTime = formatTime(date); //time in HH:MM format
      return room.meetings
        .filter((meeting) => meeting.date === currDate)
        .every((meeting) => {
          return (
            // meeting.date === currDate &&
            isAvailableForBooking(meeting.startTime, meeting.endTime, currTime)
          );
        });
    })
  );
  const meetingRooms = payload.data.MeetingRooms;
  return {
    ...state,
    rooms: meetingRooms.map((room) => ({
      id: room.id,
      name: room.name,
      floor: room.floor,
      buildingId: room.building.id,
      buildingName: room.building.name,
    })),
    meetings: meetingRooms.reduce(
      (acc, room) => [
        ...acc,
        ...room.meetings.map((meeting) => ({
          ...meeting,
          roomId: room.id,
          buildingId: room.building.id,
          floor: room.floor,
        })),
      ],
      []
    ),
    freeRooms: meetingRooms.filter((room) => {
      const date = new Date();
      const currDate = formatDate(date); // dd/mm/yyyy format
      const currTime = formatTime(date); //time in HH:MM format
      return room.meetings
        .filter((meeting) => meeting.date === currDate)
        .every((meeting) => {
          return (
            // meeting.date === currDate &&
            isAvailableForBooking(meeting.startTime, meeting.endTime, currTime)
          );
        });
    }),
  };
}

function updateBookingData(state, payload) {
  return {
    ...state,
    bookingData: payload,
  };
}

function bookRoom(state, payload) {
  createMeeting({
    id: (Math.random() * 100).toString().slice(0, 2),
    title: state.bookingData.title,
    date: state.bookingData.date,
    startTime: state.bookingData.start,
    endTime: state.bookingData.end,
    meetingRoomId: payload.id,
  });
}

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.UPDATE_BUILDINGS:
      return { ...state, buildings: action.payload.data.Buildings };
    case ACTIONS.UPDATE_ROOMS_AND_MEETINGS:
      return updateRoomsAndMeetings(state, action.payload);
    case ACTIONS.UPDATE_BOOKING_DATA:
      return updateBookingData(state, action.payload);
    case ACTIONS.BOOK_ROOM:
      bookRoom(state, action.payload);
      break;
    default:
      throw new Error("unknown action dispatched");
  }
}

export default reducer;
