import React from 'react';
import DissContainer from './disses/DissContainer';
import Feed from './disses/Feed';
import Button from './disses/Button';

const App = () => {
  return (
    <div>
      <Feed></Feed>
      <DissContainer/>
      <Button></Button>
    </div>
  );
};
export default App;
