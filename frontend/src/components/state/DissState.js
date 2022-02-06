import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { getDisses } from '../../api/ApliClient';

const DissContext = createContext();

export const useDisses = () => {
  return useContext(DissContext);
};

const DissState = ({ children }) => {
  const [disses, setDisses] = useState([]);
  const refDisses = useRef([]);

  const getDissesHandle = async () => {
    let newDisses = await getDisses();
    setDisses(newDisses.data);
    refDisses.current = newDisses.data;
  };

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5005/');
    ws.addEventListener('open', (e) => {
      console.log(e);
    });

    ws.addEventListener('message', (e) => {
      const newDiss = JSON.parse(e.data);
      let newDisses = [newDiss.newDiss, ...refDisses.current];
      refDisses.current = newDisses;
      setDisses(newDisses);
    });
    getDissesHandle();
  }, []);

  return (
    <DissContext.Provider value={{ disses, getDissesHandle }}>{children}</DissContext.Provider>
  );
};
export default DissState;
