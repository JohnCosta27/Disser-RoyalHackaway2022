import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getResponses } from '../api/ApliClient';
import Diss from './disses/Diss';
import FeedReply from './disses/FeedReply';

const ResponseView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    getResponses(searchParams.get('dissId')).then((response) => {
      setReplies(response.data);
    });
  }, [searchParams.get('dissId')]);

  const getOriginal = () => {
    if (replies.hasOwnProperty('original')) {
      return (
        <Diss
          diss={replies.original.diss}
          name={replies.original.user.username}
          className="col-span-2"
        />
      );
    }
    return <></>;
  };

  const getReplies = () => {
    if (replies.hasOwnProperty('replies')) {
      return replies.replies.map((reply) => (
        <Diss key={reply.id} id={reply.id} diss={reply.diss} name={reply.user.username} />
      ));
    }
    return <></>;
  };

  return (
    <div className="w-full min-h-screen flex justify-center bg-snow-storm-100">
      <div className="w-3/4 h-full p-4">
        <div className="w-full h-full grid grid-cols-3 gap-4">
          <FeedReply className="col-span-1" />
          {getOriginal()}
          <div className="h-36 col-span-3 flex items-end">
            <h1 className="text-5xl">Replies</h1>
          </div>
          {getReplies()}
        </div>
      </div>
    </div>
  );
};
export default ResponseView;
