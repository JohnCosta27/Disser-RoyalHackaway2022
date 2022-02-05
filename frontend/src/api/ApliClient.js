import axios from 'axios';

export const backendUrl = 'http://localhost:5000';

export const getDisses = () => {
  return axios.get(`${backendUrl}/diss/`);
};
