import { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import "./AnimationsAndDefineds.css";
import { StatesContext } from "./ContextFile";
import EnteringPage from "./components/EnteringPage";
import Login from "./components/LogIn";
import {
  GameEntering,
  LandingPage,
  OpenPage,
  GamePresentation,
} from "./ImportsComponents";

import io from "socket.io-client";
const socket = io.connect("https://songs-gusses.onrender.com", {
  transports: ["websocket"],
});

function App() {
  const {
    setInnerContent,
    goRoom,
    newPin,
    isGameStarted,
    setIsGameStarted,
    setCorrectPsw,
    setCorrectName,
    userName,
    setUserName,
    pSW,
    setPSW,
    fillInput,
    setFillInput,
    newClass,
    setNewClass,
    newLesson,
    setNewLesson,
    thePin,
    setThePin,
    codePresent,
    setCodePresent,
  } = useContext(StatesContext);
  const [startSection, setStartSection] = useState(true);
  const [titleGame, setTitleGame] = useState(false);
  const [rememberUser, setRememberUser] = useState(false);
  const [enterWithUser, setEnterWithUser] = useState(false);
  const userEnter = localStorage.getItem("userToRemember");
  let result = "";
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

  useEffect(() => {
    if (thePin !== "") {
      setTimeout(async () => {
        await axios.delete(
          `https://songs-gusses.onrender.com/api/v1/newPlay/${thePin}`
        );
        setThePin("");
        result = "";
        setStartSection(true);
      }, "180000");
    }
  }, [thePin]);

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
  const ValueChanged = (e) => {
    if (e.target.type === "text") {
      setUserName(e.target.value);
      setCorrectName("");
    } else {
      setPSW(e.target.value);
      setCorrectPsw("");
    }
  };
  const CheckName = async () => {
    setCorrectName("");
    setCorrectPsw("");
    let goodName = false;
    let goodPsw = false;
    //check userName
    if (!userName) setCorrectName("Please enter name");
    else {
      try {
        await axios.get(
          `https://songs-gusses.onrender.com/api/v1/newUser/${userName}`
        );
        goodName = true;
      } catch {
        setCorrectName("The user is not found");
      }
    }

    //check psw
    if (!pSW) setCorrectPsw("Please enter password");
    else {
      goodPsw = true;
    }

    if (goodName && goodPsw) {
      let currentlyName = await axios.get(
        `https://songs-gusses.onrender.com/api/v1/newUser/${userName}`
      );
      console.log("the user:", currentlyName.data.data.password);
      if (currentlyName.data.data.password !== pSW)
        setCorrectPsw("Wrong password");
      else {
        if (currentlyName.data.data.isTeacher)
          localStorage.setItem("isTeacher", true);

        if (rememberUser) localStorage.setItem("userToRemember", userName);
        setEnterWithUser(true);
      }
    }
  };
  const ToRemember = (e) => {
    console.log("is checked:", e);
    if (e.target.checked) setRememberUser(true);
    else setRememberUser(false);
  };
  // const PinFun = async () => {
  //   setFillInput("");
  //   if (newClass === "" || newLesson === "") {
  //     setFillInput("Please fill all");
  //   } else {
  //     result = "";
  //     let characters =
  //       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //     for (let i = 0; i < 5; i++) {
  //       result += characters.charAt(
  //         Math.floor(Math.random() * characters.length)
  //       );
  //     }
  //     try {
  //       await axios.get(
  //         `https://songs-gusses.onrender.com/api/v1/newPlay/${result}`
  //       );

  //       return PinFun();
  //     } catch (error) {
  //       localStorage.setItem("isAdmin", result);
  //       let newGame = {
  //         gamePin: result,
  //         admin: "",
  //         participants: [],
  //       };
  //       await axios.post(
  //         `https://songs-gusses.onrender.com/api/v1/newPlay`,
  //         newGame
  //       );

  //       setThePin(result);
  //       setCodePresent(
  //         `Your code for ${newLesson} lesson to ${newClass} is: ${thePin}`
  //       );
  //     }
  //   }
  // };

  return (
    <>
      {startSection ? (
        <LandingPage />
      ) : !userEnter ? (
        !enterWithUser ? (
          <Login
            ValueChanged={ValueChanged}
            CheckName={CheckName}
            ToRemember={ToRemember}
          />
        ) : goRoom ? (
          <EnteringPage startGame={startGame} />
        ) : (
          <OpenPage>
            <GameEntering />
          </OpenPage>
        )
      ) : goRoom ? (
        <EnteringPage startGame={startGame} />
      ) : (
        <OpenPage>
          <GameEntering />
        </OpenPage>
      )}
    </>
  );
}

export default App;
