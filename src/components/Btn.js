import { BtnStyle } from "../style/Index";
import "../AnimationsAndDefineds.css";

export default function Btn({ theValue, theAction }) {
  return <BtnStyle onClick={theAction}>{theValue}</BtnStyle>;
}
