import React from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const Diss = ({ id, name, diss, className }) => {
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        'w-full h-48 flex flex-col shadow-lg rounded bg-white p-4 cursor-pointer',
        className
      )}
      onClick={() => navigate(`/response?dissId=${id}`)}>
      <h1 className="text-4xl">{name}</h1>
      <h1 className="text-lg ">{diss}</h1>
    </div>
  );
};
export default Diss;
