import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import "./LoginPage.css";

import img from "../images/login.jpg";
import { FaLock } from "react-icons/fa";
import { useAuth } from "../useContext/IsAuthContext";

function LoginPage(props) {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setIsAuth = useAuth();

  const changeonClick = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const result = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => res.json());

    if (result.success) {
      console.log({ result });
      setIsAuth(true);
      localStorage.setItem(
        "login",
        result.token_type + " " + result.access_token
      );
      props.history.push({
        pathname: "/dashboard",
      });
    }
  };

  ///////////////////////////////////////////////////////////////////
  return (
    <div data-aos="fade-left" className="login">
      <div className="login_image">
        <div className="image_img">
          <img src={img} alt="login" />
        </div>
      </div>
      <div className="Form">
        <form onSubmit={changeonClick} encType="multipart/form-data">
          <h2>
            <span className="Form_span">Log In</span> <FaLock></FaLock>
          </h2>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
export default LoginPage;
