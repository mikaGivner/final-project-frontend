import axios from "axios";
import { useContext } from "react";
import { StatesContext } from "../ContextFile";

const CheckData = async () => {
  const PinRender = localStorage.getItem("isAdmin");
  const { newPin, newName, setNameError, setPinError } =
    useContext(StatesContext);
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
      await axios.get(`http://localhost:5000/api/v1/newPlay/${newPin}`);
      greatPin = true;
    } catch {
      setPinError("This pin is not exist");
    }
  }

  if (greatName && greatPin) {
    let game = await axios.get(
      `http://localhost:5000/api/v1/newPlay/${newPin}`
    );
    if (game.data.data.participants.includes(newName)) {
      setNameError("This name exists in the game you are trying to access");
    } else {
      const updatedPartisipants = [...game.data.data.participants, newName];
      await axios.put(`http://localhost:5000/api/v1/newPlay/${newPin}`, {
        participants: updatedPartisipants,
      });
      if (newPin === PinRender) {
        await axios.put(`http://localhost:5000/api/v1/newPlay/${newPin}`, {
          admin: newName,
        });
      }
    }
  }
};

export default CheckData;
