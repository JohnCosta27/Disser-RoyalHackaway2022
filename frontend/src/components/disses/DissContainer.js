import React, { useState, useEffect } from 'react';
import { getDisses } from '../../api/ApliClient';
import Diss from './Diss';

const DissContainer = () => {
  const [disses, setDisses] = useState([]);

  useEffect(() => {
    getDisses().then((response) => {
      setDisses(response.data);
    });
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-snow-storm-100">
      <div className="w-1/2 min-h-screen h-full flex flex-col items-center p-4">
        <h1 className="text-2xl">Quitter</h1>
        {disses.map((diss) => (
          <Diss key={diss.id} diss={diss.diss} name={diss.user.username} />
        ))}
      </div>
    </div>
  );
};
export default DissContainer;
