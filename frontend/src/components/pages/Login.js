import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../api/ApliClient';
import { setAccessToken, setUserId } from '../../api/TokenHandler';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    postLogin(username)
      .then((response) => {
        setAccessToken(response.data.token);
        setUserId(response.data.id);
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form
      onSubmit={submitLogin}
      className="w-full h-screen flex justify-center items-center bg-snow-storm-100 gap-2">
      <div className="md:w-1/2 sm:w-full min-h-48 h-48 rounded shadow-lg bg-white p-4 flex flex-col gap-4">
        <input
          type="text"
          className="w-full rounded bg-snow-storm-100 border-2 border-purple-500 p-2 h-12 text-xl transition-all"
          placeholder="Username..."
          onChange={handleUsernameChange}></input>
        <button
          type="submit"
          class="flex items-center justify-center h-12 px-2 rounded-sm bg-blue-400 hover:bg-gray-300 transition-all text-xl w-full">
          Login
        </button>
        <p className="text-lg cursor-pointer text-blue-500" onClick={() => navigate('/register')}>
          Click here to sign up
        </p>
      </div>
    </form>
  );
};
export default Login;
