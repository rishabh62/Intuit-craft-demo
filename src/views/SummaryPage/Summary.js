import Card from "../components/Card/Card";
import styles from "./Summary.module.css";
import Button from "../components/Button/Button";
import { formatDate, formatTime } from "../../utils/dateTimeUtils";
import { isAvailableForBooking } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { context } from "../../model/StateProvider";
import { getAllBuildings, getAllRoomsAndMeetings } from "../../model/api";
import ACTIONS from "../../model/actions";

function Summary(props) {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(context);

  useEffect(() => {
    getAllBuildings().then((data) =>
      dispatch({ type: ACTIONS.UPDATE_BUILDINGS, payload: data })
    );
    getAllRoomsAndMeetings().then((data) =>
      dispatch({ type: ACTIONS.UPDATE_ROOMS_AND_MEETINGS, payload: data })
    );
  }, []);

  function handleClick() {
    navigate("/create-meeting");
  }

  function meetingsRunningToday() {
    return state.meetings.filter((x) => x.date === formatDate(new Date()));
  }

  function currentlyRunningMeetings() {
    const currTime = formatTime(new Date());
    return meetingsRunningToday().filter(
      (x) => !isAvailableForBooking(x.startTime, x.endTime, currTime)
    );
  }

  return (
    <article className={styles.summary}>
      <h1>Meetings Summary</h1>
      <Card title="Building">
        <p>{`Total: ${state.buildings.length}`}</p>
      </Card>
      <Card title="Rooms">
        <p>{`Total: ${state.rooms.length}`}</p>
        <p>{`Free now: ${state.freeRooms.length}`}</p>
      </Card>
      <Card title="Meetings">
        <p>{`Total: ${meetingsRunningToday().length} today`}</p>
        <p>{`Currently Running: ${currentlyRunningMeetings().length}`}</p>
      </Card>
      <Button onClick={handleClick}>Add a meeting</Button>
    </article>
  );
}

export default Summary;
