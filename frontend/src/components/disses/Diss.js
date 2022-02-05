import React from 'react';

const Diss = ({ name, diss }) => {
  return (
    <div className="w-full h-48 flex flex-col shadow-lg rounded bg-white p-4">
      <h1 className="text-4xl">{name}</h1>
      <h1 className="text-lg ">{diss}</h1>
    </div>
  );
};
export default Diss;
