import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import instance from '../../API';
export const Login = ({ state }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [incorrect, setIncorrect] = useState(false)

  const handleLogin = async () => {
    const { data } = await instance.post(`/managers/login/`, { name: username, password });
    if (typeof data !== 'object')
      return setIncorrect(true);
    localStorage.setItem("uesrToken", JSON.stringify(data.token))
    navigate(`/managers/${username}/settings`)
  };


  return (
    <div className="login-container" style={{ backgroundColor: "antiquewhite" }}>

      <h2 className='login'>Login</h2>
      <form >
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <p style={{ fontSize: 20 }}>{state && state}</p>
      {incorrect ? <p>The data is incorrect</p> : ""}
    </div>
  );
};