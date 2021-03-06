import React, { useState } from 'react';
import { postDiss, postReply } from '../../api/ApliClient';
import { useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

const FeedReply = ({ className, refresh }) => {
  const [diss, setDiss] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e) => {
    setDiss(e.target.value);
  };

  const handleReplyDiss = (e) => {
    e.preventDefault();
    postReply(searchParams.get('dissId'), diss).then((response) => {
      console.log(response);
      refresh();
    });
  };

  return (
    <form
      className={clsx(
        'flex flex-col w-full h-full gap-2 bg-white rounded shadow-lg p-4 justify-center',
        className
      )}
      onSubmit={handleReplyDiss}>
      <h1 className="text-4xl text-purple-500 text-center">Say something :)</h1>
      <textarea
        type="text"
        className="p-3 bg-transparent border border-gray-500 rounded-sm"
        placeholder="What's on your mind?"
        onChange={handleChange}></textarea>
      <div className="flex justify-end">
        <button
          type="submit"
          className="flex items-center justify-center h-8 px-2 rounded-sm bg-blue-400 hover:bg-gray-300 transition-all text-xl w-full">
          Post
        </button>
      </div>
    </form>
  );
};
export default FeedReply;
