import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getResponses } from '../api/ApliClient';
import Diss from './disses/Diss';
import FeedReply from './disses/FeedReply';
import TopBar from './TopBar';

const ResponseView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [replies, setReplies] = useState([]);

  const getResponsesHandle = () => {
    getResponses(searchParams.get('dissId')).then((response) => {
      setReplies(response.data);
    });
  };

  console.log(replies);

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
          dissResponses={replies.replies.length}
          className="col-span-1"
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
          dissResponses={reply.dissesResponses}
          onLike={getResponsesHandle}
        />
      ));
    }
    return <></>;
  };

  return (
    <>
      <TopBar />
      <div className="w-full min-h-screen flex justify-center bg-snow-storm-100">
        <div className="lg:w-3/4 sm:w-full h-full lg:p-4 sm:p-2">
          <div className="w-full h-full grid sm:grid-cols-1 lg:grid-cols-2 gap-4 p-2">
            <FeedReply className="md:col-span-1" refresh={getResponsesHandle} />
            {getOriginal()}
            <div className="h-36 lg:col-span-2 sm:col-span-1 flex items-end">
              <h1 className="text-5xl">Replies</h1>
            </div>
            {getReplies()}
          </div>
        </div>
      </div>
    </>
  );
};
export default ResponseView;
