import { useState, useContext, useEffect } from "react";
import {
  EnteringPageStyle,
  ParticipantsPresentationStyle,
} from "../style/Index";
import { StatesContext } from "../ContextFile";
import "../AnimationsAndDefineds.css";
import axios from "axios";

export default function EnteringPage({ startGame }) {
  const { userName, newPin, joinsPeople, goRoom, isGameStarted } =
    useContext(StatesContext);
  const PinRender = localStorage.getItem("isAdmin");
  const adminName = localStorage.getItem("nameAdmin");
  const myName = localStorage.getItem("myName");
  const [myGame, setMyGame] = useState(null);
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    setCsvData(joinsPeople.map((user, i) => [i, user.name]));
  }, [joinsPeople]);

  useEffect(() => {
    console.log("is Game in Entering page:", isGameStarted);
    async function fetchGame() {
      const response = await axios.get(
        `https://songs-gusses.onrender.com/api/v1/newPlay/${newPin}`
      );

      setMyGame(response.data.data);
    }
    fetchGame();
  }, [newPin, joinsPeople, goRoom, isGameStarted]);

  const handleDownloadCsv = () => {
    const csvRows = [];
    csvRows.push(["#", "Name"]);
    csvData.forEach((row) => {
      csvRows.push(row);
    });

    const csvString = csvRows.map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "participants.csv";
    link.href = url;
    link.click();
  };
  let teacher = localStorage.getItem("isTeacher");
  return (
    <EnteringPageStyle>
      <h1 style={{ color: "#000" }}>Participants for this lesson</h1>
      <ParticipantsPresentationStyle>
        {goRoom &&
          joinsPeople.length !== 0 &&
          joinsPeople.map((user) => {
            if (myGame && myGame.admin === user.name)
              return <div style={{ fontWeight: "bold" }}>{user.name}</div>;
            else return <div>{user.name}</div>;
          })}
      </ParticipantsPresentationStyle>

      <div>me:{myName}</div>
      {csvData.length > 0 && teacher && (
        <button onClick={handleDownloadCsv}>Download CSV</button>
      )}
    </EnteringPageStyle>
  );
}
