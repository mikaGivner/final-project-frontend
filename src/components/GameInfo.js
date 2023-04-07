import { useContext } from "react";
import "../AnimationsAndDefineds.css";
import { StatesContext } from "../ContextFile";
export default function GameInfo() {
  const { innerContent } = useContext(StatesContext);
  return (
    <>
      <h1 className="lineUp">
        About The<br></br> Game
      </h1>
      {innerContent && (
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing hidden in the middle of text. All
          the Lorem Ipsum generators on the Internet tend to repeat predefined
          chunks as necessary, making this the first true generator on the
          Internet. It uses
        </p>
      )}
    </>
  );
}
