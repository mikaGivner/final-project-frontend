import { useState, useEffect, useContext, useCallback } from "react";
import "./AnimationsAndDefineds.css";
import { StatesContext } from "./ContextFile";
import EnteringPage from "./components/EnteringPage";

import {
  GameEntering,
  GameInfo,
  LandingPage,
  OpenPage,
  GamePresentation,
} from "./ImportsComponents";

import io from "socket.io-client";
const socket = io.connect("https://songs-gusses.onrender.com", {
  transports: ["websocket"],
});

function App() {
  const { setInnerContent, goRoom, newPin, isGameStarted, setIsGameStarted } =
    useContext(StatesContext);
  const [startSection, setStartSection] = useState(true);
  const [titleGame, setTitleGame] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setStartSection(false);
    }, "3000");
    setTimeout(() => {
      setTitleGame(true);
    }, "3000");
    setTimeout(() => {
      setInnerContent(true);
    }, "3500");
  }, [setInnerContent]);

  const startGame = useCallback(() => {
    console.log("startGame called");
    socket.emit("game_started", newPin);
  }, [newPin]);

  useEffect(() => {
    socket.on("start_game_response", (data) => {
      console.log("start_game_response:", data);
      setIsGameStarted(true);
    });
  }, [setIsGameStarted]);

  useEffect(() => {
    socket.on("start", (data) => {
      console.log("data:", data);
      socket.emit("start_game_response", true); // emit "start_game_response" event to the server
    });
  }, []);

  return (
    <>
      {startSection ? (
        <LandingPage />
      ) : (
        <>
          {goRoom ? (
            !isGameStarted ? (
              <EnteringPage startGame={startGame} />
            ) : (
              <div>hey</div>
            )
          ) : (
            <OpenPage>
              <GamePresentation className="diveUp">
                {titleGame && <GameInfo />}
              </GamePresentation>

              <GameEntering />
            </OpenPage>
          )}
        </>
      )}
    </>
  );
}

export default App;
