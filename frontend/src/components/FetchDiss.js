import React from 'react';
export function FetchDiss ({ keyData, children }) {
  const { isFetching } = keyData
  if (isFetching) {
    return <div>Ayyy</div>
  }
  return children
}