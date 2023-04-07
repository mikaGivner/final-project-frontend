import { useState } from "react";
import axios from "axios";
const useResult = () => {
  const [isResult, setIsResult] = useState("");

  const GetPin = async () => {
    console.log("ok");
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    try {
      await axios.get(`http://localhost:5000/api/v1/newPlay/"${result}"`);
      GetPin();
    } catch (error) {
      localStorage.setItem("isAdmin", result);
      let newGame = {
        gamePin: result,
        admin: "",
        participants: [],
      };
      await axios.post(`http://localhost:5000/api/v1/newPlay`, newGame);
    }
  };
  return {
    GetPin,
    isResult,
    setIsResult,
  };
};

export default useResult;
