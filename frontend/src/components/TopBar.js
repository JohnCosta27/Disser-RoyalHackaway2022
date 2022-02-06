import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../img/Ventur.png';
import clsx from 'clsx';

const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentLocation = (text) => {
    if (text == '/' && location.pathname == '/') {
      return 'text-blue-500';
    } else if (text == '/profile' && location.pathname == '/profile') {
      return 'text-blue-500';
    }
  };

  return (
    <div className="flex flex-col w-full">
      <nav className="px-4 flex justify-between bg-white h-16 border-b-2">
        <ul className="flex items-center">
          <li className="h-16 w-16">
            <img className="h-full w-full mx-auto" src={Logo} alt="Ventur Logo" />
          </li>
        </ul>

        <ul className="flex items-center gap-4">
          <li onClick={() => navigate('/')}>
            <p
              className={clsx(
                'text-2xl font-bold hover:text-blue-500 transition-all cursor-pointer',
                getCurrentLocation('/')
              )}>
              Home
            </p>
          </li>
          <li onClick={() => navigate(`/profile?userId=${localStorage.getItem('ID')}`)}>
            <p
              className={clsx(
                'text-2xl font-bold hover:text-blue-500 transition-all cursor-pointer',
                getCurrentLocation('/profile')
              )}>
              Profile
            </p>
          </li>
        </ul>

        <ul className="flex items-center">
          <li className="pr-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-bell">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </li>
          <li className="h-10 w-10">
            <img
              className="h-full w-full rounded-full mx-auto"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
              alt="profile woman"
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default TopBar;
