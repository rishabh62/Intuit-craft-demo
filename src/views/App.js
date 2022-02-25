import "./App.css";
import Summary from "./SummaryPage/Summary";
import MeetingForm from "./CreateMeetingPage/MeetingForm";
import RoomSelection from "./RoomSelectionPage/RoomSelection";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Summary />} />
        <Route path="/create-meeting" element={<MeetingForm />} />
        <Route path="/book-room" element={<RoomSelection />} />
      </Routes>
    </div>
  );
}

export default App;
