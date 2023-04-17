import axios from "axios";

export default async function GetPin() {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  try {
    // await axios.get(
    //   `https://songs-gusses.onrender.com/api/v1/newPlay/${result}`
    // );
    await axios.get(`http://localhost:5000/api/v1/newPlay/${result}`);

    return GetPin();
  } catch (error) {
    localStorage.setItem("isAdmin", result);
    let newGame = {
      gamePin: result,
      admin: "",
      participants: [],
    };
    // await axios.post(
    //   `https://songs-gusses.onrender.com/api/v1/newPlay`,
    //   newGame
    // );
    await axios.post(`http://localhost:5000/api/v1/newPlay`, newGame);

    return result;
  }
}
