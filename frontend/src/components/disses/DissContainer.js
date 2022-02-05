import React from 'react';
import Diss from './Diss';

const DissContainer = () => {

  return (
    <div className = "w-full min-h-screen flex flex-col justify-center items-center">
      <div className = "w-1/2 h-full bg-blue-100 flex justify-center">
        <h1 className = "text-2xl">Quitter</h1>
      </div>
      <Diss diss="Diss 1.0" name="Shrey" />
      <Diss diss="Diss 2.0" name="John" />
      <Diss diss="Diss 3.0" name="James" />
      <Diss diss="Diss 4.0" name="Dawg" />
    </div>
  );

};
export default DissContainer