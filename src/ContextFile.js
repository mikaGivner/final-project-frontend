import React, { createContext, useState } from "react";
export const StatesContext = createContext();
export function StatesContextProvider(props) {
  const [innerContent, setInnerContent] = useState(false);
  const [newClass, setNewClass] = useState("");
  const [newLesson, setNewLesson] = useState("");
  const [newPin, setNewPin] = useState("");
  const [newName, setNewName] = useState("");
  const [nameError, setNameError] = useState("");
  const [pinError, setPinError] = useState("");
  const [room, setRoom] = useState("");
  const [joinsPeople, setJoinsPeople] = useState([]);
  const [adminEnter, setAdminEnter] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const [enterToGame, setEnterToGame] = useState(false);
  const [goRoom, setGoRoom] = useState(false);
  const [userName, setUserName] = useState("");
  const [pSW, setPSW] = useState("");
  const [correctName, setCorrectName] = useState("");
  const [correctPsw, setCorrectPsw] = useState("");

  const contextValue = {
    innerContent,
    setInnerContent,
    newPin,
    setNewPin,
    newName,
    setNewName,
    nameError,
    setNameError,
    pinError,
    setPinError,
    room,
    setRoom,
    joinsPeople,
    setJoinsPeople,
    enterToGame,
    setEnterToGame,
    goRoom,
    setGoRoom,
    adminEnter,
    setAdminEnter,
    isGameStarted,
    setIsGameStarted,
    userName,
    setUserName,
    pSW,
    setPSW,
    correctName,
    setCorrectName,
    correctPsw,
    setCorrectPsw,
    newClass,
    setNewClass,
    newLesson,
    setNewLesson,
  };

  return (
    <StatesContext.Provider value={contextValue}>
      {props.children}
    </StatesContext.Provider>
  );
}
