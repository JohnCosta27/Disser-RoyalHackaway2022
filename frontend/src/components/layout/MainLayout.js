import React from 'react';
import DissContainer from '../disses/DissContainer';
import DissState from '../state/DissState';
import TopBar from '../TopBar';

const MainLayout = () => {
  return (
    <DissState>
      <TopBar />
      <DissContainer />
    </DissState>
  );
};
export default MainLayout;
