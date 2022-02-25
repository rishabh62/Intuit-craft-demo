const SERVER_URL = "http://smart-meeting.herokuapp.com/";

function query(query) {
  return fetch(SERVER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", token: "abcd1234" },
    body: JSON.stringify({ query }),
  });
}

async function getAllBuildings() {
  try {
    const res = await query(`{
    Buildings {
      id
      name 
    }
  }`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.log("getAllBuildings() failed");
  }
}

async function getAllRoomsAndMeetings() {
  try {
    const res = await query(
      `{
        MeetingRooms {
          id
          name
          floor
          building {
            id
            name
          }
          meetings{
            title
            date
            startTime
            endTime
          }
        }
      }`
    );
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.log("getAllRoomsAndMeetings() failed");
  }
}

async function createMeeting(data) {
  try {
    const res = await query(
      `mutation {
        Meeting(
          id: ${data.id}
          title: "${data.title}"
          date: "${data.date}"
          startTime: "${data.startTime}"
          endTime: "${data.endTime}"
          meetingRoomId:${data.meetingRoomId} 
        ) {
          id
          title
        }
      }`
    );
    if (res.ok) {
      const msg = await res.json();
      return msg;
    }
  } catch (err) {
    console.log("getAllRoomsAndMeetings() failed");
  }
}

export { getAllBuildings, getAllRoomsAndMeetings, createMeeting };
