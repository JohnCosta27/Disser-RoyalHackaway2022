import React from 'react';

const Diss = ({name, diss}) => {
  return (
    <div className = "w-1/2 h-48 bg-blue-100 flex flex-col">
      <h1 className = "text-4xl">{name}</h1>
      <h1 className = "text-2xl text-gray-900 bg-zinc-300">{diss}</h1>
    </div>
  )
}
export default Diss;