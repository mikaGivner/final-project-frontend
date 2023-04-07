//import { useContext } from "react";
import { EnteringPageStyle } from "../style/Index";
//import { StatesContext } from "../ContextFile";
import "../AnimationsAndDefineds.css";
// import Inputs from "./Inputs";
//import Btn from "./Btn";
import ParticipantsPresentation from "./ParticipantPresentation";
export default function EnteringPage() {
  //const placeHolders = ["Choose a name", "Enter your pin"];
  //const {enterToGame } = useContext(StatesContext);
  return (
    <EnteringPageStyle>
      <h1 style={{ color: "#000" }}>Participants for this game</h1>
      <ParticipantsPresentation />
    </EnteringPageStyle>
  );
}
