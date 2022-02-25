import Card from "../components/Card/Card";
import styles from "./RoomSelection.module.css";
import Button from "../components/Button/Button";
import { useContext, useState } from "react";
import { context } from "../../model/StateProvider";
import ACTIONS from "../../model/actions";
import { useNavigate } from "react-router-dom";
import { createMeeting } from "../../model/api";

function RoomSelection(props) {
  const { state, dispatch } = useContext(context);
  const navigate = useNavigate();
  const [selectedIdx, setSelectedIdx] = useState(-1);

  function handleOnSelect(e) {
    setSelectedIdx(e.target.id);
  }

  function handleAddMeeting(e) {
    const selectedRoom = state.freeRooms.filter(
      (room) => room.building.id === +state.bookingData.buildingId
    )[selectedIdx];
    createMeeting({
      id: (Math.random() * 100).toString().slice(0, 2),
      title: state.bookingData.title,
      date: state.bookingData.date,
      startTime: state.bookingData.start,
      endTime: state.bookingData.end,
      meetingRoomId: selectedRoom.id,
    }).then((data) => {
      alert("booked successfully!\n", JSON.stringify(data));
      navigate("/");
    });
    // dispatch({
    //   type: ACTIONS.BOOK_ROOM,
    //   payload: {
    //     ...state.freeRooms.filter(
    //       (room) => room.building.id === +state.bookingData.buildingId
    //     )[selectedIdx],
    //     cb: (data) => {
    //       alert("booked successfully!\n", JSON.stringify(data));
    //       navigate("/");
    //     },
    //   },
    // });
  }

  return (
    <article className={styles.roomSelection}>
      <h1>Available Rooms</h1>
      <fieldset className={styles.fieldset} onClick={handleOnSelect}>
        {state.freeRooms
          .filter((room) => room.building.id === +state.bookingData.buildingId)
          .map((room, idx) => (
            <span>
              <input
                type="radio"
                id={idx}
                name="rooms"
                className={styles.radioButton}
              />
              <label for={idx} className={styles.radioButton}>
                {`${room.building.name} -> Floor ${room.floor} -> ${room.name}`}
              </label>
            </span>
          ))}
      </fieldset>
      <Button onClick={handleAddMeeting}>Add a meeting</Button>
      {/* <fieldset className={styles.fieldset}>
        <legend>Building 3</legend>
        <input
          type="radio"
          id="0"
          name="rooms"
          value="HTML"
          className={styles.radioButton}
        />
        <label for="0" className={styles.radioButton}>
          Punjab on Floor 4
        </label>
        <br />
        <input
          type="radio"
          id="0"
          name="rooms"
          value="HTML"
          className={styles.radioButton}
        />
        <label for="0" className={styles.radioButton}>
          Ganga on Floor 6
        </label>
        <br />
        <input
          type="radio"
          id="0"
          name="rooms"
          value="HTML"
          className={styles.radioButton}
        />
        <label for="0" className={styles.radioButton}>
          Punjab on Floor 4
        </label>
      </fieldset>
      <fieldset className={styles.fieldset}>
        <legend>Building 4</legend>
        <input
          type="radio"
          id="0"
          name="rooms"
          value="HTML"
          className={styles.radioButton}
        />
        <label for="0" className={styles.radioButton}>
          Punjab on Floor 4
        </label>
        <br />
        <input
          type="radio"
          id="0"
          name="rooms"
          value="HTML"
          className={styles.radioButton}
        />
        <label for="0" className={styles.radioButton}>
          Ganga on Floor 6
        </label>
        <br />
        <input
          type="radio"
          id="0"
          name="rooms"
          value="HTML"
          className={styles.radioButton}
        />
        <label for="0" className={styles.radioButton}>
          Punjab on Floor 4
        </label>
      </fieldset> */}
    </article>
  );
}

export default RoomSelection;
