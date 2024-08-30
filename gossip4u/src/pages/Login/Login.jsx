import React, { useState } from 'react';
import './Login.css';
import assets from '../../assets/assets';
import { signup } from '../../config/firebase';

const Login = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Fixed typo here
    if (currState === "Sign Up") {
      try {
        await signup(userName, email, password);
        alert("Account created successfully!");
      } catch (error) {
        alert("Error creating account: " + error.message);
      }
    }
  };

  return (
    <div className='login'>
      <img src={assets.logo_big} alt="Logo" className='logo' />
      <form className='login-form' onSubmit={onSubmitHandler}> {/* Added onSubmit handler here */}
        <h2>{currState}</h2>
        {currState === "Sign Up" ? (
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            placeholder='Username'
            className="form-input"
            required
          />
        ) : null}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"  // Changed input type to "email"
          placeholder='Email Address'
          className="form-input"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"  // Changed input type to "password"
          placeholder='Password'
          className="form-input"
          required
        />
        <button type='submit'>
          {currState === "Sign Up" ? "Create Account" : "Login Now"}
        </button>
        <div className="login-term">
          <input type='checkbox' required />
          <p>Agree to the terms of use & privacy Policy</p>
        </div>
        <div className='login-forgot'>
          {currState === "Sign Up" ? (
            <p className='login-toggle'>
              Already have an account? <span onClick={() => setCurrState("Login")}>click here</span>
            </p>
          ) : (
            <p className='login-toggle'>
              Create an account? <span onClick={() => setCurrState("Sign Up")}>click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;

