import { useContext, useEffect } from "react";
import {
  EnteringPageStyle,
  ParticipantsPresentationStyle,
} from "../style/Index";
import { StatesContext } from "../ContextFile";
import "../AnimationsAndDefineds.css";
import axios from "axios";

export default function EnteringPage() {
  //const placeHolders = ["Choose a name", "Enter your pin"];
  const { newName, newPin, joinsPeople, goRoom } = useContext(StatesContext);
  const PinRender = localStorage.getItem("isAdmin");
  const adminName = localStorage.getItem("nameAdmin");
  useEffect(() => {
    const myGame = axios.get(
      `https://songs-gusses.onrender.com/api/v1/newPlay/${newPin}`
    );
  }, []);
  return (
    <EnteringPageStyle>
      <h1 style={{ color: "#000" }}>Participants for this game</h1>
      <ParticipantsPresentationStyle>
        {goRoom &&
          joinsPeople.length !== 0 &&
          joinsPeople.map((user) => {
            // if (user.isAdmin && user.userAdmin === adminName)
            if (myGame.data.data.admin === user.name)
              return <div style={{ fontWeight: "bold" }}>{user.name}</div>;
            else return <div>{user.name}</div>;
          })}
      </ParticipantsPresentationStyle>

      {PinRender === newPin && adminName === newName && <button>admin</button>}
    </EnteringPageStyle>
  );
}
