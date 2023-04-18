import { useState, useContext, useEffect } from "react";
import { GameEnteringStyle, PinRenderStyle } from "../style/Index";
import { StatesContext } from "../ContextFile";
import "../AnimationsAndDefineds.css";
import Inputs from "./Inputs";
import Btn from "./Btn";
//import useResult from "../Hooks/useResult.js";
import axios from "axios";
import io from "socket.io-client";
const socket = io.connect("https://songs-gusses.onrender.com", {
  transports: ["websocket"],
});
export default function GameEntering() {
  // const [goRoom, setGoRoom] = useState(false);
  //const { GetPin } = useResult();

  const {
    newPin,
    setNewPin,
    newName,
    setNewName,
    nameError,
    setNameError,
    pinError,
    setPinError,
    joinsPeople,
    setJoinsPeople,
    goRoom,
    setGoRoom,
    isGameStarted,
    userName,
  } = useContext(StatesContext);

  const [thePin, setThePin] = useState("");

  const PinRender = localStorage.getItem("isAdmin");

  const PinFun = async () => {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    try {
      await axios.get(
        `https://songs-gusses.onrender.com/api/v1/newPlay/${result}`
      );

      return PinFun();
    } catch (error) {
      localStorage.setItem("isAdmin", result);
      let newGame = {
        gamePin: result,
        admin: "",
        participants: [],
      };
      await axios.post(
        `https://songs-gusses.onrender.com/api/v1/newPlay`,
        newGame
      );

      setThePin(result);
    }
  };
  useEffect(() => {
    if (PinRender) {
      setThePin(PinRender);
    }
  }, [PinRender]);
  useEffect(() => {
    console.log(joinsPeople);
    console.log(typeof joinsPeople);
  }, [joinsPeople]);
  useEffect(() => {
    socket.on("participant_added", (data) => {
      data = data.filter((user) => {
        return user.room === newPin;
      });
      setJoinsPeople([...data]);
    });
    return () => {
      socket.off("participant_added", async (data) => {
        data = data.filter((user) => {
          return user.room === newPin;
        });
        setJoinsPeople([...data]);
      });
    };
  }, [joinsPeople, setJoinsPeople, PinRender, newPin, isGameStarted]);
  const CheckData = async () => {
    let greatPin = false;
    let admin = false;
    let yourAdmin = "";
    setPinError("");

    //checking a pin
    if (!newPin) setPinError("Please enter a code");
    else {
      try {
        await axios.get(
          `https://songs-gusses.onrender.com/api/v1/newPlay/${newPin}`
        );

        greatPin = true;
      } catch {
        setPinError("This code is not exist");
      }
    }
    if (greatPin) {
      let game = await axios.get(
        `https://songs-gusses.onrender.com/api/v1/newPlay/${newPin}`
      );

      // if (game.data.data.participants.includes(userName)) {

      const updatedParticipants = [...game.data.data.participants, userName];
      await axios.put(
        `https://songs-gusses.onrender.com/api/v1/newPlay/${newPin}`,
        {
          participants: updatedParticipants,
        }
      );

      if (newPin === PinRender) {
        await axios.put(
          `https://songs-gusses.onrender.com/api/v1/newPlay/${newPin}`,
          {
            admin: userName,
          }
        );

        admin = true;
        yourAdmin = userName;
        localStorage.setItem("nameAdmin", userName);
      }
      setGoRoom(true);
      localStorage.setItem("myName", userName);
      socket.emit("join_room", newPin, userName);

      socket.emit("add_participant", userName, newPin, admin, yourAdmin);
    }
  };

  const PinChanged = (e) => {
    setNewPin(e.target.value);
    setPinError("");
  };

  return (
    <GameEnteringStyle>
      <div className="diveUp">
        <div className="inputPresent">
          {pinError}
          <Inputs
            openLine="Enter class code"
            onChange={PinChanged}
            value={newPin}
          />
        </div>

        <Btn theValue="Enter to class" theAction={CheckData} key={1} />
      </div>
      {goRoom && (
        <div style={{ color: "#fff" }}>people who join: {joinsPeople}</div>
      )}
      <PinRenderStyle className="diveUp">
        {!thePin ? (
          <Btn
            className="diveUp"
            theValue="Render a code"
            theAction={PinFun}
            key={2}
          />
        ) : (
          <div>Your pin is: {thePin}</div>
        )}
      </PinRenderStyle>
    </GameEnteringStyle>
  );
}
