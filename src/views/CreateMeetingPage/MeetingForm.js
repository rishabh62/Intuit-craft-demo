import styles from "./MeetingForm.module.css";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { context } from "../../model/StateProvider";
import ACTIONS from "../../model/actions";

export default function MeetingForm(props) {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(context);

  function handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.meetingForm;
    console.log("submitted");
    dispatch({
      type: ACTIONS.UPDATE_BOOKING_DATA,
      payload: {
        date: form.date.value.split("-").reverse().join("/"),
        start: form.start.value,
        end: form.end.value,
        buildingId: form.buildingId.selectedOptions[0].value,
        title: form.title.value,
      },
    });
    navigate("/book-room");
  }

  return (
    <form className={styles.form} name="meetingForm" onSubmit={handleSubmit}>
      <h1>Schedule Meeting</h1>
      <label for="title">Title:</label>
      <input id="title" type="text" name="title" required />

      <label for="date">Date:</label>
      <input id="date" type="date" name="date" required />

      <label for="start-time">Start Time:</label>
      <input id="start-time" type="time" name="start" required />

      <label for="end-time">End Time:</label>
      <input id="end-time" type="time" name="end" required />

      <label for="select-building">Select Building:</label>
      <select id="select-building" name="buildingId">
        {
          //only show buildings that have free rooms available
          state.freeRooms
            .map((room) => ({ id: room.building.id, name: room.building.name }))
            .map(JSON.stringify)
            .reduce((acc, x) => [...new Set([...acc, x])], [])
            .map(JSON.parse)
            .map((building) => (
              <option value={building.id}>{building.name}</option>
            ))
        }
      </select>

      <Button type="submit">Next</Button>
    </form>
  );
}
