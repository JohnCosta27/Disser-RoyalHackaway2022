import axios from 'axios';
import { getAccessToken } from './TokenHandler';

export const backendUrl = 'http://localhost:5000';
//export const backendUrl = 'http://ventur.live:5000';

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

export const postLogin = (username) => {
  return axios.post(`${backendUrl}/auth/login`, {
    username: username,
  });
};

export const postRegister = (username, email) => {
  return axios.post(`${backendUrl}/auth/register`, {
    username: username,
    email: email,
  });
};

export const getResponses = (dissId) => {
  return axios.get(`${backendUrl}/diss/replies`, {
    params: {
      dissId: dissId,
    },
  });
};

export const postReply = (originalDiss, diss) => {
  return axios.post(
    `${backendUrl}/diss/reply`,
    {
      originalDiss: originalDiss,
      diss: diss,
    },
    {
      headers: {
        Authorization: getAccessToken(),
      },
    }
  );
};

export const postLike = (dissId) => {
  return axios.post(
    `${backendUrl}/diss/like`,
    {
      dissId: dissId,
    },
    {
      headers: {
        Authorization: getAccessToken(),
      },
    }
  );
};

export const getUser = (userId) => {
  return axios.get(`${backendUrl}/auth/user`, {
    params: {
      userId: userId,
    },
  });
};
