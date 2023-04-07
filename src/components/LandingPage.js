import { LandingPageStyle } from "../style/Index";
import "../AnimationsAndDefineds.css";
export default function LandingPage() {
  let welcome = "Welcome";
  let SongsGuesser = "Songs-Guesser";
  const titleAnimation = (word, i) => {
    let theVar = `--${i}`;
    return word.split("").map((letter, i) => {
      return (
        <span style={{ [theVar]: i }} key={i}>
          {letter}
        </span>
      );
    });
  };
  return (
    <LandingPageStyle>
      <div className="open">{titleAnimation(welcome, "i")}</div>
      <div className="gameName">{titleAnimation(SongsGuesser, "j")}</div>
    </LandingPageStyle>
  );
}
