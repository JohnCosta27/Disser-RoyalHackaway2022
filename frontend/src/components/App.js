import React from 'react';
import DissContainer from './disses/DissContainer';
import Feed from './disses/Feed';
import Button from './disses/Button';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DissContainer />} />
        <Route path="/response" element={<ResponseView />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
