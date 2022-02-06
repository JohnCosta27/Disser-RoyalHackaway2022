import React from 'react';
import Logo from '../../img/Ventur.png';

const TopBar = () => {
  return (
    <div className="flex-1 flex flex-col">
      <nav className="px-4 flex justify-between bg-white h-16 border-b-2">
        <ul className="flex items-center">
          <li className="h-16 w-16">
            <img className="h-full w-full mx-auto" src={Logo} alt="Ventur Logo" />
          </li>
        </ul>

        <ul className="flex items-center">
          <li>
            <input
              type="text"
              className="w-full rounded bg-snow-storm-100 border-2 border-purple-500 p-2 h-12 text-xl transition-all"
              placeholder="Search..."></input>
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
