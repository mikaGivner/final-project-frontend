import { useContext } from "react";
import {
  EnteringPageStyle,
  ParticipantsPresentationStyle,
} from "../style/Index";
import { StatesContext } from "../ContextFile";
import "../AnimationsAndDefineds.css";
// import Inputs from "./Inputs";
//import Btn from "./Btn";

export default function EnteringPage() {
  //const placeHolders = ["Choose a name", "Enter your pin"];
  const { newName, newPin, joinsPeople, goRoom } = useContext(StatesContext);
  const PinRender = localStorage.getItem("isAdmin");
  const adminName = localStorage.getItem("nameAdmin");
  const mainAdmin = localStorage.getItem("mainAdmin");
  return (
    <EnteringPageStyle>
      <h1 style={{ color: "#000" }}>Participants for this game</h1>
      <ParticipantsPresentationStyle>
        {goRoom &&
          joinsPeople.length !== 0 &&
          joinsPeople.map((user) => {
            if (user.isAdmin) localStorage.setItem("mainAdmin", user.name);
            if (user.isAdmin && user.name === mainAdmin)
              return <div style={{ fontWeight: "bold" }}>{user.name}</div>;
            else return <div>{user.name}</div>;
          })}
      </ParticipantsPresentationStyle>

      {PinRender === newPin && adminName === newName && <button>admin</button>}
    </EnteringPageStyle>
  );
}
