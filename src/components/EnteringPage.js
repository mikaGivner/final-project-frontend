import { useState, useContext, useEffect } from "react";
import {
  EnteringPageStyle,
  ParticipantsPresentationStyle,
} from "../style/Index";
import { StatesContext } from "../ContextFile";
import "../AnimationsAndDefineds.css";
import axios from "axios";

export default function EnteringPage() {
  const { newName, newPin, joinsPeople, goRoom } = useContext(StatesContext);
  const PinRender = localStorage.getItem("isAdmin");
  const adminName = localStorage.getItem("nameAdmin");
  const myName = localStorage.getItem("myName");
  const [myGame, setMyGame] = useState(null);

  useEffect(() => {
    async function fetchGame() {
      const response = await axios.get(
        `https://songs-gusses.onrender.com/api/v1/newPlay/${newPin}`
      );
      setMyGame(response.data.data);
    }
    fetchGame();
  }, [newPin, joinsPeople, goRoom]);

  return (
    <EnteringPageStyle>
      <h1 style={{ color: "#000" }}>Participants for this game</h1>
      <ParticipantsPresentationStyle>
        {goRoom &&
          joinsPeople.length !== 0 &&
          joinsPeople.map((user) => {
            if (myGame && myGame.admin === user.name && myName === user.name)
              return (
                <div style={{ fontWeight: "bold", color: "red" }}>
                  {user.name}
                </div>
              );
            else if (myGame && myGame.admin === user.name)
              return <div style={{ fontWeight: "bold" }}>{user.name}</div>;
            else if (myName === user.name)
              return <div style={{ color: "red" }}>{user.name}</div>;
            else return <div>{user.name}</div>;
          })}
      </ParticipantsPresentationStyle>

      {PinRender === newPin && adminName === newName && <button>admin</button>}
    </EnteringPageStyle>
  );
}
