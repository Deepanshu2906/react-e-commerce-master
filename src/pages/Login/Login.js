import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  function handleLogin(e) {
    navigate("/");
  }
  return (
    <div className="login-container">
      <h3>Sign In.</h3>
      <form action="" onSubmit={handleLogin} className="login-form">
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Email
          </label>
          <input className="form-control" type="email" />
        </div>

        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Password
          </label>
          <input className="form-control" type="password" />
        </div>

        <button className="btn btn-success float-end" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
