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

        <ul className="flex items-center"></ul>
      </nav>
    </div>
  );
};
export default TopBar;
