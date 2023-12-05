import React, { useState } from 'react';
import './Login.css';
// import instance from '../API';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [incorrect, setIncorrect] = useState(false)
  const handleLogin = async () => {

    // Implement your login logic here
    console.log(`Login attempt with username: ${username} and password: ${password}`);
    // const { data } = await instance.get(`/users/${username}/${password}`);
    // if (typeof data === 'object') {
    //   localStorage.setItem("uesr", JSON.stringify(data))
      navigate(`/users/${username}`)
    //   return console.log('ok');
    // } else {
    //   return setIncorrect(true)
    // }
  };

  return (
    <div className="login-container">
      <h2 className='login'>Login</h2>
      <form>
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
      {incorrect ? <p>The data is incorrect</p> : ""}
    </div>
  );
};