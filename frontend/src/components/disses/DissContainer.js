import React, { useState, useEffect } from 'react';
import { getDisses } from '../../api/ApliClient';
import Diss from './Diss';

const DissContainer = () => {
  const [disses, setDisses] = useState([]);

  useEffect(() => {
    getDisses().then((response) => {
      setDisses(response.data);
    });
  });

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-snow-storm-100">
      <h1 className="text-7xl font-bold text-center">Disser</h1>
      <div className="w-4/5 grid grid-cols-3 gap-2 items-center p-4">
        {disses.map((diss) => (
          <Diss key={diss.id} diss={diss.diss} name={diss.user.username} />
        ))}
      </div>
    </div>
  );
};
export default DissContainer;
