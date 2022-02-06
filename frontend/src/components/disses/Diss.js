import React from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { ShareIcon } from '@heroicons/react/solid';
import { HeartIcon } from '@heroicons/react/outline';
import { postLike } from '../../api/ApliClient';
import { useDisses } from '../state/DissState';

const Diss = ({ id, name, diss, likes, className }) => {
  const navigate = useNavigate();

  const { getDissesHandle } = useDisses();

  const handleLike = () => {
    postLike(id).then((response) => {
      getDissesHandle();
    });
  };

  return (
    <div
      className={clsx(
        'w-full h-48 flex flex-col shadow-lg rounded bg-white p-4 cursor-pointer',
        className
      )}>
      <div className="w-full" onClick={() => navigate(`/response?dissId=${id}`)}>
        <h1 className="text-4xl">{name}</h1>
        <h1 className="text-lg ">{diss}</h1>
      </div>
      <div className="flex w-full items-end h-full">
        <div
          className="flex w-full justify-center items-center rounded hover:bg-red-200 transition-all"
          onClick={() => {
            handleLike();
          }}>
          <div className="w-full">
            <HeartIcon className="flex w-full h-12 px-2 justify-start" />
          </div>
          <div className="w-full">
            <p className="text-2xl text-red-500 font-bold">{likes}</p>
          </div>
        </div>
        <ShareIcon className="flex w-full h-12 px-2 justify-start" />
      </div>
    </div>
  );
};
export default Diss;
