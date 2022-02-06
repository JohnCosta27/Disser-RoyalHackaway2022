import React, { useState, useEffect } from 'react';
import DissState, { useDisses } from '../state/DissState';
import Diss from './Diss';
import Feed from './Feed';

const DissContainer = () => {
  const { disses } = useDisses();

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-snow-storm-100">
      <h1 className="text-7xl font-bold text-center">Ventur</h1>
      <div className="w-4/5 grid grid-cols-3 gap-2 items-center p-4">
        <Feed />
        {disses.map((diss) => (
          <Diss key={diss.id} id={diss.id} diss={diss.diss} name={diss.user.username} />
        ))}
      </div>
    </div>
  );
};
export default DissContainer;
