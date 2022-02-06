import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getResponses } from '../api/ApliClient';
import Diss from './disses/Diss';
import FeedReply from './disses/FeedReply';

const ResponseView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [replies, setReplies] = useState([]);

  console.log(replies);

  const getResponsesHandle = () => {
    getResponses(searchParams.get('dissId')).then((response) => {
      setReplies(response.data);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getResponsesHandle();
    }, 500);
    return () => clearInterval(interval);
  }, [searchParams.get('dissId')]);

  const getOriginal = () => {
    if (replies.hasOwnProperty('original')) {
      return (
        <Diss
          id={replies.original.id}
          diss={replies.original.diss}
          name={replies.original.user.username}
          datetime={replies.original.timestamp}
          userId={replies.original.user.id}
          likes={replies.original.dissesLikes.length}
          onLike={getResponsesHandle}
          className="col-span-2"
        />
      );
    }
    return <></>;
  };

  const getReplies = () => {
    if (replies.hasOwnProperty('replies')) {
      return replies.replies.map((reply) => (
        <Diss
          key={reply.id}
          id={reply.id}
          diss={reply.diss}
          userId={reply.user.id}
          name={reply.user.username}
          datetime={reply.timestamp}
          likes={reply.dissesLikes.length}
          onLike={getResponsesHandle}
        />
      ));
    }
    return <></>;
  };

  return (
    <div className="w-full min-h-screen flex justify-center bg-snow-storm-100">
      <div className="w-3/4 h-full p-4">
        <div className="w-full h-full grid grid-cols-3 gap-4">
          <FeedReply className="col-span-1" refresh={getResponsesHandle} />
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
