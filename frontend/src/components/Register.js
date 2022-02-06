import React, { useState } from 'react';
import { postRegister } from '../api/ApliClient';
import { setAccessToken } from '../api/TokenHandler';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    postRegister(username, email).then((response) => {
      console.log(response);
      setAccessToken(response.data.token);
      navigate('/');
    });
  };

  return (
    <form className="bg-snow-storm-100 min-h-screen flex flex-col" onSubmit={handleSubmit}>
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Sign up</h1>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="phone number"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="phone number"
            placeholder="Phone Number"
          />

          <button
            type="submit"
            className="w-full text center py-3 rounded bg-blue-400  text-white hover:bg-green-dark focus:outline-none my-1">
            Create Account
          </button>

          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
              Terms of Service
            </a>
            and
            <a class="no-underline border-b border-grey-dark text-grey-dark" href="#">
              Privacy Policy
            </a>
          </div>
        </div>

        <div class="text-grey-dark mt-6">
          Already have an account?
          <a class="no-underline border-b border-blue text-blue" href="../login/">
            Log in
          </a>
          .
        </div>
      </div>
    </form>
  );
};
export default Register;
