import axios from 'axios';
import { getAccessToken } from './TokenHandler';

export const backendUrl = 'http://localhost:5000';

export const getDisses = () => {
  return axios.get(`${backendUrl}/diss/`);
};

export const postDiss = (diss) => {
  return axios.post(
    `${backendUrl}/diss/create`,
    {
      diss: diss,
    },
    {
      headers: {
        Authorization: getAccessToken(),
      },
    }
  );
};
