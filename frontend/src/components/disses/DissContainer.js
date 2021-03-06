import React, { useState, useEffect } from 'react';
import DissState, { useDisses } from '../state/DissState';
import Diss from './Diss';
import Feed from './Feed';

const DissContainer = () => {
  const { disses } = useDisses();

  console.log(disses);

  return (
    <div className="w-full sm:p-2 md:p-4 min-h-screen flex flex-col items-center bg-snow-storm-100">
      <h1 className="text-7xl font-bold text-center">Ventur</h1>
      <div className="lg:w-4/5 sm:w-full grid md:grid-cols-1 lg:grid-cols-2 gap-2 items-center md:p-4 sm:p-2">
        <Feed />
        {disses.map((diss) => (
          <Diss
            key={diss.id}
            id={diss.id}
            userId={diss.user.id}
            diss={diss.diss}
            name={diss.user.username}
            likes={diss.dissesLikes.length}
            datetime={diss.timestamp}
            newDiss={diss.newDiss}
            dissResponses={diss.dissesResponses}
          />
        ))}
      </div>
    </div>
  );
};
export default DissContainer;
