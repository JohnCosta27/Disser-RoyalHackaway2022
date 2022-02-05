import React from 'react';
import Button from './Button';
const Feed = () => {
  return (
    <div className="flex flex-col w-96"><textarea className = "p-3 bg-transparent border border-gray-500 rounded-sm" rows= "3" placeholder="What's on your mind?"> </textarea>
    <div className="flex justify-end">
    <button class="flex items-center h-8 px-3 text-xs rounded-sm bg-blue-400 hover:bg-gray-300 p-3 ">Post</button>
    </div>
    </div>

  )
}
export default Feed;