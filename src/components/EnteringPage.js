import { useContext, useEffect, useState } from "react";
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
  //const {enterToGame } = useContext(StatesContext);
  const { joinsPeople } = useContext(StatesContext);
  const [peopleJoin, setPeopleJoin] = useState(false);
  useEffect(() => {
    if (joinsPeople) setPeopleJoin(true);
  }, [joinsPeople]);

  return (
    <EnteringPageStyle>
      <h1 style={{ color: "#000" }}>Participants for this game</h1>
      <ParticipantsPresentationStyle>
        {peopleJoin && joinsPeople}
      </ParticipantsPresentationStyle>
    </EnteringPageStyle>
  );
}
