export const getAccessToken = () => {
  const accessToken = localStorage.getItem('ACCESS');
  return `Bearer ${accessToken}`;
};

export const setAccessToken = (token) => {
  localStorage.setItem('ACCESS', token);
};

export const setUserId = (id) => {
  localStorage.setItem('ID', id);
};

export const hasValidAccessToken = () => {
  const token = localStorage.getItem('ACCESS');
  return token != null;
};
