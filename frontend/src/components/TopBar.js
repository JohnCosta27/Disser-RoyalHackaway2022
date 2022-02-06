import React from 'react';

const TopBar = () => {
  return (
    <div className="flex-1 flex flex-col">
      <nav className="px-4 flex justify-between bg-white h-16 border-b-2">
        <ul className="flex items-center">
          <li className="h-6 w-6">
            <img
              className="h-full w-full mx-auto"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/512px-Svelte_Logo.svg.png"
              alt="Ventur Logo"
            />
          </li>
        </ul>

        <ul className="flex items-center">
          <li>
            <h1 className="pl-8 lg:pl-0 text-gray-700">Svelte</h1>
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
