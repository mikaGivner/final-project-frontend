import "../LoginStyle.css";
export default function Login() {
  return (
    <div className="theBody">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form>
        <h3>Login Here</h3>

        <label for="username">Username</label>
        <input type="text" placeholder="Email or Phone" id="username" />

        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password" />

        <button>Log In</button>
        <div className="social">Sign up teacher</div>
        <input type="checkbox" value="Remember me" />
      </form>
    </div>
  );
}
