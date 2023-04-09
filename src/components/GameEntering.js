import { useState, useContext, useEffect } from "react";
import { GameEnteringStyle, PinRenderStyle } from "../style/Index";
import { StatesContext } from "../ContextFile";
import "../AnimationsAndDefineds.css";
import Inputs from "./Inputs";
import Btn from "./Btn";
import useResult from "../Hooks/useResult.js";
import axios from "axios";
import io from "socket.io-client";
const socket = io.connect("https://songs-gusses.onrender.com", {
  transports: ["websocket"],
});
export default function GameEntering() {
  // const [goRoom, setGoRoom] = useState(false);
  const { GetPin } = useResult();
  const {
    innerContent,
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
    setGoRoom,
  } = useContext(StatesContext);

  const placeHolders = [
    ["Choose a name", newName, nameError],
    ["Enter your pin", newPin, pinError],
  ];
  //const [joinsPeople, setJoinsPeople] = useState("");
  const [thePin, setThePin] = useState("");
  const [presentPin, setPresentPin] = useState(false);
  const handleGetPin = async () => {
    const pin = await GetPin();
    setThePin(pin);
    setPresentPin(true);
  };
  const PinRender = localStorage.getItem("isAdmin");
  useEffect(() => {
    if (PinRender) {
      setThePin(PinRender);
      setPresentPin(true);
    }
  }, [PinRender]);
  const CheckData = async () => {
    let greatName = false;
    let greatPin = false;
    setNameError("");
    setPinError("");
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{2,10}$/;
    //checking a name
    if (!newName) setNameError("Please choose a name");
    else if (!regex.test(newName))
      setNameError(
        "Please check if the name: contain a number, upper and lower case and in length between 2-10 characters "
      );
    else greatName = true;
    //checking a pin
    if (!newPin) setPinError("Please enter a pin");
    else {
      try {
        await axios.get(
          `https://songs-gusses.onrender.com/api/v1/newPlay/${newPin}`
        );
        greatPin = true;
      } catch {
        setPinError("This pin is not exist");
      }
    }
    if (greatName && greatPin) {
      let game = await axios.get(
        `https://songs-gusses.onrender.com/api/v1/newPlay/${newPin}`
      );
      if (game.data.data.participants.includes(newName)) {
        setNameError("This name exists in the game you are trying to access");
      } else {
        const updatedPartisipants = [...game.data.data.participants, newName];
        await axios.put(
          `https://songs-gusses.onrender.com/api/v1/newPlay/${newPin}`,
          {
            participants: updatedPartisipants,
          }
        );
        if (newPin === PinRender) {
          await axios.put(
            `https://songs-gusses.onrender.com/api/v1/newPlay/${newPin}`,
            {
              admin: newName,
            }
          );
        }
        setGoRoom(true);
        socket.emit("join_room", newPin);
        socket.emit("add_participant", newName);
      }
    }
  };
  const ValueChanged = (e) => {
    if (e.target.id === "0") {
      setNewName(e.target.value);
      setNameError("");
    } else {
      setNewPin(e.target.value);
      setPinError("");
    }
  };
  useEffect(() => {
    socket.on("participant_added", (data) => {
      setJoinsPeople(joinsPeople + data);
    });
    // When a participant leaves the room
    socket.on("participant_left", (name) => {
      // Update the list of participants by removing the name of the participant that has left
      setJoinsPeople(joinsPeople.filter((participant) => participant !== name));
    });
  }, [joinsPeople, setJoinsPeople]);
  return (
    <GameEnteringStyle>
      <div className="diveUp">
        {placeHolders.map((thisInput, index) => {
          return (
            <div className="inputPresent" key={index}>
              {thisInput[2]}
              <Inputs
                openLine={thisInput[0]}
                key={index}
                onChange={ValueChanged}
                value={thisInput[1]}
                id={index}
              />
            </div>
          );
        })}
        <Btn theValue="Enter game" theAction={CheckData} key={1} />
      </div>

      <PinRenderStyle className="diveUp">
        {innerContent && !thePin && (
          <Btn
            className="diveUp"
            theValue="Render a code"
            theAction={handleGetPin}
            key={2}
          />
        )}
        {presentPin && <div>Your pin is: {thePin}</div>}
      </PinRenderStyle>
    </GameEnteringStyle>
  );
}
