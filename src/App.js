import { useState, useEffect, useContext } from "react";
import "./AnimationsAndDefineds.css";
import { StatesContext } from "./ContextFile";
import EnteringPage from "./components/EnteringPage";
import {
  GameEntering,
  GameInfo,
  LandingPage,
  OpenPage,
  GamePresentation,
} from "./ImportsComponents";

// import io from "socket.io-client";

// const socket = io.connect("https://songs-gusses.onrender.com", {
//   transports: ["websocket"],
// });

function App() {
  const { setInnerContent } = useContext(StatesContext);
  const [startSection, setStartSection] = useState(true);
  const [titleGame, setTitleGame] = useState(false);
  // const [room, setRoom] = useState("");

  // const [joinsPeople, setJoinsPeople] = useState("");
  // const [goRoom, setGoRoom] = useState(false);

  // const UpdateRoom = (e) => {
  //   setRoom(e.target.value);
  //   setGoRoom(false);
  // };

  // const JoinGame = () => {
  //   setGoRoom(true);
  //   if (room !== "") {
  //     socket.emit("join_room", room);
  //   }
  //   socket.emit("add_participant", newName);

  // };

  useEffect(() => {
    setTimeout(() => {
      setStartSection(false);
    }, "3000");
    setTimeout(() => {
      setTitleGame(true);
    }, "3000");
    setTimeout(() => {
      setInnerContent(true);
    }, "3500");
  }, [setInnerContent]);
  // useEffect(() => {
  //   socket.on("participant_added", (data) => {
  //
  //     setJoinsPeople(joinsPeople + data);
  //   });
  // }, [joinsPeople, participantsCount]);

  return (
    <>
      {startSection ? (
        <LandingPage />
      ) : (
        <>
          <OpenPage>
            <GamePresentation className="diveUp">
              {titleGame && <GameInfo />}
            </GamePresentation>

            <GameEntering />
          </OpenPage>
          <EnteringPage />
        </>
      )}

      {/* <label>Choose a name:</label>
      <input type="text" value={newName} onChange={UpdateName} />
      <div>
        <label>Choose a room:</label>
        <input type="number" value={room} onChange={UpdateRoom} />
      </div>
      <button onClick={JoinGame}>Enter Room</button>
      <div>Participants Count : {participantsCount}</div>

      {goRoom && room && (
        <div>
          join to room{room}:{newName},{joinsPeople}
        </div>
      )} */}
    </>
  );
}

export default App;
