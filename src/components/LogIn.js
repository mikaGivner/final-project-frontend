import "../LoginStyle.css";
import { StatesContext } from "../ContextFile";
export default function Login({ CheckName, ValueChanged }) {
  const { userName, pSW, correctPsw, correctName } = useContext(StatesContext);
  return (
    <div className="theBody">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="theForm">
        <h3>Login Here</h3>
        {correctName ? (
          <label for="username">{correctName}</label>
        ) : (
          <label for="username">Username</label>
        )}

        <input
          type="text"
          placeholder="What is your name"
          id="username"
          onChange={ValueChanged}
          value={userName}
        />
        {correctPsw ? (
          <label for="password">{correctPsw}</label>
        ) : (
          <label for="password">Password</label>
        )}
        <label for="password">Password</label>
        <input
          type="password"
          onChange={ValueChanged}
          placeholder="Password"
          value={pSW}
          id="password"
        />

        <button onClick={CheckName}>Log In</button>
        <div className="bottomMenu">
          <div className="social">Sign up teacher</div>
          <div>
            <input className="remember" type="checkbox" />
            <label className="rememberValue">Remember me</label>
          </div>
        </div>
      </div>
    </div>
  );
}
