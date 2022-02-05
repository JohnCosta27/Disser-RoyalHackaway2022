import React from 'react';
import Diss from './Diss';

const DissContainer = () => {

  return (
    <div className = "w-full min-h-screen flex flex-col justify-center items-center">
      <div className = "w-1/2 h-full bg-blue-100 flex justify-center">
        <h1 className = "text-2xl">This the diss</h1>
      </div>
      <Diss diss="Diss 1.0" />
      <Diss diss="Diss 2.0" />
      <Diss diss="Diss 3.0" />
      <Diss diss="Diss 4.0" />
      <Diss diss="Diss 5.0" />
      <Diss diss="Diss 6.0" />
      <Diss diss="Diss 7.0" />
      <Diss diss="Diss 8.0" />
      <Diss diss="Diss 9.0" />
      <Diss diss="Diss 10.0" />

    </div>
  );

};
export default DissContainer