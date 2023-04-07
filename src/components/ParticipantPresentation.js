import { useState, useContext, useEffect } from "react";
import { ParticipantsPresentationStyle } from "../style/Index";
import "../AnimationsAndDefineds.css";
import { StatesContext } from "../ContextFile.js";

export default function ParticipantsPresentation() {
  const { joinsPeople, setJoinsPeople } = useContext(StatesContext);
  return (
    <ParticipantsPresentationStyle>
      {joinsPeople && joinsPeople}
    </ParticipantsPresentationStyle>
  );
}
