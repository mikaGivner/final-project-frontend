import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";

const socket = io.connect("https://songs-gusses.onrender.com/");
// const socket = io.connect("http://localhost:5000");

function App() {
  const [room, setRoom] = useState("");
  const [participantsCount, setParticipantsCount] = useState(4);
  const [newName, setNewName] = useState("");

  const [joinsPeople, setJoinsPeople] = useState("");
  const [goRoom, setGoRoom] = useState(false);

  const UpdateName = (e) => {
    setNewName(e.target.value);
  };
  const UpdateRoom = (e) => {
    setRoom(e.target.value);
    setGoRoom(false);
  };
  // const joinRoom=()=>{
  //   if(room!==""){
  //     socket.emit("join_room", room);
  //   }
  // };

  const JoinGame = () => {
    setGoRoom(true);
    if (room !== "") {
      socket.emit("join_room", room);
    }
    socket.emit("add_participant", newName);
    setParticipantsCount(Number(participantsCount) - 1);
  };

  useEffect(() => {
    socket.on("participant_added", (data) => {
      setParticipantsCount(Number(participantsCount) - 1);
      setJoinsPeople(joinsPeople + data);
    });
  }, [joinsPeople, participantsCount]);
  return (
    <div className="App">
      <label>Choose a name:</label>
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
      )}
    </div>
  );
}

export default App;
