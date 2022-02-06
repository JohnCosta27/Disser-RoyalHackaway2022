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
    const ws = new WebSocket('ws://ventur.live:5005/');
    ws.addEventListener('open', (e) => {
      console.log(e);
    });

    ws.addEventListener('message', (e) => {
      const newData = JSON.parse(e.data);
      if('new-diss' in newData) {
        let newDisses = [newData.newDiss, ...refDisses.current];
        refDisses.current = newDisses;
        setDisses(newDisses);
      } else if('new-diss-reply' in newData){
        // TODO:...
      } else if('new-diss-like' in newData){
        // FIXME:...
        refDisses.current.find(x => x.id = newData.diss.id).dissesLikes = newData.likes;
        setDisses(refDisses.current);
      }
      
      
    });
    getDissesHandle();
  }, []);

  return (
    <DissContext.Provider value={{ disses, getDissesHandle }}>{children}</DissContext.Provider>
  );
};
export default DissState;
