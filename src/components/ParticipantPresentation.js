import { useContext, useEffect, useState } from "react";
import { ParticipantsPresentationStyle } from "../style/Index";
import "../AnimationsAndDefineds.css";
import { StatesContext } from "../ContextFile.js";

export default function ParticipantsPresentation() {
  const { joinsPeople } = useContext(StatesContext);
  const [peopleJoin, setPeopleJoin] = useState(false);
  useEffect(() => {
    if (joinsPeople) setPeopleJoin(true);
  }, [joinsPeople]);

  return (
    <ParticipantsPresentationStyle>
      {peopleJoin && joinsPeople}
    </ParticipantsPresentationStyle>
  );
}
