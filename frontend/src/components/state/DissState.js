import React, { useState, useEffect, createContext, useContext, useRef } from 'react';
import { getDisses } from '../../api/ApliClient';

const DissContext = createContext();
//const wsUrl = 'ws://localhost:5005/';
const wsUrl = 'ws://ventur.live:5005/';

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
    const ws = new WebSocket(wsUrl);
    ws.addEventListener('open', (e) => {
      console.log(e);
    });

    ws.addEventListener('message', (e) => {
      let newData = JSON.parse(e.data);

      if (newData.hasOwnProperty('newDiss')) {
        newData.newDiss.newDiss = true;

        for (let d of refDisses.current) {
          d.newDiss = false;
        }

        let newDisses = [newData.newDiss, ...refDisses.current];
        refDisses.current = newDisses;
        setDisses(newDisses);
      } else if (newData.hasOwnProperty('new-diss-reply')) {
        // TODO:...
      } else if (newData.hasOwnProperty('new-diss-like')) {
        let newDisses = [...refDisses.current];
        for (let diss of refDisses.current) {
          if (diss.id == newData['new-diss-like'].dissId) {
            diss.dissesLikes.push(newData['new-diss-like']);
            break;
          }
        }
        refDisses.current = newDisses;
        setDisses(newDisses);
      }
    });
    getDissesHandle();
  }, []);

  return (
    <DissContext.Provider value={{ disses, getDissesHandle }}>{children}</DissContext.Provider>
  );
};
export default DissState;
