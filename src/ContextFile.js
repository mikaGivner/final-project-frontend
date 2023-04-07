import React, { createContext, useState } from "react";
export const StatesContext = createContext();
export function StatesContextProvider(props) {
  const [innerContent, setInnerContent] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [newName, setNewName] = useState("");
  const [nameError, setNameError] = useState("");
  const [pinError, setPinError] = useState("");
  const [room, setRoom] = useState("");
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
  };

  return (
    <StatesContext.Provider value={contextValue}>
      {props.children}
    </StatesContext.Provider>
  );
}
