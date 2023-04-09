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
  const { joinsPeople, goRoom } = useContext(StatesContext);

  return (
    <EnteringPageStyle>
      <h1 style={{ color: "#000" }}>Participants for this game</h1>
      <ParticipantsPresentationStyle>
        {goRoom && (
          <div style={{ color: "#000" }}>people who join: {joinsPeople}</div>
        )}
      </ParticipantsPresentationStyle>
    </EnteringPageStyle>
  );
}
