import { useState, useEffect, useContext, useCallback } from "react";
import "./AnimationsAndDefineds.css";
import { StatesContext } from "./ContextFile";
import EnteringPage from "./components/EnteringPage";
import Login from "./components/LogIn";
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
  }, [newPin, socket]);

  useEffect(() => {
    socket.on("game_started", (data) => {
      console.log("game_started event received with data:", data.message);
      setIsGameStarted(true);
    });
    return () => {
      socket.off("game_started");
    };
  }, [socket]);

  // useEffect(() => {
  //   socket.on("game_started", (data) => {
  //     console.log(
  //       "game_started event received with data:",
  //       data.message,
  //     );
  //     setIsGameStarted(true);
  //   });
  //   //   //console.log("is game:", isGameStarted);
  // }, [isGameStarted, socket]);

  return (
    <>
      {startSection ? <LandingPage /> : <Login />}

      {/* {goRoom ? (
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
      )} */}
    </>
  );
}

export default App;
