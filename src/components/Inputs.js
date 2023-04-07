import { InputStyle } from "../style/Index";
export default function Inputs({ openLine, onChange, value, id }) {
  return (
    <InputStyle
      type="text"
      placeholder={openLine}
      onChange={onChange}
      value={value}
      id={id}
    />
  );
}
