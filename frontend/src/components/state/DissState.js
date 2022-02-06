import React, { useState, useEffect, createContext, useContext } from 'react';
import { getDisses } from '../../api/ApliClient';

const DissContext = createContext();

export const useDisses = () => {
  return useContext(DissContext);
};

const DissState = ({ children }) => {
  const [disses, setDisses] = useState([]);

  const getDissesHandle = async () => {
    const newDisses = await getDisses();
    setDisses(newDisses.data);
  };

  useEffect(() => {
    getDissesHandle();
  }, []);

  return (
    <DissContext.Provider value={{ disses, setDisses, getDissesHandle }}>
      {children}
    </DissContext.Provider>
  );
};
export default DissState;