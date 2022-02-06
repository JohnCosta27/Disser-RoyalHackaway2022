import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { ShareIcon } from '@heroicons/react/solid';
import { HeartIcon } from '@heroicons/react/outline';
import { postLike } from '../../api/ApliClient';
import moment from 'moment';

const Diss = ({
  id,
  name,
  diss,
  likes,
  datetime,
  userId,
  className,
  onLike,
  newDiss,
  dissResponses,
}) => {
  const navigate = useNavigate();

  const [border, setBorder] = useState('');

  useEffect(() => {
    if (newDiss) {
      setBorder('border-4 border-orange-500');
      setTimeout(() => {
        setBorder('border-0');
      }, 2000);
    }
  }, []);

  const handleLike = () => {
    postLike(id).then((response) => {
      if (onLike != undefined) {
        onLike();
      }
      console.log(response);
    });
  };

  return (
    <div
      className={clsx(
        'transition-all w-full h-64 flex flex-col shadow-lg rounded p-4 bg-white cursor-pointer',
        className,
        border
      )}>
      <div className="w-full">
        <div className="flex justify-between">
          <div
            className="rounded bg-blue-200 lg:px-4 sm:px-1"
            onClick={() => navigate(`/profile?userId=${userId}`)}>
            <h1 className="text-2xl">{name}</h1>
          </div>
          <h3 className="text-xl">{moment(datetime).format('MM/DD/YYYY HH:mm')}</h3>
        </div>
        <h1 className="text-lg ">{diss}</h1>
      </div>
      <div className="flex w-full items-end h-full">
        <div
          className="flex w-full justify-center items-center rounded hover:bg-red-200 transition-all"
          onClick={() => {
            handleLike();
          }}>
          <div className="w-full">
            <HeartIcon className="flex w-full h-6 px-2 justify-start" />
          </div>
          <div className="w-full">
            <p className="text-2xl text-red-500 font-bold">{likes}</p>
          </div>
        </div>
        <div
          className="w-full flex justify-center items-center"
          onClick={() => navigate(`/response?dissId=${id}`)}>
          <div className="mx-2">
            <ShareIcon className="flex w-full h-6 justify-start" />
          </div>
          <p className="text-xl text-green-500 font-bold">Replies: {dissResponses}</p>
        </div>
      </div>
    </div>
  );
};
export default Diss;
