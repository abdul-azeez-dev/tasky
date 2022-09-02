import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { endpoint } from "../../config/config";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();

  const unameEl = useRef<HTMLInputElement>(null);
  const pwdEl = useRef<HTMLInputElement>(null);

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (unameEl.current?.value && pwdEl.current?.value) {
      fetch(`${endpoint}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uname: unameEl.current?.value,
          pwd: pwdEl.current?.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.token) {
            dispatch(login(data));
            localStorage.setItem("token", JSON.stringify(data));
          } else {
            alert("Login failed");
          }
        });
    }
  };
  return (
    <div className="Login">
      <form onSubmit={formHandler}>
        <label htmlFor="uname">Username</label>
        <input type="text" id="uname" ref={unameEl} autoComplete="off" />
        <label htmlFor="pwd">Password</label>
        <input type="password" id="pwd" ref={pwdEl} />
        <button type="submit" className="btn primary">
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
